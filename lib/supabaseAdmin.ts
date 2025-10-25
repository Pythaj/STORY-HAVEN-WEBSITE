import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './env-validation'

let supabaseConfig: any = null

try {
  supabaseConfig = getSupabaseConfig()
} catch (error) {
  console.error('Failed to load Supabase admin configuration:', error)
  // Fallback for build time - will be replaced with real values at runtime
  supabaseConfig = {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-service-key'
  }
}

const serviceRoleKey = supabaseConfig.serviceRoleKey

// Server-only client. Falls back to anon client if the service key is not set.
export const supabaseAdmin = serviceRoleKey && serviceRoleKey !== supabaseConfig.anonKey
  ? createClient(supabaseConfig.url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : createClient(supabaseConfig.url, supabaseConfig.anonKey)
