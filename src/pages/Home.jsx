import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contents, categories, faqs, site } from '../data/site'
import ContentCard from '../components/ContentCard'

// ── 히어로 ────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand dark:bg-brand-dark min-h-[420px] md:min-h-[500px] flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-palette-blue/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-palette-mint/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-container mx-auto section-x py-20 md:py-28">
        <p className="text-palette-yellow text-sm md:text-base font-bold tracking-widest uppercase mb-4">
          엄마표 영어 · 가정학습 커뮤니티
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
          가정 영어 학습의 첫 걸음,<br />
          <span className="text-palette-yellow">홈글리시</span>
        </h1>
        <p className="text-white/80 text-base md:text-xl max-w-xl mb-10 leading-relaxed">
          영어 가정학습 선배맘과 후배맘의<br className="hidden md:block" />
          상부상조 커뮤니티 플랫폼
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contents/all"
            className="inline-flex items-center gap-2 bg-palette-yellow text-brand font-bold px-6 py-3.5 rounded-full hover:bg-white transition shadow-lg text-sm md:text-base"
          >
            콘텐츠 둘러보기 →
          </Link>
          <Link
            to="/level-test"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-white/20 transition text-sm md:text-base"
          >
            📊 레벨테스트
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── 홈글리시 소개 ─────────────────────────────────────────
function Intro() {
  const features = [
    {
      emoji: '📚',
      title: '검증된 영어 자료',
      desc: '선배맘들이 직접 써본 교재와 앱을 엄선해 소개합니다.',
      color: 'bg-palette-mint',
    },
    {
      emoji: '👩‍👧',
      title: '선배맘 노하우',
      desc: '엄마표 영어를 성공적으로 실천한 부모들의 실제 후기를 확인하세요.',
      color: 'bg-palette-yellow',
    },
    {
      emoji: '📊',
      title: '레벨별 가이드',
      desc: '아이 수준에 맞는 자료와 학습 순서를 단계별로 안내합니다.',
      color: 'bg-palette-blue',
    },
    {
      emoji: '💰',
      title: '사교육비 절감',
      desc: '10분의 1 프로젝트 — 사교육비 부담 없이 가정에서 영어를 완성합니다.',
      color: 'bg-palette-peach',
    },
  ]

  return (
    <section className="max-w-container mx-auto section-x py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-brand dark:text-brand-light text-sm font-bold tracking-widest uppercase mb-3">
            영어 가정학습, 홈글리시가 함께해요
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-800 dark:text-neutral-100 leading-snug mb-6">
            홈글리시는 부모와 아이가<br />
            함께하는{' '}
            <span className="text-brand dark:text-brand-light">영어 가정학습의<br />모든 것</span>을 담은 플랫폼입니다.
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base leading-relaxed mb-8">
            사교육비 걱정 없이, 집에서도 충분히 영어를 잘 할 수 있어요.
            홈글리시에서 우리 아이에게 딱 맞는 콘텐츠를 찾아보세요.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-brand dark:text-brand-light font-semibold hover:underline"
          >
            홈글리시 더 알아보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card p-5">
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center text-2xl mb-3`}>
                {f.emoji}
              </div>
              <h3 className="font-bold text-neutral-800 dark:text-neutral-100 text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 선호도 Top 10 ─────────────────────────────────────────
function Top10() {
  const featured = contents.filter((c) => c.featured).slice(0, 6)

  return (
    <section className="bg-surface-2 dark:bg-surface-2dark transition-colors py-16 md:py-24">
      <div className="max-w-container mx-auto section-x">
        <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
          <div>
            <p className="text-brand dark:text-brand-light text-sm font-bold tracking-widest uppercase mb-2">
              홈글리시 Pick
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100">
              선호도가 높은 콘텐츠 Top 10
            </h2>
          </div>
          <Link
            to="/contents/all"
            className="text-sm font-semibold text-brand dark:text-brand-light hover:underline"
          >
            전체 콘텐츠 보기 →
          </Link>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
          홈글리시 내에서 학부모님들에게 선호가 가장 높은 콘텐츠들입니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item, i) => (
            <div key={item.id} className="relative">
              {i < 3 && (
                <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-brand dark:bg-brand-light text-white dark:text-bg-dark rounded-full flex items-center justify-center text-xs font-black shadow">
                  {i + 1}
                </div>
              )}
              <ContentCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 카테고리 탐색 ─────────────────────────────────────────
function CategoryBrowse() {
  const cats = Object.entries(categories).filter(([k]) => k !== 'all')
  const colorBg = {
    peach: 'bg-palette-peach hover:bg-palette-hover-peach',
    yellow: 'bg-palette-yellow hover:bg-palette-hover-yellow',
    mint: 'bg-palette-mint hover:bg-palette-hover-mint',
    blue: 'bg-palette-blue hover:bg-palette-hover-blue',
  }

  return (
    <section className="max-w-container mx-auto section-x py-16 md:py-24">
      <p className="text-brand dark:text-brand-light text-sm font-bold tracking-widest uppercase mb-2">
        학습 주제별 탐색
      </p>
      <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-2">
        다양한 학습 소스를 검색해보세요
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
        리딩, 문법, 어휘, 파닉스 등 원하는 주제를 선택해 우리 아이에게 맞는 교재를 찾아보세요.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {cats.map(([key, cat]) => (
          <Link
            key={key}
            to={`/contents/${key}`}
            className={[
              'flex flex-col items-center gap-2 p-4 rounded-2xl transition font-semibold text-neutral-800 shadow-sm',
              colorBg[cat.color] || 'bg-palette-blue hover:bg-palette-hover-blue',
            ].join(' ')}
          >
            <span className="text-3xl">{cat.emoji}</span>
            <span className="text-xs md:text-sm text-center leading-tight">{cat.label}</span>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          to="/contents/all"
          className="inline-flex items-center gap-2 bg-brand dark:bg-brand-light text-white dark:text-bg-dark font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition shadow text-sm md:text-base"
        >
          전체 콘텐츠 보기 →
        </Link>
      </div>
    </section>
  )
}

// ── 10분의 1 프로젝트 ────────────────────────────────────
function MissionBand() {
  return (
    <section className="bg-brand dark:bg-brand-dark py-16 md:py-24 transition-colors">
      <div className="max-w-container mx-auto section-x">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-palette-yellow text-sm font-bold tracking-widest uppercase mb-4">
              임팩트닷 커리어 프로젝트 선정
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-snug mb-6">
              10분의 1 프로젝트
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-6">
              {site.mission}
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              영어 가정학습 선배맘과 후배맘의 상부상조 커뮤니티 플랫폼을 만들기 위해 노력해왔어요.
              여러분의 경험이 쌓여 더 많은 가정이 사교육 없이도 영어를 완성할 수 있게 됩니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '이런 가정에 잘 맞아요', emoji: '✅', items: ['아이에게 집에서 영어를 가르쳐보고 싶은 부모', '사교육비 부담을 줄이고 싶은 가정', '뭐부터 해야 할지 몰라 헤매는 부모', '아이 수준에 맞는 자료를 찾고 싶은 가정'] }
            ].map((section) => (
              <div key={section.label} className="col-span-2 bg-white/10 rounded-2xl p-6">
                <p className="text-palette-yellow font-bold text-sm mb-4">{section.emoji} {section.label}</p>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                      <span className="text-palette-mint mt-0.5 shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 후기 작성 CTA ─────────────────────────────────────────
function ReviewCTA() {
  return (
    <section className="bg-surface-2 dark:bg-surface-2dark py-16 md:py-20 transition-colors">
      <div className="max-w-container mx-auto section-x text-center">
        <p className="text-4xl mb-4">☕</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-3">
          이젠, 여러분의 학습 경험을 들려주세요
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-2 text-sm md:text-base max-w-lg mx-auto">
          학습 경험을 남기신 분들 중 매달 3분께 커피쿠폰을 보내드려요.
        </p>
        <p className="text-neutral-400 dark:text-neutral-500 text-sm mb-8">
          써주신 후기는 확인 후 등록될 예정입니다. 소중한 의견 주셔서 감사합니다.
        </p>
        <a
          href={site.contact.notion}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand dark:bg-brand-light text-white dark:text-bg-dark font-bold px-8 py-4 rounded-full hover:opacity-90 transition shadow-lg text-sm md:text-base"
        >
          📝 후기 작성하기
        </a>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="max-w-container mx-auto section-x py-16 md:py-24">
      <p className="text-brand dark:text-brand-light text-sm font-bold tracking-widest uppercase mb-2">
        자주 묻는 질문
      </p>
      <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-3">
        홈글리시에 대해 궁금한 게 있으신가요?
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
        홈글리시는 이용자분들이 가장 많이 물어보시는 질문과 답변을 한곳에 모았습니다.
      </p>

      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden transition-colors"
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
              <span className={`text-neutral-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}>
                ▾
              </span>
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

      <p className="mt-8 text-sm text-neutral-400 dark:text-neutral-500">
        더 자세한 문의나 FAQ에서 다루지 않은 내용이 있다면{' '}
        <a
          href={`mailto:${site.contact.email}`}
          className="text-brand dark:text-brand-light font-semibold hover:underline"
        >
          {site.contact.email}
        </a>
        {' '}로 편하게 연락 주세요.
      </p>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Top10 />
      <CategoryBrowse />
      <MissionBand />
      <ReviewCTA />
      <FAQ />
    </>
  )
}
