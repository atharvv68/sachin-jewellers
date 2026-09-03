import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'
import { TRANSLATIONS } from '../../data/translations.js'
import { RASHIS, RATNA_ADVICE } from '../../data/catalogData.js'
import { OWNER_PHONE_INTL } from '../../shopConfig.js'
import Button from './Button.jsx'

function ChatBubble({ from, delay = 0, children }) {
  return (
    <motion.div
      className={`chat-bubble ${from}`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function RatnaSalaah({ lang = 'en', open: openProp, onOpenChange }) {
  const [openState, setOpenState] = useState(false)
  const open = openProp ?? openState
  const setOpen = onOpenChange ?? setOpenState
  const [picks, setPicks] = useState([])
  const bodyRef = useRef(null)
  const rt = TRANSLATIONS[lang]?.ratna || TRANSLATIONS.en.ratna

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [picks, open, lang])

  return (
    <>
      <motion.button
        type="button"
        className="ratna-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={rt.title}
        aria-expanded={open}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2Z"
          />
        </svg>
        <span className="ratna-fab-label">{rt.title}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ratna-panel"
            role="dialog"
            aria-label={rt.title}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="ratna-header">
              <div>
                <p className="ratna-title">{rt.title}</p>
                <p className="ratna-subtitle">{rt.subtitle}</p>
              </div>
              <button
                type="button"
                className="ratna-close"
                onClick={() => setOpen(false)}
                aria-label={rt.close}
              >
                &times;
              </button>
            </div>

            <div className="ratna-body" ref={bodyRef}>
              <ChatBubble from="bot">{rt.greeting}</ChatBubble>

              {picks.map((key, i) => {
                const rashi = RASHIS.find((r) => r.key === key)
                const advice = RATNA_ADVICE[key]
                if (!rashi || !advice) return null
                const rashiLabel = `${rashi.hi} / ${rashi.en} (${rashi.zodiac})`
                const waMsg = rt.waMessage
                  .replace('{rashi}', rashiLabel)
                  .replace('{stone}', advice.stone[lang] || advice.stone.en)
                const waHref = `https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(
                  waMsg,
                )}`
                return (
                  <div className="ratna-exchange" key={`${key}-${i}`}>
                    <ChatBubble from="user">{rashiLabel}</ChatBubble>
                    <ChatBubble from="bot" delay={0.15}>
                      <p className="ratna-line">
                        <span>{rt.stone}:</span> {advice.stone[lang] || advice.stone.en}
                      </p>
                      <p className="ratna-line">
                        <span>{rt.metal}:</span> {advice.metal[lang] || advice.metal.en}
                      </p>
                      <p className="ratna-line">
                        <span>{rt.day}:</span> {advice.day[lang] || advice.day.en}
                      </p>
                      <p className="ratna-line">
                        <span>{rt.finger}:</span> {advice.finger[lang] || advice.finger.en}
                      </p>
                      <p className="ratna-disclaimer">{rt.disclaimer}</p>
                      <Button
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="ratna-cta"
                      >
                        {rt.cta}
                      </Button>
                    </ChatBubble>
                  </div>
                )
              })}

              <p className="ratna-pick-prompt">{rt.pickPrompt}</p>
              <div className="ratna-rashi-grid">
                {RASHIS.map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    className="ratna-rashi-btn"
                    onClick={() => setPicks((p) => [...p, r.key])}
                  >
                    <span className="rashi-hi">{r.hi}</span>
                    <span className="rashi-en">{r.en}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
