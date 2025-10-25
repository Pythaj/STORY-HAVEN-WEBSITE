import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const cookieStore = await cookies()
  const cookieKey = `liked_story_${id}`

  try {
    const already = cookieStore.get(cookieKey)
    if (already) {
      return NextResponse.json({ ok: true, liked: true })
    }

    const { data, error } = await supabaseAdmin
      .from('stories')
      .select('rating')
      .eq('id', id)
      .single()
    if (error) throw error

    const current = Number(data?.rating || 0)
    const next = current + 1

    const { error: updError } = await supabaseAdmin
      .from('stories')
      .update({ rating: next })
      .eq('id', id)
    if (updError) throw updError

    const res = NextResponse.json({ ok: true, rating: next })
    res.cookies.set(cookieKey, '1', { path: '/', maxAge: 60 * 60 * 24, sameSite: 'lax' })
    return res
  } catch (e) {
    console.error('story like error', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
