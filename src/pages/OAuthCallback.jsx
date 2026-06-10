import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import SimplePage from './SimplePage'

export default function OAuthCallback() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const isOAuth = window.location.hash.includes('access_token')

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true })
    }
  }, [user, loading])

  // OAuth 콜백 중이면 로딩 표시
  if (isOAuth || loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">로그인 처리 중...</p>
      </div>
    )
  }

  return <SimplePage title="페이지를 찾을 수 없습니다" />
}
