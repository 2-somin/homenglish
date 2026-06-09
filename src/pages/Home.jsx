import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { contents, categories, types } from '../data/site'
import ContentCard from '../components/ContentCard'

const slides = [
  {
    emoji: '🌟',
    title: '영어가 재밌어지는 곳',
    sub: '아이들을 위한 무료 & 유료 영어교육 콘텐츠를 한눈에!',
    cta: { label: '무료 콘텐츠 보기', to: '/types/free' },
  },
  {
    emoji: '📚',
    title: '주제별로 골라보는 영어 학습',
    sub: '스피킹, 리스닝, 리딩, 라이팅… 우리 아이에게 딱 맞는 콘텐츠를 찾아보세요.',
    cta: { label: '전체 콘텐츠 보기', to: '/contents/all' },
  },
  {
    emoji: '🎧',
    title: '영상·워크시트·앱·책 모두 있어요',
    sub: '다양한 형태의 영어 학습 자료를 유형별로 확인하세요.',
    cta: { label: '유형별 보기', to: '/types/video' },
  },
]

function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[idx]

  return (
    <section className="relative overflow-hidden bg-brand dark:bg-brand-dark min-h-[400px] md:min-h-[480px] flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-palette-blue/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-palette-mint/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-palette-yellow/10 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-container mx-auto section-x py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-white">
          <div className="text-6xl md:text-8xl mb-6">{slide.emoji}</div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            {slide.title}
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-md">
            {slide.sub}
          </p>
          <Link
            to={slide.cta.to}
            className="inline-flex items-center gap-2 bg-white text-brand font-bold px-6 py-3 rounded-full hover:bg-palette-yellow transition shadow-lg text-sm md:text-base"
          >
            {slide.cta.label} →
          </Link>
        </div>

        <div className="flex md:flex-col gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`슬라이드 ${i + 1}`}
              onClick={() => setIdx(i)}
              className={[
                'rounded-full transition-all duration-300 bg-white',
                i === idx
                  ? 'md:h-10 md:w-2.5 h-2.5 w-10 opacity-100'
                  : 'md:h-4 md:w-2.5 h-2.5 w-4 opacity-40',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryLinks() {
  const cats = Object.entries(categories).filter(([k]) => k !== 'all')
  const colorBg = {
    peach: 'bg-palette-peach hover:bg-palette-hover-peach',
    yellow: 'bg-palette-yellow hover:bg-palette-hover-yellow',
    mint: 'bg-palette-mint hover:bg-palette-hover-mint',
    blue: 'bg-palette-blue hover:bg-palette-hover-blue',
  }

  return (
    <section className="max-w-container mx-auto section-x py-14 md:py-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-2">
        주제별로 찾아보세요
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm md:text-base">
        스피킹부터 문법까지, 원하는 영어 학습 주제를 선택하세요.
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
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
    </section>
  )
}

function FeaturedContents() {
  const featured = contents.filter((c) => c.featured).slice(0, 6)

  return (
    <section className="bg-surface-2 dark:bg-surface-2dark py-14 md:py-20 transition-colors">
      <div className="max-w-container mx-auto section-x">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-1">
              추천 콘텐츠
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              엄선한 영어 교육 자료를 먼저 만나보세요.
            </p>
          </div>
          <Link
            to="/contents/all"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand dark:text-brand-light hover:underline"
          >
            전체 콘텐츠 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { label: '전체 콘텐츠', value: `${contents.length}개` },
    { label: '무료 콘텐츠', value: `${contents.filter((c) => c.types.includes('free')).length}개` },
    { label: '학습 주제', value: '6가지' },
    { label: '콘텐츠 유형', value: '6가지' },
  ]

  return (
    <section className="bg-brand dark:bg-brand-dark py-10 transition-colors">
      <div className="max-w-container mx-auto section-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-palette-yellow">{s.value}</p>
              <p className="text-sm text-white/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TypeLinks() {
  const typeList = Object.entries(types)
  const typeCls = {
    free: 'bg-palette-mint text-emerald-800 hover:bg-palette-hover-mint',
    paid: 'bg-palette-peach text-orange-800 hover:bg-palette-hover-peach',
    video: 'bg-palette-yellow text-amber-800 hover:bg-palette-hover-yellow',
    worksheet: 'bg-palette-blue text-blue-800 hover:bg-palette-hover-blue',
    app: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    book: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
  }

  return (
    <section className="max-w-container mx-auto section-x py-14 md:py-20">
      <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-2">
        유형별로 찾아보세요
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm md:text-base">
        무료, 영상, 워크시트, 앱, 책 등 다양한 형태로 제공됩니다.
      </p>
      <div className="flex flex-wrap gap-3">
        {typeList.map(([key, t]) => (
          <Link
            key={key}
            to={`/types/${key}`}
            className={[
              'flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition shadow-sm',
              typeCls[key] || 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
            ].join(' ')}
          >
            <span className="text-base">{t.emoji}</span>
            {t.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryLinks />
      <FeaturedContents />
      <StatsBar />
      <TypeLinks />
    </>
  )
}
