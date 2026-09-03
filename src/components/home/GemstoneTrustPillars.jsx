import { motion } from 'motion/react'
import FadeSection from '../common/FadeSection.jsx'

export default function GemstoneTrustPillars({ lang = 'en', t }) {
  const isHi = lang === 'hi'
  const tp = t.trustPillars

  const pillars = [
    {
      icon: '🔬',
      title: tp.p1Title,
      desc: tp.p1Desc,
      badge: isHi ? 'लैब प्रमाणित' : 'Govt Certified',
    },
    {
      icon: '🏛️',
      title: tp.p2Title,
      desc: tp.p2Desc,
      badge: isHi ? '15+ वर्ष अनुभव' : '15+ Yrs Legacy',
    },
    {
      icon: '⚖️',
      title: tp.p3Title,
      desc: tp.p3Desc,
      badge: isHi ? 'प्रत्यक्ष स्रोत' : 'Mine Direct',
    },
    {
      icon: '🕉️',
      title: tp.p4Title,
      desc: tp.p4Desc,
      badge: isHi ? 'वैदिक सिद्ध' : 'Vedic Energised',
    },
  ]

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
