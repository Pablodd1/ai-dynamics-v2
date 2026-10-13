import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co'
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

function getSafeAnonKey(key: string): string {
  if (!key || key.trim() === '') {
    console.warn('[Supabase] VITE_SUPABASE_ANON_KEY is not defined. Using safe placeholder to prevent client crash.')
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGdxZ2N5bm1lZnpqeGJ6bHdiIiwicm9sZSI6ImFub24ifQ.placeholder'
  }
  try {
    const parts = key.split('.')
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      if (payload.role === 'service_role') {
        console.error('[Security Warning] VITE_SUPABASE_ANON_KEY contains a service_role key! Please replace it with the public anon key in Vercel environment variables.')
      }
    }
  } catch {
    // Ignore decode errors
  }
  return key
}

export const supabase = createClient(supabaseUrl, getSafeAnonKey(rawKey))
