import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
