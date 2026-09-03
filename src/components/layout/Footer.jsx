import { useState } from 'react'
import { Link } from 'react-router-dom'
import sjMonogram from '../../assets/sj-monogram-only.png'
import { BRAND, BUSINESS, OWNER_EMAIL, OWNER_PHONE, OWNER_PHONE_INTL, WHATSAPP_NUMBER } from '../../shopConfig.js'
import PolicyModal from './PolicyModal.jsx'

export default function Footer({ lang = 'en', t }) {
  const [activePolicy, setActivePolicy] = useState(null)
  const isHi = lang === 'hi'

  const waConsultMsg = isHi
    ? 'नमस्ते सचिन ज्वैलर्स! मैं रत्न परामर्श के लिए संपर्क कर रहा/रही हूँ।'
    : 'Namaste Sachin Jewellers! I would like to enquire about certified gemstones and rudraksha.'

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top-strip">
        <div className="container footer-trust-row">
          <div className="footer-trust-item">
            <span className="footer-trust-icon">🔬</span>
            <div className="footer-trust-copy">
              <strong>{isHi ? 'लैब प्रमाणित रत्न' : 'Lab Certified Gemstones'}</strong>
              <span>{isHi ? 'प्राकृतिक अप्रसंस्कृत वैदिक रत्न' : 'Natural unheated Vedic gemstones'}</span>
            </div>
          </div>
          <div className="footer-trust-item">
            <span className="footer-trust-icon">📿</span>
            <div className="footer-trust-copy">
              <strong>{isHi ? 'सिद्ध रुद्राक्ष' : 'Sacred Rudraksha'}</strong>
              <span>{isHi ? 'वैदिक मंत्रों से सिद्ध एवं ऊर्जान्वित' : 'Vedic sanctified & energised'}</span>
            </div>
          </div>
          <div className="footer-trust-item">
            <span className="footer-trust-icon">🏛️</span>
            <div className="footer-trust-copy">
              <strong>{isHi ? 'विश्वसनीय धरोहर' : 'Heritage & Trust'}</strong>
              <span>{isHi ? '15+ वर्षों का अटूट विश्वास व अनुभव' : '15+ Years of trusted legacy'}</span>
            </div>
          </div>
          <div className="footer-trust-item">
            <span className="footer-trust-icon">📦</span>
            <div className="footer-trust-copy">
              <strong>{isHi ? 'अखिल भारतीय सुरक्षित शिपिंग' : 'Insured Pan-India Delivery'}</strong>
              <span>{isHi ? 'सुरक्षित पैकेजिंग व त्वरित ट्रैकिंग' : 'Tamper-proof packing with tracking'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand-header">
            <img src={sjMonogram} alt="Sachin Jewellers" className="footer-monogram" />
            <div className="footer-brand-text">
              <span className="footer-brand-title">{t.brand}</span>
              <span className="footer-brand-subtitle">
                {isHi ? 'द हाउस ऑफ फाइन जेमस्टोन्स' : 'THE HOUSE OF FINE GEMSTONES'}
              </span>
            </div>
          </Link>
          <p className="footer-description">
            {isHi
              ? 'प्रमाणित वैदिक रत्नों, प्रामाणिक रुद्राक्ष और व्यक्तिगत ज्योतिषीय परामर्श के लिए विश्वसनीय नाम।'
              : 'A house of certified fine gemstones, sacred Rudraksha and personalised astrological guidance.'}
          </p>
          <div className="footer-social-links">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-btn"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Gemstones & Collections */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">{isHi ? 'रत्न संग्रह' : 'Gemstone Collections'}</h4>
          <ul className="footer-links-list">
            <li>
              <Link to="/catalogue?collection=gemstones&category=navratna">
                {isHi ? 'नवरत्न (Navratna Stones)' : 'Navratna (Precious Gems)'}
              </Link>
            </li>
            <li>
              <Link to="/catalogue?collection=gemstones&category=upratna">
                {isHi ? 'उपरत्न (Upratna Stones)' : 'Upratna (Secondary Gems)'}
              </Link>
            </li>
            <li>
              <Link to="/catalogue?collection=gemstones&category=semi-precious">
                {isHi ? 'सेमी-प्रेशियस रत्न' : 'Semi-Precious Stones'}
              </Link>
            </li>
            <li>
              <Link to="/catalogue?collection=gemstones&category=pearl-organic">
                {isHi ? 'मोती व मूंगा (Pearl & Organic)' : 'Pearl & Organic Coral'}
              </Link>
            </li>
            <li>
              <Link to="/catalogue?collection=rudraksha">
                {isHi ? 'सिद्ध रुद्राक्ष एवं माला' : 'Sacred Rudraksha Collection'}
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="footer-highlight-link">
                {isHi ? 'संपूर्ण कैटलॉग (All Collections) →' : 'Explore All Collections →'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Astrological Guidance */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">{isHi ? 'ज्योतिष एवं परामर्श' : 'Astrology & Guidance'}</h4>
          <ul className="footer-links-list">
            <li>
              <a href="/#rashi-advisor">
                {isHi ? 'राशि रत्न खोजक (Rashi Finder)' : 'Find Your Rashi Stone'}
              </a>
            </li>
            <li>
              <a href="/#kundali-checker">
                {isHi ? 'निःशुल्क कुंडली कैलकुलेटर' : 'Free Kundali Advisor'}
              </a>
            </li>
            <li>
              <Link to="/about">
                {isHi ? 'हमारे बारे में एवं सचिन जी की कहानी' : 'About Sachin Ji & Heritage'}
              </Link>
            </li>
            <li>
              <a href="/#enquiry">
                {isHi ? 'परामर्श व पूछताछ फॉर्म' : 'Book a Personal Consultation'}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waConsultMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="footer-wa-direct"
              >
                <span>💬 {isHi ? 'सीधे व्हाट्सऐप पर पूछें' : 'Chat with Sachin Ji'}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Business */}
        <div className="footer-contact-col">
          <h4 className="footer-col-title">{isHi ? 'संपर्क एवं व्यवसाय' : 'Contact & Business'}</h4>
          <address className="footer-address-block">
            <p className="footer-address-line">
              <span className="footer-icon">📞</span>
              <a href={`tel:+${OWNER_PHONE_INTL}`}>+91 {OWNER_PHONE}</a>
            </p>
            <p className="footer-address-line">
              <span className="footer-icon">✉️</span>
              <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
            </p>
            <p className="footer-address-line">
              <span className="footer-icon">🏛️</span>
              <span>
                <strong>{BUSINESS.proprietor}</strong> (Proprietor)
              </span>
            </p>
            <p className="footer-address-line footer-gst-tag">
              <span>GSTIN: <code>{BUSINESS.gstin}</code></span>
            </p>
          </address>
        </div>
      </div>

      {/* Policies & Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-container">
          <div className="footer-policies-list">
            <button
              type="button"
              className="footer-policy-btn"
              onClick={() => setActivePolicy('return')}
            >
              {isHi ? 'वापसी नीति' : 'Return Policy'}
            </button>
            <button
              type="button"
              className="footer-policy-btn"
              onClick={() => setActivePolicy('refund')}
            >
              {isHi ? 'रिफंड नीति' : 'Refund Policy'}
            </button>
            <button
              type="button"
              className="footer-policy-btn"
              onClick={() => setActivePolicy('shipping')}
            >
              {isHi ? 'शिपिंग नीति' : 'Shipping Policy'}
            </button>
            <button
              type="button"
              className="footer-policy-btn"
              onClick={() => setActivePolicy('terms')}
            >
              {isHi ? 'नियम व शर्तें' : 'Terms of Service'}
            </button>
          </div>

          <p className="footer-copyright">
            © {new Date().getFullYear()} {BRAND}. {isHi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}{' '}
            <span className="footer-sub-note">The House of Fine Gemstones</span>
          </p>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={Boolean(activePolicy)}
        onClose={() => setActivePolicy(null)}
        policyKey={activePolicy}
        t={t}
        lang={lang}
      />
    </footer>
  )
}
