import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SimplePage from './SimplePage'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(
    window.location.hash.includes('access_token')
  )

  useEffect(() => {
    if (!window.location.hash.includes('access_token')) return

    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (!access_token) {
      setProcessing(false)
      return
    }

    supabase.auth.setSession({ access_token, refresh_token })
      .then(({ data, error }) => {
        if (data?.session) {
          navigate('/', { replace: true })
        } else {
          setProcessing(false)
        }
      })
  }, [])

  if (processing) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">로그인 처리 중...</p>
      </div>
    )
  }

  return <SimplePage title="페이지를 찾을 수 없습니다" />
}
