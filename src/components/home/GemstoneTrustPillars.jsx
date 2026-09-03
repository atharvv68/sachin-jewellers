import { motion } from 'motion/react'
import FadeSection from '../common/FadeSection.jsx'

export default function GemstoneTrustPillars({ lang = 'en', t }) {
  const isHi = lang === 'hi'
  const tp = t.trustPillars

  // Icon + short badge per card, aligned to the translation cards[] order.
  const meta = [
    { icon: '🔬', badge: isHi ? 'लैब प्रमाणित' : 'Lab Certified' },
    { icon: '⚖️', badge: isHi ? 'प्रत्यक्ष स्रोत' : 'Direct Source' },
    { icon: '🕉️', badge: isHi ? 'वैदिक सिद्ध' : 'Vedic Energised' },
    { icon: '🏛️', badge: isHi ? '15+ वर्ष' : '15+ Years' },
  ]

  const pillars = (tp.cards || []).map((card, i) => ({
    icon: meta[i]?.icon || '✦',
    title: card.heading,
    desc: card.body,
    badge: meta[i]?.badge || '',
  }))

  return (
    <FadeSection id="trust-pillars" className="section trust-pillars-section">
      <div className="section-header-center">
        <span className="section-kicker">✦ THE SACRED COMMITMENT ✦</span>
        <h2>{tp.heading}</h2>
        <p className="section-subtext">{tp.subheading}</p>
      </div>

      <div className="container">
        <div className="trust-pillars-grid">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="trust-pillar-card"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            >
              <div className="pillar-header">
                <div className="pillar-icon-box">{p.icon}</div>
                <span className="pillar-badge">{p.badge}</span>
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeSection>
  )
}
