import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// GET all animations (including drafts) for admin
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('animations')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching animations:', error)
    return NextResponse.json({ error: 'Failed to fetch animations' }, { status: 500 })
  }
}

// POST create new animation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('animations')
      .insert([body])
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating animation:', error)
    return NextResponse.json({ error: 'Failed to create animation' }, { status: 500 })
  }
}
