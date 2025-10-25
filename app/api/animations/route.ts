import { NextRequest, NextResponse } from 'next/server'
import { animationsDB } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const genre = searchParams.get('genre') || undefined
    const search = searchParams.get('search') || undefined

    const animations = await animationsDB.getAll({ genre, search })
    return NextResponse.json(animations)
  } catch (error) {
    console.error('Error fetching animations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch animations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const animation = await animationsDB.create(body)
    return NextResponse.json(animation, { status: 201 })
  } catch (error) {
    console.error('Error creating animation:', error)
    return NextResponse.json(
      { error: 'Failed to create animation' },
      { status: 500 }
    )
  }
}
