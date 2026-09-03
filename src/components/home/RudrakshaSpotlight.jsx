import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../../shopConfig.js'
import FadeSection from '../common/FadeSection.jsx'

export default function RudrakshaSpotlight({ lang = 'en', t }) {
  const isHi = lang === 'hi'
  const rs = t.rudrakshaSpotlight

  const waRudrakshaMsg = isHi
    ? 'नमस्ते सचिन ज्वैलर्स! मैं अपनी राशि व आवश्यकता अनुसार सिद्ध रुद्राक्ष संयोजन जानना चाहता/चाहती हूँ।'
    : 'Namaste Sachin Jewellers! I would like to enquire about certified 1-14 Mukhi Nepali Rudraksha & Siddh Mala combinations.'
  const waRudrakshaHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    waRudrakshaMsg,
  )}`

  return (
    <FadeSection id="rudraksha-spotlight" className="section rudraksha-spotlight-section">
      <div className="container">
        <div className="rudraksha-spotlight-card">
          <div className="rudraksha-spotlight-glow" />

          <div className="rudraksha-spotlight-grid">
            <div className="rudraksha-spotlight-content">
              <span className="section-kicker">✦ SACRED HIMALAYAN SEEDS ✦</span>
              <h2 className="rudraksha-spotlight-title">{rs.heading}</h2>
              <p className="rudraksha-spotlight-desc">{rs.description}</p>

              <div className="rudraksha-feature-pills">
                <span className="rf-pill">
                  <span className="rf-dot">✓</span>
                  {isHi ? 'नेपाल मूल के 100% प्राकृतिक मनके' : '100% Natural Nepal Origin'}
                </span>
                <span className="rf-pill">
                  <span className="rf-dot">✓</span>
                  {isHi ? '1 से 14 मुखी एवं गौरी शंकर' : '1 to 14 Mukhi & Gauri Shankar'}
                </span>
                <span className="rf-pill">
                  <span className="rf-dot">✓</span>
                  {isHi ? 'शुद्ध चांदी कड़ा व सिद्ध माला' : 'Pure Silver Capped Malas & Kadas'}
                </span>
                <span className="rf-pill">
                  <span className="rf-dot">✓</span>
                  {isHi ? 'प्राण-प्रतिष्ठित एवं वैदिक सिद्ध' : 'Pran-Pratishtha Energised'}
                </span>
              </div>

              <div className="rudraksha-spotlight-actions">
                <Link
                  to="/catalogue?collection=rudraksha"
                  className="btn btn-solid rudraksha-btn-primary"
                >
                  <span>📿 {rs.exploreCta}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <a
                  href={waRudrakshaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn whatsapp-btn rudraksha-btn-secondary"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                    />
                  </svg>
                  <span>{isHi ? 'रुद्राक्ष संयोजन पूछें' : 'Get Custom Mala Advice'}</span>
                </a>
              </div>
            </div>

            <div className="rudraksha-spotlight-visual">
              <div className="rudraksha-bead-visual-card">
                <span className="rudraksha-visual-icon">📿</span>
                <div className="rudraksha-visual-text">
                  <strong>{isHi ? 'सिद्ध माला एवं दुर्लभ मुखी' : 'Siddh Malas & Rare Mukhis'}</strong>
                  <span>{isHi ? 'प्रत्येक मनका लैब टेस्टेड' : 'Individual Certified Beads'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  )
}
