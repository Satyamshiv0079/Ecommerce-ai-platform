// app/api/ai/generate-description/route.ts
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, category } = await request.json();

    if (!name || !category) {
      return NextResponse.json(
        { error: "Product name and category are required" },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'), // Fast & high quality
      // You can also use: 'mixtral-8x7b-32768' or 'llama-3.1-8b-instant'
      
      prompt: `Write a compelling, SEO-friendly, and engaging product description for an e-commerce website.

Product Name: ${name}
Category: ${category}

Requirements:
- Maximum 150-160 words
- Make it persuasive and customer-focused
- Highlight benefits, not just features
- Use engaging and modern tone
- Good for SEO (naturally include keywords)
- Do not include price or placeholder text

Return only the description, no extra text.`,
      temperature: 0.7,
    });

    return NextResponse.json({
      description: text.trim()
    });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate description. Please try again." },
      { status: 500 }
    );
  }
}