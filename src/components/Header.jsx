import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, site } from '../data/site'
import { useTheme } from '../contexts/ThemeContext'

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
              src="/rest04/homeglish_logo_kr.png"
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

        {/* 데스크탑 드롭다운 — 서브메뉴 가로 나열 */}
        <div
          className={[
            'hidden lg:block overflow-hidden border-b transition-all duration-200',
            'bg-bg dark:bg-bg-dark border-neutral-100 dark:border-neutral-700',
            hovered ? 'max-h-24 opacity-100' : 'max-h-0 border-b-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto max-w-container px-20">
            {nav.map((item) => (
              <div
                key={item.label}
                className="py-4"
                onMouseEnter={() => setHovered(item.label)}
              >
                {hovered === item.label && (
                  <div className="flex flex-wrap gap-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.label + c.to}
                        to={c.to}
                        className="px-4 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 rounded-full transition hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:text-brand dark:hover:text-brand-light font-medium whitespace-nowrap"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
                  src="/rest04/homeglish_logo_kr.png"
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
                    className="block py-2 text-base font-bold text-neutral-800 dark:text-neutral-100 hover:text-brand dark:hover:text-brand-light transition"
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

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700">
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
