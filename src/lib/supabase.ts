import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVha2lyZWdybnpjd3V3cWprYXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0ODI2MzgsImV4cCI6MjA1NjA1ODYzOH0.XCzZ_56BnzC5VCwb3aM6Hukn6QdEQlFhR6bJ5P1b1l4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
