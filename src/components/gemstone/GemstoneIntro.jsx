import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'

// Color palettes for smooth chromatic cycle:
// 1. Deep Sapphire Blue -> 2. Emerald Green -> 3. Ruby Red -> 4. Golden Yellow (Pukhraj) -> 5. Sapphire Blue
const GEM_PALETTES = [
  {
    name: 'Sapphire Blue',
    base: [15, 43, 92],      // #0f2b5c
    mid: [28, 85, 158],      // #1c559e
    highlight: [96, 165, 250],// #60a5fa
    glow: 'rgba(28, 85, 158, 0.45)',
  },
  {
    name: 'Emerald Green',
    base: [10, 65, 38],      // #0a4126
    mid: [16, 128, 76],      // #10804c
    highlight: [74, 222, 128],// #4ade80
    glow: 'rgba(16, 128, 76, 0.45)',
  },
  {
    name: 'Ruby Red',
    base: [92, 15, 26],      // #5c0f1a
    mid: [158, 27, 45],      // #9e1b2d
    highlight: [248, 113, 113],// #f87171
    glow: 'rgba(158, 27, 45, 0.45)',
  },
  {
    name: 'Golden Yellow',
    base: [110, 78, 8],      // #6e4e08
    mid: [201, 162, 39],     // #c9a227 (our brand gold)
    highlight: [253, 224, 71],// #fde047
    glow: 'rgba(201, 162, 39, 0.45)',
  },
]

function interpolateRGB(rgb1, rgb2, t) {
  return [
    Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t),
    Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t),
    Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t),
  ]
}

export default function GemstoneIntro({ onComplete, lang = 'en' }) {
  const canvasRef = useRef(null)
  const [phase, setPhase] = useState('active') // 'active' | 'exiting' | 'done'
  const prefersReducedMotion = useReducedMotion()

  const handleFinish = useCallback(() => {
    setPhase('exiting')
    try {
      sessionStorage.setItem('sj-intro-seen', '1')
    } catch {
      // storage unavailable
    }
    setTimeout(() => {
      setPhase('done')
      if (onComplete) onComplete()
    }, 600)
  }, [onComplete])

  useEffect(() => {
    // If reduced motion is requested, show brief static intro or skip quickly
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        handleFinish()
      }, 1200)
      return () => clearTimeout(timer)
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let startTime = null
    const TOTAL_DURATION = 4200 // 4.2 seconds total

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const size = Math.min(window.innerWidth * 0.75, 420)
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      ctx.scale(dpr, dpr)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Render loop
    const render = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / TOTAL_DURATION, 1)

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const size = canvas.width / dpr
      const cx = size / 2
      const cy = size / 2
      const radius = size * 0.38

      ctx.clearRect(0, 0, size, size)

      // 1. Color interpolation through palettes
      // Cycle: 0 -> 1 -> 2 -> 3 -> 0
      const cycleProgress = (progress * 4) % 4
      const currentIndex = Math.floor(cycleProgress)
      const nextIndex = (currentIndex + 1) % GEM_PALETTES.length
      const subT = cycleProgress - currentIndex

      const currentPal = GEM_PALETTES[currentIndex]
      const nextPal = GEM_PALETTES[nextIndex]

      const activeBase = interpolateRGB(currentPal.base, nextPal.base, subT)
      const activeMid = interpolateRGB(currentPal.mid, nextPal.mid, subT)
      const activeHigh = interpolateRGB(currentPal.highlight, nextPal.highlight, subT)

      // 2. Ambient background radial aura & glow
      const auraGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.6)
      auraGrad.addColorStop(0, `rgba(${activeMid[0]}, ${activeMid[1]}, ${activeMid[2]}, 0.35)`)
      auraGrad.addColorStop(0.5, `rgba(${activeBase[0]}, ${activeBase[1]}, ${activeBase[2]}, 0.15)`)
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = auraGrad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2)
      ctx.fill()

      // 3. Facet Geometry Calculation (Brilliant Cut Octagonal Gemstone)
      // Rotation angle
      const rot = elapsed * 0.00075 // smooth gentle rotation

      // Light source orbiting
      const lightAngle = elapsed * 0.0012
      const lightX = Math.cos(lightAngle)
      const lightY = Math.sin(lightAngle)

      const numSides = 8
      const tableRadius = radius * 0.52
      const starRadius = radius * 0.72
      const girdleRadius = radius

      // Calculate table vertices
      const tableVerts = []
      const starVerts = []
      const girdleVerts = []

      for (let i = 0; i < numSides; i++) {
        const a = rot + (i * 2 * Math.PI) / numSides
        tableVerts.push({
          x: cx + Math.cos(a) * tableRadius,
          y: cy + Math.sin(a) * tableRadius,
        })

        const aStar = rot + ((i + 0.5) * 2 * Math.PI) / numSides
        starVerts.push({
          x: cx + Math.cos(aStar) * starRadius,
          y: cy + Math.sin(aStar) * starRadius,
        })

        const aGirdle = rot + (i * 2 * Math.PI) / numSides
        girdleVerts.push({
          x: cx + Math.cos(aGirdle) * girdleRadius,
          y: cy + Math.sin(aGirdle) * girdleRadius,
        })
      }

      // Helper to calculate lighting brightness on a facet based on normal vector
      const getFacetColor = (p1, p2, p3, baseFactor = 0.5) => {
        const mx = (p1.x + p2.x + p3.x) / 3 - cx
        const my = (p1.y + p2.y + p3.y) / 3 - cy
        const dist = Math.hypot(mx, my) || 1
        const nx = mx / dist
        const ny = my / dist
        const dot = Math.max(0, nx * lightX + ny * lightY)

        // Specular highlight spike
        const spec = Math.pow(dot, 5) * 0.65
        const intensity = Math.min(1, baseFactor + dot * 0.4 + spec)

        const r = Math.min(255, Math.round(activeBase[0] + (activeHigh[0] - activeBase[0]) * intensity + spec * 120))
        const g = Math.min(255, Math.round(activeBase[1] + (activeHigh[1] - activeBase[1]) * intensity + spec * 120))
        const b = Math.min(255, Math.round(activeBase[2] + (activeHigh[2] - activeBase[2]) * intensity + spec * 120))

        return `rgb(${r}, ${g}, ${b})`
      }

      // Helper to draw a facet polygon
      const drawPoly = (pts, fillStyle, strokeStyle = 'rgba(255, 255, 255, 0.28)') => {
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y)
        }
        ctx.closePath()
        ctx.fillStyle = fillStyle
        ctx.fill()
        ctx.lineWidth = 0.8
        ctx.strokeStyle = strokeStyle
        ctx.stroke()
      }

      // Draw outer Girdle / Kite facets
      for (let i = 0; i < numSides; i++) {
        const next = (i + 1) % numSides
        const prev = (i - 1 + numSides) % numSides

        // Triangle from star to girdles
        const kitePts = [
          starVerts[i],
          girdleVerts[next],
          tableVerts[next],
        ]
        const col1 = getFacetColor(kitePts[0], kitePts[1], kitePts[2], 0.35)
        drawPoly(kitePts, col1)

        const kitePts2 = [
          starVerts[prev],
          girdleVerts[i],
          tableVerts[i],
        ]
        const col2 = getFacetColor(kitePts2[0], kitePts2[1], kitePts2[2], 0.4)
        drawPoly(kitePts2, col2)
      }

      // Draw Star facets (connecting table to star vertices)
      for (let i = 0; i < numSides; i++) {
        const next = (i + 1) % numSides
        const starTriangle = [
          tableVerts[i],
          starVerts[i],
          tableVerts[next],
        ]
        const col = getFacetColor(starTriangle[0], starTriangle[1], starTriangle[2], 0.6)
        drawPoly(starTriangle, col, 'rgba(255, 255, 255, 0.4)')
      }

      // Draw Central Table facet (flat bright face)
      const tableGrad = ctx.createLinearGradient(
        cx + lightX * tableRadius,
        cy + lightY * tableRadius,
        cx - lightX * tableRadius,
        cy - lightY * tableRadius,
      )
      tableGrad.addColorStop(0, `rgba(${activeHigh[0]}, ${activeHigh[1]}, ${activeHigh[2]}, 0.95)`)
      tableGrad.addColorStop(0.6, `rgba(${activeMid[0]}, ${activeMid[1]}, ${activeMid[2]}, 0.85)`)
      tableGrad.addColorStop(1, `rgba(${activeBase[0]}, ${activeBase[1]}, ${activeBase[2]}, 0.75)`)

      drawPoly(tableVerts, tableGrad, 'rgba(255, 255, 255, 0.6)')

      // 4. Specular sparkle shimmer on the brightest vertex
      const sparkleProgress = (elapsed * 0.003) % (Math.PI * 2)
      const sparkleSize = (Math.sin(sparkleProgress) + 1) * 3 + 2
      const topVertex = tableVerts[0]

      ctx.save()
      ctx.translate(topVertex.x, topVertex.y)
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(0, 0, sparkleSize * 0.6, 0, Math.PI * 2)
      ctx.fill()

      // Sparkle 4-point star rays
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(-sparkleSize * 2, 0)
      ctx.lineTo(sparkleSize * 2, 0)
      ctx.moveTo(0, -sparkleSize * 2)
      ctx.lineTo(0, sparkleSize * 2)
      ctx.stroke()
      ctx.restore()

      if (elapsed < TOTAL_DURATION) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        handleFinish()
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion, handleFinish])

  if (phase === 'done') return null

  const isHindi = lang === 'hi'

  return (
    <motion.aside
      className="gemstone-intro-overlay"
      aria-label="Welcome Introduction"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <button
        type="button"
        className="intro-skip-btn"
        onClick={handleFinish}
        aria-label={isHindi ? 'परिचय छोड़ें' : 'Skip Introduction'}
      >
        <span>{isHindi ? 'छोड़ें' : 'Skip'}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="intro-content">
        {/* Gemstone Canvas Centerpiece */}
        <div className="intro-gemstone-stage">
          <canvas ref={canvasRef} className="intro-gemstone-canvas" />
        </div>

        {/* Cinematic Typography Reveal */}
        <motion.div
          className="intro-typography"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
        >
          <motion.h1
            className="intro-brand-heading"
            initial={{ letterSpacing: '0.15em' }}
            animate={{ letterSpacing: '0.28em' }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            {isHindi ? 'सचिन ज्वैलर्स' : 'SACHIN JEWELLERS'}
          </motion.h1>

          <motion.p
            className="intro-tagline-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.8, ease: EASE }}
          >
            {isHindi ? 'द हाउस ऑफ फाइन जेमस्टोन्स' : 'THE HOUSE OF FINE GEMSTONES'}
          </motion.p>

          <motion.div
            className="intro-gold-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 2.2, ease: EASE }}
          />

          <motion.p
            className="intro-location-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.8, delay: 2.5, ease: EASE }}
          >
            {isHindi
              ? 'प्राकृतिक प्रमाणित वैदिक रत्न · देहरादून धरोहर'
              : 'Natural Certified Vedic Gemstones · Dehradun Heritage'}
          </motion.p>
        </motion.div>
      </div>
    </motion.aside>
  )
}
