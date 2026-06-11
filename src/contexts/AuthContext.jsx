import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    // onAuthStateChange를 먼저 구독해 두어 이후 모든 상태 변화를 감지한다
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })

    // OAuth PKCE 콜백: main.jsx에서 저장한 code로 세션 교환
    const oauthCode = sessionStorage.getItem('_oauth_code')
    if (oauthCode) {
      sessionStorage.removeItem('_oauth_code')
      supabase.auth.exchangeCodeForSession(oauthCode)
        .then(({ data: { session: newSession }, error }) => {
          if (!mounted) return
          if (error) {
            console.error('[OAuth] 세션 교환 실패:', error.message)
            setLoading(false)
            return
          }
          if (newSession) {
            setSession(newSession)
            setUser(newSession.user)
            setLoading(false)
            navigate('/', { replace: true })
          } else {
            setLoading(false)
          }
        })
        .catch((err) => {
          console.error('[OAuth] 예외:', err)
          if (mounted) setLoading(false)
        })
    } else {
      // 일반 세션 복구 (localStorage에 저장된 기존 세션)
      supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
        if (!mounted) return
        setSession(existingSession)
        setUser(existingSession?.user ?? null)
        setLoading(false)
      })
    }

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
