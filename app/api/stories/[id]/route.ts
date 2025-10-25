import { NextRequest, NextResponse } from 'next/server'
import { storiesDB } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const story = await storiesDB.getById(id)
    
    // Increment views
    await storiesDB.incrementViews(id)
    
    return NextResponse.json(story)
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json(
      { error: 'Story not found' },
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
    const story = await storiesDB.update(id, body)
    return NextResponse.json(story)
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json(
      { error: 'Failed to update story' },
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
    await storiesDB.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json(
      { error: 'Failed to delete story' },
      { status: 500 }
    )
  }
}
