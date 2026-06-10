import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SimplePage from './SimplePage'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const isOAuth = window.location.hash.includes('access_token')

  useEffect(() => {
    if (!isOAuth) return

    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (!access_token) {
      setError('토큰을 찾을 수 없습니다.')
      return
    }

    supabase.auth.setSession({ access_token, refresh_token: refresh_token || '' })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message)
          return
        }
        if (data?.session) {
          window.location.replace(window.location.origin + window.location.pathname + '#/')
        } else {
          setError('세션 생성에 실패했습니다.')
        }
      })
  }, [])

  if (!isOAuth) return <SimplePage title="페이지를 찾을 수 없습니다" />

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-sm">{error}</p>
        <button
          onClick={() => window.location.replace(window.location.origin + window.location.pathname + '#/')}
          className="text-brand text-sm underline"
        >
          홈으로 이동
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">로그인 처리 중...</p>
    </div>
  )
}
