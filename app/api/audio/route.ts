import { NextRequest, NextResponse } from 'next/server'
import { audioStoriesDB } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const genre = searchParams.get('genre') || undefined
    const search = searchParams.get('search') || undefined

    const audioStories = await audioStoriesDB.getAll({ genre, search })
    return NextResponse.json(audioStories)
  } catch (error) {
    console.error('Error fetching audio stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audio stories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const audio = await audioStoriesDB.create(body)
    return NextResponse.json(audio, { status: 201 })
  } catch (error) {
    console.error('Error creating audio story:', error)
    return NextResponse.json(
      { error: 'Failed to create audio story' },
      { status: 500 }
    )
  }
}
