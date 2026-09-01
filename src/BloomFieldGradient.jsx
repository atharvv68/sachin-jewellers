import { useEffect, useRef } from 'react'

/* ============================================================================
 *  Bloom Field — the "Pipo" animated mesh gradient (recreated from 21st.dev)
 * ----------------------------------------------------------------------------
 *  One radial blob per colour, each anchored at its own point, blended over a
 *  solid backdrop, then softened with an oversized-layer blur and a bitmap
 *  grain overlay — the two things the plain CSS version can only approximate.
 *
 *  The background is re-derived every frame from an elapsed-seconds clock `t`.
 *  Every per-frame modulation is written as `sin(x + p) - sin(p)`, which is
 *  exactly 0 at `ph = 0`, so the first frame is identical to the static CSS
 *  and the motion eases in with no snap. Nothing is rounded per frame, and the
 *  per-blob phase is a STATIC hash of the seed — the seed is never re-hashed
 *  through a moving value (that would be white-noise flicker, not motion).
 *
 *  Usage: drop into any positioned, full-bleed container.
 *    <div style={{ position: 'relative' }}>
 *      <BloomFieldGradient />
 *      …content…
 *    </div>
 * ========================================================================== */

const TAU = Math.PI * 2

const BACKDROP = '#FAF8EE' // generator: backdrop

// Blobs painted bottom → top (Paper, then Sky blue, then Apricot on top),
// matching the CSS layer order. cx/cy are the anchor in %; `radius` is the
// fraction of the anchor→farthest-corner distance at which the blob reaches
// zero alpha (CSS `circle at … / farthest-corner`).
const BLOBS = [
  { name: 'Paper', rgb: [250, 249, 239], cx: 53.11, cy: 12.71, radius: 0.6665 },
  { name: 'Sky blue', rgb: [163, 206, 255], cx: 25.17, cy: 75.99, radius: 0.446 },
  { name: 'Apricot', rgb: [230, 176, 147], cx: 68.1, cy: 46.03, radius: 0.411 },
]

// Shared alpha falloff (from the CSS stop list: 1 → .844 → .5 → .156 → 0).
const STOPS = [
  [0, 1],
  [0.25, 0.844],
  [0.5, 0.5],
  [0.75, 0.156],
  [1, 0],
]

// Straight from the generator parameters.
const SPEED = 0.86 // speed 86
const MOTION_AMOUNT = 0.72 // motionAmount 72
const DIR = 1 // motionReverse: false
const SEED = 1
const SOFTEN = 80 // soften 80  → blur radius
const GRAIN_OPACITY = 0.305 // matches the SVG grain layer

// Hash the seed ONCE, at module load, into a fixed phase offset per blob.
// This is only chaotic if you re-hash a value that moves every frame; as a
// constant offset it is exactly what keeps each blob on its own slow drift.
function hashPhase(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return (x - Math.floor(x)) * TAU
}
const PHASES = BLOBS.map((_, i) => ({
  px: hashPhase(SEED + i * 1.37),
  py: hashPhase(SEED + i * 1.37 + 100),
}))

// Small tiled grey-noise bitmap, centred on 128 so 'overlay' stays neutral.
function makeGrainTile(size) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  if (!g) return c
  const img = g.createImageData(size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() * 2 - 1) * 70
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  g.putImageData(img, 0, 0)
  return c
}

export default function BloomFieldGradient({ className, style }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    // Offscreen: the sharp mesh, before the soften blur.
    const mesh = document.createElement('canvas')
    const mctx = mesh.getContext('2d')
    const grainTile = makeGrainTile(128)

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let W = 0
    let H = 0
    let dpr = 1
    let blurPx = 0
    let grain = null // full-size static grain layer, rebuilt on resize
    let raf = 0
    let last = 0
    let elapsed = 0

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = Math.max(1, Math.round(rect.width * dpr))
      H = Math.max(1, Math.round(rect.height * dpr))
      canvas.width = mesh.width = W
      canvas.height = mesh.height = H

      // Blur scales with the smaller edge; clamp so it stays affordable.
      const logical = Math.min(rect.width, rect.height)
      blurPx = Math.min((SOFTEN / 100) * logical * 0.038, 42) * dpr

      // Pre-render the (static) grain once at full resolution.
      grain = document.createElement('canvas')
      grain.width = W
      grain.height = H
      const gctx = grain.getContext('2d')
      const pattern = gctx && gctx.createPattern(grainTile, 'repeat')
      if (gctx && pattern) {
        gctx.fillStyle = pattern
        gctx.fillRect(0, 0, W, H)
      } else {
        grain = null
      }
    }

    function farthestCorner(ax, ay) {
      return Math.hypot(Math.max(ax, W - ax), Math.max(ay, H - ay))
    }

    function draw(t) {
      const ph = t * SPEED * DIR
      const amt = MOTION_AMOUNT

      // 1 — solid backdrop
      mctx.globalCompositeOperation = 'source-over'
      mctx.fillStyle = BACKDROP
      mctx.fillRect(0, 0, W, H)

      // 2 — one radial blob per colour, drifting on its static phase
      for (let i = 0; i < BLOBS.length; i++) {
        const b = BLOBS[i]
        const { px, py } = PHASES[i]

        // exactly 0 at ph = 0 → first frame matches the static CSS
        const dx = (Math.sin(ph * 0.55 + px) - Math.sin(px)) * 14 * amt
        const dy = (Math.sin(ph * 0.43 + py) - Math.sin(py)) * 14 * amt

        const cx = ((b.cx + dx) / 100) * W
        const cy = ((b.cy + dy) / 100) * H
        const anchorX = (b.cx / 100) * W
        const anchorY = (b.cy / 100) * H
        const r = b.radius * farthestCorner(anchorX, anchorY)

        const grad = mctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        const [rr, gg, bb] = b.rgb
        for (let s = 0; s < STOPS.length; s++) {
          grad.addColorStop(STOPS[s][0], `rgba(${rr},${gg},${bb},${STOPS[s][1]})`)
        }
        mctx.fillStyle = grad
        mctx.fillRect(0, 0, W, H)
      }

      // 3 — composite the mesh with the oversized-layer soften blur. The mesh
      //     is opaque to its edges; drawing it a little past the canvas keeps
      //     the blur from sampling transparent pixels at the border.
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, W, H)
      ctx.filter = blurPx > 0.5 ? `blur(${blurPx}px)` : 'none'
      const pad = Math.ceil(blurPx * 2)
      ctx.drawImage(mesh, -pad, -pad, W + pad * 2, H + pad * 2)
      ctx.filter = 'none'

      // 4 — bitmap grain, overlay-blended
      if (grain) {
        ctx.globalCompositeOperation = 'overlay'
        ctx.globalAlpha = GRAIN_OPACITY
        ctx.drawImage(grain, 0, 0)
        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
      }
    }

    function frame(now) {
      if (!last) last = now
      const dt = Math.min(now - last, 100) // clamp gaps (e.g. backgrounded tab)
      last = now
      elapsed += dt / 1000
      draw(elapsed)
      raf = requestAnimationFrame(frame)
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    function start() {
      if (raf || reduce) return
      last = 0
      raf = requestAnimationFrame(frame)
    }

    function onVisibility() {
      if (document.hidden) stop()
      else start()
    }

    resize()
    draw(reduce ? 0 : elapsed)
    if (!reduce) start()

    const ro = new ResizeObserver(() => {
      resize()
      draw(reduce ? 0 : elapsed)
    })
    ro.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        background: BACKDROP,
        ...style,
      }}
    />
  )
}
