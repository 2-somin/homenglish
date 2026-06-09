import { Link } from 'react-router-dom'
import { site } from '../data/site'

const features = [
  {
    emoji: '🆓',
    title: '무료 콘텐츠 제공',
    desc: '양질의 무료 영어 교육 자료를 엄선하여 소개합니다. 비용 부담 없이 시작하세요.',
    color: 'bg-palette-mint',
  },
  {
    emoji: '📱',
    title: '다양한 유형',
    desc: '영상, 워크시트, 앱, 책 등 아이의 학습 스타일에 맞는 다양한 형태로 제공됩니다.',
    color: 'bg-palette-blue',
  },
  {
    emoji: '🎯',
    title: '주제별 분류',
    desc: '스피킹, 리스닝, 리딩, 라이팅, 단어, 문법으로 체계적으로 분류되어 있습니다.',
    color: 'bg-palette-yellow',
  },
  {
    emoji: '👶',
    title: '연령별 맞춤',
    desc: '유아부터 초등 고학년까지, 아이의 연령과 수준에 맞는 콘텐츠를 찾을 수 있어요.',
    color: 'bg-palette-peach',
  },
  {
    emoji: '📋',
    title: '노션 상세 페이지',
    desc: '각 콘텐츠마다 노션으로 연결되는 상세 안내 페이지가 준비되어 있습니다.',
    color: 'bg-palette-mint',
  },
  {
    emoji: '🔄',
    title: '지속적인 업데이트',
    desc: '새로운 교육 콘텐츠를 꾸준히 추가하고 업데이트합니다.',
    color: 'bg-palette-blue',
  },
]

export default function About() {
  return (
    <div>
      {/* 배너 */}
      <div className="bg-brand dark:bg-brand-dark py-14 md:py-20 transition-colors">
        <div className="max-w-container mx-auto section-x text-white">
          <nav className="text-xs text-white/60 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:underline">홈</Link>
            <span>›</span>
            <span>사이트 소개</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">키즈잉글리시 소개</h1>
          <p className="text-white/80 max-w-2xl text-base md:text-lg leading-relaxed">
            {site.description}
          </p>
        </div>
      </div>

      {/* 소개 본문 */}
      <div className="max-w-container mx-auto section-x py-14 md:py-20">
        {/* 소개 글 */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-6">
            키즈잉글리시는 어떤 곳인가요?
          </h2>
          <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed text-base md:text-lg">
            <p>
              키즈잉글리시는 부모님과 선생님이 아이들의 영어 학습을 위한 <strong className="text-brand dark:text-brand-light">양질의 교육 콘텐츠를 쉽게 찾을 수 있도록</strong> 도와주는 큐레이션 플랫폼입니다.
            </p>
            <p>
              인터넷에는 수많은 영어 교육 자료가 있지만, 아이에게 맞는 자료를 찾는 데 많은 시간이 필요합니다. 키즈잉글리시는 검증된 자료만을 엄선하여 주제별, 유형별, 연령별로 정리해 제공합니다.
            </p>
            <p>
              각 콘텐츠는 노션으로 연결되는 상세 안내 페이지를 통해 자료 소개, 사용 방법, 관련 워크시트 등 풍부한 정보를 확인할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 특징 카드 */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand dark:text-brand-light mb-8">
          주요 특징
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="card p-6 flex gap-4 items-start"
            >
              <div className={`${f.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                {f.emoji}
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 dark:text-neutral-100 mb-1">{f.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 이용 안내 */}
        <div className="bg-surface-2 dark:bg-surface-2dark rounded-2xl p-8 md:p-10 transition-colors">
          <h2 className="text-xl md:text-2xl font-extrabold text-brand dark:text-brand-light mb-6">
            이용 방법
          </h2>
          <ol className="space-y-4">
            {[
              '상단 메뉴에서 "주제별 콘텐츠" 또는 "유형별 콘텐츠"를 선택하세요.',
              '원하는 카테고리나 유형을 선택해 콘텐츠 목록을 확인하세요.',
              '마음에 드는 콘텐츠 카드를 클릭하면 노션 상세 페이지로 이동합니다.',
              '상세 페이지에서 콘텐츠 소개, 이용 방법, 관련 자료를 확인하세요.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-brand dark:bg-brand-light text-white dark:text-bg-dark text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
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
