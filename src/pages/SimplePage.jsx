import { Link } from 'react-router-dom'

export default function SimplePage({ title }) {
  return (
    <div className="max-w-container mx-auto section-x py-24 text-center">
      <p className="text-6xl mb-6">📄</p>
      <h1 className="text-3xl font-semibold text-brand dark:text-brand-light mb-4">{title}</h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        이 페이지는 준비 중입니다.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-brand dark:bg-brand-light text-white dark:text-bg-dark font-medium px-6 py-3 rounded-full hover:opacity-90 transition"
      >
        홈으로 돌아가기 →
      </Link>
    </div>
  )
}
