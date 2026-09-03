import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'
import { OWNER_PHONE_INTL, WHATSAPP_NUMBER } from '../../shopConfig.js'
import sjMonogram from '../../assets/sj-monogram-only.png'

export default function MobileDrawer({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  t,
}) {
  const drawerRef = useRef(null)
  const isHi = lang === 'hi'

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const consultWaMsg = isHi
    ? 'नमस्ते सचिन ज्वैलर्स! मैं रत्न एवं रुद्राक्ष परामर्श बुक करना चाहता/चाहती हूँ।'
    : 'Namaste Sachin Jewellers! I would like to book a gemstone & rudraksha consultation with Sachin ji.'
  const consultWaHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(consultWaMsg)}`

  return (
    <div className="mobile-drawer-root" aria-hidden={!isOpen}>
      {/* Backdrop */}
      <motion.div
        className="mobile-drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <motion.aside
        ref={drawerRef}
        id="mobile-nav-drawer"
        className="mobile-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <Link to="/" className="mobile-drawer-brand" onClick={onClose}>
            <img src={sjMonogram} alt="" className="mobile-drawer-logo" />
            <div className="mobile-drawer-brand-text">
              <span className="mobile-drawer-title">{t.brand}</span>
              <span className="mobile-drawer-tagline">
                {isHi ? 'द हाउस ऑफ फाइन जेमस्टोन्स' : 'THE HOUSE OF FINE GEMSTONES'}
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-drawer-nav">
          <ul className="mobile-drawer-list">
            <li>
              <Link to="/" className="mobile-nav-item" onClick={onClose}>
                <span className="mobile-nav-icon">🏛️</span>
                <span className="mobile-nav-label">{t.nav.home}</span>
              </Link>
            </li>

            {/* Gemstones direct 1-tap link */}
            <li className="mobile-nav-featured-item">
              <Link
                to="/catalogue?collection=gemstones"
                className="mobile-nav-item mobile-nav-gemstones"
                onClick={onClose}
              >
                <span className="mobile-nav-icon">💎</span>
                <div className="mobile-nav-stacked">
                  <span className="mobile-nav-label">{t.nav.gemstones}</span>
                  <span className="mobile-nav-sub">{t.nav.gemstonesDesc}</span>
                </div>
                <span className="mobile-nav-badge">31+ Stones</span>
              </Link>
            </li>

            {/* Rudraksha direct 1-tap link */}
            <li className="mobile-nav-featured-item">
              <Link
                to="/catalogue?collection=rudraksha"
                className="mobile-nav-item mobile-nav-rudraksha"
                onClick={onClose}
              >
                <span className="mobile-nav-icon">📿</span>
                <div className="mobile-nav-stacked">
                  <span className="mobile-nav-label">{t.nav.rudraksha}</span>
                  <span className="mobile-nav-sub">{t.nav.rudrakshaDesc}</span>
                </div>
                <span className="mobile-nav-badge">1–14 Mukhi</span>
              </Link>
            </li>

            <li>
              <Link to="/about" className="mobile-nav-item" onClick={onClose}>
                <span className="mobile-nav-icon">📜</span>
                <span className="mobile-nav-label">{t.nav.about}</span>
              </Link>
            </li>

            <li>
              <a
                href="/#kundali-checker"
                className="mobile-nav-item"
                onClick={onClose}
              >
                <span className="mobile-nav-icon">✨</span>
                <span className="mobile-nav-label">{t.nav.kundali}</span>
              </a>
            </li>

            <li>
              <a
                href="/#enquiry"
                className="mobile-nav-item"
                onClick={onClose}
              >
                <span className="mobile-nav-icon">✉️</span>
                <span className="mobile-nav-label">{t.nav.contact}</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Direct Action Buttons */}
        <div className="mobile-drawer-actions">
          <a
            href={consultWaHref}
            target="_blank"
            rel="noreferrer"
            className="btn whatsapp-btn mobile-drawer-cta"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
              />
            </svg>
            <span>{t.hero.bookConsult}</span>
          </a>

          <a
            href={`tel:+${OWNER_PHONE_INTL}`}
            className="btn btn-outline mobile-drawer-call-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M3 5.5A2.5 2.5 0 0 1 5.5 3h1.8a2 2 0 0 1 2 1.6l.6 3a2 2 0 0 1-.5 1.8l-1.2 1.2a14 14 0 0 0 6 6l1.2-1.2a2 2 0 0 1 1.8-.5l3 .6a2 2 0 0 1 1.6 2v1.8A2.5 2.5 0 0 1 18.5 21 16.5 16.5 0 0 1 3 5.5Z"
              />
            </svg>
            <span>+91 74099 85747</span>
          </a>
        </div>

        {/* Drawer Footer with Language switch and address */}
        <div className="mobile-drawer-footer">
          <div className="mobile-drawer-lang-row">
            <span className="mobile-drawer-lang-label">
              {isHi ? 'भाषा / Language:' : 'Language / भाषा:'}
            </span>
            <button
              type="button"
              className="lang-toggle mobile-lang-toggle"
              onClick={onToggleLang}
              aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
            >
              {t.langName}
            </button>
          </div>
          <p className="mobile-drawer-address">
            Paltan Bazaar / Sarafa Market, Dehradun, Uttarakhand
          </p>
        </div>
      </motion.aside>
    </div>
  )
}
