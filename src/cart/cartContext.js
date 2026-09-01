import { createContext, useContext } from 'react'

/**
 * Cart context + hook + storage helpers. No JSX here — the provider
 * component lives in CartProvider.jsx.
 *
 * A line item is intentionally minimal and self-describing:
 *   { productId, variantSlug, carat, quantity, unitPrice }
 * `unitPrice` is captured when the item is added, so a later change to
 * ratePerCarat in stonesData.js never silently re-prices what someone
 * already put in their cart.
 */

export const STORAGE_KEY = 'sj-cart-v1'
export const MAX_QTY = 10

export const CartContext = createContext(null)

export function lineKey(item) {
  return `${item.variantSlug}::${item.carat}`
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
    return parsed
      .filter(
        (x) =>
          x &&
          typeof x.productId === 'string' &&
          typeof x.variantSlug === 'string' &&
          Number.isFinite(x.carat) &&
          Number.isFinite(x.unitPrice),
      )
      .map((x) => ({
        productId: x.productId,
        variantSlug: x.variantSlug,
        carat: x.carat,
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
