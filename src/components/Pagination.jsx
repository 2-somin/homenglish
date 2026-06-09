export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // 표시할 페이지 번호 슬라이스 (최대 5개)
  let start = Math.max(1, page - 2)
  let end = Math.min(totalPages, start + 4)
  if (end - start < 4) start = Math.max(1, end - 4)
  const visiblePages = pages.slice(start - 1, end)

  return (
    <nav aria-label="페이지 네비게이션" className="flex items-center justify-center gap-1 mt-12 flex-wrap">
      <PageBtn
        label="처음"
        disabled={page === 1}
        onClick={() => onChange(1)}
        aria="첫 페이지"
      />
      <PageBtn
        label="‹"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria="이전 페이지"
      />

      {start > 1 && (
        <>
          <PageBtn label="1" onClick={() => onChange(1)} active={page === 1} />
          {start > 2 && <span className="px-2 text-neutral-400 dark:text-neutral-500">…</span>}
        </>
      )}

      {visiblePages.map((p) => (
        <PageBtn
          key={p}
          label={String(p)}
          active={p === page}
          onClick={() => onChange(p)}
        />
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-neutral-400 dark:text-neutral-500">…</span>
          )}
          <PageBtn
            label={String(totalPages)}
            onClick={() => onChange(totalPages)}
            active={page === totalPages}
          />
        </>
      )}

      <PageBtn
        label="›"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria="다음 페이지"
      />
      <PageBtn
        label="마지막"
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
        aria="마지막 페이지"
      />
    </nav>
  )
}

function PageBtn({ label, active, disabled, onClick, aria }) {
  return (
    <button
      type="button"
      aria-label={aria || `${label} 페이지`}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={[
        'min-w-[36px] h-9 px-2 text-sm font-semibold rounded-lg transition',
        active
          ? 'bg-brand text-white dark:bg-brand-light dark:text-bg-dark'
          : disabled
          ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
          : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
