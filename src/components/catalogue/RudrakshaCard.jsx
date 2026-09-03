import { motion } from 'motion/react'
import { WHATSAPP_NUMBER } from '../../shopConfig.js'

export default function RudrakshaCard({ item, lang = 'en', t }) {
  const isHi = lang === 'hi'
  const name = isHi ? item.hindiName : item.name
  const subName = isHi ? item.name : item.hindiName
  const desc = isHi && item.shortHi ? item.shortHi : item.short
  const enquireMsg =
    `Namaste Sachin Jewellers! I am interested in ${item.name} (${item.hindiName}) [${item.origin}]. ` +
    `Please share details, photos, and price.`
  const enquireHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquireMsg)}`

  return (
    <motion.article
      className="rudraksha-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="rudraksha-card-header">
        <span className="rudraksha-badge">{item.badge}</span>
        <span className="rudraksha-origin">{item.origin}</span>
      </div>
      <div className="rudraksha-card-body">
        <h3 className="rudraksha-title">
          {name} <span className="rudraksha-subname">({subName})</span>
        </h3>
        <p className="rudraksha-desc">{desc}</p>
      </div>
      <div className="rudraksha-card-footer">
        <span className="rudraksha-price-label">
          {t.catalogue?.priceOnRequest || 'Price on Request'}
        </span>
        <a
          href={enquireHref}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline rudraksha-enquire-btn"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
            />
          </svg>
          <span>{t.catalogue?.enquire || 'Enquire on WhatsApp'}</span>
        </a>
      </div>
    </motion.article>
  )
}
