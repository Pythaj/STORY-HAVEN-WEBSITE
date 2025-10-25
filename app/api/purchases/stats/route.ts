import { NextResponse } from 'next/server'
import { purchasesDB } from '@/lib/database'

export async function GET() {
  try {
    const stats = await purchasesDB.getStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching purchase stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
