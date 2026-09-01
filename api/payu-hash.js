/**
 * POST /api/payu-hash
 * ---------------------------------------------------------------------------
 * Starts a PayU (test) hosted checkout for the current cart.
 *
 * Request (JSON): {
 *   items: [{ productId, variantSlug, carat, quantity }],   // cart lines only
 *   firstname, email, phone
 * }
 *
 * The order amount is ALWAYS recomputed here from stonesData.js (see
 * _order.js). Any `amount` / `price` / `total` in the request body is
 * ignored — never read. An unknown productId or variantSlug, or a carat
 * that is not in that variant's caratOptions, fails the request with 400.
 * There is no fallback and no default.
 *
 * Response (JSON): { action, fields }
 *   action — PayU's hosted-checkout URL for PAYU_ENV
 *   fields — the exact hidden inputs the browser must POST to `action`.
 *            The client constructs nothing itself.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   PAYU_KEY   — merchant key
 *   PAYU_SALT  — merchant salt  (secret — never sent to the browser)
 *   PAYU_ENV   — "test" (default) or "production"
 */
import crypto from 'node:crypto'
import { computeOrder, orderProductInfo } from './_order.js'

const PAYMENT_URLS = {
  test: 'https://test.payu.in/_payment',
  production: 'https://secure.payu.in/_payment',
}

const sha512 = (value) =>
  crypto.createHash('sha512').update(value, 'utf8').digest('hex')

// PayU-safe transaction id: alphanumeric, <= 25 chars.
const makeTxnId = () =>
  `SJ${Date.now().toString(36)}${crypto.randomBytes(6).toString('hex')}`
    .slice(0, 25)
    .toUpperCase()

function baseUrl(req) {
  const proto = String(req.headers['x-forwarded-proto'] || 'https')
    .split(',')[0]
    .trim()
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${proto}://${host}`
}

function readJson(raw) {
  if (raw && typeof raw === 'object') return raw
  if (typeof raw === 'string' && raw) {
    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }
  return {}
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = process.env.PAYU_KEY
  const salt = process.env.PAYU_SALT
  const env = (process.env.PAYU_ENV || 'test').toLowerCase()

  if (!key || !salt) {
    return res
      .status(500)
      .json({ error: 'Payment gateway is not configured on the server.' })
  }

  const body = readJson(req.body)

  const firstname = String(body.firstname ?? '').trim().slice(0, 60)
  const email = String(body.email ?? '').trim().slice(0, 120)
  const phone = String(body.phone ?? '').replace(/\D/g, '').slice(0, 15)

  if (firstname.length < 2) {
    return res.status(400).json({ error: 'Name is required.' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  // Trusted amount — recomputed from the catalogue, never from the client.
  const order = computeOrder(body.items)
  if (order.error) {
    return res.status(400).json({ error: order.error })
  }

  const amount = order.amount.toFixed(2)
  const productinfo = orderProductInfo(order.lines)
  const txnid = makeTxnId()

  // sha512(key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||SALT)
  const hashString = [
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    '', // udf1
    '', // udf2
    '', // udf3
    '', // udf4
    '', // udf5
    '', // (udf6)
    '', // (udf7)
    '', // (udf8)
    '', // (udf9)
    '', // (udf10)
    salt,
  ].join('|')
  const hash = sha512(hashString)

  const origin = baseUrl(req)

  return res.status(200).json({
    action: PAYMENT_URLS[env] || PAYMENT_URLS.test,
    fields: {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl: `${origin}/api/payu-response`,
      furl: `${origin}/api/payu-response`,
      hash,
    },
  })
}
