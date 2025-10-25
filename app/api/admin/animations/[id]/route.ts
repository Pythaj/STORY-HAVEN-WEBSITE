import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { deleteFromCloudinary } from '@/lib/cloudinary'

// GET single animation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabaseAdmin
      .from('animations')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching animation:', error)
    return NextResponse.json({ error: 'Failed to fetch animation' }, { status: 500 })
  }
}

// PUT update animation
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data, error } = await supabaseAdmin
      .from('animations')
      .update(body)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating animation:', error)
    return NextResponse.json({ error: 'Failed to update animation' }, { status: 500 })
  }
}

// DELETE animation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: animation } = await supabaseAdmin
      .from('animations')
      .select('cloudinary_thumbnail_id, cloudinary_video_id')
      .eq('id', id)
      .single()
    const { error } = await supabaseAdmin
      .from('animations')
      .delete()
      .eq('id', id)
    if (error) throw error
    
    if (animation && (animation as any).cloudinary_thumbnail_id) {
      deleteFromCloudinary((animation as any).cloudinary_thumbnail_id).catch(console.error)
    }
    if (animation && (animation as any).cloudinary_video_id) {
      deleteFromCloudinary((animation as any).cloudinary_video_id).catch(console.error)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting animation:', error)
    return NextResponse.json({ error: 'Failed to delete animation' }, { status: 500 })
  }
}
