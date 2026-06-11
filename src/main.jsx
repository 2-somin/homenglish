import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { supabase } from './lib/supabase'
import App from './App.jsx'
import './index.css'

// OAuth PKCE 콜백 처리:
// HashRouter 초기화 전에 ?code= 파라미터를 캡처하고 URL을 정리한다.
// HashRouter는 빈 해시를 보면 URL을 수정해 ?code=xxx를 지워버리기 때문.
const _params = new URLSearchParams(window.location.search)
const _oauthCode = _params.get('code')
if (_oauthCode) {
  // HashRouter가 URL을 보기 전에 즉시 #/로 정리
  window.history.replaceState({}, '', window.location.pathname + '#/')
  // 세션 교환은 비동기로 진행 (React 렌더링과 병렬)
  supabase.auth.exchangeCodeForSession(_oauthCode).catch(console.error)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>,
)
