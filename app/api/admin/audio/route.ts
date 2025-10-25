import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// GET all audio (including drafts) for admin
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('audio_stories')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching audio:', error)
    return NextResponse.json({ error: 'Failed to fetch audio' }, { status: 500 })
  }
}

// POST create new audio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('audio_stories')
      .insert([body])
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating audio:', error)
    return NextResponse.json({ error: 'Failed to create audio' }, { status: 500 })
  }
}
