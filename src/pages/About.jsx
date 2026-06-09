import { Link } from 'react-router-dom'
import { site, faqs } from '../data/site'
import { useState } from 'react'

const timeline = [
  { year: '2024', text: '홈글리시 서비스 기획 시작' },
  { year: '2025', text: '임팩트닷 커리어 프로젝트 선정' },
  { year: '2025', text: '하나소셜유니버시티 협력' },
  { year: '2026', text: '홈글리시 플랫폼 정식 오픈' },
]

export default function About() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      {/* 배너 */}
      <div className="bg-brand dark:bg-brand-dark py-16 md:py-24 transition-colors">
        <div className="max-w-container mx-auto section-x text-white">
          <nav className="text-xs text-white/50 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:underline">홈</Link>
            <span>›</span>
            <span>홈글리시 소개</span>
          </nav>
          <p className="text-palette-yellow text-sm font-bold tracking-widest uppercase mb-3">About</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            홈글리시 소개
          </h1>
          <p className="text-white/80 max-w-2xl text-base md:text-lg leading-relaxed">
            {site.description}
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto section-x py-16 md:py-24">

        {/* 서비스 소개 */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-6">
            홈글리시는 어떤 플랫폼인가요?
          </h2>
          <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed text-base md:text-lg">
            <p>
              홈글리시는 <strong className="text-brand dark:text-brand-light">부모와 아이가 함께하는 영어 가정학습의 모든 것</strong>을 담은 플랫폼입니다.
            </p>
            <p>
              검증된 영어 자료, 선배맘 노하우, 레벨별 가이드를 한 곳에 모아 <strong className="text-brand dark:text-brand-light">사교육비 부담 없이도 영어 학습을 지속</strong>할 수 있게 도와줍니다.
            </p>
            <p>
              영어 가정학습을 먼저 실천한 선배맘들의 실제 경험담을 콘텐츠 후기로 확인하고, 우리 아이에게 맞는 자료와 학습법을 찾아보세요.
            </p>
          </div>
        </div>

        {/* 10분의 1 프로젝트 */}
        <div className="bg-brand dark:bg-brand-dark rounded-3xl p-8 md:p-12 mb-20 transition-colors">
          <p className="text-palette-yellow text-xs font-bold tracking-widest uppercase mb-3">
            임팩트닷 커리어 프로젝트 선정
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            10분의 1 프로젝트
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
            {site.mission}
          </p>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl">
            사교육비 부담 없이 가정에서도 영어를 완성할 수 있다는 믿음으로 시작했습니다.
            선배맘들의 노하우가 쌓이면 더 많은 가정이 혜택을 받을 수 있어요.
          </p>
          {timeline.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeline.map((t) => (
                <div key={t.text} className="bg-white/10 rounded-xl p-4">
                  <p className="text-palette-yellow font-black text-sm mb-1">{t.year}</p>
                  <p className="text-white/80 text-xs leading-snug">{t.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 이런 분들에게 */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-8">
            이런 가정에 잘 맞아요
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: '👩‍👧', text: '아이에게 영어를 집에서 가르쳐보고 싶은 부모' },
              { emoji: '💰', text: '사교육비 부담을 줄이고 싶은 가정' },
              { emoji: '🤔', text: '정보는 많지만 무엇부터 해야 할지 몰라 헤매는 부모' },
              { emoji: '🎯', text: '아이 수준에 맞는 자료와 학습 방법을 찾고 싶은 가정' },
            ].map((item) => (
              <div key={item.text} className="card p-5 flex items-center gap-4">
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <p className="text-neutral-700 dark:text-neutral-200 font-medium text-sm md:text-base leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-8">
            자주 묻는 질문
          </h2>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition text-sm md:text-base"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-brand dark:text-brand-light font-black text-xs">Q</span>
                    {faq.q}
                  </span>
                  <span className={`text-neutral-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 pt-1 bg-bg dark:bg-bg-dark text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed border-t border-neutral-100 dark:border-neutral-700">
                    <span className="text-brand dark:text-brand-light font-black text-xs mr-3">A</span>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-400 dark:text-neutral-500">
            더 궁금한 점은{' '}
            <a href={`mailto:${site.contact.email}`} className="text-brand dark:text-brand-light font-semibold hover:underline">
              {site.contact.email}
            </a>
            로 문의해 주세요.
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/contents/all"
            className="inline-flex items-center gap-2 bg-brand dark:bg-brand-light text-white dark:text-bg-dark font-bold px-8 py-4 rounded-full hover:opacity-90 transition shadow-lg text-base"
          >
            콘텐츠 둘러보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}
