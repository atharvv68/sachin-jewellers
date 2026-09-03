import { useState } from 'react'
import { OWNER_EMAIL, OWNER_PHONE, OWNER_PHONE_INTL, WHATSAPP_NUMBER } from '../../shopConfig.js'
import FadeSection from '../common/FadeSection.jsx'
import Button from '../common/Button.jsx'

export default function EnquirySection({ lang = 'en', t }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '' })
  const [sent, setSent] = useState(false)
  const isHi = lang === 'hi'
  const eq = t.enquiry

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault()
    // Open mailto with enquiry data and display friendly confirmation
    const subject = `Sachin Jewellers Enquiry from ${form.name}`
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\n\nMessage:\n${form.comment}`
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const waEnquiryMsg = isHi
    ? 'नमस्ते सचिन ज्वैलर्स! मैं रत्न एवं रुद्राक्ष परामर्श हेतु पूछताछ करना चाहता/चाहती हूँ।'
    : 'Namaste Sachin Jewellers! I would like to inquire about certified gemstones and consultations.'
  const waEnquiryHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    waEnquiryMsg,
  )}`

  return (
    <FadeSection id="enquiry" className="section enquiry-section">
      <div className="section-header-center">
        <span className="section-kicker">✦ GET IN TOUCH ✦</span>
        <h2>{eq.heading}</h2>
        <p className="section-subtext">{eq.intro}</p>
      </div>

      <div className="container">
        <div className="enquiry-split-grid">
          <div className="enquiry-form-pane">
            {sent ? (
              <div className="form-success-card">
                <span className="success-icon">✓</span>
                <h3>{isHi ? 'पूछताछ दर्ज हो गई' : 'Message Sent Successfully'}</h3>
                <p>{eq.success}</p>
                <button
                  type="button"
                  className="btn btn-outline mt-md"
                  onClick={() => {
                    setSent(false)
                    setForm({ name: '', email: '', phone: '', comment: '' })
                  }}
                >
                  {isHi ? 'एक और संदेश भेजें' : 'Send Another Enquiry'}
                </button>
              </div>
            ) : (
              <form className="enquiry-form" onSubmit={submit}>
                <label className="enquiry-field">
                  <span className="field-label">{eq.name}</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder={isHi ? 'उदा. अमित गुप्ता' : 'e.g. Amit Gupta'}
                    required
                  />
                </label>

                <div className="enquiry-row">
                  <label className="enquiry-field">
                    <span className="field-label">{eq.email}</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={update}
                      placeholder="amit@example.com"
                      required
                    />
                  </label>

                  <label className="enquiry-field">
                    <span className="field-label">{eq.phone}</span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={update}
                      placeholder="+91 98765 43210"
                    />
                  </label>
                </div>

                <label className="enquiry-field">
                  <span className="field-label">{eq.comment}</span>
                  <textarea
                    name="comment"
                    rows="4"
                    value={form.comment}
                    onChange={update}
                    placeholder={
                      isHi
                        ? 'कृपया आवश्यक रत्न, कैरेट/रत्ती या परामर्श संबंधित जानकारी लिखें...'
                        : 'Please describe the gemstone, weight in ratti/carat, or astrology requirement...'
                    }
                    required
                  />
                </label>

                <Button as="button" type="submit" className="btn btn-solid enquiry-submit-btn">
                  <span>✉️ {eq.send}</span>
                </Button>
              </form>
            )}
          </div>

          <aside className="enquiry-contact-aside">
            <div className="contact-aside-card">
              <h3 className="aside-title">
                {isHi ? 'सीधे शोरूम से संपर्क करें' : 'Direct Showroom Assistance'}
              </h3>
              <p className="aside-desc">
                {isHi
                  ? 'हमारे विशेषज्ञ से सीधे फोन या व्हाट्सऐप पर तुरंत परामर्श प्राप्त करें।'
                  : 'Speak directly with Sachin ji or visit our heritage showroom in Dehradun.'}
              </p>

              <div className="aside-actions-list">
                <a
                  href={`tel:+${OWNER_PHONE_INTL}`}
                  className="aside-contact-item"
                >
                  <span className="item-icon">📞</span>
                  <div className="item-info">
                    <span className="item-label">{t.owner.phoneLabel}</span>
                    <span className="item-value">+91 {OWNER_PHONE}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${OWNER_EMAIL}`}
                  className="aside-contact-item"
                >
                  <span className="item-icon">✉️</span>
                  <div className="item-info">
                    <span className="item-label">{t.owner.emailLabel}</span>
                    <span className="item-value">{OWNER_EMAIL}</span>
                  </div>
                </a>

                <a
                  href={waEnquiryHref}
                  target="_blank"
                  rel="noreferrer"
                  className="aside-contact-item wa-item"
                >
                  <span className="item-icon">💬</span>
                  <div className="item-info">
                    <span className="item-label">{isHi ? 'व्हाट्सऐप चैट' : 'WhatsApp Connect'}</span>
                    <span className="item-value">{t.owner.whatsapp}</span>
                  </div>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </FadeSection>
  )
}
