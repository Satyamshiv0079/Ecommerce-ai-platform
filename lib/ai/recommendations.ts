import { createGroq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { prisma } from '@/lib/prisma'

export async function getAIRecommendations(slug: string) {
  try {
    // 1. Fetch the target product
    const product = await prisma.product.findUnique({
      where: { slug },
    })

    if (!product) return []

    // 2. Fetch all other active products in the catalog
    const catalog = await prisma.product.findMany({
      where: {
        isActive: true,
        NOT: {
          id: product.id,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        category: true,
        price: true,
      },
    })

    if (catalog.length === 0) return []

    // 3. Initialize Groq AI Client
    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY!,
    })

    const prompt = `You are a professional e-commerce AI recommendation engine. 
Your task is to analyze the product a customer is currently viewing and select the top 3 complementary, matching, or similar products from our catalog that they are most likely to buy together or instead.

Product currently viewed:
- Name: ${product.name}
- Category: ${product.category}
- Price: ₹${product.price}
- Description: ${product.description}

Available Catalog to choose from (Choose EXACTLY up to 3):
${JSON.stringify(catalog, null, 2)}

Requirements:
1. Select exactly up to 3 products from the available catalog.
2. Return ONLY a valid JSON array of objects.
3. Each object in the array MUST contain:
   - "slug": The exact slug of the recommended product from the catalog.
   - "reason": A friendly, customer-focused, 1-sentence reason why this product matches the viewed product (e.g., "Perfect companion to complete your sound setup", "Sleek activewear to match your footwear").
4. Do not include any markdown format tags (like \`\`\`json), explanations, or text outside the JSON array.`

    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt,
      temperature: 0.3,
    })

    let recommendationsData = []
    try {
      const cleanJsonString = text.replace(/```json/g, '').replace(/```/g, '').trim()
      recommendationsData = JSON.parse(cleanJsonString)
    } catch (parseError) {
      console.error('Failed to parse AI recommendations JSON, falling back to basic same-category matching:', parseError)
      const fallbackProducts = await prisma.product.findMany({
        where: {
          category: product.category,
          isActive: true,
          NOT: {
            id: product.id,
          },
        },
        take: 3,
      })
      return fallbackProducts.map((p) => ({
        ...p,
        reason: 'Recommended based on your interest in this category.',
      }))
    }

    const recommendedSlugs = recommendationsData.map((item: any) => item.slug)
    const recommendedProducts = await prisma.product.findMany({
      where: {
        slug: {
          in: recommendedSlugs,
        },
        isActive: true,
      },
    })

    return recommendedProducts.map((p) => {
      const aiRecommendation = recommendationsData.find((item: any) => item.slug === p.slug)
      return {
        ...p,
        reason: aiRecommendation ? aiRecommendation.reason : 'Personalized recommendation just for you.',
      }
    })
  } catch (error) {
    console.error('getAIRecommendations helper error:', error)
    // Fallback: simple same-category matching
    try {
      const product = await prisma.product.findUnique({ where: { slug } })
      if (!product) return []
      const fallbackProducts = await prisma.product.findMany({
        where: {
          category: product.category,
          isActive: true,
          NOT: {
            id: product.id,
          },
        },
        take: 3,
      })
      return fallbackProducts.map((p) => ({
        ...p,
        reason: 'Recommended based on your interest in this category.',
      }))
    } catch (dbError) {
      return []
    }
  }
}
