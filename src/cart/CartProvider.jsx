import { useEffect, useMemo, useState } from 'react'
import {
  CartContext,
  clampQty,
  lineKey,
  loadItems,
  STORAGE_KEY,
} from './cartContext.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable (private mode, quota) — cart stays in memory */
    }
  }, [items])

  const value = useMemo(() => {
    const add = (item) =>
      setItems((cur) => {
        const key = lineKey(item)
        const idx = cur.findIndex((x) => lineKey(x) === key)
        if (idx === -1) {
          return [
            ...cur,
            {
              productId: item.productId,
              variantSlug: item.variantSlug,
              carat: item.carat,
              quantity: clampQty(item.quantity ?? 1),
              unitPrice: item.unitPrice,
            },
          ]
        }
        // Same variant + carat already in the cart: bump quantity, keep the
        // originally captured unit price.
        const next = cur.slice()
        next[idx] = {
          ...next[idx],
          quantity: clampQty(next[idx].quantity + (item.quantity ?? 1)),
        }
        return next
      })

    const setQuantity = (variantSlug, carat, quantity) =>
      setItems((cur) =>
        cur.map((x) =>
          x.variantSlug === variantSlug && x.carat === carat
            ? { ...x, quantity: clampQty(quantity) }
            : x,
        ),
      )

    const removeItem = (variantSlug, carat) =>
      setItems((cur) =>
        cur.filter(
          (x) => !(x.variantSlug === variantSlug && x.carat === carat),
        ),
      )

    const clear = () => setItems([])

    const count = items.reduce((n, x) => n + x.quantity, 0)
    const subtotal = items.reduce((s, x) => s + x.unitPrice * x.quantity, 0)

    return { items, add, setQuantity, removeItem, clear, count, subtotal }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
