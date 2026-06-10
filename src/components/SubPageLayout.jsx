import { NavLink } from 'react-router-dom'
import Placeholder from './Placeholder'

// ============================================================
// 서브페이지 공통 레이아웃
//  - 상단 sticky 탭 네비 (대카테고리 제목 + 빵부스러기 + 탭 메뉴)
//  - 페이지헤드 이미지(플레이스홀더)
//  - 본문(children)
// ============================================================
export default function SubPageLayout({ sectionTitle, tabs, headLabel, children }) {
  return (
    <div>
      {/* sticky 탭 네비 */}
      <div className="sticky top-20 z-30 bg-white shadow-sm">
        <div className="mx-auto max-w-container px-4 pt-12 md:px-10 lg:px-20">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <h2 className="mb-6 text-4xl font-medium leading-none text-stone-500 md:mb-12 md:text-5xl">
              {sectionTitle}
            </h2>
            <p className="mb-4 text-sm font-medium text-zinc-500 md:mb-0">
              홈<span className="ml-3 border-l border-zinc-300 pl-3">{sectionTitle}</span>
            </p>
          </div>

          <ul className="flex w-full justify-around overflow-x-auto font-medium">
            {tabs.map((t) => (
              <li key={t.to} className="shrink-0">
                <NavLink
                  to={t.to}
                  className={({ isActive }) =>
                    [
                      'block whitespace-nowrap border-b-2 px-4 py-5 transition md:px-10 md:py-7',
                      isActive
                        ? 'border-brand text-brand'
                        : 'border-transparent text-neutral-700 hover:text-brand',
                    ].join(' ')
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 페이지헤드 이미지 */}
      <Placeholder label={`PAGE HEAD — ${headLabel}`} ratio="32/9" />

      {/* 본문 */}
      <div className="border-b border-neutral-200 py-16 md:py-24">{children}</div>
    </div>
  )
}
