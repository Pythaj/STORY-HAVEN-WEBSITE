import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const { data, error } = await supabaseAdmin
      .from('audio_stories')
      .select('plays')
      .eq('id', id)
      .single()
    if (error) throw error

    const current = Number(data?.plays || 0)
    const { error: updError } = await supabaseAdmin
      .from('audio_stories')
      .update({ plays: current + 1 })
      .eq('id', id)
    if (updError) throw updError

    return NextResponse.json({ ok: true, plays: current + 1 })
  } catch (e) {
    console.error('play error', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
