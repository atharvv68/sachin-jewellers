/**
 * POST /api/payu-hash
 * ---------------------------------------------------------------------------
 * Generates the PayU request hash for a single-product "Buy Now" checkout.
 *
 * Request  (JSON): { txnid, amount, productinfo, firstname, email }
 * Response (JSON): { key, hash, action }
 *
 *   key    — the PayU merchant key (public; goes in the checkout form)
 *   hash   — sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 *   action — the PayU hosted-checkout URL for the current PAYU_ENV
 *
 * The salt is read from the environment and used only to build the hash.
 * It is NEVER included in the response.
 *
 * Required environment variables (set in Vercel → Project → Settings → Env):
 *   PAYU_KEY   — merchant key
 *   PAYU_SALT  — merchant salt  (secret — never sent to the client)
 *   PAYU_ENV   — "test" (default) or "production"
 */
import crypto from 'node:crypto'

const PAYMENT_URLS = {
  test: 'https://test.payu.in/_payment',
  production: 'https://secure.payu.in/_payment',
}

const sha512 = (value) =>
  crypto.createHash('sha512').update(value, 'utf8').digest('hex')

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

  const body =
    req.body && typeof req.body === 'object'
      ? req.body
      : safeParse(req.body)

  const txnid = String(body.txnid ?? '').trim()
  const amount = String(body.amount ?? '').trim()
  const productinfo = String(body.productinfo ?? '').trim().slice(0, 100)
  const firstname = String(body.firstname ?? '').trim().slice(0, 60)
  const email = String(body.email ?? '').trim().slice(0, 120)

  if (!txnid || !amount || !productinfo || !firstname || !email) {
    return res.status(400).json({ error: 'Missing required checkout fields.' })
  }
  if (!/^[A-Za-z0-9_-]{1,25}$/.test(txnid)) {
    return res.status(400).json({ error: 'Invalid transaction id.' })
  }
  if (!/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount.' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  // udf1..udf5 are unused in this integration → empty strings.
  // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
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

  return res.status(200).json({
    key,
    hash,
    action: PAYMENT_URLS[env] || PAYMENT_URLS.test,
  })
}

function safeParse(raw) {
  if (typeof raw !== 'string' || !raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    try {
      return Object.fromEntries(new URLSearchParams(raw))
    } catch {
      return {}
    }
  }
}
