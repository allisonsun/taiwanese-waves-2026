import { getApprovedStories } from '@/lib/sheets'
import { NextResponse } from 'next/server'

export const revalidate = 300

export async function GET() {
  try {
    const stories = await getApprovedStories()
    return NextResponse.json(stories)
  } catch {
    return NextResponse.json([])
  }
}
