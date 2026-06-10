import { useParams, Navigate } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import Placeholder from '../components/Placeholder'

const tabs = [
  { label: '윤리경영', to: '/sustainability/ethical' },
  { label: '안전경영', to: '/sustainability/safety' },
  { label: '품질경영', to: '/sustainability/quality' },
  { label: '사회공헌', to: '/sustainability/csr' },
]

// 페이지별 메타
const pages = {
  ethical: { headLabel: 'Ethical', en: 'Ethical Management', title: '윤리경영' },
  safety: { headLabel: 'Safety', en: 'Safety Management', title: '안전경영' },
  quality: { headLabel: 'Quality', en: 'Quality Management', title: '품질경영' },
  csr: { headLabel: 'CSR', en: 'Social Contribution', title: '사회공헌' },
}

// 품질경영 방침 카드
const qualityPolicies = [
  {
    title: '1. 고객 중심 품질 실현',
    desc: '고객의 요구와 기대를 최우선으로 반영하여 모든 사업 영역에서 최고의 품질을 제공하고 전 임직원은 품질에 대한 책임과 의무를 다하며 고객 감동을 실현한다.',
  },
  {
    title: '2. 품질관리 강화',
    desc: '설계 · 구매 · 시공 · 유지관리 전 과정에서 체계적인 품질경영 시스템을 구축 · 운영하며 지속적인 점검과 개선 활동을 통해 모든 과정에서 품질을 유지·향상시킨다.',
  },
  {
    title: '3. 지속적 혁신 및 기술개발',
    desc: '지속적인 기술혁신과 품질 개선 활동을 통해 시공 과정의 완벽함을 추구하고 하자 없는 무결점 시공으로 고객에게 최고의 가치를 제공한다.',
  },
]

// 인증 현황
const certifications = [
  {
    name: 'ISO 9001',
    items: [
      '(주)한국경영인증원은 한국인정지원센터(KAB)로부터 품질경영체제 인증기관으로 인정 받았습니다. (인정번호:KAB-QC-17)',
      '국제인정협력기구의 국제다자간상호인정협정에 가입된 인정기관에 의해 인정되었습니다.',
      '최초인증일자 : 1998. 11. 27',
      '인증유효일자 : 2028. 5. 5',
    ],
  },
  {
    name: 'ISO 14001',
    items: [
      '(주)한국경영인증원은 한국인정지원센터(KAB)로부터 환경경영체제 인증기관으로 인정 받았습니다. (인정번호:KAB-EC-17)',
      '국제인정협력기구의 국제다자간상호인정협정에 가입된 인정기관에 의해 인정되었습니다.',
      '최초인증일자 : 1999. 11. 5',
      '인증유효일자 : 2028. 5. 5',
    ],
  },
]

function SectionTitle({ children }) {
  return (
    <h3 className="mb-10 flex items-end justify-between border-b-2 border-stone-300 pb-8 text-3xl font-medium text-brand md:text-4xl">
      {children}
    </h3>
  )
}

// 품질경영 본문 (소스 반영)
function QualityContent() {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
        Quality Management
      </p>

      {/* 품질 경영 선언 */}
      <section className="mb-20">
        <SectionTitle>품질 경영 선언</SectionTitle>
        <p className="text-2xl font-medium">“고객감동을 완성하는 최고의 품질”</p>
        <p className="mt-3 text-lg font-medium leading-8 text-neutral-700">
          품질을 기업 경쟁력의 근간으로 인식하고 전 사업 영역에서 최고의 품질을 실현하기 위하여
          설계, 구매, 시공 및 유지관리 전 과정에 걸쳐 체계적인 품질경영시스템을 구축·운영하며,
          지속적인 기술 혁신과 품질 개선 활동을 통해 무결점 시공을 지향하고 고객의 기대를 초과하는
          가치를 제공하기 위해 전 임직원은 품질에 대한 책임과 의무를 다하며 신뢰받는 건설기업으로서의
          역할을 성실히 수행한다.
        </p>
      </section>

      {/* 품질경영방침 */}
      <section className="mb-20">
        <SectionTitle>품질경영방침</SectionTitle>
        <div className="flex flex-wrap gap-6">
          {qualityPolicies.map((p) => (
            <div
              key={p.title}
              className="flex-grow basis-72 rounded-xl bg-neutral-100 p-8 md:p-10"
            >
              <p className="text-xl font-medium">{p.title}</p>
              <p className="mt-3 text-base font-medium leading-8 text-neutral-700">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 인증 현황 */}
      <section>
        <SectionTitle>인증 현황</SectionTitle>
        <div className="flex flex-col gap-12 pb-4">
          {certifications.map((c) => (
            <div key={c.name} className="flex flex-col gap-8 md:flex-row md:gap-14">
              <div className="w-56 shrink-0">
                <Placeholder label={`인증서 — ${c.name}`} ratio="7/10" />
              </div>
              <div className="flex flex-col justify-center gap-5">
                <p className="text-2xl font-medium">{c.name}</p>
                <ul className="flex flex-col gap-2.5 text-base font-medium leading-7 text-neutral-700 md:text-lg">
                  {c.items.map((it, i) => (
                    <li key={i} className="pl-2">
                      · {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// 기타 탭은 공통 placeholder 본문
function GenericContent({ meta }) {
  return (
    <div className="mx-auto max-w-container px-4 md:px-10 lg:px-40">
      <p className="mb-16 text-5xl font-semibold leading-none text-brand md:text-7xl">
        {meta.en}
      </p>
      <SectionTitle>{meta.title}</SectionTitle>
      <p className="text-lg font-medium leading-8 text-neutral-700">
        {meta.title} 관련 콘텐츠가 들어갈 영역입니다. 사이트 운영 시 실제 내용으로 교체하세요.
      </p>
      <div className="mt-10">
        <Placeholder label={`${meta.title} CONTENT`} ratio="21/9" rounded />
      </div>
    </div>
  )
}

export default function Sustainability() {
  const { tab } = useParams()
  const meta = pages[tab]
  if (!meta) return <Navigate to="/sustainability/ethical" replace />

  return (
    <SubPageLayout sectionTitle="지속가능경영" headLabel={meta.headLabel} tabs={tabs}>
      {tab === 'quality' ? <QualityContent /> : <GenericContent meta={meta} />}
    </SubPageLayout>
  )
}
