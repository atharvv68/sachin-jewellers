import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  byCategory,
  defaultSize,
  defaultVariant,
  discountPercent,
  findSize,
  formatINR,
  getProduct,
  hasColours,
  hasDiscount,
  priceOf,
  priceRange,
} from '../data/stonesData.js'
import { BRAND } from '../shopConfig.js'
import { useCart } from '../cart/cartContext.js'
import { NotFound, QuantityStepper, ShopLayout } from './ShopChrome.jsx'
import './shop.css'

const MAX_QTY = 10

const variantForColour = (product, colour) => {
  if (!colour) return null
  const lower = colour.toLowerCase()
  return (
    product.variants.find(
      (v) => v.color && v.color.toLowerCase() === lower,
    ) || null
  )
}

function metaDescription(product, variant) {
  const colour = variant.color ? `${variant.color} ` : ''
  return (
    `${colour}${product.name} (${variant.hindiName}) — ${variant.short} ` +
    `${variant.certified ? 'Lab-certified. ' : ''}Origin: ${variant.origin}. ` +
    `Buy online at ${BRAND}.`
  ).slice(0, 300)
}

export default function StonePage() {
  const { id } = useParams()
  const product = getProduct(id)

  if (!product) {
    return (
      <NotFound
        title="Stone not found"
        message="We couldn't find that stone. It may have been renamed or removed."
      />
    )
  }

  return <StoneDetail key={product.id} product={product} />
}

function StoneDetail({ product }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { add } = useCart()

  const colours = hasColours(product)
  const fallback = defaultVariant(product)
  const variant = variantForColour(product, searchParams.get('color')) || fallback

  const [sizeChoice, setSizeChoice] = useState(() => defaultSize(variant).label)
  const [qty, setQty] = useState(1)
  const [addedTick, setAddedTick] = useState(0)

  // The active size, derived: keep the chosen label only while the current
  // variant offers it, otherwise fall back to that variant's default size.
  // (Derived rather than an effect so a colour switch never leaves a stale
  // size selected, even for one render.)
  const size = findSize(variant, sizeChoice) || defaultSize(variant)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [product.id])

  // Per-product document title + meta description, restored on unmount.
  useEffect(() => {
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content') ?? null
    document.title = `${product.name} (${variant.hindiName}) — ${BRAND}`
    meta?.setAttribute('content', metaDescription(product, variant))
    return () => {
      document.title = prevTitle
      if (meta && prevDesc != null) meta.setAttribute('content', prevDesc)
    }
  }, [product, variant])

  // Auto-dismiss the "added to cart" confirmation.
  useEffect(() => {
    if (!addedTick) return undefined
    const t = setTimeout(() => setAddedTick(0), 3500)
    return () => clearTimeout(t)
  }, [addedTick])

  const unitPrice = priceOf(size)
  const total = unitPrice * qty

  const selectColour = (v) => {
    if (v.slug === variant.slug) return
    setSearchParams(
      v.color === fallback.color ? {} : { color: v.color.toLowerCase() },
      { replace: false },
    )
  }

  const lineItem = () => ({
    productId: product.id,
    variantSlug: variant.slug,
    sizeLabel: size.label,
    quantity: qty,
    unitPrice,
  })

  const addToCart = () => {
    add(lineItem())
    setAddedTick((n) => n + 1)
  }

  const buyNow = () => {
    add(lineItem())
    navigate('/checkout')
  }

  const related = byCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const title = `${product.name} (${variant.hindiName})`

  return (
    <ShopLayout className="stone-page">
      <nav className="stone-crumbs" aria-label="Breadcrumb">
        <Link to="/catalogue">
          Catalogue
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="stone-layout">
        {/* -------- Left: gallery -------- */}
        <div className="stone-gallery">
          <div className="stone-hero">
            <img
              src={variant.image}
              alt={`${product.name}${variant.color ? ` — ${variant.color}` : ''}`}
              width="720"
              height="720"
            />
          </div>

          {colours && (
            <ul className="stone-thumbs" aria-label="Colours">
              {product.variants.map((v) => {
                const active = v.slug === variant.slug
                return (
                  <li key={v.slug}>
                    <button
                      type="button"
                      className={`stone-thumb${active ? ' is-active' : ''}`}
                      aria-current={active ? 'true' : undefined}
                      aria-label={v.color}
                      onClick={() => selectColour(v)}
                    >
                      <img src={v.image} alt="" loading="lazy" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* -------- Right: details -------- */}
        <div className="stone-info">
          <p className="shop-eyebrow">{BRAND}</p>
          <h1 className="stone-title">{title}</h1>

          <div className="stone-price">
            <span className="stone-price-now">{formatINR(unitPrice)}</span>
            {hasDiscount(size) && (
              <>
                <s className="price-was">{formatINR(size.mrp)}</s>
                <span className="price-off">{discountPercent(size)}% OFF</span>
              </>
            )}
          </div>

          {colours && (
            <div className="stone-field">
              <p className="stone-field-label">
                Colour: <strong>{variant.color}</strong>
              </p>
              <div className="pill-row" role="group" aria-label="Colour">
                {product.variants.map((v) => {
                  const active = v.slug === variant.slug
                  return (
                    <button
                      key={v.slug}
                      type="button"
                      className={`pill pill-colour${active ? ' is-active' : ''}`}
                      aria-pressed={active}
                      onClick={() => selectColour(v)}
                    >
                      <span
                        className="pill-dot"
                        style={{ background: v.swatch || 'transparent' }}
                        aria-hidden="true"
                      />
                      {v.color}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="stone-field">
            <p className="stone-field-label">
              Carat: <strong>{size.label}</strong>
            </p>
            <div className="pill-row" role="group" aria-label="Carat">
              {variant.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className={`pill${s.label === size.label ? ' is-active' : ''}`}
                  aria-pressed={s.label === size.label}
                  onClick={() => setSizeChoice(s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="stone-field">
            <p className="stone-field-label">Quantity</p>
            <QuantityStepper value={qty} onChange={setQty} min={1} max={MAX_QTY} />
          </div>

          <div className="stone-total" aria-live="polite">
            <span>Total</span>
            <span className="stone-total-amt">{formatINR(total)}</span>
            {qty > 1 && (
              <span className="stone-total-unit">
                {qty} &times; {formatINR(unitPrice)}
              </span>
            )}
            {hasDiscount(size) && (
              <span className="stone-total-save">
                <s className="price-was">{formatINR(size.mrp * qty)}</s>
                You save {formatINR((size.mrp - unitPrice) * qty)}
              </span>
            )}
          </div>

          <div className="stone-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={addToCart}
            >
              Add to cart
            </button>
            <button type="button" className="btn btn-solid" onClick={buyNow}>
              Buy now
            </button>
          </div>

          {addedTick > 0 && (
            <p className="stone-added" role="status">
              Added to cart.{' '}
              <Link to="/cart">View cart &rarr;</Link>
            </p>
          )}

          <dl className="stone-specs">
            <div>
              <dt>Planet</dt>
              <dd>{variant.planet}</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>{variant.origin}</dd>
            </div>
            <div>
              <dt>Metal</dt>
              <dd>{variant.metal}</dd>
            </div>
            <div>
              <dt>Day</dt>
              <dd>{variant.day}</dd>
            </div>
            <div>
              <dt>Finger</dt>
              <dd>{variant.finger}</dd>
            </div>
            {variant.certified && (
              <div>
                <dt>Certified</dt>
                <dd>Yes — lab certified</dd>
              </div>
            )}
          </dl>

          <p className="stone-short">{variant.short}</p>
          {variant.note && <p className="stone-note">{variant.note}</p>}
        </div>
      </div>

      {related.length > 0 && (
        <section className="stone-related">
          <h2>More in {product.category}</h2>
          <ul className="related-grid">
            {related.map((p) => {
              const rv = defaultVariant(p)
              const rvOffer = rv.sizes.every(hasDiscount)
              const rvMrpFrom = rvOffer
                ? Math.min(...rv.sizes.map((s) => s.mrp))
                : 0
              const rvPct = rvOffer ? discountPercent(rv.sizes[0]) : 0
              const rvUniformPct =
                rvOffer && rv.sizes.every((s) => discountPercent(s) === rvPct)
              return (
                <li key={p.id}>
                  <Link to={`/stone/${p.id}`} className="related-card">
                    <span className="related-img">
                      <img src={rv.image} alt="" loading="lazy" />
                    </span>
                    <span className="related-name">
                      {p.name} <em>({rv.hindiName})</em>
                    </span>
                    <span className="related-from">
                      <span>from {formatINR(priceRange(rv).from)}</span>
                      {rvOffer && (
                        <s className="price-was">{formatINR(rvMrpFrom)}</s>
                      )}
                      {rvUniformPct && (
                        <span className="price-off">{rvPct}% OFF</span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </ShopLayout>
  )
}
