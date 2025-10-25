import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './env-validation'

let supabaseConfig: any = null

try {
  supabaseConfig = getSupabaseConfig()
} catch (error) {
  console.error('Failed to load Supabase configuration:', error)
  // Fallback for build time - will be replaced with real values at runtime
  supabaseConfig = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
  }
}

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
)

// Database Types
export interface Story {
  id: string
  title: string
  genre: string
  description: string
  cover_url: string
  pdf_url: string
  cloudinary_cover_id?: string
  cloudinary_pdf_id?: string
  price: number
  views: number
  rating: number
  language: string
  pages: number
  published: boolean
  created_at: string
  updated_at: string
}

export interface AudioStory {
  id: string
  title: string
  genre: string
  description: string
  cover_url: string
  audio_url: string
  cloudinary_cover_id?: string
  cloudinary_audio_id?: string
  duration: number
  price: number
  plays: number
  rating: number
  language: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Animation {
  id: string
  title: string
  genre: string
  description: string
  thumbnail_url: string
  video_url: string
  cloudinary_thumbnail_id?: string
  cloudinary_video_id?: string
  duration: number
  price: number
  views: number
  rating: number
  language: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: string
  user_email: string
  user_name: string
  content_type: 'story' | 'audio' | 'animation'
  content_id: string
  amount: number
  payment_method: string
  payment_reference: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  created_at: string
}
