import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import FadeSection from '../common/FadeSection.jsx'

export default function GemstoneCategoryGrid({ lang = 'en', t }) {
  const isHi = lang === 'hi'

  const categories = [
    {
      id: 'navratna',
      icon: '👑',
      badge: '9 Sacred Vedic Stones',
      title: isHi ? 'नवरत्न संग्रह (Precious Gems)' : 'Navratna Collection',
      sub: isHi
        ? 'माणिक्य, नीलम, पन्ना, पुखराज, हीरा, मोती, मूंगा, गोमेद, लहसुनिया'
        : 'Burma Ruby, Ceylon Blue Sapphire, Emerald, Yellow Sapphire, Coral, Pearl, Hessonite',
      count: '9 Stones',
      link: '/catalogue?collection=gemstones&category=navratna',
      glowClass: 'cat-glow-navratna',
    },
    {
      id: 'upratna',
      icon: '✨',
      badge: 'Vedic Substitutes',
      title: isHi ? 'उपरत्न संग्रह (Upratna)' : 'Upratna Collection',
      sub: isHi
        ? 'तुरमली, जमुनिया, रक्तमणि, पेरिडॉट, फिरोजा, सुनहला'
        : 'Tourmaline, Amethyst, Garnet, Peridot, Turquoise, Citrine',
      count: '8+ Stones',
      link: '/catalogue?collection=gemstones&category=upratna',
      glowClass: 'cat-glow-upratna',
    },
    {
      id: 'semi-precious',
      icon: '💎',
      badge: 'Astrological & Healing',
      title: isHi ? 'सेमी-प्रेशियस रत्न (Semi-Precious)' : 'Semi-Precious Collection',
      sub: isHi
        ? 'ओपल, पुखराज टोपाज़, जरकन, हकीक, चंद्रकांत, टाइगर आई'
        : 'Australian Opal, Blue Topaz, Natural Zircon, Hakik, Moonstone, Tiger Eye',
      count: '12+ Stones',
      link: '/catalogue?collection=gemstones&category=semi-precious',
      glowClass: 'cat-glow-semi',
    },
    {
      id: 'pearl-organic',
      icon: '🐚',
      badge: 'Marine & Organic Origin',
      title: isHi ? 'मोती एवं प्राकृतिक मूंगा (Pearl & Organic)' : 'Pearl & Organic Gems',
      sub: isHi
        ? 'साउथ सी मोती, बसरा मोती, प्राकृतिक इतालवी लाल मूंगा'
        : 'Natural South Sea Pearl, Basra Pearl, Italian Red Coral, Triangular Moonga',
      count: '4+ Rare Varieties',
      link: '/catalogue?collection=gemstones&category=pearl-organic',
      glowClass: 'cat-glow-organic',
    },
  ]

  return (
    <FadeSection id="gemstone-categories" className="section gemstone-categories-section">
      <div className="section-header-center">
        <span className="section-kicker">✦ THE HOUSE OF FINE GEMSTONES ✦</span>
        <h2>{t.categories.heading}</h2>
        <p className="section-subtext">{t.categories.subheading}</p>
      </div>

      <div className="container">
        <div className="gemstone-cat-grid">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              className={`gemstone-cat-card ${cat.glowClass}`}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            >
              <Link to={cat.link} className="gemstone-cat-card-inner">
                <div className="cat-card-top">
                  <span className="cat-card-icon">{cat.icon}</span>
                  <span className="cat-card-badge">{cat.badge}</span>
                </div>

                <div className="cat-card-main">
                  <h3 className="cat-card-title">{cat.title}</h3>
                  <p className="cat-card-sub">{cat.sub}</p>
                </div>

                <div className="cat-card-bottom">
                  <span className="cat-card-count">{cat.count}</span>
                  <span className="cat-card-arrow">
                    <span>{isHi ? 'संग्रह देखें' : 'Explore'}</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeSection>
  )
}
