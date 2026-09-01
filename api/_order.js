/**
 * Server-only: turn cart line items into a TRUSTED rupee amount.
 *
 * The client sends only { productId, variantSlug, carat, quantity } per line.
 * Any `amount` / `price` / `total` in the request body is never read here.
 * The amount is always recomputed from stonesData.js.
 *
 * Files prefixed with "_" are not exposed as API routes by Vercel.
 */
import { getProduct, getVariantBySlug, priceFor } from '../src/data/stonesData.js'

const MAX_QTY = 10
const MAX_LINES = 50

/**
 * @returns {{ amount: number, lines: Array }} on success,
 *          or {{ error: string }} on any invalid / unknown line.
 */
export function computeOrder(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return { error: 'Cart is empty.' }
  }
  if (rawItems.length > MAX_LINES) {
    return { error: 'Too many line items.' }
  }

  const lines = []
  let amount = 0

  for (const raw of rawItems) {
    const productId = String(raw?.productId ?? '')
    const variantSlug = String(raw?.variantSlug ?? '')
    const carat = Number(raw?.carat)
    const quantity = Number(raw?.quantity)

    if (!getProduct(productId)) {
      return { error: `Unknown product: ${productId || '(missing)'}` }
    }
    const hit = getVariantBySlug(variantSlug)
    if (!hit || hit.product.id !== productId) {
      return { error: `Unknown variant: ${variantSlug || '(missing)'}` }
    }
    const { variant } = hit
    if (!Number.isFinite(carat) || !variant.caratOptions.includes(carat)) {
      return {
        error: `Carat ${raw?.carat} is not available for ${variantSlug}.`,
      }
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return { error: `Invalid quantity for ${variantSlug}.` }
    }

    const unit = priceFor(variant, carat)
    amount += unit * quantity
    lines.push({
      name: hit.product.name,
      color: variant.color,
      carat,
      quantity,
      unit,
    })
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: 'Order total could not be computed.' }
  }

  return { amount, lines }
}

/** Short PayU `productinfo` string (<= 100 chars). */
export function orderProductInfo(lines) {
  if (lines.length === 1) {
    const l = lines[0]
    return `${l.name}${l.color ? ` (${l.color})` : ''} ${l.carat}ct x${l.quantity}`.slice(
      0,
      100,
    )
  }
  const count = lines.reduce((n, l) => n + l.quantity, 0)
  return `Sachin Jewellers order - ${count} item${count === 1 ? '' : 's'}`.slice(
    0,
    100,
  )
}
