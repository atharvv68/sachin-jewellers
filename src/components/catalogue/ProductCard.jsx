import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  defaultVariant,
  priceRange,
  formatINR,
  hasDiscount,
  discountPercent,
  hasColours,
} from '../../data/stonesData.js'

export default function ProductCard({ product }) {
  const v = defaultVariant(product)
  const { from, to } = priceRange(v)

  const onOffer = v.sizes.every(hasDiscount)
  const mrpFrom = onOffer ? Math.min(...v.sizes.map((s) => s.mrp)) : 0
  const mrpTo = onOffer ? Math.max(...v.sizes.map((s) => s.mrp)) : 0
  const pct = onOffer ? discountPercent(v.sizes[0]) : 0
  const uniformPct = onOffer && v.sizes.every((s) => discountPercent(s) === pct)

  return (
    <motion.article
      className="product-card"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/stone/${product.id}`} className="product-card-link">
        <span className="product-img">
          <img src={v.image} alt={product.name} loading="lazy" />
        </span>
        <div className="product-info">
          <span className="product-tag">{product.category}</span>
          <h3 className="product-card-heading">
            {product.name}{' '}
            <span className="product-hi">({v.hindiName})</span>
          </h3>
          <p className="product-price">
            <span className="price-now">
              {from === to ? (
                formatINR(from)
              ) : (
                <>
                  {formatINR(from)} &ndash; {formatINR(to)}
                </>
              )}
            </span>
            {onOffer && (
              <s className="price-was">
                {mrpFrom === mrpTo ? (
                  formatINR(mrpFrom)
                ) : (
                  <>
                    {formatINR(mrpFrom)} &ndash; {formatINR(mrpTo)}
                  </>
                )}
              </s>
            )}
            {uniformPct && <span className="price-off">{pct}% OFF</span>}
          </p>
          <p className="product-desc">{v.short}</p>
          {hasColours(product) && (
            <p className="product-colours">{product.variants.length} colours</p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
