import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST() {
  try {
    // Reset all stats for stories
    const { error: storiesError } = await supabaseAdmin
      .from('stories')
      .update({ views: 0, rating: 0 })
      .neq('id', 0) // Update all rows

    if (storiesError) throw storiesError

    // Reset all stats for audio stories
    const { error: audioError } = await supabaseAdmin
      .from('audio_stories')
      .update({ plays: 0, rating: 0 })
      .neq('id', 0)

    if (audioError) throw audioError

    // Reset all stats for animations
    const { error: animationsError } = await supabaseAdmin
      .from('animations')
      .update({ views: 0, likes: 0 })
      .neq('id', 0)

    if (animationsError) throw animationsError

    return NextResponse.json({ 
      success: true, 
      message: 'All stats have been reset to 0' 
    })
  } catch (error) {
    console.error('Error resetting stats:', error)
    return NextResponse.json(
      { error: 'Failed to reset stats' },
      { status: 500 }
    )
  }
}
