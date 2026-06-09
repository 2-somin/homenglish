import { categories, types, grades } from '../data/site'

const colorMap = {
  peach: 'bg-palette-peach',
  yellow: 'bg-palette-yellow',
  mint: 'bg-palette-mint',
  blue: 'bg-palette-blue',
}

export default function ContentCard({ item }) {
  const cat = categories[item.category]
  const grade = grades[item.grade] || grades.all

  const handleClick = () => {
    if (item.notion && item.notion !== '#') {
      window.open(item.notion, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <article
      onClick={handleClick}
      className={[
        'card group flex flex-col overflow-hidden cursor-pointer',
        item.notion === '#' ? 'cursor-default' : 'cursor-pointer',
      ].join(' ')}
      role={item.notion !== '#' ? 'link' : undefined}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* 썸네일 */}
      <div
        className={[
          'relative h-44 sm:h-48 flex items-center justify-center text-6xl shrink-0 transition-transform duration-300 group-hover:scale-105',
          colorMap[item.color] || 'bg-palette-blue',
        ].join(' ')}
      >
        <span role="img" aria-label={item.title} className="select-none drop-shadow-sm">
          {item.emoji}
        </span>

        {/* 상단 우측: 무료/유료 + 카테고리 */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {item.types.includes('free') && (
            <span className="badge badge-free text-[11px]">무료</span>
          )}
          {item.types.includes('paid') && (
            <span className="badge badge-paid text-[11px]">유료</span>
          )}
          <span className="text-xs font-bold bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 px-2 py-1 rounded-full">
            {cat?.emoji} {cat?.label}
          </span>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold leading-snug text-neutral-800 dark:text-neutral-100 line-clamp-2 mb-2 group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* 하단 좌측: 유형 태그 + 연령 모두 왼쪽 정렬 */}
        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
          {item.types
            .filter((t) => t !== 'free' && t !== 'paid')
            .slice(0, 2)
            .map((t) => {
              const meta = types[t]
              return (
                <span key={t} className={`badge ${meta?.badgeClass || ''} text-[10px]`}>
                  {meta?.emoji} {meta?.label}
                </span>
              )
            })}
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${grade.color}`}>
            {grade.label}
          </span>
        </div>
      </div>

      {/* 노션 링크 표시 */}
      {item.notion !== '#' && (
        <div className="px-4 pb-3">
          <span className="text-xs text-brand dark:text-brand-light font-semibold flex items-center gap-1">
            <span>📋</span> 자세히 보기 →
          </span>
        </div>
      )}
    </article>
  )
}
