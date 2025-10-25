import { createClient } from '@supabase/supabase-js'
import { supabase as anonSupabase } from './supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Server-only client. Falls back to anon client if the service key is not set.
export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : anonSupabase
