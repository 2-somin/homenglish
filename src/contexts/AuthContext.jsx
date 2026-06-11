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

    const applySession = (s) => {
      if (!mounted) return
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    }

    // onAuthStateChange를 가장 먼저 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!mounted) return
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    const init = async () => {
      // ── PKCE: ?code= ──────────────────────────────────────────
      const oauthCode = sessionStorage.getItem('_oauth_code')
      if (oauthCode) {
        sessionStorage.removeItem('_oauth_code')
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(oauthCode)
          if (!mounted) return
          if (!error && data.session) {
            applySession(data.session)
            navigate('/', { replace: true })
            return
          }
          // exchange 실패 → 이미 처리됐을 수도 있으니 getSession 폴백
          console.warn('[OAuth PKCE] exchange 실패, getSession 시도:', error?.message)
        } catch (e) {
          console.warn('[OAuth PKCE] 예외:', e)
        }
        // 폴백: Supabase 내부에서 이미 처리된 경우 세션이 있을 수 있음
        const { data: { session: s } } = await supabase.auth.getSession()
        if (!mounted) return
        if (s) {
          applySession(s)
          navigate('/', { replace: true })
          return
        }
        applySession(null)
        return
      }

      // ── Implicit flow: #access_token= ─────────────────────────
      const tokensRaw = sessionStorage.getItem('_oauth_tokens')
      if (tokensRaw) {
        sessionStorage.removeItem('_oauth_tokens')
        try {
          const { access_token, refresh_token } = JSON.parse(tokensRaw)
          const { data, error } = await supabase.auth.setSession({ access_token, refresh_token })
          if (!mounted) return
          if (!error && data.session) {
            applySession(data.session)
            navigate('/', { replace: true })
            return
          }
          console.warn('[OAuth Implicit] setSession 실패:', error?.message)
        } catch (e) {
          console.warn('[OAuth Implicit] 예외:', e)
        }
        applySession(null)
        return
      }

      // ── 일반 세션 복구 ────────────────────────────────────────
      const { data: { session: s } } = await supabase.auth.getSession()
      if (!mounted) return
      applySession(s)
    }

    init()

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
