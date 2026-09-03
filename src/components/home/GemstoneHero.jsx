import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'
import { WHATSAPP_NUMBER } from '../../shopConfig.js'
import GemstoneHeroCanvas from '../gemstone/GemstoneHeroCanvas.jsx'

export default function GemstoneHero({ lang = 'en', t }) {
  const isHi = lang === 'hi'

  const waHeroMsg = isHi
    ? 'नमस्ते सचिन ज्वैलर्स! मैं प्राकृतिक प्रमाणित रत्न व रुद्राक्ष परामर्श बुक करना चाहता/चाहती हूँ।'
    : 'Namaste Sachin Jewellers! I would like to book a certified gemstone & rudraksha consultation with Sachin ji.'
  const waHeroHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waHeroMsg)}`

  return (
    <section className="gemstone-hero-section" id="hero">
      {/* Ambient Gemstone Refraction Canvas in Background */}
      <div className="gemstone-hero-canvas-wrap">
        <GemstoneHeroCanvas />
        <div className="gemstone-hero-radial-vignette" />
      </div>

      <div className="container gemstone-hero-container">
        <div className="gemstone-hero-content">
          {/* Eyebrow badge */}
          <motion.div
            className="gemstone-hero-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="hero-eyebrow-icon">✦</span>
            <span>{t.hero.eyebrow}</span>
            <span className="hero-eyebrow-icon">✦</span>
          </motion.div>

          {/* Main Hero Title */}
          <motion.h1
            className="gemstone-hero-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            {t.hero.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="gemstone-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            {t.hero.tagline}
          </motion.p>

          {/* Trust Highlights Badges */}
          <motion.div
            className="hero-trust-pills"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            <span className="trust-pill">
              <span className="pill-dot">💎</span>
              {isHi ? '100% लैब प्रमाणित रत्न' : '100% Lab Certified'}
            </span>
            <span className="trust-pill">
              <span className="pill-dot">📿</span>
              {isHi ? 'सिद्ध नेपाली रुद्राक्ष' : 'Authentic Nepali Rudraksha'}
            </span>
            <span className="trust-pill">
              <span className="pill-dot">📜</span>
              {isHi ? 'वैदिक ज्योतिषीय परामर्श' : 'Vedic Astrological Guidance'}
            </span>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            className="gemstone-hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          >
            {/* Primary CTA: Explore Gemstones */}
            <Link
              to="/catalogue?collection=gemstones"
              className="btn btn-solid hero-btn-primary"
            >
              <span>💎 {t.hero.exploreGemstones}</span>
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

            {/* Secondary CTA: Book a Consultation */}
            <a
              href={waHeroHref}
              target="_blank"
              rel="noreferrer"
              className="btn whatsapp-btn hero-btn-secondary"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                />
              </svg>
              <span>{t.hero.bookConsult}</span>
            </a>

            {/* Secondary Direct Link to Rudraksha */}
            <Link
              to="/catalogue?collection=rudraksha"
              className="btn btn-outline hero-btn-rudraksha"
            >
              <span>📿 {t.hero.viewRudraksha}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
