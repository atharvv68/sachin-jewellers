import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { FEATURED_STONE_IDS } from '../../data/catalogData.js'
import { getProduct, defaultVariant } from '../../data/stonesData.js'
import { WHATSAPP_NUMBER } from '../../shopConfig.js'
import FadeSection from '../common/FadeSection.jsx'

function useIsMobile(query = '(max-width: 768px)') {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return isMobile
}

function FeaturedCard({ product, t }) {
  const v = defaultVariant(product)
  const enquireMsg =
    `Namaste Sachin Jewellers! I'm interested in ${product.name} ` +
    `(${v.hindiName}). Please share availability, certified weight options, and price.`
  const enquireHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    enquireMsg,
  )}`

  return (
    <div className="cf-card-inner">
      <div className="cf-card-img">
        <img src={v.image} alt={product.name} loading="lazy" />
      </div>
      <div className="cf-card-body">
        <h3 className="cf-card-name">
          {product.name}
          <span className="cf-card-name-hi">{v.hindiName}</span>
        </h3>
        <p className="cf-card-desc">{v.short}</p>
        <div className="cf-card-actions">
          <Link
            to={`/stone/${product.id}`}
            className="btn btn-solid cf-card-btn"
          >
            {t.pdp?.details || 'View Details'}
          </Link>
          <a
            className="btn whatsapp-btn cf-card-btn"
            href={enquireHref}
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
              />
            </svg>
            {t.featured.enquire}
          </a>
          <Link
            to="/catalogue?collection=gemstones"
            className="cf-card-link"
          >
            {t.featured.browse}
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedGemstonesCoverflow({ t }) {
  const items = FEATURED_STONE_IDS.map(getProduct).filter(Boolean)
  const n = items.length
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile()

  const go = (dir) => setActive((a) => (a + dir + n) % n)
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  if (!n) return null

  if (isMobile) {
    return (
      <FadeSection id="featured-gemstones" className="section featured">
        <div className="section-header-center">
          <span className="section-kicker">✦ NAVRATNA SPOTLIGHT ✦</span>
          <h2>{t.featured.heading}</h2>
          <p className="section-subtext">
            {t.featured.subheading ||
              'Natural, unheated, laboratory-tested Vedic stones selected for astrological potency.'}
          </p>
        </div>
        <ul className="cf-scroll">
          {items.map((p) => (
            <li className="cf-scroll-card" key={p.id}>
              <FeaturedCard product={p} t={t} />
            </li>
          ))}
        </ul>
      </FadeSection>
    )
  }

  return (
    <FadeSection id="featured-gemstones" className="section featured">
      <div className="section-header-center">
        <span className="section-kicker">✦ NAVRATNA SPOTLIGHT ✦</span>
        <h2>{t.featured.heading}</h2>
        <p className="section-subtext">
          {t.featured.subheading ||
            'Natural, unheated, laboratory-tested Vedic stones selected for astrological potency.'}
        </p>
      </div>

      <div
        className="cf-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={t.featured.heading}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="cf-track">
          {items.map((p, i) => {
            let off = i - active
            if (off > n / 2) off -= n
            if (off < -n / 2) off += n
            const abs = Math.abs(off)
            const visible = abs <= 2
            const isCenter = off === 0
            return (
              <motion.div
                key={p.id}
                className={`cf-card${isCenter ? ' is-center' : ''}`}
                initial={false}
                animate={{
                  x: off * 140,
                  rotateY: isCenter ? 0 : off > 0 ? -38 : 38,
                  scale: isCenter ? 1 : abs === 1 ? 0.84 : 0.68,
                  opacity: !visible ? 0 : isCenter ? 1 : abs === 1 ? 0.65 : 0.3,
                  filter: isCenter ? 'blur(0px)' : `blur(${abs * 2.5}px)`,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                style={{
                  zIndex: 50 - abs,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                {!isCenter && (
                  <button
                    type="button"
                    className="cf-card-hit"
                    onClick={() => setActive(i)}
                    tabIndex={visible ? 0 : -1}
                    aria-label={`${t.featured.show}: ${p.name}`}
                  />
                )}
                <div className="cf-card-content" inert={!isCenter ? '' : undefined}>
                  <FeaturedCard product={p} t={t} />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="cf-controls">
          <button
            type="button"
            className="cf-btn cf-prev"
            onClick={() => go(-1)}
            aria-label={t.featured.prev}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="cf-dots">
            {items.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={`cf-dot${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`${t.featured.show}: ${p.name}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="cf-btn cf-next"
            onClick={() => go(1)}
            aria-label={t.featured.next}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </FadeSection>
  )
}
