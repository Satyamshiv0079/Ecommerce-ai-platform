import { NextRequest, NextResponse } from 'next/server'
import { getAIRecommendations } from '@/lib/ai/recommendations'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 })
    }

    const recommendations = await getAIRecommendations(slug)
    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error('Recommendation API error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
