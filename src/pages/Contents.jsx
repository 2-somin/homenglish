import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { categories, types } from '../data/site'
import { useSheetData } from '../hooks/useSheetData'
import ContentCard from '../components/ContentCard'
import Pagination from '../components/Pagination'

const PER_PAGE = 9

const catOrder = ['all', 'reading', 'grammar', 'vocabulary', 'listening', 'phonics', 'app']
const typeOrder = ['free', 'paid', 'video', 'worksheet', 'app', 'book']

export default function Contents({ mode }) {
  const { category, type } = useParams()
  const [typeFilter, setTypeFilter] = useState('all')
  const [page, setPage] = useState(1)
  const { contents, loading, error } = useSheetData()

  useEffect(() => {
    setPage(1)
    setTypeFilter('all')
  }, [category, type, mode])

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
  }, [contents, category, type, mode, typeFilter])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

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
      {/* 배너 */}
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
                    <span className="font-medium">{categories[category]?.label}</span>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/types/free" className="hover:underline font-medium">유형별 콘텐츠</Link>
                <span>›</span>
                <span className="font-medium">{types[type]?.label}</span>
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
              <h1 className="text-2xl md:text-4xl font-semibold text-neutral-800 leading-tight">
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
        {/* 카테고리 탭 */}
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

        {/* 유형별 탭 */}
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

        {/* 유형 보조 필터 (카테고리 모드) */}
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
                  : 'bg-white dark:bg-surface-dark text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600 hover:border-brand',
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
                      : 'bg-white dark:bg-surface-dark text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-600 hover:border-brand',
                  ].join(' ')}
                >
                  {t.emoji} {t.label}
                </button>
              )
            })}
          </div>
        )}

        {/* 결과 수 */}
        {!loading && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            총{' '}
            <strong className="text-brand dark:text-brand-light">{filtered.length}개</strong>의
            콘텐츠{totalPages > 1 && ` · 페이지 ${page} / ${totalPages}`}
          </p>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
              <p className="text-neutral-400 text-sm">콘텐츠 불러오는 중...</p>
            </div>
          </div>
        )}

        {/* 에러 */}
        {error && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 text-center">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* 콘텐츠 그리드 */}
        {!loading && !error && paged.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paged.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && !error && paged.length === 0 && (
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
