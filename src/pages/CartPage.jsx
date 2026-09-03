import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  discountPercent,
  findSize,
  formatINR,
  getVariantBySlug,
  hasDiscount,
} from '../data/stonesData.js'
import { BRAND } from '../shopConfig.js'
import { useCart } from '../cart/cartContext.js'
import { QuantityStepper, ShopLayout } from './ShopChrome.jsx'
import './shop.css'

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCart()

  useEffect(() => {
    document.title = `Your cart — ${BRAND}`
  }, [])

  // Re-hydrate each line from stonesData; a slug that no longer resolves
  // (data changed since it was added) still renders, as a removable row.
  const rows = items.map((item) => {
    const hit = getVariantBySlug(item.variantSlug)
    const variant = hit?.variant ?? null
    const size = variant ? findSize(variant, item.sizeLabel) : null
    return { item, product: hit?.product ?? null, variant, size }
  })

  // Total saved against MRP, summed over the lines that are discounted.
  const savings = rows.reduce(
    (sum, { item, size }) =>
      size && hasDiscount(size)
        ? sum + (size.mrp - item.unitPrice) * item.quantity
        : sum,
    0,
  )

  if (items.length === 0) {
    return (
      <ShopLayout className="cart-page">
        <h1 className="cart-title">Your cart</h1>
        <p className="cart-empty">Your cart is empty.</p>
        <Link to="/" state={{ view: 'catalogue' }} className="btn btn-solid">
          Browse the catalogue
        </Link>
      </ShopLayout>
    )
  }

  return (
    <ShopLayout className="cart-page">
      <h1 className="cart-title">Your cart</h1>

      <ul className="cart-list">
        {rows.map(({ item, product, variant, size }) => {
          const key = `${item.variantSlug}::${item.sizeLabel}`
          const name = product ? product.name : item.variantSlug
          const discounted = size ? hasDiscount(size) : false
          return (
            <li className="cart-row" key={key}>
              <span className="cart-row-img">
                {variant ? (
                  <img src={variant.image} alt="" loading="lazy" />
                ) : (
                  <span className="cart-row-img-missing" aria-hidden="true" />
                )}
              </span>

              <div className="cart-row-main">
                <p className="cart-row-name">
                  {product && variant ? (
                    <Link to={`/stone/${product.id}`}>
                      {name}
                      {variant.hindiName ? ` (${variant.hindiName})` : ''}
                    </Link>
                  ) : (
                    <span>{name} — no longer available</span>
                  )}
                </p>
                <p className="cart-row-meta">
                  <span>
                    {variant?.color ? `${variant.color} · ` : ''}
                    {item.sizeLabel} &middot; {formatINR(item.unitPrice)} each
                  </span>
                  {discounted && (
                    <>
                      <s className="price-was">{formatINR(size.mrp)}</s>
                      <span className="price-off">
                        {discountPercent(size)}% OFF
                      </span>
                    </>
                  )}
                </p>

                <div className="cart-row-controls">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(q) =>
                      setQuantity(item.variantSlug, item.sizeLabel, q)
                    }
                    min={1}
                    max={10}
                    label={`Quantity for ${name}`}
                  />
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => removeItem(item.variantSlug, item.sizeLabel)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <span className="cart-row-line">
                {discounted && (
                  <s className="price-was">
                    {formatINR(size.mrp * item.quantity)}
                  </s>
                )}
                {formatINR(item.unitPrice * item.quantity)}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="cart-summary">
        {savings > 0 && (
          <div className="cart-summary-save">
            <span>You save</span>
            <span>{formatINR(savings)}</span>
          </div>
        )}
        <div className="cart-summary-total">
          <span>Order total</span>
          <span className="cart-summary-amt">{formatINR(subtotal)}</span>
        </div>
        <p className="cart-summary-note">
          Shipping and any taxes are confirmed before payment.
        </p>
        <div className="cart-summary-actions">
          <Link to="/" state={{ view: 'catalogue' }} className="btn btn-outline">
            Continue shopping
          </Link>
          <Link to="/checkout" className="btn btn-solid">
            Checkout
          </Link>
        </div>
      </div>
    </ShopLayout>
  )
}
