import { motion } from 'motion/react'
import sjMonogram from '../assets/sj-monogram-only.png'
import { OWNER_EMAIL, OWNER_PHONE, OWNER_PHONE_INTL, WHATSAPP_NUMBER } from '../shopConfig.js'
import FadeSection from '../components/common/FadeSection.jsx'
import Button from '../components/common/Button.jsx'
import EnquirySection from '../components/home/EnquirySection.jsx'

export default function AboutPage({ lang = 'en', t }) {
  const isHi = lang === 'hi'

  const waMsg = isHi
    ? 'नमस्ते सचिन जी! मैं आपके देहरादून शोरूम एवं वैदिक रत्न परामर्श के बारे में बात करना चाहता/चाहती हूँ।'
    : 'Namaste Sachin ji! I would like to consult with you regarding authentic gemstones and your Dehradun heritage.'
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`

  return (
    <div className="about-page-root">
      {/* 1. Page Header */}
      <section className="about-hero-header">
        <div className="container">
          <span className="section-kicker">✦ THE HERITAGE & CRAFT ✦</span>
          <h1 className="about-page-title">{t.about.heading}</h1>
          <p className="about-page-subtitle">
            {isHi
              ? 'देहरादून की पवित्र धरती पर स्थापित, 15+ वर्षों से वैदिक रत्नों और जन-आस्था का अटूट केंद्र।'
              : 'Rooted in the sacred valley of Dehradun, preserving Vedic gemological purity and generational trust since 2011.'}
          </p>
          <div className="about-gold-divider" />
        </div>
      </section>

      {/* 2. Heritage Narrative & Image */}
      <FadeSection className="section about-narrative-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-copy">
              {t.about.paragraphs.map((para, i) => (
                <p key={i} className="about-para">
                  {para}
                </p>
              ))}
            </div>

            <aside className="about-aside-card">
              <div className="about-aside-inner">
                <img
                  src={sjMonogram}
                  alt="Sachin Jewellers Heritage"
                  className="about-aside-logo"
                />
                <h3 className="about-aside-title">{t.brand}</h3>
                <span className="about-aside-tagline">
                  {isHi ? 'द हाउस ऑफ फाइन जेमस्टोन्स' : 'THE HOUSE OF FINE GEMSTONES'}
                </span>
                <p className="about-aside-note">
                  {isHi
                    ? 'पल्टन बाजार / सराफा मार्केट, देहरादून, उत्तराखण्ड'
                    : 'Paltan Bazaar / Sarafa Market, Dehradun, Uttarakhand'}
                </p>
                <div className="about-aside-badge">
                  <span>🏛️ {isHi ? 'देहरादून की विश्वसनीय धरोहर' : 'Dehradun Gemstone Heritage'}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </FadeSection>

      {/* 3. Founder / Master Gemologist Profile */}
      <FadeSection className="section owner-profile-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">✦ LEADERSHIP & MASTERY ✦</span>
            <h2>{t.owner.heading}</h2>
          </div>

          <div className="owner-card">
            <div className="owner-monogram" aria-hidden="true">
              SV
            </div>
            <div className="owner-body">
              <h3 className="owner-name">{t.owner.name}</h3>
              <p className="owner-role">{t.owner.role}</p>
              <div className="owner-badge">
                <span>✦ {t.owner.experience}</span>
              </div>
              <p className="owner-bio">{t.owner.bio}</p>

              <div className="owner-contact">
                <a href={`tel:+${OWNER_PHONE_INTL}`} className="owner-contact-link">
                  <span className="contact-icon">📞</span>
                  <span>{t.owner.phoneLabel}: +91 {OWNER_PHONE}</span>
                </a>
                <a href={`mailto:${OWNER_EMAIL}`} className="owner-contact-link">
                  <span className="contact-icon">✉️</span>
                  <span>{t.owner.emailLabel}: {OWNER_EMAIL}</span>
                </a>
              </div>

              <Button
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn whatsapp-btn owner-wa-cta"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                  />
                </svg>
                <span>{t.owner.whatsapp}</span>
              </Button>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* 4. Philosophy Quote */}
      <FadeSection className="quote-block">
        <div className="container">
          <blockquote>{t.quote}</blockquote>
        </div>
      </FadeSection>

      {/* 5. Trust Pillars & Why Choose Us */}
      <FadeSection className="section trust-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">✦ THE PILLARS OF TRUST ✦</span>
            <h2>{t.trust.heading}</h2>
          </div>

          <div className="trust-grid">
            {t.trust.cards.map((card, i) => (
              <motion.div
                key={card.heading || i}
                className="trust-card"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 24 }}
              >
                <h3 className="trust-card-heading">{card.heading}</h3>
                <p className="trust-card-body">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* 6. Direct Enquiry Form */}
      <EnquirySection lang={lang} t={t} />
    </div>
  )
}
