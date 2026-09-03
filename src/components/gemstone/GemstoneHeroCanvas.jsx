import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

export default function GemstoneHeroCanvas() {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let startTime = null

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = rect.width || 360
      const h = rect.height || 360
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    if (prefersReducedMotion) {
      // Draw a single static luxury golden-blue sapphire refraction
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.38

      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.5)
      grad.addColorStop(0, 'rgba(201, 162, 39, 0.35)')
      grad.addColorStop(0.5, 'rgba(28, 85, 158, 0.2)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2)
      ctx.fill()
      return () => window.removeEventListener('resize', handleResize)
    }

    const render = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.36

      ctx.clearRect(0, 0, w, h)

      // Ambient gold / sapphire breathing aura
      const auraPulse = (Math.sin(elapsed * 0.001) + 1) * 0.5
      const auraGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.7)
      auraGrad.addColorStop(0, `rgba(201, 162, 39, ${0.22 + auraPulse * 0.12})`)
      auraGrad.addColorStop(0.4, `rgba(28, 85, 158, ${0.15 + auraPulse * 0.08})`)
      auraGrad.addColorStop(1, 'rgba(16, 13, 11, 0)')

      ctx.fillStyle = auraGrad
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.7, 0, Math.PI * 2)
      ctx.fill()

      // Rotating faceted polygon
      const rot = elapsed * 0.0004
      const lightX = Math.cos(elapsed * 0.0008)
      const lightY = Math.sin(elapsed * 0.0008)

      const numSides = 8
      const tableRadius = radius * 0.5
      const starRadius = radius * 0.72
      const girdleRadius = radius

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

      const drawPoly = (pts, fillStyle, strokeStyle = 'rgba(201, 162, 39, 0.35)') => {
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

      // Outer facets
      for (let i = 0; i < numSides; i++) {
        const next = (i + 1) % numSides
        const kitePts = [starVerts[i], girdleVerts[next], tableVerts[next]]
        const mx = (kitePts[0].x + kitePts[1].x + kitePts[2].x) / 3 - cx
        const my = (kitePts[0].y + kitePts[1].y + kitePts[2].y) / 3 - cy
        const dot = Math.max(0, (mx * lightX + my * lightY) / (radius || 1))
        const alpha = 0.25 + dot * 0.45

        drawPoly(kitePts, `rgba(201, 162, 39, ${alpha})`)
      }

      // Star facets
      for (let i = 0; i < numSides; i++) {
        const next = (i + 1) % numSides
        const starTriangle = [tableVerts[i], starVerts[i], tableVerts[next]]
        const dot = Math.max(0, Math.sin(rot + i))
        const alpha = 0.35 + dot * 0.45

        drawPoly(starTriangle, `rgba(235, 220, 180, ${alpha})`, 'rgba(201, 162, 39, 0.45)')
      }

      // Center table
      const tableGrad = ctx.createLinearGradient(
        cx + lightX * tableRadius,
        cy + lightY * tableRadius,
        cx - lightX * tableRadius,
        cy - lightY * tableRadius,
      )
      tableGrad.addColorStop(0, 'rgba(253, 224, 71, 0.75)')
      tableGrad.addColorStop(0.5, 'rgba(201, 162, 39, 0.65)')
      tableGrad.addColorStop(1, 'rgba(110, 78, 8, 0.55)')

      drawPoly(tableVerts, tableGrad, 'rgba(255, 255, 255, 0.6)')

      // Specular Star Sparkle
      const sparkleProgress = (elapsed * 0.002) % (Math.PI * 2)
      const sparkleSize = (Math.sin(sparkleProgress) + 1) * 2.5 + 1.5
      const topVertex = tableVerts[0]

      ctx.save()
      ctx.translate(topVertex.x, topVertex.y)
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(0, 0, sparkleSize * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-sparkleSize * 1.8, 0)
      ctx.lineTo(sparkleSize * 1.8, 0)
      ctx.moveTo(0, -sparkleSize * 1.8)
      ctx.lineTo(0, sparkleSize * 1.8)
      ctx.stroke()
      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [prefersReducedMotion])

  return <canvas ref={canvasRef} className="gemstone-hero-canvas" aria-hidden="true" />
}
