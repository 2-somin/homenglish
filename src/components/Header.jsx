import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { nav, site } from '../data/site'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { dark, toggle } = useTheme()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const userLabel = user ? user.email.split('@')[0] : null

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="bg-white dark:bg-surface-dark border-b border-neutral-100 dark:border-neutral-700 shadow-sm transition-colors"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 md:px-10 lg:px-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/homenglish/homeglish_logo_kr.png"
              alt={`${site.nameKo} ${site.name}`}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="flex items-center"
                onMouseEnter={() => setHovered(item.label)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-5 text-sm font-semibold transition-colors whitespace-nowrap',
                      isActive
                        ? 'text-brand dark:text-brand-light'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-brand dark:hover:text-brand-light',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 로그인/유저 버튼 (데스크탑) */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            {user ? (
              <>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium max-w-[120px] truncate">
                  {userLabel}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-4 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-600 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:border-brand dark:hover:border-brand-light hover:text-brand dark:hover:text-brand-light transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition"
              >
                로그인
              </Link>
            )}
          </div>

          {/* 다크모드 토글 + 햄버거 */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden text-neutral-700 dark:text-neutral-300"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-6 bg-current rounded" />
              <span className="h-0.5 w-6 bg-current rounded" />
              <span className="h-0.5 w-6 bg-current rounded" />
            </button>
          </div>
        </div>

        {/* 데스크탑 드롭다운 — 고정 높이, 단일 행 */}
        <div
          className={[
            'hidden lg:block overflow-hidden border-b transition-all duration-200',
            'bg-bg dark:bg-bg-dark border-neutral-100 dark:border-neutral-700',
            hovered ? 'max-h-16 opacity-100' : 'max-h-0 border-b-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto max-w-container px-20 h-14 flex items-center justify-center gap-1">
            {nav.find((item) => item.label === hovered)?.children.map((c) => (
              <Link
                key={c.label + c.to}
                to={c.to}
                onClick={() => setHovered(null)}
                className="px-4 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 rounded-full transition hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-brand dark:hover:text-brand-light font-medium whitespace-nowrap"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 모바일 슬라이드 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-white dark:bg-surface-dark p-6 shadow-2xl transition-colors">
            <div className="mb-6 flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center"
                onClick={() => setMobileOpen(false)}
              >
                <img
                  src="/homenglish/homeglish_logo_kr.png"
                  alt={`${site.nameKo} ${site.name}`}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="text-2xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-neutral-100 dark:border-neutral-700 pb-2 mb-1">
                  <Link
                    to={item.to}
                    className="block py-2 text-base font-medium text-neutral-800 dark:text-neutral-100 hover:text-brand dark:hover:text-brand-light transition"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <ul className="flex flex-col mt-1">
                    {item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block py-1.5 pl-3 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand dark:hover:text-brand-light transition"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <span className="font-medium text-neutral-700 dark:text-neutral-200">{userLabel}</span>님
                  </div>
                  <button
                    type="button"
                    onClick={() => { handleSignOut(); setMobileOpen(false) }}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl bg-brand hover:bg-brand-dark text-white text-sm font-semibold transition"
                >
                  로그인
                </Link>
              )}
              <button
                type="button"
                onClick={toggle}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
                <span>{dark ? '라이트 모드로 전환' : '다크 모드로 전환'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
