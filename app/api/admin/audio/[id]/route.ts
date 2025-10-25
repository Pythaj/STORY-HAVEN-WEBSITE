import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { deleteFromCloudinary } from '@/lib/cloudinary'

// GET single audio
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('audio_stories')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching audio:', error)
    return NextResponse.json({ error: 'Failed to fetch audio' }, { status: 500 })
  }
}

// PUT update audio
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('audio_stories')
      .update(body)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating audio:', error)
    return NextResponse.json({ error: 'Failed to update audio' }, { status: 500 })
  }
}

// DELETE audio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: audio } = await supabaseAdmin
      .from('audio_stories')
      .select('cloudinary_cover_id, cloudinary_audio_id')
      .eq('id', id)
      .single()
    const { error } = await supabaseAdmin
      .from('audio_stories')
      .delete()
      .eq('id', id)
    if (error) throw error
    
    if (audio && (audio as any).cloudinary_cover_id) {
      deleteFromCloudinary((audio as any).cloudinary_cover_id).catch(console.error)
    }
    if (audio && (audio as any).cloudinary_audio_id) {
      deleteFromCloudinary((audio as any).cloudinary_audio_id).catch(console.error)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting audio:', error)
    return NextResponse.json({ error: 'Failed to delete audio' }, { status: 500 })
  }
}
