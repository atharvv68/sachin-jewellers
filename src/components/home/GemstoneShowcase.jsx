import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { getProduct, defaultVariant } from '../../data/stonesData.js'
import FadeSection from '../common/FadeSection.jsx'

// Curated from real, existing catalogue products — names, images and links
// all come from stonesData via getProduct, so nothing is invented.
const SHOWCASE_IDS = [
  'burma-ruby',
  'ceylon-blue-sapphire',
  'emerald-stone',
  'ceylon-yellow-sapphire',
  'australian-fire-opal',
  'natural-diamond-loose',
]

function ShowcaseCard({ product, exploreLabel }) {
  const v = defaultVariant(product)
  return (
    <motion.li
      className="gs-showcase-card"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      <Link to={`/stone/${product.id}`} className="gs-showcase-link">
        <span className="gs-showcase-media">
          <span className="gs-showcase-glow" />
          <img src={v.image} alt={product.name} loading="lazy" draggable="false" />
        </span>
        <span className="gs-showcase-body">
          <span className="gs-showcase-name">
            {product.name}
            <span className="gs-showcase-name-hi">{v.hindiName}</span>
          </span>
          <span className="gs-showcase-explore">
            {exploreLabel}
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </span>
        </span>
      </Link>
    </motion.li>
  )
}

export default function GemstoneShowcase({ t }) {
  const items = SHOWCASE_IDS.map(getProduct).filter(Boolean)
  if (!items.length) return null
  const sc = t.showcase

  return (
    <FadeSection id="gemstone-showcase" className="section gs-showcase-section">
      <div className="section-header-center">
        <span className="section-kicker">✦ {sc.eyebrow} ✦</span>
        <h2>{sc.heading}</h2>
        <p className="section-subtext">{sc.subheading}</p>
      </div>

      <div className="container">
        <ul className="gs-showcase-grid">
          {items.map((p) => (
            <ShowcaseCard key={p.id} product={p} exploreLabel={sc.explore} />
          ))}
        </ul>

        <div className="gs-showcase-footer">
          <Link
            to="/catalogue?collection=gemstones"
            className="btn btn-outline gs-showcase-viewall"
          >
            <span>{sc.viewAll}</span>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
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
        </div>
      </div>
    </FadeSection>
  )
}
