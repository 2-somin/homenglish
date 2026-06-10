import { Link } from 'react-router-dom'
import { categories, grades } from '../data/site'

export default function ContentCard({ item }) {
  const cat = categories[item.category]
  const grade = grades[item.grade] || grades.all
  const gradeLabel = item.gradeShort || grade.label

  return (
    <Link
      to={`/content/${item.id}`}
      className="card group flex flex-col overflow-hidden"
    >
      {/* 썸네일 */}
      <div className="relative h-44 sm:h-48 overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl transition-transform duration-300 group-hover:scale-105 bg-bg dark:bg-brand/20">
            {cat?.emoji || '📚'}
          </div>
        )}

        {/* 상단 우측: 무료/유료 + 카테고리 — 가로 배열 */}
        <div className="absolute top-3 right-3 flex flex-row items-center gap-1.5">
          {item.types.includes('free') && (
            <span className="badge badge-free text-[11px]">무료</span>
          )}
          {item.types.includes('paid') && (
            <span className="badge badge-paid text-[11px]">유료</span>
          )}
          <span className="text-xs font-medium bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 px-2 py-1 rounded-full">
            {cat?.emoji} {cat?.label}
          </span>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-medium leading-snug text-neutral-800 dark:text-neutral-100 line-clamp-2 mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* 하단 좌측: 학년 칩 */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {gradeLabel && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${grade.color}`}>
              {gradeLabel}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pb-3">
        <span className="text-xs text-brand dark:text-brand-light font-semibold flex items-center gap-1">
          <span>📋</span> 자세히 보기 →
        </span>
      </div>
    </Link>
  )
}
