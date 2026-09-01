import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { formatINR } from '../data/stonesData.js'
import { BRAND } from '../shopConfig.js'
import { useCart } from '../cart/cartContext.js'
import { ShopLayout } from './ShopChrome.jsx'
import './shop.css'

/**
 * Landing page for the PayU return (surl / furl → /api/payu-response, which
 * 302-redirects here after verifying the reverse hash). We only ever reach
 * `/checkout/success` when the server confirmed `verified && status===success`.
 */
export default function CheckoutResultPage({ kind }) {
  const [params] = useSearchParams()
  const { clear } = useCart()
  const success = kind === 'success'
  const cleared = useRef(false)

  useEffect(() => {
    document.title = `${
      success ? 'Payment successful' : 'Payment not completed'
    } — ${BRAND}`
    if (success && !cleared.current) {
      cleared.current = true
      clear()
    }
  }, [success, clear])

  const txnid = params.get('txnid')
  const payId = params.get('pid')
  const pinfo = params.get('pinfo')
  const amtNum = Number(params.get('amount'))
  const amount =
    Number.isFinite(amtNum) && amtNum > 0
      ? formatINR(Math.round(amtNum))
      : null
  const reason =
    params.get('reason') ||
    { verification: 'The payment response could not be verified.', config: 'The payment gateway is not configured.' }[
      params.get('error')
    ] ||
    null

  const hasFacts = pinfo || amount || txnid || payId || reason

  return (
    <ShopLayout className="checkout-result">
      <p className="shop-eyebrow">{BRAND}</p>
      <h1 className="result-heading">
        {success ? 'Payment successful' : 'Payment not completed'}
      </h1>
      <p className="result-lede">
        {success
          ? 'Thank you — your payment is confirmed and your order is placed. We will message you shortly about certification and dispatch.'
          : 'Your payment did not go through. If any amount was debited, your bank reverses it automatically. You can try again whenever you like.'}
      </p>

      {hasFacts && (
        <dl className="result-facts">
          {pinfo && (
            <div>
              <dt>Order</dt>
              <dd>{pinfo}</dd>
            </div>
          )}
          {amount && (
            <div>
              <dt>Amount</dt>
              <dd>{amount}</dd>
            </div>
          )}
          {txnid && (
            <div>
              <dt>Transaction ID</dt>
              <dd>{txnid}</dd>
            </div>
          )}
          {payId && (
            <div>
              <dt>PayU Payment ID</dt>
              <dd>{payId}</dd>
            </div>
          )}
          {reason && (
            <div>
              <dt>Reason</dt>
              <dd>{reason}</dd>
            </div>
          )}
        </dl>
      )}

      <div className="result-actions">
        {success ? (
          <Link to="/" state={{ view: 'catalogue' }} className="btn btn-solid">
            Continue shopping
          </Link>
        ) : (
          <>
            <Link to="/checkout" className="btn btn-solid">
              Try again
            </Link>
            <Link to="/cart" className="btn btn-outline">
              Back to cart
            </Link>
          </>
        )}
      </div>
    </ShopLayout>
  )
}
