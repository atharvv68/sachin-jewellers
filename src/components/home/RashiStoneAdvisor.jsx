import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { RASHIS, RATNA_ADVICE } from '../../data/catalogData.js'
import { OWNER_PHONE_INTL } from '../../shopConfig.js'
import { EASE } from '../../utils/astrologyCalculations.js'
import FadeSection from '../common/FadeSection.jsx'

export default function RashiStoneAdvisor({ lang = 'en', t }) {
  const [selectedRashiKey, setSelectedRashiKey] = useState('mesha')
  const isHi = lang === 'hi'
  const rt = t.ratna

  const currentRashi = RASHIS.find((r) => r.key === selectedRashiKey) || RASHIS[0]
  const advice = RATNA_ADVICE[selectedRashiKey] || RATNA_ADVICE.mesha

  const rashiLabel = `${currentRashi.hi} / ${currentRashi.en} (${currentRashi.zodiac})`
  const stoneName = advice?.stone ? (advice.stone[lang] || advice.stone.en) : ''

  const waMsg = rt.waMessage
    .replace('{rashi}', rashiLabel)
    .replace('{stone}', stoneName)
  const waHref = `https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(waMsg)}`

  return (
    <FadeSection id="rashi-advisor" className="section rashi-advisor-section">
      <div className="section-header-center">
        <span className="section-kicker">✦ VEDIC ASTROLOGICAL GUIDANCE ✦</span>
        <h2>{isHi ? 'अपनी राशि अनुसार उपयुक्त रत्न खोजें' : 'Find Your Vedic Rashi Stone'}</h2>
        <p className="section-subtext">
          {isHi
            ? 'अपनी राशि का चयन करें और जानें आपके लिए सर्वाधिक शुभ रत्न, धातु, धारण करने का दिन एवं उंगली।'
            : 'Select your Moon sign or zodiac to discover your astrologically prescribed primary gemstone, metal, and auspicious day.'}
        </p>
      </div>

      <div className="container">
        <div className="rashi-advisor-grid">
          {/* Left Column: 12 Rashis Grid */}
          <div className="rashi-selector-box">
            <h3 className="rashi-box-title">
              {isHi ? '१२ राशियाँ (Select Rashi)' : 'Select Your Rashi / Sign'}
            </h3>
            <div className="rashi-button-grid">
              {RASHIS.map((r) => {
                const isActive = r.key === selectedRashiKey
                return (
                  <button
                    key={r.key}
                    type="button"
                    className={`rashi-grid-btn ${isActive ? 'rashi-btn-active' : ''}`}
                    onClick={() => setSelectedRashiKey(r.key)}
                  >
                    <span className="rashi-btn-hi">{r.hi}</span>
                    <span className="rashi-btn-en">{r.en}</span>
                    <span className="rashi-btn-zodiac">{r.zodiac}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Advice Card */}
          <div className="rashi-result-box">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRashiKey}
                className="rashi-advice-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <div className="rashi-card-header">
                  <div>
                    <span className="rashi-badge-sign">{currentRashi.zodiac}</span>
                    <h3 className="rashi-active-title">
                      {currentRashi.hi} ({currentRashi.en})
                    </h3>
                  </div>
                  <span className="rashi-gem-icon">💎</span>
                </div>

                <div className="rashi-details-list">
                  <div className="rashi-detail-row">
                    <span className="detail-label">{rt.stone}:</span>
                    <span className="detail-value highlight-gold">{stoneName}</span>
                  </div>
                  <div className="rashi-detail-row">
                    <span className="detail-label">{rt.metal}:</span>
                    <span className="detail-value">{advice.metal[lang] || advice.metal.en}</span>
                  </div>
                  <div className="rashi-detail-row">
                    <span className="detail-label">{rt.day}:</span>
                    <span className="detail-value">{advice.day[lang] || advice.day.en}</span>
                  </div>
                  <div className="rashi-detail-row">
                    <span className="detail-label">{rt.finger}:</span>
                    <span className="detail-value">{advice.finger[lang] || advice.finger.en}</span>
                  </div>
                </div>

                <p className="rashi-disclaimer-note">{rt.disclaimer}</p>

                <div className="rashi-card-actions">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn whatsapp-btn rashi-btn-action"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                      />
                    </svg>
                    <span>{rt.cta}</span>
                  </a>

                  <Link
                    to="/catalogue?collection=gemstones"
                    className="btn btn-outline rashi-btn-browse"
                  >
                    <span>{isHi ? 'रत्न कैटलॉग देखें' : 'View in Catalogue'}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </FadeSection>
  )
}
