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
  ['catalogue', '/#catalogue'],
  ['stone-zircon', '/stone/zircon'],
  ['stone-ceylon-blue-sapphire', '/stone/ceylon-blue-sapphire'],
  ['stone-ceylon-yellow-sapphire', '/stone/ceylon-yellow-sapphire'],
  ['stone-pitambari-neelam', '/stone/pitambari-neelam'],
  ['cart', '/cart'],
  ['checkout', '/checkout'],
  [
    'checkout-success',
    '/checkout/success?txnid=SJDEMO123&amount=207500.00&pinfo=Sachin+Jewellers+order+-+3+items&pid=PAYU00099',
  ],
  ['checkout-failure', '/checkout/failure?txnid=SJDEMO123&reason=User+cancelled'],
]

// Seed a cart so /cart and /checkout show real content, not just their
// empty states. Shape must match src/cart/cartContext.js.
const SEED_CART = [
  { productId: 'burma-ruby', variantSlug: 'burma-ruby', sizeLabel: '5-6 ct', quantity: 1, unitPrice: 200000 },
  { productId: 'zircon', variantSlug: 'zireon-blue', sizeLabel: '4-5 ct', quantity: 2, unitPrice: 3750 },
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

// Fill the Kundali form and shoot just that section, so the live preview
// panel's filled-in state is captured (empty state shows on `home`).
async function shootKundaliFilled() {
  await page.goto(base + '/', { waitUntil: 'load' })
  await waitForSplashGone(page)
  await page.waitForTimeout(400)
  await page.fill('.kundali-form input[name="dob"]', '1996-07-20')
  await page.waitForTimeout(500)
  await page.fill('.kundali-form input[name="tob"]', '09:45')
  await page.waitForTimeout(600)
  const section = page.locator('#kundali-checker')
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  const file = path.join(OUT, 'kundali-filled.png')
  await section.screenshot({ path: file })
  console.log('  saved  screenshots/kundali-filled.png  (/ — form filled)')
}

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
  await shootKundaliFilled()
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
