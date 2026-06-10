import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'
import { businessPages, civilProjects } from '../data/site'

// 사업소개 탭 (SubPageLayout 용)
const tabs = [
  { label: '주택사업', to: '/business/housing' },
  { label: '건축사업', to: '/business/building' },
  { label: '토목사업', to: '/business/civil' },
  { label: '플랜트사업', to: '/business/plant' },
  { label: '해외사업', to: '/business/global' },
]

// 카테고리별 실적 데이터 (현재 토목/도로포장만 실제 데이터, 나머지는 placeholder 생성)
function getProjects(category, cat) {
  if (category === 'civil' && cat === '도로/포장') return civilProjects
  // 다른 카테고리는 데모용 플레이스홀더 실적
  return Array.from({ length: 8 }, (_, i) => ({
    title: `${cat} 대표 프로젝트 ${i + 1}`,
    period: `20${10 + i}.01 ~ 20${14 + i}.12`,
  }))
}

export default function Business() {
  const { category } = useParams()
  const meta = businessPages[category]
  const [activeCat, setActiveCat] = useState(0)

  // 카테고리(대탭) 변경 시 소분류 첫번째로 리셋
  useEffect(() => setActiveCat(0), [category])

  if (!meta) return <Navigate to="/business/housing" replace />

  const cat = meta.categories[activeCat]
  const projects = getProjects(category, cat)

  return (
    <SubPageLayout sectionTitle="사업소개" headLabel={meta.headLabel} tabs={tabs}>
      <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
        <h3 className="mb-12 text-3xl font-medium text-brand md:text-4xl">{meta.title}</h3>

        {/* 소분류 탭 버튼 */}
        <div className="mb-16 overflow-x-auto rounded border border-stone-300">
          <ul className="flex w-full">
            {meta.categories.map((c, i) => (
              <li key={c} className="flex-grow border-l border-zinc-300 first:border-l-0">
                <button
                  type="button"
                  onClick={() => setActiveCat(i)}
                  className={[
                    'h-16 w-full whitespace-nowrap px-3.5 text-sm font-medium transition md:text-base',
                    i === activeCat
                      ? 'bg-brand text-white'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50',
                  ].join(' ')}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 실적 그리드 */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-16">
          {projects.map((p, i) => (
            <li key={i}>
              <a href="#" className="group block">
                <div className="overflow-hidden rounded-xl">
                  <Placeholder
                    label="PROJECT"
                    ratio="1/1"
                    className="transition group-hover:scale-105"
                  />
                </div>
                <p className="mt-6 line-clamp-2 text-lg font-medium leading-snug md:text-xl">
                  {p.title}
                </p>
                <p className="mt-3 font-medium text-neutral-500">{p.period}</p>
              </a>
            </li>
          ))}
        </ul>

        {/* 페이지네이션 (데모용 정적) */}
        <div className="mt-20 flex items-center justify-between text-sm">
          <div className="flex gap-2">
            <PagerBtn label="처음" />
            <PagerBtn label="이전" />
          </div>
          <div className="flex items-center font-medium text-neutral-500">
            <span className="rounded-lg border border-neutral-200 px-5 py-1.5 font-medium text-brand">
              1
            </span>
            <em className="mx-2 not-italic">/ 8</em>
          </div>
          <div className="flex gap-2">
            <PagerBtn label="다음" />
            <PagerBtn label="마지막" />
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}

function PagerBtn({ label }) {
  return (
    <button
      type="button"
      className="rounded border border-neutral-200 px-3 py-2 font-medium text-neutral-500 transition hover:bg-neutral-50"
    >
      {label}
    </button>
  )
}
