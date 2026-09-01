/**
 * POST /api/payu-response   (PayU surl / furl callback)
 * ---------------------------------------------------------------------------
 * PayU posts the transaction result here as an application/x-www-form-urlencoded
 * form. We recompute the reverse hash with our salt and only trust the result
 * if it matches what PayU sent:
 *
 *   sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 *
 * (If PayU included `additionalCharges`, its documented variant
 *  `sha512(additionalCharges|SALT|status|...)` is also accepted.)
 *
 * After verifying, we 302-redirect the browser to the SPA result page with a
 * small, non-sensitive set of display fields. Anything that actually fulfils an
 * order must be done here, server-side, gated on `verified && status === success`
 * — never trusted from the redirect query on the client.
 *
 * Required environment variables: PAYU_KEY, PAYU_SALT
 */
import crypto from 'node:crypto'

const sha512 = (value) =>
  crypto.createHash('sha512').update(value, 'utf8').digest('hex')

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string' && req.body) {
    try {
      return Object.fromEntries(new URLSearchParams(req.body))
    } catch {
      return {}
    }
  }
  return {}
}

function reverseHash(salt, b, key, withAdditionalCharges) {
  const parts = [
    salt,
    b.status || '',
    '', // udf10
    '', // udf9
    '', // udf8
    '', // udf7
    '', // udf6
    b.udf5 || '',
    b.udf4 || '',
    b.udf3 || '',
    b.udf2 || '',
    b.udf1 || '',
    b.email || '',
    b.firstname || '',
    b.productinfo || '',
    b.amount || '',
    b.txnid || '',
    key,
  ]
  const str = withAdditionalCharges
    ? `${b.additionalCharges}|${parts.join('|')}`
    : parts.join('|')
  return sha512(str)
}

function equalHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch {
    return false
  }
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()
  }

  const redirect = (path, params) => {
    const qs = new URLSearchParams(params).toString()
    res.statusCode = 302
    res.setHeader('Location', qs ? `${path}?${qs}` : path)
    res.end()
  }

  const salt = process.env.PAYU_SALT
  const key = process.env.PAYU_KEY
  const b = readBody(req)

  const display = {
    txnid: String(b.txnid || '').slice(0, 40),
    amount: String(b.amount || '').slice(0, 20),
    pinfo: String(b.productinfo || '').slice(0, 120),
    pid: String(b.mihpayid || '').slice(0, 40),
  }

  if (!salt || !key) {
    return redirect('/checkout/failure', { ...display, error: 'config' })
  }

  const received = String(b.hash || '').toLowerCase()
  const verified =
    equalHex(received, reverseHash(salt, b, key, false)) ||
    (b.additionalCharges != null &&
      b.additionalCharges !== '' &&
      equalHex(received, reverseHash(salt, b, key, true)))

  if (!verified) {
    return redirect('/checkout/failure', { ...display, error: 'verification' })
  }

  const status = String(b.status || '').toLowerCase()
  if (status === 'success') {
    return redirect('/checkout/success', display)
  }

  const reason = String(
    b.error_Message || b.field9 || b.unmappedstatus || status || 'failed',
  ).slice(0, 160)
  return redirect('/checkout/failure', { ...display, reason })
}
