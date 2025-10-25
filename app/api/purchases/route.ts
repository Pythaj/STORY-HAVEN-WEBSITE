import { NextRequest, NextResponse } from 'next/server'
import { purchasesDB } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    if (email) {
      const purchases = await purchasesDB.getByEmail(email)
      return NextResponse.json(purchases)
    }

    const purchases = await purchasesDB.getAll()
    return NextResponse.json(purchases)
  } catch (error) {
    console.error('Error fetching purchases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const purchase = await purchasesDB.create(body)
    return NextResponse.json(purchase, { status: 201 })
  } catch (error) {
    console.error('Error creating purchase:', error)
    return NextResponse.json(
      { error: 'Failed to create purchase' },
      { status: 500 }
    )
  }
}
