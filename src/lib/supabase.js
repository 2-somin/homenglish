import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://xbcttwrqsepxvytjcjft.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiY3R0d3Jxc2VweHZ5dGpjamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNjc2NjMsImV4cCI6MjA5NjY0MzY2M30.ouVXJiDFqYffAiNusfAfABbqiTGGexuKIYQyyuvG6s0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
  },
})
