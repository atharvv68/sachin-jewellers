import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'

export default function PolicyModal({ isOpen, onClose, policyKey, t, lang = 'en' }) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen || !policyKey) return null

  const policy = t.policies?.[policyKey]
  if (!policy) return null

  return (
    <AnimatePresence>
      <div className="policy-modal-root" role="dialog" aria-modal="true" aria-labelledby="policy-title">
        <motion.div
          className="policy-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
        />
        <motion.div
          className="policy-modal-panel"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="policy-modal-header">
            <h3 id="policy-title" className="policy-modal-title">
              {policy.title}
            </h3>
            <button
              type="button"
              className="policy-modal-close"
              onClick={onClose}
              aria-label={lang === 'hi' ? 'बंद करें' : 'Close modal'}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="policy-modal-body">
            <p className="policy-modal-text">{policy.content}</p>
          </div>

          <div className="policy-modal-footer">
            <button
              type="button"
              className="btn btn-outline policy-modal-btn"
              onClick={onClose}
            >
              {lang === 'hi' ? 'समझ आ गया' : 'Understood'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
