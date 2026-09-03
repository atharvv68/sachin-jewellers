import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  calcMoonChart,
  weekdayIndex,
  stonesForWeekday,
  WEEKDAYS,
  WEEKDAYS_HI,
  WEEKDAY_PLANET,
  EASE,
} from '../../utils/astrologyCalculations.js'
import { RASHIS, NAKSHATRAS, RATNA_ADVICE, UTC_OFFSETS } from '../../data/catalogData.js'
import { CATEGORIES } from '../../data/stonesData.js'
import { OWNER_PHONE_INTL } from '../../shopConfig.js'
import FadeSection from '../common/FadeSection.jsx'

function KundaliPreview({ dob, tob, lang, kt }) {
  const wdi = dob ? weekdayIndex(dob) : -1
  const weekday = wdi >= 0 ? WEEKDAYS[wdi] : null
  const weekdayLabel =
    wdi >= 0 ? (lang === 'hi' ? WEEKDAYS_HI[wdi] : WEEKDAYS[wdi]) : null
  const matches = weekday ? stonesForWeekday(weekday) : []
  const pick =
    matches.find((m) => m.product.category === CATEGORIES.NAVRATNA) ||
    matches[0] ||
    null
  const otherCount = Math.max(0, matches.length - 1)
  const planetName = weekday ? WEEKDAY_PLANET[weekday] : null
  const planetFull = pick ? pick.variant.planet : planetName

  const fade = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.32, ease: EASE },
  }

  return (
    <div className="kundali-preview">
      <AnimatePresence mode="wait" initial={false}>
        {!weekday ? (
          <motion.p key="prompt" className="kundali-preview-prompt" {...fade}>
            {kt.previewPrompt}
          </motion.p>
        ) : (
          <motion.div key="day" className="kundali-preview-day" {...fade}>
            <p className="kundali-preview-weekday">
              <span>{kt.previewWeekdayLabel}</span>
              {weekdayLabel} &middot; {planetFull}
            </p>

            {pick && (
              <Link
                to={`/stone/${pick.product.id}`}
                className="kundali-preview-stone"
              >
                <span className="kundali-preview-img">
                  <img src={pick.variant.image} alt="" loading="lazy" />
                </span>
                <span className="kundali-preview-stone-body">
                  <span className="kundali-preview-stone-name">
                    {pick.product.name}{' '}
                    <em>({pick.variant.hindiName})</em>
                  </span>
                  <span className="kundali-preview-stone-meta">
                    {kt.previewPlanetStone.replace('{planet}', planetName || '')}
                    {otherCount > 0
                      ? ` · ${kt.previewOthers.replace('{n}', otherCount)}`
                      : ''}
                  </span>
                </span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {weekday && tob && (
          <motion.p key="tob" className="kundali-preview-note" {...fade}>
            {kt.previewFullReading}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function KundaliChecker({ lang = 'en', t }) {
  const kt = t.kundali
  const [form, setForm] = useState({
    name: '',
    dob: '',
    tob: '',
    outside: false,
    offset: '0',
  })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setResult(null)
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    const offsetMinutes = form.outside ? Number(form.offset) : 330 // IST default (+5:30)
    let chart = null
    try {
      chart = calcMoonChart({ dob: form.dob, tob: form.tob, offsetMinutes })
    } catch {
      chart = null
    }
    if (!chart) {
      setError(kt.error)
      return
    }
    setResult({ id: Date.now(), name: form.name.trim(), ...chart })
  }

  const rashi = result ? RASHIS[result.rashiIndex] : null
  const advice = rashi ? RATNA_ADVICE[rashi.key] : null
  const nak = result ? NAKSHATRAS[result.nakIndex] : null

  let waHref = '#'
  if (result && rashi && advice && nak) {
    const msg = kt.waMessage
      .replace('{rashi}', `${rashi.hi} / ${rashi.en}`)
      .replace('{nakshatra}', `${nak.hi} / ${nak.en}`)
      .replace('{pada}', String(result.pada))
      .replace('{stone}', advice.stone[lang] || advice.stone.en)
    waHref = `https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(msg)}`
  }

  return (
    <FadeSection id="kundali-checker" className="section kundali-section">
      <div className="section-header-center">
        <span className="section-kicker">✦ FREE KUNDALI ADVISOR ✦</span>
        <h2>{kt.heading}</h2>
        <p className="section-subtext">
          {lang === 'hi'
            ? 'अपनी जन्म तिथि और समय दर्ज करें। लाहिरी अयनांश अनुसार सटीक चंद्र राशि, नक्षत्र व उपयुक्त रत्न जानें।'
            : 'Enter your birth date and time to calculate your Vedic Moon Sign, Nakshatra, Pada, and astrologically prescribed gemstone.'}
        </p>
      </div>

      <div className="container">
        <div className="kundali-split-grid">
          <div className="kundali-form-pane">
            <form className="kundali-form" onSubmit={submit}>
              <label className="kundali-field">
                <span className="field-label">{kt.fullName}</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder={lang === 'hi' ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                  required
                />
              </label>

              <div className="kundali-row">
                <label className="kundali-field">
                  <span className="field-label">{kt.dob}</span>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={update}
                    required
                  />
                </label>
                <label className="kundali-field">
                  <span className="field-label">{kt.tob}</span>
                  <input
                    type="time"
                    name="tob"
                    value={form.tob}
                    onChange={update}
                    required
                  />
                </label>
              </div>

              <div className="kundali-tz-section">
                <label className="kundali-checkbox-label">
                  <input
                    type="checkbox"
                    name="outside"
                    checked={form.outside}
                    onChange={update}
                  />
                  <span>{kt.bornOutside}</span>
                </label>

                {form.outside && (
                  <label className="kundali-field mt-sm">
                    <span className="field-label">{kt.timezone}</span>
                    <select
                      name="offset"
                      value={form.offset}
                      onChange={update}
                    >
                      {UTC_OFFSETS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>

              {error && <p className="kundali-error-msg">{error}</p>}

              <button type="submit" className="btn btn-solid kundali-submit-btn">
                <span>✨ {kt.submit}</span>
              </button>
            </form>
          </div>

          <div className="kundali-preview-pane">
            <KundaliPreview
              dob={form.dob}
              tob={form.tob}
              lang={lang}
              kt={kt}
            />
          </div>
        </div>

        {/* Calculation Result Card */}
        <AnimatePresence>
          {result && rashi && advice && nak && (
            <motion.div
              className="kundali-result-card"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="result-card-header">
                <div>
                  <span className="result-kicker">✦ {kt.resultHeading} ✦</span>
                  <h3 className="result-title">
                    {result.name ? `${result.name} — ` : ''}
                    {rashi.hi} / {rashi.en} ({rashi.zodiac})
                  </h3>
                </div>
                <span className="result-gem-badge">💎 {advice.stone[lang] || advice.stone.en}</span>
              </div>

              <div className="result-metrics-grid">
                <div className="metric-cell">
                  <span className="metric-label">{kt.rashi}</span>
                  <strong className="metric-value">{rashi.hi} ({rashi.en})</strong>
                </div>
                <div className="metric-cell">
                  <span className="metric-label">{kt.nakshatra}</span>
                  <strong className="metric-value">{nak.hi} ({nak.en})</strong>
                </div>
                <div className="metric-cell">
                  <span className="metric-label">{kt.pada}</span>
                  <strong className="metric-value">{result.pada}</strong>
                </div>
                <div className="metric-cell">
                  <span className="metric-label">{kt.recommendedStone}</span>
                  <strong className="metric-value highlight-gold">
                    {advice.stone[lang] || advice.stone.en}
                  </strong>
                </div>
              </div>

              <div className="result-actions">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn whatsapp-btn result-wa-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                    />
                  </svg>
                  <span>{kt.discussWa}</span>
                </a>

                <Link
                  to="/catalogue?collection=gemstones"
                  className="btn btn-outline result-catalogue-btn"
                >
                  <span>{lang === 'hi' ? 'रत्न कैटलॉग देखें' : 'View Matching Gemstones'}</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeSection>
  )
}
