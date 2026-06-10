import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import SimplePage from './SimplePage'

const goHome = () =>
  window.location.replace(window.location.origin + window.location.pathname + '#/')

export default function OAuthCallback() {
  const isOAuth = window.location.hash.includes('access_token')

  useEffect(() => {
    if (!isOAuth) return

    // Supabase detectSessionInUrl(true, default) automatically processes
    // the access_token in the URL hash during client init.
    // Wait for onAuthStateChange SIGNED_IN event instead of calling setSession.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        goHome()
      }
    })

    // Also check if session already exists (race condition: client processed hash before we subscribed)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        subscription.unsubscribe()
        goHome()
      }
    })

    // Fallback: 5초 후 강제 이동
    const timer = setTimeout(() => {
      subscription.unsubscribe()
      goHome()
    }, 5000)

    return () => {
      clearTimeout(timer)
      subscription.unsubscribe()
    }
  }, [])

  if (!isOAuth) return <SimplePage title="페이지를 찾을 수 없습니다" />

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">로그인 처리 중...</p>
    </div>
  )
}
