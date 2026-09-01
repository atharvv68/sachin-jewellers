import { Link } from 'react-router-dom'
import { useCart } from '../cart/cartContext.js'
import { BRAND, BUSINESS } from '../shopConfig.js'
import sjMonogram from '../assets/sj-monogram-only.png'
import './shop.css'

function CartIcon() {
  const { count } = useCart()
  return (
    <Link
      to="/cart"
      className="nav-cart shop-cart-link"
      aria-label={`Cart${count ? `, ${count} item${count === 1 ? '' : 's'}` : ' (empty)'}`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2"
        />
      </svg>
      {count > 0 && <span className="nav-cart-count">{count}</span>}
    </Link>
  )
}

/** Sticky header for the commerce pages. English-only by design. */
export function ShopHeader() {
  return (
    <header className="navbar shop-header">
      <Link to="/" className="navbar-brand">
        <img src={sjMonogram} alt="" className="navbar-logo" />
        <span>{BRAND}</span>
      </Link>
      <div className="navbar-right">
        <div className="navbar-links">
          <Link to="/" state={{ view: 'catalogue' }}>
            Catalogue
          </Link>
        </div>
        <CartIcon />
      </div>
    </header>
  )
}

export function ShopFooter() {
  return (
    <footer className="shop-footer">
      <div className="shop-footer-inner">
        <p className="shop-footer-brand">{BRAND}</p>
        <p className="shop-footer-line">
          <span>Proprietor:</span> {BUSINESS.proprietor}
        </p>
        <p className="shop-footer-line">
          <span>GSTIN:</span> {BUSINESS.gstin}
        </p>
        <p className="shop-footer-line">
          <span>Address:</span> {BUSINESS.address}
        </p>
        <p className="shop-footer-copy">
          &copy; {new Date().getFullYear()} {BRAND}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

/** Page shell: sticky header, main region, footer. */
export function ShopLayout({ children, className = '' }) {
  return (
    <div className="shop-page">
      <ShopHeader />
      <main className={`shop-main ${className}`.trim()}>{children}</main>
      <ShopFooter />
    </div>
  )
}

/** Shared not-found body (used by /stone/:id unknown ids and the catch-all route). */
export function NotFound({
  title = 'Page not found',
  message = 'The page you are looking for does not exist or has moved.',
}) {
  return (
    <ShopLayout className="shop-notfound">
      <p className="shop-eyebrow">Sachin Jewellers</p>
      <h1 className="shop-notfound-title">{title}</h1>
      <p className="shop-notfound-msg">{message}</p>
      <Link to="/" state={{ view: 'catalogue' }} className="btn btn-solid">
        Back to catalogue
      </Link>
    </ShopLayout>
  )
}

/** Compact quantity stepper, clamped to [min, max]. */
export function QuantityStepper({ value, onChange, min = 1, max = 10, label = 'Quantity' }) {
  const set = (n) => onChange(Math.max(min, Math.min(max, n)))
  return (
    <div className="qty-stepper" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => set(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span aria-live="polite" aria-label={`${label}: ${value}`}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
