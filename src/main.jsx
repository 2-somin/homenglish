import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.jsx'
import './index.css'

// HashRouter가 URL을 수정하기 전에 ?code= 파라미터를 sessionStorage에 보관하고 URL을 정리한다.
// (HashRouter는 빈 해시를 보면 ?code=xxx를 포함한 URL을 #/로 덮어써 버린다)
const _params = new URLSearchParams(window.location.search)
const _code = _params.get('code')
if (_code) {
  sessionStorage.setItem('_oauth_code', _code)
  window.history.replaceState({}, '', window.location.pathname + '#/')
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
