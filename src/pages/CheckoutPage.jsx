import { useEffect, useMemo, useState } from 'react'
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
import { ShopLayout } from './ShopChrome.jsx'
import './shop.css'

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  {
    name: 'address',
    label: 'Full address',
    type: 'textarea',
    autoComplete: 'street-address',
  },
  {
    name: 'pincode',
    label: 'Pincode',
    type: 'text',
    autoComplete: 'postal-code',
    inputMode: 'numeric',
  },
]

// Strip +91 / 91 / leading 0 and any spacing, then require a 10-digit
// Indian mobile number starting 6-9.
const normalisePhone = (raw) =>
  raw.replace(/[\s()-]/g, '').replace(/^(\+?91|0)/, '')

function validate(values) {
  const e = {}
  if (values.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^[6-9]\d{9}$/.test(normalisePhone(values.phone.trim())))
    e.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    e.email = 'Enter a valid email address.'
  if (values.address.trim().length < 10)
    e.address = 'Enter your full delivery address.'
  if (!/^[1-9]\d{5}$/.test(values.pincode.trim()))
    e.pincode = 'Enter a valid 6-digit pincode.'
  return e
}

// Build a hidden form and POST it — hands the browser off to PayU's hosted
// checkout, exactly as PayU's classic integration expects.
function postToPayU(action, fields) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = action
  form.style.display = 'none'
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value == null ? '' : String(value)
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}

export default function CheckoutPage() {
  const { items, subtotal } = useCart()
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
  })
  const [touched, setTouched] = useState({})
  const [phase, setPhase] = useState('idle') // 'idle' | 'submitting' | 'error'
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    document.title = `Checkout — ${BRAND}`
  }, [])

  const errors = useMemo(() => validate(values), [values])
  const isValid = Object.keys(errors).length === 0

  const rows = items.map((item) => {
    const hit = getVariantBySlug(item.variantSlug)
    const size = hit ? findSize(hit.variant, item.sizeLabel) : null
    return { item, hit, size }
  })

  const savings = rows.reduce(
    (sum, { item, size }) =>
      size && hasDiscount(size)
        ? sum + (size.mrp - item.unitPrice) * item.quantity
        : sum,
    0,
  )

  if (items.length === 0) {
    return (
      <ShopLayout className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <p className="cart-empty">
          Your cart is empty, so there is nothing to check out.
        </p>
        <Link to="/" state={{ view: 'catalogue' }} className="btn btn-solid">
          Browse the catalogue
        </Link>
      </ShopLayout>
    )
  }

  const show = (name) => touched[name] && errors[name]
  const markTouched = (name) => setTouched((t) => ({ ...t, [name]: true }))
  const setField = (name, value) =>
    setValues((v) => ({ ...v, [name]: value }))

  async function proceedToPayment() {
    setTouched({
      name: true,
      phone: true,
      email: true,
      address: true,
      pincode: true,
    })
    if (!isValid) return

    setPhase('submitting')
    setServerError(null)
    try {
      const res = await fetch('/api/payu-hash', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          // Only the cart lines — the server recomputes the amount itself.
          items: items.map((x) => ({
            productId: x.productId,
            variantSlug: x.variantSlug,
            sizeLabel: x.sizeLabel,
            quantity: x.quantity,
          })),
          firstname: values.name.trim(),
          email: values.email.trim(),
          phone: normalisePhone(values.phone.trim()),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.action || !data.fields) {
        setServerError(
          data.error ||
            'We could not start the payment. Please try again in a moment.',
        )
        setPhase('error')
        return
      }
      postToPayU(data.action, data.fields)
      // The browser now navigates to PayU; keep the button in its
      // "submitting" state until it does.
    } catch {
      setServerError(
        'We could not reach the payment service. Please check your connection and try again.',
      )
      setPhase('error')
    }
  }

  const submitting = phase === 'submitting'

  return (
    <ShopLayout className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* -------- Customer form -------- */}
        <form
          className="checkout-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            proceedToPayment()
          }}
        >
          <h2>Delivery details</h2>
          {FIELDS.map((f) => (
            <label key={f.name} className="checkout-label">
              <span>{f.label}</span>
              {f.type === 'textarea' ? (
                <textarea
                  name={f.name}
                  rows="3"
                  autoComplete={f.autoComplete}
                  value={values[f.name]}
                  aria-invalid={show(f.name) ? 'true' : undefined}
                  onChange={(e) => setField(f.name, e.target.value)}
                  onBlur={() => markTouched(f.name)}
                />
              ) : (
                <input
                  type={f.type}
                  name={f.name}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  value={values[f.name]}
                  aria-invalid={show(f.name) ? 'true' : undefined}
                  onChange={(e) => setField(f.name, e.target.value)}
                  onBlur={() => markTouched(f.name)}
                />
              )}
              {show(f.name) && (
                <span className="checkout-error">{errors[f.name]}</span>
              )}
            </label>
          ))}
        </form>

        {/* -------- Order summary -------- */}
        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <ul className="checkout-items">
            {rows.map(({ item, hit, size }) => {
              const key = `${item.variantSlug}::${item.sizeLabel}`
              const name = hit ? hit.product.name : item.variantSlug
              const discounted = size ? hasDiscount(size) : false
              return (
                <li key={key}>
                  <span className="checkout-item-img">
                    {hit && <img src={hit.variant.image} alt="" loading="lazy" />}
                  </span>
                  <span className="checkout-item-text">
                    <span className="checkout-item-name">{name}</span>
                    <span className="checkout-item-meta">
                      <span>
                        {hit?.variant.color ? `${hit.variant.color} · ` : ''}
                        {item.sizeLabel} &times; {item.quantity}
                      </span>
                      {discounted && (
                        <span className="price-off">
                          {discountPercent(size)}% OFF
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="checkout-item-line">
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

          {savings > 0 && (
            <div className="checkout-save">
              <span>You save</span>
              <span>{formatINR(savings)}</span>
            </div>
          )}
          <div className="checkout-total">
            <span>Total</span>
            <span className="checkout-total-amt">{formatINR(subtotal)}</span>
          </div>

          <button
            type="button"
            className="btn btn-solid checkout-pay"
            disabled={submitting}
            aria-busy={submitting ? 'true' : undefined}
            onClick={proceedToPayment}
          >
            {submitting ? 'Redirecting to PayU…' : 'Proceed to payment'}
          </button>

          {phase === 'error' && serverError && (
            <p className="checkout-pay-error" role="alert">
              {serverError}
            </p>
          )}

          <p className="checkout-pay-note">
            You&rsquo;ll be taken to PayU&rsquo;s secure checkout to pay. PayU is
            in <strong>test mode</strong> — no real payment is taken yet.
          </p>
          <Link to="/cart" className="checkout-back">
            &larr; Back to cart
          </Link>
        </aside>
      </div>
    </ShopLayout>
  )
}
