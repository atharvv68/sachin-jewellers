/**
 * Visual check: boots the Vite dev server in-process, screenshots a handful
 * of key routes to screenshots/, then shuts the server down.
 *
 *   npm run shots
 *
 * Exits non-zero if any page logged a console error or threw — so it can
 * gate a workflow. Screenshots are git-ignored; they are a working artefact,
 * look at them after any UI change.
 */
import { createServer } from 'vite'
import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const ROUTES = [
  ['home', '/'],
  ['stone-zircon', '/stone/zircon'],
  ['cart', '/cart'],
  ['checkout', '/checkout'],
  [
    'checkout-success',
    '/checkout/success?txnid=SJDEMO123&amount=149600.00&pinfo=Sachin+Jewellers+order+-+3+items&pid=PAYU00099',
  ],
  ['checkout-failure', '/checkout/failure?txnid=SJDEMO123&reason=User+cancelled'],
]

// Seed a cart so /cart and /checkout show real content, not just their
// empty states. Shape must match src/cart/cartContext.js.
const SEED_CART = [
  { productId: 'burma-ruby', variantSlug: 'burma-ruby', carat: 5, quantity: 1, unitPrice: 140000 },
  { productId: 'zircon', variantSlug: 'zireon-blue', carat: 4, quantity: 2, unitPrice: 4800 },
]

const OUT = path.resolve('screenshots')
const VIEWPORT = { width: 1280, height: 900 }

async function waitForSplashGone(page) {
  // The homepage plays a ~2s intro splash on first visit.
  await page
    .waitForSelector('.splash', { state: 'detached', timeout: 5000 })
    .catch(() => {})
}

// The marketing page reveals its sections on scroll (Motion `whileInView`).
// Walk the whole page so every section is in its final state, then return
// to the top for a clean full-page screenshot.
async function revealByScrolling(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, document.body.scrollHeight)
    await new Promise((r) => setTimeout(r, 250))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 250))
  })
}

const server = await createServer({
  configFile: path.resolve('vite.config.js'),
  server: { port: 5173, strictPort: false },
  logLevel: 'warn',
})
await server.listen()
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
console.log(`dev server  ${base}`)

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: VIEWPORT,
  reducedMotion: 'reduce', // app honours this (MotionConfig reducedMotion="user")
})
await context.addInitScript((cart) => {
  try {
    localStorage.setItem('sj-cart-v1', JSON.stringify(cart))
  } catch {
    /* ignore */
  }
}, SEED_CART)
const page = await context.newPage()

const problems = []
page.on('console', (m) => {
  if (m.type() === 'error') problems.push(`[console] ${m.text()}`)
})
page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`))
page.on('requestfailed', (r) => {
  const u = r.url()
  if (!u.includes('/@vite/') && r.resourceType() !== 'websocket') {
    problems.push(`[requestfailed] ${u} — ${r.failure()?.errorText}`)
  }
})

try {
  for (const [name, route] of ROUTES) {
    await page.goto(base + route, { waitUntil: 'load' })
    if (route === '/') await waitForSplashGone(page)
    await page.waitForTimeout(600)
    await revealByScrolling(page)
    const file = path.join(OUT, `${name}.png`)
    await page.screenshot({ path: file, fullPage: true })
    console.log(`  saved  screenshots/${name}.png  (${route})`)
  }
} finally {
  await browser.close()
  await server.close()
}

if (problems.length) {
  console.error(`\n${problems.length} page problem(s):\n${problems.join('\n')}`)
  process.exitCode = 1
} else {
  console.log('\nno console errors on any route')
}
