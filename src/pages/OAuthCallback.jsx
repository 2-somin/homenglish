import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import SimplePage from './SimplePage'

const goHome = () =>
  window.location.replace(window.location.origin + window.location.pathname + '#/')

export default function OAuthCallback() {
  const isOAuth = window.location.hash.includes('access_token')

  useEffect(() => {
    if (!isOAuth) return

    // 1. 이미 세션이 있으면 바로 이동
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) { goHome(); return }

      // 2. hash에서 토큰 직접 파싱해서 setSession 시도
      const params = new URLSearchParams(window.location.hash.substring(1))
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token') || ''

      if (access_token) {
        supabase.auth.setSession({ access_token, refresh_token })
          .then(() => goHome())
          .catch(() => goHome()) // 실패해도 홈으로
      } else {
        goHome()
      }
    })

    // 3. 3초 후에도 안 넘어가면 강제 이동
    const timer = setTimeout(goHome, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isOAuth) return <SimplePage title="페이지를 찾을 수 없습니다" />

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">로그인 처리 중...</p>
    </div>
  )
}
