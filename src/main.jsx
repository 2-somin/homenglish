import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.jsx'
import './index.css'

// HashRouter가 URL을 수정하기 전에 OAuth 콜백 파라미터를 sessionStorage에 저장
// PKCE:     ?code=xxx       → sessionStorage._oauth_code
// Implicit: #access_token=  → sessionStorage._oauth_tokens
;(() => {
  const search = new URLSearchParams(window.location.search)
  const code = search.get('code')
  if (code) {
    sessionStorage.setItem('_oauth_code', code)
    window.history.replaceState({}, '', window.location.pathname + '#/')
    return
  }

  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const accessToken = hash.get('access_token')
  if (accessToken) {
    sessionStorage.setItem('_oauth_tokens', JSON.stringify({
      access_token: accessToken,
      refresh_token: hash.get('refresh_token') || '',
    }))
    window.history.replaceState({}, '', window.location.pathname + '#/')
  }
})()

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
