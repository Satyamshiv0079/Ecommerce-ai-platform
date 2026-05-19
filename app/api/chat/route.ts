import { createGroq } from '@ai-sdk/groq'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY!,
    })

    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: `You are a helpful shopping assistant for ShopAI, an online store.
      You help customers find products, answer questions about orders, and give shopping advice.
      Our products include Electronics, Footwear, Bags, and Accessories.
      Be friendly, concise, and helpful.`,
      messages,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}