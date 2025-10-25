import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { deleteFromCloudinary } from '@/lib/cloudinary'

// GET single story
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('stories')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 })
  }
}

// PUT update story
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('stories')
      .update(body)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 })
  }
}

// DELETE story
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Get story to delete cloudinary assets
    const { data: story } = await supabaseAdmin
      .from('stories')
      .select('cloudinary_cover_id, cloudinary_pdf_id')
      .eq('id', id)
      .single()
    
    // Delete from database
    const { error } = await supabaseAdmin
      .from('stories')
      .delete()
      .eq('id', id)
    if (error) throw error
    
    // Delete from Cloudinary (optional, can be async)
    if (story && (story as any).cloudinary_cover_id) {
      deleteFromCloudinary((story as any).cloudinary_cover_id).catch(console.error)
    }
    if (story && (story as any).cloudinary_pdf_id) {
      deleteFromCloudinary((story as any).cloudinary_pdf_id).catch(console.error)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 })
  }
}
