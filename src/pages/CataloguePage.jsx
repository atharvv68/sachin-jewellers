import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { products, CATEGORIES } from '../data/stonesData.js'
import { RUDRAKSHA_PRODUCTS, SECONDARY_COLLECTIONS } from '../data/catalogData.js'
import { WHATSAPP_NUMBER } from '../shopConfig.js'
import { EASE } from '../utils/astrologyCalculations.js'
import ProductCard from '../components/catalogue/ProductCard.jsx'
import RudrakshaCard from '../components/catalogue/RudrakshaCard.jsx'
import SecondaryCollectionCard from '../components/catalogue/SecondaryCollectionCard.jsx'
import FadeSection from '../components/common/FadeSection.jsx'

export default function CataloguePage({ lang = 'en', t }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showSecondary, setShowSecondary] = useState(false)

  const activeCollection = searchParams.get('collection') || 'gemstones'

  // Map category param to internal CATEGORIES constant
  const categoryParam = searchParams.get('category')
  const mapParamToCategory = (param) => {
    if (param === 'navratna') return CATEGORIES.NAVRATNA
    if (param === 'upratna') return CATEGORIES.UPRATNA
    if (param === 'semi-precious' || param === 'semi') return CATEGORIES.SEMI
    if (param === 'pearl-organic' || param === 'organic') return CATEGORIES.PEARL_ORGANIC
    return 'All'
  }

  const activeCategory = categoryParam ? mapParamToCategory(categoryParam) : 'All'

  const setCollection = (col) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev)
      p.set('collection', col)
      return p
    })
  }

  const setCategory = (cat) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev)
      if (cat === 'All') {
        p.delete('category')
      } else if (cat === CATEGORIES.NAVRATNA) {
        p.set('category', 'navratna')
      } else if (cat === CATEGORIES.UPRATNA) {
        p.set('category', 'upratna')
      } else if (cat === CATEGORIES.SEMI) {
        p.set('category', 'semi-precious')
      } else if (cat === CATEGORIES.PEARL_ORGANIC) {
        p.set('category', 'pearl-organic')
      }
      return p
    })
  }

  const CATEGORY_TABS = ['All', ...Object.values(CATEGORIES)]

  const shownProducts = useMemo(() => {
    if (activeCategory === 'All') return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="catalogue-page-root">
      <FadeSection className="section catalogue">
        <div className="catalogue-header">
          <span className="section-kicker">✦ THE SACRED CATALOGUE ✦</span>
          <h1 className="catalogue-heading">{t.catalogue.heading}</h1>
          <p className="catalogue-subheading">{t.catalogue.subheading}</p>
          <p className="enquiry-intro">{t.catalogue.intro}</p>
        </div>

        {/* Primary Collections Selector: ONLY 2 — 💎 GEMSTONES & 📿 RUDRAKSHA */}
        <div
          className="primary-collections-grid"
          role="tablist"
          aria-label="Primary Collections"
        >
          {/* Collection 1: 💎 GEMSTONES */}
          <motion.button
            type="button"
            role="tab"
            aria-selected={activeCollection === 'gemstones'}
            className={`collection-card collection-card-gemstones${
              activeCollection === 'gemstones' ? ' is-active' : ''
            }`}
            onClick={() => setCollection('gemstones')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <div className="collection-card-inner">
              <div className="collection-card-icon" aria-hidden="true">
                💎
              </div>
              <div className="collection-card-content">
                <span className="collection-card-badge">
                  {t.catalogue.gemstones.badge}
                </span>
                <h3 className="collection-card-title">
                  {t.catalogue.gemstones.title}
                </h3>
                <p className="collection-card-tagline">
                  {t.catalogue.gemstones.tagline}
                </p>
              </div>
              <span className="collection-card-cta">
                {activeCollection === 'gemstones'
                  ? t.catalogue.viewingNow
                  : t.catalogue.gemstones.explore}{' '}
                &rarr;
              </span>
            </div>
          </motion.button>

          {/* Collection 2: 📿 RUDRAKSHA */}
          <motion.button
            type="button"
            role="tab"
            aria-selected={activeCollection === 'rudraksha'}
            className={`collection-card collection-card-rudraksha${
              activeCollection === 'rudraksha' ? ' is-active' : ''
            }`}
            onClick={() => setCollection('rudraksha')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <div className="collection-card-inner">
              <div className="collection-card-icon" aria-hidden="true">
                📿
              </div>
              <div className="collection-card-content">
                <span className="collection-card-badge">
                  {t.catalogue.rudraksha.badge}
                </span>
                <h3 className="collection-card-title">
                  {t.catalogue.rudraksha.title}
                </h3>
                <p className="collection-card-tagline">
                  {t.catalogue.rudraksha.tagline}
                </p>
              </div>
              <span className="collection-card-cta">
                {activeCollection === 'rudraksha'
                  ? t.catalogue.viewingNow
                  : t.catalogue.rudraksha.explore}{' '}
                &rarr;
              </span>
            </div>
          </motion.button>
        </div>

        {/* Active Collection View: GEMSTONES */}
        {activeCollection === 'gemstones' && (
          <div className="gemstones-collection-view">
            <div
              className="catalogue-filter"
              role="group"
              aria-label="Filter gemstones by category"
            >
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`catalogue-tab${activeCategory === cat ? ' active' : ''}`}
                  aria-pressed={activeCategory === cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="catalogue-grid">
              {shownProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Active Collection View: RUDRAKSHA */}
        {activeCollection === 'rudraksha' && (
          <div className="rudraksha-collection-view">
            <div className="rudraksha-grid">
              {RUDRAKSHA_PRODUCTS.map((item) => (
                <RudrakshaCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>

            {/* Rudraksha & Astrological Consultation Banner */}
            <div className="rudraksha-consult-banner">
              <div className="rudraksha-consult-body">
                <h3>{t.catalogue.rudrakshaConsultTitle}</h3>
                <p>{t.catalogue.rudrakshaConsultDesc}</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Namaste Sachin Jewellers! I would like personal astrological consultation for selecting and energising the right Rudraksha bead.',
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-solid rudraksha-consult-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                  />
                </svg>
                <span>{t.catalogue.consultWa}</span>
              </a>
            </div>
          </div>
        )}

        {/* Secondary Traditional Collections (Puja Items, Yantras, Idols, Shivling, etc.) */}
        <section className="secondary-collections-section">
          <div className="secondary-collections-header">
            <div>
              <h2 className="sec-header-title">
                {t.catalogue.secondaryHeading}
              </h2>
              <p className="sec-header-sub">
                {t.catalogue.secondarySubheading}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline secondary-toggle-btn"
              onClick={() => setShowSecondary((v) => !v)}
              aria-expanded={showSecondary}
            >
              <span>{showSecondary ? t.catalogue.hideSecondary : t.catalogue.showSecondary}</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                className={`toggle-icon ${showSecondary ? 'toggle-icon-open' : ''}`}
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {showSecondary && (
              <motion.div
                className="secondary-collections-grid"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {SECONDARY_COLLECTIONS.map((item) => (
                  <SecondaryCollectionCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    t={t}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </FadeSection>
    </div>
  )
}
