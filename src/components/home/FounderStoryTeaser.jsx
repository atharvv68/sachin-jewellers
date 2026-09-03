import { Link } from 'react-router-dom'
import sjMonogram from '../../assets/sj-monogram-only.png'
import { BUSINESS, WHATSAPP_NUMBER } from '../../shopConfig.js'
import FadeSection from '../common/FadeSection.jsx'

export default function FounderStoryTeaser({ lang = 'en' }) {
  const isHi = lang === 'hi'

  const consultWaMsg = isHi
    ? 'नमस्ते सचिन जी! मैं आपसे व्यक्तिगत रत्न एवं ज्योतिषीय परामर्श के लिए समय लेना चाहता/चाहती हूँ।'
    : 'Namaste Sachin ji! I would like to schedule a personal gemstone & astrological consultation with you.'
  const consultWaHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    consultWaMsg,
  )}`

  return (
    <FadeSection id="founder-story" className="section founder-teaser-section">
      <div className="container">
        <div className="founder-teaser-card">
          <div className="founder-teaser-grid">
            <div className="founder-teaser-visual">
              <div className="founder-avatar-frame">
                <img
                  src={sjMonogram}
                  alt={BUSINESS.proprietor}
                  className="founder-avatar-img"
                />
                <div className="founder-exp-badge">
                  <span className="exp-num">15+</span>
                  <span className="exp-label">{isHi ? 'वर्ष अनुभव' : 'Years Heritage'}</span>
                </div>
              </div>
            </div>

            <div className="founder-teaser-body">
              <span className="section-kicker">✦ THE MASTER GEMOLOGIST ✦</span>
              <h2 className="founder-teaser-name">{BUSINESS.proprietor}</h2>
              <p className="founder-teaser-title">
                {isHi
                  ? 'संस्थापक एवं वैदिक रत्न विशेषज्ञ · देहरादून धरोहर'
                  : 'Founder & Certified Vedic Gemologist · Dehradun'}
              </p>

              <blockquote className="founder-teaser-quote">
                &ldquo;
                {isHi
                  ? 'रत्न केवल आभूषण नहीं हैं, ये ब्रह्मांडीय ऊर्जा के संवाहक हैं। सही वजन, शुद्धता और वैदिक विधि से धारण किया गया रत्न जीवन की दिशा बदल सकता है।'
                  : 'A gemstone is not merely an ornament; it is a conduit of planetary resonance. When selected with authentic purity and consecrated properly, it unlocks profound harmony and success.'}
                &rdquo;
              </blockquote>

              <p className="founder-teaser-text">
                {isHi
                  ? 'पल्टन बाजार / सराफा मार्केट, देहरादून में स्थित सचिन ज्वैलर्स 15 से अधिक वर्षों से उत्तर भारत भर में शुद्ध, अप्रसंस्कृत एवं लैब-प्रमाणित रत्नों के लिए जाना जाता है।'
                  : 'Located in the historic Paltan Bazaar / Sarafa Market of Dehradun, Sachin Jewellers has served thousands of families across North India with ethically sourced, unheated natural gemstones and genuine Nepali Rudraksha.'}
              </p>

              <div className="founder-teaser-actions">
                <Link to="/about" className="btn btn-solid founder-read-btn">
                  <span>{isHi ? 'पूरी कहानी पढ़ें' : 'Read Our Full Story'}</span>
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
                  href={consultWaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn whatsapp-btn founder-wa-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                    />
                  </svg>
                  <span>{isHi ? 'परामर्श हेतु संपर्क करें' : 'Direct Consultation'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  )
}
