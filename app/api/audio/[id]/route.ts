import { NextRequest, NextResponse } from 'next/server'
import { audioStoriesDB } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const audio = await audioStoriesDB.getById(id)
    await audioStoriesDB.incrementPlays(id)
    return NextResponse.json(audio)
  } catch (error) {
    console.error('Error fetching audio story:', error)
    return NextResponse.json(
      { error: 'Audio story not found' },
      { status: 404 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const audio = await audioStoriesDB.update(id, body)
    return NextResponse.json(audio)
  } catch (error) {
    console.error('Error updating audio story:', error)
    return NextResponse.json(
      { error: 'Failed to update audio story' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await audioStoriesDB.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting audio story:', error)
    return NextResponse.json(
      { error: 'Failed to delete audio story' },
      { status: 500 }
    )
  }
}
