import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useSheetData } from '../hooks/useSheetData'
import { categories, grades } from '../data/site'

function extractNotionSrc(html) {
  if (!html) return null
  const m = html.match(/src="([^"]+)"/)
  return m ? m[1] : null
}

function PowrComment({ html }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!html || !containerRef.current) return
    const scriptSrc = html.match(/src="([^"]+)"/)
    const divId = html.match(/id="([^"]+)"/)
    const divClass = html.match(/class="([^"]+)"/)
    if (!scriptSrc || !divId) return

    containerRef.current.innerHTML = ''
    const div = document.createElement('div')
    if (divClass) div.className = divClass[1]
    div.id = divId[1]
    containerRef.current.appendChild(div)

    const script = document.createElement('script')
    script.src = scriptSrc[1]
    script.async = true
    containerRef.current.appendChild(script)
  }, [html])

  if (!html) return null
  return <div ref={containerRef} className="min-h-[200px]" />
}

export default function ContentDetail() {
  const { id } = useParams()
  const { contents, loading } = useSheetData()

  const item = contents.find((c) => c.id === id)
  const cat = categories[item?.category]
  const grade = grades[item?.grade] || grades.all
  const notionSrc = extractNotionSrc(item?.notionEmbed)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-400 text-sm">콘텐츠 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-container mx-auto section-x py-20 text-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="text-xl font-medium text-neutral-700 dark:text-neutral-200 mb-3">
          콘텐츠를 찾을 수 없습니다
        </p>
        <Link
          to="/contents/all"
          className="text-brand dark:text-brand-light font-semibold hover:underline"
        >
          ← 콘텐츠 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors">
      {/* 상단 배너 */}
      <div className="bg-brand dark:bg-brand-dark py-10 md:py-14 transition-colors">
        <div className="max-w-container mx-auto section-x">
          <nav className="text-xs text-white/50 mb-5 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="hover:text-white/80 transition">홈</Link>
            <span>›</span>
            <Link to="/contents/all" className="hover:text-white/80 transition">콘텐츠</Link>
            <span>›</span>
            <Link to={`/contents/${item.category}`} className="hover:text-white/80 transition">
              {cat?.label}
            </Link>
            <span>›</span>
            <span className="text-white/70 truncate max-w-[180px]">{item.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shadow-lg shrink-0 border-2 border-white/20"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {item.types.includes('free') && (
                  <span className="badge badge-free text-xs">무료</span>
                )}
                {item.types.includes('paid') && (
                  <span className="badge badge-paid text-xs">유료</span>
                )}
                <span className="text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full font-medium">
                  {cat?.emoji} {cat?.label}
                </span>
                {item.gradeShort && (
                  <span className="text-xs text-white/70 bg-white/10 px-2.5 py-1 rounded-full font-medium">
                    {item.gradeShort}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 leading-tight">
                {item.title}
              </h1>
              {item.description && (
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-container mx-auto section-x py-10 md:py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 좌측: 상세 정보 카드 */}
          <div className="lg:col-span-1 space-y-5">
            <div className="card p-6">
              <h2 className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
                콘텐츠 정보
              </h2>
              <dl className="space-y-3">
                {item.gradeRaw && (
                  <Row label="학년">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${grade.color}`}>
                      {item.gradeRaw}
                    </span>
                  </Row>
                )}
                {item.domainRaw && <Row label="영역">{item.domainRaw}</Row>}
                {item.typeRaw && <Row label="유형">{item.typeRaw}</Row>}
                {item.ar && <Row label="AR 지수">{item.ar}</Row>}
                {item.lexile && <Row label="렉사일 레벨">{item.lexile}</Row>}
                {item.publisher && <Row label="출판사 / 저자">{item.publisher}</Row>}
                {item.rating && item.rating !== 'n/a' && (
                  <Row label="평점">
                    <span className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {item.rating}
                    </span>
                  </Row>
                )}
                {item.price && (
                  <div className="flex justify-between items-center text-sm pt-3 mt-1 border-t border-neutral-100 dark:border-neutral-700">
                    <dt className="text-neutral-500 dark:text-neutral-400">가격</dt>
                    <dd className="font-medium text-brand dark:text-brand-light">{item.price}</dd>
                  </div>
                )}
              </dl>

              {item.purchaseUrl && (
                <a
                  href={item.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 w-full bg-brand dark:bg-brand-light text-white dark:text-bg-dark font-medium py-3 rounded-xl hover:opacity-90 transition text-sm"
                >
                  구매 / 바로가기 →
                </a>
              )}
            </div>

            <Link
              to={`/contents/${item.category}`}
              className="flex items-center gap-1 text-sm text-brand dark:text-brand-light hover:underline"
            >
              ← {cat?.label} 목록으로
            </Link>
          </div>

          {/* 우측: 노션 상세 + 댓글 */}
          <div className="lg:col-span-2 space-y-8">
            {notionSrc ? (
              <div>
                <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
                  상세 정보
                </h2>
                <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm">
                  <iframe
                    src={notionSrc}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    allowFullScreen
                    title={`${item.title} 상세`}
                    className="block w-full"
                  />
                </div>
              </div>
            ) : item.notionUrl ? (
              <div className="card p-8 text-center">
                <p className="text-neutral-400 dark:text-neutral-500 text-sm mb-3">
                  상세 페이지를 준비 중입니다.
                </p>
                <a
                  href={item.notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand dark:text-brand-light font-semibold hover:underline text-sm"
                >
                  📋 노션에서 자세히 보기 →
                </a>
              </div>
            ) : null}

            {item.powrComment && (
              <div>
                <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-100 mb-4">
                  댓글
                </h2>
                <div className="card p-6">
                  <PowrComment html={item.powrComment} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <dt className="text-neutral-500 dark:text-neutral-400 shrink-0">{label}</dt>
      <dd className="text-neutral-800 dark:text-neutral-200 font-medium text-right ml-3">
        {children}
      </dd>
    </div>
  )
}
