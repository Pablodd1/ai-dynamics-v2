import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elpgqgcynmefzjxbzlwb.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGdxZ2N5bm1lZnpqeGJ6bHdiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk4MzU1NCwiZXhwIjoyMTA2NTU5NTU0fQ.YJW4uwiuI37GRL9wkR1JK6mtlYExrLVDsBAC09MeSNY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
