import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { contents, categories, types } from '../data/site'
import ContentCard from '../components/ContentCard'
import Pagination from '../components/Pagination'

const PER_PAGE = 9

// 카테고리 탭 순서
const catOrder = ['all', 'speaking', 'listening', 'reading', 'writing', 'vocabulary', 'grammar']

// 유형 탭 순서
const typeOrder = ['free', 'paid', 'video', 'worksheet', 'app', 'book']

export default function Contents({ mode }) {
  const { category, type } = useParams()
  const [typeFilter, setTypeFilter] = useState('all')
  const [page, setPage] = useState(1)

  // mode 또는 파라미터가 바뀌면 페이지, 타입 필터 초기화
  useEffect(() => {
    setPage(1)
    setTypeFilter('all')
  }, [category, type, mode])

  // 현재 필터링된 콘텐츠
  const filtered = useMemo(() => {
    let list = contents

    if (mode === 'category' && category && category !== 'all') {
      list = list.filter((c) => c.category === category)
    }

    if (mode === 'type' && type) {
      list = list.filter((c) => c.types.includes(type))
    }

    if (typeFilter !== 'all') {
      list = list.filter((c) => c.types.includes(typeFilter))
    }

    return list
  }, [category, type, mode, typeFilter])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // 현재 페이지의 타이틀 정보
  const pageTitle =
    mode === 'category'
      ? categories[category] || categories.all
      : types[type]

  const pageLabelCat = mode === 'category' ? (category || 'all') : null
  const pageLabelType = mode === 'type' ? type : null

  const colorBg = {
    peach: 'bg-palette-peach',
    yellow: 'bg-palette-yellow',
    mint: 'bg-palette-mint',
    blue: 'bg-palette-blue',
  }

  const bannerColor =
    mode === 'category'
      ? colorBg[(categories[category] || categories.all).color] || 'bg-palette-blue'
      : 'bg-palette-blue'

  return (
    <div>
      {/* 페이지 배너 */}
      <div className={`${bannerColor} dark:opacity-90`}>
        <div className="max-w-container mx-auto section-x py-10 md:py-14">
          <nav className="text-xs text-neutral-700 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:underline font-medium">홈</Link>
            <span>›</span>
            {mode === 'category' ? (
              <>
                <Link to="/contents/all" className="hover:underline font-medium">주제별 콘텐츠</Link>
                {category && category !== 'all' && (
                  <>
                    <span>›</span>
                    <span className="font-bold">{categories[category]?.label}</span>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/types/free" className="hover:underline font-medium">유형별 콘텐츠</Link>
                <span>›</span>
                <span className="font-bold">{types[type]?.label}</span>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-5xl">
              {mode === 'category'
                ? (categories[category] || categories.all).emoji
                : types[type]?.emoji}
            </span>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-800 leading-tight">
                {mode === 'category'
                  ? (categories[category] || categories.all).label
                  : `${types[type]?.label} 콘텐츠`}
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                {mode === 'category'
                  ? (categories[category] || categories.all).desc
                  : `${types[type]?.label} 형태의 모든 영어 교육 콘텐츠`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto section-x py-10 md:py-14">
        {/* 주제별 탭 (category 모드일 때) */}
        {mode === 'category' && (
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 w-max">
              {catOrder.map((key) => {
                const cat = categories[key]
                if (!cat) return null
                const isActive = (category || 'all') === key
                return (
                  <Link
                    key={key}
                    to={`/contents/${key}`}
                    className={[
                      'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition border',
                      isActive
                        ? 'bg-brand text-white border-brand dark:bg-brand-light dark:text-bg-dark dark:border-brand-light'
                        : 'bg-white dark:bg-surface-dark text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-brand dark:hover:border-brand-light hover:text-brand dark:hover:text-brand-light',
                    ].join(' ')}
                  >
                    <span>{cat.emoji}</span>
                    {cat.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* 유형별 탭 (type 모드일 때) */}
        {mode === 'type' && (
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 w-max">
              {typeOrder.map((key) => {
                const t = types[key]
                if (!t) return null
                const isActive = (type || 'free') === key
                return (
                  <Link
                    key={key}
                    to={`/types/${key}`}
                    className={[
                      'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition border',
                      isActive
                        ? 'bg-brand text-white border-brand dark:bg-brand-light dark:text-bg-dark dark:border-brand-light'
                        : 'bg-white dark:bg-surface-dark text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-600 hover:border-brand dark:hover:border-brand-light hover:text-brand dark:hover:text-brand-light',
                    ].join(' ')}
                  >
                    <span>{t.emoji}</span>
                    {t.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* 보조 필터: 유형 (category 모드에서만 추가 제공) */}
        {mode === 'category' && (
          <div className="mb-8 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mr-1">
              유형 필터
            </span>
            <button
              type="button"
              onClick={() => { setTypeFilter('all'); setPage(1) }}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-semibold border transition',
                typeFilter === 'all'
                  ? 'bg-brand text-white border-brand dark:bg-brand-light dark:text-bg-dark'
                  : 'bg-white dark:bg-surface-dark text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600 hover:border-brand dark:hover:border-brand-light',
              ].join(' ')}
            >
              전체
            </button>
            {typeOrder.map((key) => {
              const t = types[key]
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setTypeFilter(key); setPage(1) }}
                  className={[
                    'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition',
                    typeFilter === key
                      ? 'bg-brand text-white border-brand dark:bg-brand-light dark:text-bg-dark'
                      : 'bg-white dark:bg-surface-dark text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600 hover:border-brand dark:hover:border-brand-light',
                  ].join(' ')}
                >
                  {t.emoji} {t.label}
                </button>
              )
            })}
          </div>
        )}

        {/* 결과 카운트 */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          총 <strong className="text-brand dark:text-brand-light">{filtered.length}개</strong>의 콘텐츠
          {totalPages > 1 && ` · 페이지 ${page} / ${totalPages}`}
        </p>

        {/* 콘텐츠 그리드 */}
        {paged.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paged.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg font-medium">
              해당 조건의 콘텐츠가 없습니다.
            </p>
            <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-2">
              필터를 변경하거나 다른 주제를 선택해보세요.
            </p>
          </div>
        )}

        {/* 페이지네이션 */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => {
            setPage(p)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </div>
    </div>
  )
}
