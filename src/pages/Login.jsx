import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const [tab, setTab] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [kakaoLoading, setKakaoLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const from = location.state?.from || '/'

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  const handleKakaoLogin = async () => {
    setError('')
    setKakaoLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: window.location.origin + '/rest04/',
        },
      })
      if (error) throw error
    } catch (err) {
      setError(err.message || '카카오 로그인 중 오류가 발생했습니다.')
      setKakaoLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (tab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate(from, { replace: true })
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('이메일 확인 링크를 보냈습니다. 받은 편지함을 확인해주세요.')
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      const msg = err.message || '오류가 발생했습니다.'
      if (msg.includes('Invalid login credentials')) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      } else if (msg.includes('Email not confirmed')) {
        setError('이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.')
      } else if (msg.includes('User already registered')) {
        setError('이미 가입된 이메일입니다.')
      } else if (msg.includes('Password should be')) {
        setError('비밀번호는 6자 이상이어야 합니다.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-bg dark:bg-bg-dark">
      <div className="w-full max-w-md">
        {/* 카드 */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 p-8">
          {/* 헤더 */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
              {tab === 'login' ? '로그인' : '회원가입'}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              홈글리시 커뮤니티에 오신 것을 환영합니다
            </p>
          </div>

          {/* 탭 */}
          <div className="flex mb-6 rounded-xl bg-neutral-100 dark:bg-neutral-700/50 p-1">
            <button
              type="button"
              onClick={() => { setTab('login'); setError(''); setMessage('') }}
              className={[
                'flex-1 py-2 text-sm font-semibold rounded-lg transition-all',
                tab === 'login'
                  ? 'bg-white dark:bg-surface-dark text-brand dark:text-brand-light shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300',
              ].join(' ')}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setError(''); setMessage('') }}
              className={[
                'flex-1 py-2 text-sm font-semibold rounded-lg transition-all',
                tab === 'signup'
                  ? 'bg-white dark:bg-surface-dark text-brand dark:text-brand-light shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300',
              ].join(' ')}
            >
              회원가입
            </button>
          </div>

          {/* 카카오 로그인 */}
          <button
            type="button"
            onClick={handleKakaoLogin}
            disabled={kakaoLoading || loading}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#FEE500', color: '#191919' }}
          >
            <svg width="20" height="20" viewBox="0 0 512 512" fill="none">
              <path
                d="M255.5 48C141.1 48 48 121.5 48 212c0 58.8 38.2 110.4 96 141.7l-12.3 72.9c-1 5.9 5.4 10.3 10.4 7.1l83.4-55.5c10 1.2 20.2 1.8 30.5 1.8 114.4 0 207.5-73.5 207.5-164S369.9 48 255.5 48z"
                fill="#191919"
              />
            </svg>
            {kakaoLoading ? '카카오 연결 중...' : '카카오 로그인'}
          </button>

          {/* 구분선 */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">또는 이메일로 계속하기</span>
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:focus:ring-brand-light/30 focus:border-brand dark:focus:border-brand-light transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                placeholder={tab === 'signup' ? '6자 이상 입력해주세요' : '비밀번호를 입력해주세요'}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 dark:focus:ring-brand-light/30 focus:border-brand dark:focus:border-brand-light transition"
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* 성공 메시지 */}
            {message && (
              <div className="px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-sm text-green-700 dark:text-green-400">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? (tab === 'login' ? '로그인 중...' : '가입 중...')
                : (tab === 'login' ? '로그인' : '회원가입')}
            </button>
          </form>

          {tab === 'login' && (
            <p className="mt-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
              계정이 없으신가요?{' '}
              <button
                type="button"
                onClick={() => { setTab('signup'); setError(''); setMessage('') }}
                className="text-brand dark:text-brand-light font-semibold hover:underline transition"
              >
                회원가입
              </button>
            </p>
          )}

          {tab === 'signup' && (
            <p className="mt-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={() => { setTab('login'); setError(''); setMessage('') }}
                className="text-brand dark:text-brand-light font-semibold hover:underline transition"
              >
                로그인
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
