import { Link } from 'react-router-dom'
import { site, categories, types } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-brand dark:bg-brand-dark transition-colors">
      {/* 상단 링크 영역 */}
      <div className="max-w-container mx-auto section-x py-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 로고 + 소개 */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="/rest04/homeglish_logo_kr.png"
                alt={`${site.nameKo} ${site.name}`}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {site.description}
            </p>
          </div>

          {/* 주제별 */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">주제별</p>
            <ul className="space-y-2">
              {Object.entries(categories).map(([key, cat]) => (
                <li key={key}>
                  <Link
                    to={`/contents/${key}`}
                    className="text-sm text-white/70 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span className="text-base">{cat.emoji}</span>
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 유형별 */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">유형별</p>
            <ul className="space-y-2">
              {Object.entries(types).map(([key, t]) => (
                <li key={key}>
                  <Link
                    to={`/types/${key}`}
                    className="text-sm text-white/70 hover:text-white transition flex items-center gap-1.5"
                  >
                    <span className="text-base">{t.emoji}</span>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 소개 */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">안내</p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-white/70 hover:text-white transition">
                  사이트 소개
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-sm text-white/70 hover:text-white transition">
                  이용안내
                </Link>
              </li>
              {site.contact.youtube !== '#' && (
                <li>
                  <a
                    href={site.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition flex items-center gap-1.5"
                  >
                    ▶ 유튜브 채널
                  </a>
                </li>
              )}
              {site.contact.instagram !== '#' && (
                <li>
                  <a
                    href={site.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition flex items-center gap-1.5"
                  >
                    📷 인스타그램
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div className="max-w-container mx-auto section-x py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <ul className="flex gap-4 flex-wrap justify-center">
            {site.footerLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={[
                    'text-xs transition',
                    l.strong
                      ? 'font-medium text-white/80 hover:text-white'
                      : 'text-white/40 hover:text-white/70',
                  ].join(' ')}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/30">{site.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
