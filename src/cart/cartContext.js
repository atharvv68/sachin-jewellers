import { createContext, useContext } from 'react'

/**
 * Cart context + hook + storage helpers. No JSX here — the provider
 * component lives in CartProvider.jsx.
 *
 * A line item is intentionally minimal and self-describing:
 *   { productId, variantSlug, sizeLabel, quantity, unitPrice }
 * `sizeLabel` is the carat-range label ("5-6 ct") from the variant's
 * `sizes` array. `unitPrice` is the flat price of that size, captured
 * when the item is added, so a later price change in stonesData.js
 * never silently re-prices what someone already put in their cart.
 */

export const STORAGE_KEY = 'sj-cart-v1'
export const MAX_QTY = 10

export const CartContext = createContext(null)

export function lineKey(item) {
  return `${item.variantSlug}::${item.sizeLabel}`
}

export function clampQty(n) {
  const v = Math.round(Number(n) || 0)
  if (v < 1) return 1
  if (v > MAX_QTY) return MAX_QTY
  return v
}

export function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    // Pre-`sizes` carts stored a numeric `carat` and no `sizeLabel`. That
    // shape can't be re-priced against the new model, so drop the whole
    // cart rather than render stale rows.
    const isOldShape = parsed.some(
      (x) => x && x.sizeLabel === undefined && x.carat !== undefined,
    )
    if (isOldShape) {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      return []
    }

    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.productId === 'string' &&
          typeof x.variantSlug === 'string' &&
          typeof x.sizeLabel === 'string' &&
          Number.isFinite(x.unitPrice),
      )
      .map((x) => ({
        productId: x.productId,
        variantSlug: x.variantSlug,
        sizeLabel: x.sizeLabel,
        quantity: clampQty(x.quantity),
        unitPrice: x.unitPrice,
      }))
  } catch {
    return []
  }
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
