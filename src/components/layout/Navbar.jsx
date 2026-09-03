import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'
import sjMonogram from '../../assets/sj-monogram-only.png'
import MobileDrawer from './MobileDrawer.jsx'

export default function Navbar({
  cartCount = 0,
  lang = 'en',
  onToggleLang,
  t,
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [catalogueDropdownOpen, setCatalogueDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownTimeoutRef = useRef(null)
  const location = useLocation()

  const isHi = lang === 'hi'

  // Detect scroll for header backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [prevLoc, setPrevLoc] = useState(location.key)
  if (location.key !== prevLoc) {
    setPrevLoc(location.key)
    setCatalogueDropdownOpen(false)
    setMobileMenuOpen(false)
  }

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setCatalogueDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCatalogueDropdownOpen(false)
    }, 150)
  }

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo & Wordmark */}
        <Link to="/" className="navbar-brand" aria-label="Sachin Jewellers Home">
          <img
            src={sjMonogram}
            alt="Sachin Jewellers Monogram"
            className="navbar-brand-monogram"
          />
          <div className="navbar-brand-copy">
            <span className="navbar-brand-title">{t.brand}</span>
            <span className="navbar-brand-sub">
              {isHi ? 'द हाउस ऑफ फाइन जेमस्टोन्स' : 'THE HOUSE OF FINE GEMSTONES'}
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <ul className="navbar-nav-list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                }
              >
                {t.nav.home}
              </NavLink>
            </li>

            {/* Catalogue with Mega Dropdown */}
            <li
              className="navbar-dropdown-wrapper"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
              onFocus={handleDropdownEnter}
              onBlur={handleDropdownLeave}
            >
              <NavLink
                to="/catalogue"
                className={({ isActive }) =>
                  `navbar-link navbar-dropdown-toggle ${
                    isActive ? 'navbar-link-active' : ''
                  }`
                }
                aria-haspopup="true"
                aria-expanded={catalogueDropdownOpen}
              >
                <span>{t.nav.catalogue}</span>
                <svg
                  className={`dropdown-chevron ${
                    catalogueDropdownOpen ? 'dropdown-chevron-open' : ''
                  }`}
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </NavLink>

              {/* Desktop Mega-Dropdown Panel */}
              <AnimatePresence>
                {catalogueDropdownOpen && (
                  <motion.div
                    className="navbar-mega-dropdown"
                    role="menu"
                    aria-label="Catalogue Submenu"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: EASE }}
                  >
                    <div className="mega-dropdown-grid">
                      {/* Column 1: Primary Gemstones (Vedic & Fine) */}
                      <div className="mega-dropdown-col mega-col-gemstones">
                        <div className="mega-dropdown-heading">
                          <span className="mega-col-icon">💎</span>
                          <div>
                            <span className="mega-col-title">
                              {t.nav.gemstones}
                            </span>
                            <span className="mega-col-caption">
                              {isHi
                                ? 'प्राकृतिक प्रमाणित वैदिक एवं दुर्लभ रत्न'
                                : 'Natural certified Vedic & rare gems'}
                            </span>
                          </div>
                        </div>

                        <ul className="mega-dropdown-links">
                          <li>
                            <Link
                              to="/catalogue?collection=gemstones&category=navratna"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? 'नवरत्न संग्रह' : 'Navratna (Precious Stones)'}
                              </span>
                              <span className="mega-link-meta">Ruby, Sapphire, Emerald, Pukhraj</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalogue?collection=gemstones&category=upratna"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? 'उपरत्न संग्रह' : 'Upratna (Secondary Stones)'}
                              </span>
                              <span className="mega-link-meta">Tourmaline, Amethyst, Garnet</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalogue?collection=gemstones&category=semi-precious"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? 'सेमी-प्रेशियस रत्न' : 'Semi-Precious Stones'}
                              </span>
                              <span className="mega-link-meta">Opal, Topaz, Zircon, Hakik</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalogue?collection=gemstones&category=pearl-organic"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? 'मोती एवं प्राकृतिक रत्न' : 'Pearl & Organic'}
                              </span>
                              <span className="mega-link-meta">South Sea Pearl, Moonga Coral</span>
                            </Link>
                          </li>
                        </ul>

                        <Link
                          to="/catalogue?collection=gemstones"
                          className="mega-col-footer-link"
                        >
                          <span>{isHi ? 'सभी 31+ रत्न देखें' : 'View All 31+ Gemstones'}</span>
                          <span className="mega-arrow">→</span>
                        </Link>
                      </div>

                      {/* Column 2: Sacred Rudraksha Collection */}
                      <div className="mega-dropdown-col mega-col-rudraksha">
                        <div className="mega-dropdown-heading">
                          <span className="mega-col-icon">📿</span>
                          <div>
                            <span className="mega-col-title">
                              {t.nav.rudraksha}
                            </span>
                            <span className="mega-col-caption">
                              {isHi
                                ? 'पवित्र नेपाली एवं सिद्ध रुद्राक्ष'
                                : 'Sacred Nepali & Siddh Rudraksha'}
                            </span>
                          </div>
                        </div>

                        <ul className="mega-dropdown-links">
                          <li>
                            <Link
                              to="/catalogue?collection=rudraksha"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? '1 से 14 मुखी रुद्राक्ष' : '1 to 14 Mukhi Nepali Beads'}
                              </span>
                              <span className="mega-link-meta">Certified energised beads</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalogue?collection=rudraksha"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? 'सिद्ध माला एवं संयोजन' : 'Siddh Mala & Combinations'}
                              </span>
                              <span className="mega-link-meta">Indra, Saraswati & Shiv Malas</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/catalogue?collection=rudraksha"
                              className="mega-link"
                            >
                              <span className="mega-link-name">
                                {isHi ? 'चांदी कड़ा व पेंडेंट' : 'Silver Bracelet & Pendants'}
                              </span>
                              <span className="mega-link-meta">Pure silver capped designs</span>
                            </Link>
                          </li>
                        </ul>

                        <Link
                          to="/catalogue?collection=rudraksha"
                          className="mega-col-footer-link"
                        >
                          <span>{isHi ? 'संपूर्ण रुद्राक्ष संग्रह देखें' : 'View Rudraksha Collection'}</span>
                          <span className="mega-arrow">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                }
              >
                {t.nav.about}
              </NavLink>
            </li>

            <li>
              <a href="/#enquiry" className="navbar-link">
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>

        {/* Right Action Icons & Mobile Hamburger */}
        <div className="navbar-actions">
          {/* Language Switch */}
          <button
            type="button"
            className="lang-toggle navbar-lang-btn"
            onClick={onToggleLang}
            aria-label={`Switch language to ${lang === 'en' ? 'Hindi' : 'English'}`}
          >
            <span>{t.langName}</span>
          </button>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="navbar-cart-btn"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-count-badge" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="navbar-hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileDrawer
            isOpen={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            lang={lang}
            onToggleLang={onToggleLang}
            t={t}
          />
        )}
      </AnimatePresence>
    </header>
  )
}
