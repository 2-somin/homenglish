import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.jsx'
import './index.css'

// OAuth 콜백 처리 — React 렌더링 전에 실행
// Supabase가 먼저 hash에서 토큰을 읽고 localStorage에 저장한 뒤 hash를 #/으로 교체
if (window.location.hash.includes('access_token')) {
  window.history.replaceState(null, '', window.location.pathname + '#/')
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
