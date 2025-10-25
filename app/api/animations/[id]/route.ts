import { NextRequest, NextResponse } from 'next/server'
import { animationsDB } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const animation = await animationsDB.getById(id)
    await animationsDB.incrementViews(id)
    return NextResponse.json(animation)
  } catch (error) {
    console.error('Error fetching animation:', error)
    return NextResponse.json(
      { error: 'Animation not found' },
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
    const animation = await animationsDB.update(id, body)
    return NextResponse.json(animation)
  } catch (error) {
    console.error('Error updating animation:', error)
    return NextResponse.json(
      { error: 'Failed to update animation' },
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
    await animationsDB.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting animation:', error)
    return NextResponse.json(
      { error: 'Failed to delete animation' },
      { status: 500 }
    )
  }
}
