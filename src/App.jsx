import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { EclipticGeoMoon } from 'astronomy-engine'
import { products, resolvePrice, productImages } from './products'
import { POLICIES } from './policies'
import sjLogo from './assets/sj-logo-final.png'
import sjMonogram from './assets/sj-monogram-only.png'
import './App.css'

const BANNER_IMG =
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80'
const QUOTE_IMG =
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1920&q=80'
// Editorial side imagery for the desktop two-column sections.
const ABOUT_IMG =
  'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80'
const STONE_IMG =
  'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=900&q=80'
const KUNDALI_IMG =
  'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=900&q=80'

const EASE = [0.22, 1, 0.36, 1]

// Smoothly scroll a section into view (honours prefers-reduced-motion).
function smoothScrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

// A unique, PayU-safe transaction id (alphanumeric, <= 25 chars).
function makeTxnId() {
  const bytes = new Uint8Array(8)
  window.crypto.getRandomValues(bytes)
  const rand = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `SJ${Date.now().toString(36)}${rand}`.slice(0, 25).toUpperCase()
}

// Build a hidden form and submit it — this navigates the browser to PayU's
// hosted checkout, which is how PayU's classic integration expects the handoff.
function postToPayU(action, fields) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = action
  form.acceptCharset = 'UTF-8'
  form.style.display = 'none'
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value == null ? '' : String(value)
    form.appendChild(input)
  })
  document.body.appendChild(form)
  form.submit()
}

// Shop WhatsApp number in international format, digits only (no + or spaces).
const WHATSAPP_NUMBER = '911234567890' // TODO: replace with the shop's real number

// Owner contact details.
const OWNER_PHONE = '7409985747'
const OWNER_PHONE_INTL = '917409985747' // +91 India, for WhatsApp / tel links
const OWNER_EMAIL = 'dudsachin0@gmail.com'

/* Gemstone catalogue. `translit` is the romanised Hindi name. */
const STONES = {
  ruby: {
    en: 'Ruby',
    hiName: 'माणिक्य',
    translit: 'Manikya',
    desc: {
      en: 'The stone of the Sun. Traditionally worn to strengthen confidence, vitality and a natural sense of leadership.',
      hi: 'सूर्य का रत्न। परंपरागत रूप से आत्मविश्वास, ऊर्जा और नेतृत्व की स्वाभाविक भावना को मज़बूत करने के लिए पहना जाता है।',
    },
  },
  diamond: {
    en: 'Diamond',
    hiName: 'हीरा',
    translit: 'Heera',
    desc: {
      en: 'The stone of Venus. Associated with love, comfort, artistic refinement and lasting relationships.',
      hi: 'शुक्र का रत्न। प्रेम, सुख-सुविधा, कलात्मक रुचि और स्थायी रिश्तों से जुड़ा हुआ।',
    },
  },
  emerald: {
    en: 'Emerald',
    hiName: 'पन्ना',
    translit: 'Panna',
    desc: {
      en: 'The stone of Mercury. Worn to sharpen intellect, communication and clear thinking in work and study.',
      hi: 'बुध का रत्न। बुद्धि, संवाद और काम व अध्ययन में स्पष्ट सोच को तेज़ करने के लिए पहना जाता है।',
    },
  },
  pearl: {
    en: 'Pearl',
    hiName: 'मोती',
    translit: 'Moti',
    desc: {
      en: 'The stone of the Moon. Believed to calm the mind, steady the emotions and bring peace to daily life.',
      hi: 'चंद्रमा का रत्न। माना जाता है कि यह मन को शांत करता है, भावनाओं को स्थिर रखता है और जीवन में शांति लाता है।',
    },
  },
  coral: {
    en: 'Red Coral',
    hiName: 'मूँगा',
    translit: 'Moonga',
    desc: {
      en: 'The stone of Mars. Traditionally worn for courage, energy and the drive to see difficult tasks through.',
      hi: 'मंगल का रत्न। साहस, ऊर्जा और कठिन कार्यों को पूरा करने की प्रेरणा के लिए परंपरागत रूप से पहना जाता है।',
    },
  },
  yellowSapphire: {
    en: 'Yellow Sapphire',
    hiName: 'पुखराज',
    translit: 'Pukhraj',
    desc: {
      en: 'The stone of Jupiter. Associated with wisdom, prosperity, good fortune and guidance from elders.',
      hi: 'बृहस्पति का रत्न। ज्ञान, समृद्धि, सौभाग्य और बड़ों के मार्गदर्शन से जुड़ा हुआ।',
    },
  },
  blueSapphire: {
    en: 'Blue Sapphire',
    hiName: 'नीलम',
    translit: 'Neelam',
    desc: {
      en: 'The stone of Saturn. Known for discipline, focus and quick results — worn carefully and after testing.',
      hi: 'शनि का रत्न। अनुशासन, एकाग्रता और शीघ्र फल के लिए जाना जाता है — सावधानी और परीक्षण के बाद पहनें।',
    },
  },
}

/* The exact rashi → stone mapping. */
const RASHIS = [
  { key: 'mesha', en: 'Mesha', zodiac: 'Aries', hi: 'मेष', stone: 'ruby' },
  { key: 'vrishabha', en: 'Vrishabha', zodiac: 'Taurus', hi: 'वृषभ', stone: 'diamond' },
  { key: 'mithun', en: 'Mithun', zodiac: 'Gemini', hi: 'मिथुन', stone: 'emerald' },
  { key: 'kark', en: 'Kark', zodiac: 'Cancer', hi: 'कर्क', stone: 'pearl' },
  { key: 'simha', en: 'Simha', zodiac: 'Leo', hi: 'सिंह', stone: 'ruby' },
  { key: 'kanya', en: 'Kanya', zodiac: 'Virgo', hi: 'कन्या', stone: 'emerald' },
  { key: 'tula', en: 'Tula', zodiac: 'Libra', hi: 'तुला', stone: 'diamond' },
  { key: 'vrishchik', en: 'Vrishchik', zodiac: 'Scorpio', hi: 'वृश्चिक', stone: 'coral' },
  { key: 'dhanu', en: 'Dhanu', zodiac: 'Sagittarius', hi: 'धनु', stone: 'yellowSapphire' },
  { key: 'makar', en: 'Makar', zodiac: 'Capricorn', hi: 'मकर', stone: 'blueSapphire' },
  { key: 'kumbh', en: 'Kumbh', zodiac: 'Aquarius', hi: 'कुम्भ', stone: 'blueSapphire' },
  { key: 'meen', en: 'Meen', zodiac: 'Pisces', hi: 'मीन', stone: 'yellowSapphire' },
]

/* ---------------------------------------------------------------------------
 * Ratna Salaah (Stone Advisor) chatbot lookup table — rashi -> stone, metal,
 * recommended day and finger. Purely local, no API. Traditional Vedic astrology.
 * ------------------------------------------------------------------------- */
const RATNA_ADVICE = {
  mesha: {
    stone: { en: 'Red Coral (Moonga)', hi: 'मूँगा (Red Coral)' },
    metal: { en: 'Gold / Copper', hi: 'सोना / ताँबा' },
    day: { en: 'Tuesday', hi: 'मंगलवार' },
    finger: { en: 'Anamika (Ring finger)', hi: 'अनामिका उँगली (Ring finger)' },
  },
  vrishabha: {
    stone: { en: 'Diamond (Heera)', hi: 'हीरा (Diamond)' },
    metal: { en: 'Silver / Platinum', hi: 'चाँदी / प्लैटिनम' },
    day: { en: 'Friday', hi: 'शुक्रवार' },
    finger: { en: 'Madhyama (Middle finger)', hi: 'मध्यमा उँगली (Middle finger)' },
  },
  mithun: {
    stone: { en: 'Emerald (Panna)', hi: 'पन्ना (Emerald)' },
    metal: { en: 'Gold', hi: 'सोना' },
    day: { en: 'Wednesday', hi: 'बुधवार' },
    finger: { en: 'Kanishtha (Little finger)', hi: 'कनिष्ठा उँगली (Little finger)' },
  },
  kark: {
    stone: { en: 'Pearl (Moti)', hi: 'मोती (Pearl)' },
    metal: { en: 'Silver', hi: 'चाँदी' },
    day: { en: 'Monday', hi: 'सोमवार' },
    finger: { en: 'Kanishtha (Little finger)', hi: 'कनिष्ठा उँगली (Little finger)' },
  },
  simha: {
    stone: { en: 'Ruby (Manikya)', hi: 'माणिक्य (Ruby)' },
    metal: { en: 'Gold / Copper', hi: 'सोना / ताँबा' },
    day: { en: 'Sunday', hi: 'रविवार' },
    finger: { en: 'Anamika (Ring finger)', hi: 'अनामिका उँगली (Ring finger)' },
  },
  kanya: {
    stone: { en: 'Emerald (Panna)', hi: 'पन्ना (Emerald)' },
    metal: { en: 'Gold', hi: 'सोना' },
    day: { en: 'Wednesday', hi: 'बुधवार' },
    finger: { en: 'Kanishtha (Little finger)', hi: 'कनिष्ठा उँगली (Little finger)' },
  },
  tula: {
    stone: { en: 'Diamond (Heera)', hi: 'हीरा (Diamond)' },
    metal: { en: 'Silver / Platinum', hi: 'चाँदी / प्लैटिनम' },
    day: { en: 'Friday', hi: 'शुक्रवार' },
    finger: { en: 'Madhyama (Middle finger)', hi: 'मध्यमा उँगली (Middle finger)' },
  },
  vrishchik: {
    stone: { en: 'Red Coral (Moonga)', hi: 'मूँगा (Red Coral)' },
    metal: { en: 'Gold / Copper', hi: 'सोना / ताँबा' },
    day: { en: 'Tuesday', hi: 'मंगलवार' },
    finger: { en: 'Anamika (Ring finger)', hi: 'अनामिका उँगली (Ring finger)' },
  },
  dhanu: {
    stone: { en: 'Yellow Sapphire (Pukhraj)', hi: 'पुखराज (Yellow Sapphire)' },
    metal: { en: 'Gold', hi: 'सोना' },
    day: { en: 'Thursday', hi: 'गुरुवार' },
    finger: { en: 'Tarjani (Index finger)', hi: 'तर्जनी उँगली (Index finger)' },
  },
  makar: {
    stone: { en: 'Blue Sapphire (Neelam)', hi: 'नीलम (Blue Sapphire)' },
    metal: { en: 'Silver / Iron', hi: 'चाँदी / लोहा' },
    day: { en: 'Saturday', hi: 'शनिवार' },
    finger: { en: 'Madhyama (Middle finger)', hi: 'मध्यमा उँगली (Middle finger)' },
  },
  kumbh: {
    stone: { en: 'Blue Sapphire (Neelam)', hi: 'नीलम (Blue Sapphire)' },
    metal: { en: 'Silver / Iron', hi: 'चाँदी / लोहा' },
    day: { en: 'Saturday', hi: 'शनिवार' },
    finger: { en: 'Madhyama (Middle finger)', hi: 'मध्यमा उँगली (Middle finger)' },
  },
  meen: {
    stone: { en: 'Yellow Sapphire (Pukhraj)', hi: 'पुखराज (Yellow Sapphire)' },
    metal: { en: 'Gold', hi: 'सोना' },
    day: { en: 'Thursday', hi: 'गुरुवार' },
    finger: { en: 'Tarjani (Index finger)', hi: 'तर्जनी उँगली (Index finger)' },
  },
}

/* The 27 nakshatras in order, used by the Kundali checker. */
const NAKSHATRAS = [
  { en: 'Ashwini', hi: 'अश्विनी' },
  { en: 'Bharani', hi: 'भरणी' },
  { en: 'Krittika', hi: 'कृत्तिका' },
  { en: 'Rohini', hi: 'रोहिणी' },
  { en: 'Mrigashira', hi: 'मृगशिरा' },
  { en: 'Ardra', hi: 'आर्द्रा' },
  { en: 'Punarvasu', hi: 'पुनर्वसु' },
  { en: 'Pushya', hi: 'पुष्य' },
  { en: 'Ashlesha', hi: 'आश्लेषा' },
  { en: 'Magha', hi: 'मघा' },
  { en: 'Purva Phalguni', hi: 'पूर्व फाल्गुनी' },
  { en: 'Uttara Phalguni', hi: 'उत्तर फाल्गुनी' },
  { en: 'Hasta', hi: 'हस्त' },
  { en: 'Chitra', hi: 'चित्रा' },
  { en: 'Swati', hi: 'स्वाति' },
  { en: 'Vishakha', hi: 'विशाखा' },
  { en: 'Anuradha', hi: 'अनुराधा' },
  { en: 'Jyeshtha', hi: 'ज्येष्ठा' },
  { en: 'Mula', hi: 'मूल' },
  { en: 'Purva Ashadha', hi: 'पूर्वाषाढ़ा' },
  { en: 'Uttara Ashadha', hi: 'उत्तराषाढ़ा' },
  { en: 'Shravana', hi: 'श्रवण' },
  { en: 'Dhanishtha', hi: 'धनिष्ठा' },
  { en: 'Shatabhisha', hi: 'शतभिषा' },
  { en: 'Purva Bhadrapada', hi: 'पूर्व भाद्रपद' },
  { en: 'Uttara Bhadrapada', hi: 'उत्तर भाद्रपद' },
  { en: 'Revati', hi: 'रेवती' },
]

/* UTC offsets for the "born outside India" case (value = minutes east of UTC). */
const UTC_OFFSETS = [
  { label: 'UTC−12:00', minutes: -720 },
  { label: 'UTC−11:00', minutes: -660 },
  { label: 'UTC−10:00', minutes: -600 },
  { label: 'UTC−09:30', minutes: -570 },
  { label: 'UTC−09:00', minutes: -540 },
  { label: 'UTC−08:00', minutes: -480 },
  { label: 'UTC−07:00', minutes: -420 },
  { label: 'UTC−06:00', minutes: -360 },
  { label: 'UTC−05:00', minutes: -300 },
  { label: 'UTC−04:00', minutes: -240 },
  { label: 'UTC−03:30', minutes: -210 },
  { label: 'UTC−03:00', minutes: -180 },
  { label: 'UTC−02:00', minutes: -120 },
  { label: 'UTC−01:00', minutes: -60 },
  { label: 'UTC±00:00', minutes: 0 },
  { label: 'UTC+01:00', minutes: 60 },
  { label: 'UTC+02:00', minutes: 120 },
  { label: 'UTC+03:00', minutes: 180 },
  { label: 'UTC+03:30', minutes: 210 },
  { label: 'UTC+04:00', minutes: 240 },
  { label: 'UTC+04:30', minutes: 270 },
  { label: 'UTC+05:00', minutes: 300 },
  { label: 'UTC+05:30 (IST)', minutes: 330 },
  { label: 'UTC+05:45', minutes: 345 },
  { label: 'UTC+06:00', minutes: 360 },
  { label: 'UTC+06:30', minutes: 390 },
  { label: 'UTC+07:00', minutes: 420 },
  { label: 'UTC+08:00', minutes: 480 },
  { label: 'UTC+08:45', minutes: 525 },
  { label: 'UTC+09:00', minutes: 540 },
  { label: 'UTC+09:30', minutes: 570 },
  { label: 'UTC+10:00', minutes: 600 },
  { label: 'UTC+10:30', minutes: 630 },
  { label: 'UTC+11:00', minutes: 660 },
  { label: 'UTC+12:00', minutes: 720 },
  { label: 'UTC+12:45', minutes: 765 },
  { label: 'UTC+13:00', minutes: 780 },
  { label: 'UTC+14:00', minutes: 840 },
]

/* ---------------------------------------------------------------------------
 * All user-facing copy lives here. Add a language by adding a key with the
 * same shape. Every heading, paragraph, button label and form label is keyed.
 * ------------------------------------------------------------------------- */
const TRANSLATIONS = {
  en: {
    langName: 'हि',
    brand: 'Sachin Jewellers',
    nav: { about: 'About Us', catalogue: 'Catalogue' },
    catalogue: {
      heading: 'Our Catalogue',
      intro:
        'A selection of gemstones, rudraksha and bracelets currently available. Tap “Enquire” for price confirmation, certification details and worldwide shipping.',
      priceOnRequest: 'Price on request',
      enquire: 'Enquire',
      waMessage:
        'Hello Sachin Jewellers! I am interested in this product: {product} ({price}). Please share more details.',
    },
    ratna: {
      title: 'Ratna Salaah',
      subtitle: 'Stone Advisor',
      close: 'Close',
      greeting:
        "Namaste! Tell me your rashi, and I'll suggest the right stone, metal and day to wear it.",
      pickPrompt: 'Pick your rashi:',
      stone: 'Stone',
      metal: 'Metal',
      day: 'Day',
      finger: 'Finger',
      disclaimer: 'As per traditional Vedic astrology.',
      cta: 'Talk to Sachin Jewellers for the exact stone / design',
      waMessage:
        'Namaste! My rashi is {rashi} — recommended stone {stone}. I would like guidance on the exact stone and design.',
    },
    featured: {
      heading: 'Featured Gemstones',
      buy: 'Buy Now',
      enquire: 'Enquire on WhatsApp',
      browse: 'Browse Catalogue',
      prev: 'Previous gemstone',
      next: 'Next gemstone',
      show: 'Show',
      position: '{i} of {n}',
      buyWaMessage:
        'Namaste Sachin Jewellers! I would like to buy this now: {product} ({price}). Please help me place the order.',
    },
    checkout: {
      heading: 'Secure Checkout',
      close: 'Close',
      item: 'You are buying',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Delivery Address',
      secure:
        'Payment is processed securely by PayU. Your card, UPI and bank details are entered on PayU and are never seen or stored by us.',
      pay: 'Pay {amount} securely',
      redirecting: 'Taking you to PayU…',
      error:
        'We could not start the payment. Please try again in a moment, or contact us on WhatsApp.',
    },
    result: {
      successTitle: 'Payment Successful',
      successLead:
        'Thank you. We have received your payment and your order is confirmed.',
      failTitle: 'Payment Not Completed',
      failLead:
        'Your payment was not completed. If any amount was deducted it will be reversed by your bank automatically. You can try again any time.',
      verifyLead:
        'We received a payment response but could not verify it securely. Please do not re-pay yet.',
      verifyNote:
        'If any amount was deducted from your account, message us on WhatsApp with your Transaction ID below and we will confirm or refund it.',
      reasonLabel: 'Reason',
      product: 'Product',
      amount: 'Amount',
      txn: 'Transaction ID',
      payId: 'PayU Payment ID',
      successNote:
        'Our team will verify the details and share dispatch and tracking information with you on WhatsApp.',
      failNote:
        'Need help completing your order? Message us on WhatsApp and we will assist you personally.',
      home: 'Back to Home',
      whatsapp: 'Contact on WhatsApp',
      waSuccess:
        'Namaste Sachin Jewellers! I have completed the payment for {product} (Transaction ID: {txnid}). Please confirm my order.',
      waFailure:
        'Namaste Sachin Jewellers! My payment for {product} (Transaction ID: {txnid}) did not complete. Please help me.',
    },
    pdp: {
      back: 'Catalogue',
      details: 'View details',
      brand: 'Sachin Jewellers',
      sale: 'Sale',
      off: '{pct}% off',
      originalPriceLabel: 'Original price',
      shipping: 'Shipping calculated at checkout.',
      lucky: 'Check Your Lucky Gemstone & Rudraksha',
      carat: 'Carat',
      origin: 'Origin',
      quantity: 'Quantity',
      decrease: 'Decrease quantity',
      increase: 'Increase quantity',
      addToCart: 'Add to Cart',
      added: 'Added to cart',
      buyNow: 'Buy Now',
      enquire: 'Enquire on WhatsApp',
      priceOnRequest: 'Price on request',
      prevImage: 'Previous image',
      nextImage: 'Next image',
      imageLabel: 'Show image {n}',
      waMessage:
        'Namaste Sachin Jewellers! I am interested in {product}{carat} (Qty {qty}) — {price}. Please share details.',
    },
    cart: {
      open: 'Open cart',
      title: 'Your Cart',
      empty: 'Your cart is empty.',
      browse: 'Browse the catalogue',
      remove: 'Remove',
      qty: 'Qty',
      each: 'each',
      subtotal: 'Subtotal',
      note: 'Shipping and any taxes are confirmed on WhatsApp before payment. For instant card / UPI payment, use “Buy Now” on a product.',
      checkout: 'Checkout on WhatsApp',
      waIntro: 'Namaste Sachin Jewellers! I would like to order:',
      waLine: '{n}. {product}{carat} — x{qty} ({price})',
      waSubtotal: 'Subtotal: {total}',
    },
    banner: {
      title: 'Sachin Jewellers',
      tagline:
        'Genuine gemstones, sacred rudraksha and handcrafted bracelets, chosen with care and blessed by tradition.',
      shop: 'Shop Collection',
    },
    about: {
      heading: 'About Us',
      paragraphs: [
        'Sachin Jewellers was founded in 2011 with a simple belief: that the stones and beads people wear closest to their skin should be real, responsibly sourced and full of meaning. What began as a small family counter has grown into a trusted name for gemstones, rudraksha and bracelets, without ever losing the personal touch it started with.',
        'Every piece we offer is sourced directly from trusted artisans and mining families we have known for years. We travel to meet our suppliers, inspect rough material by hand and work with skilled craftspeople who cut, string and finish each item with patience. This close relationship lets us keep our promise of quality on every order, from a single certified stone to a full mala.',
        'Above all, we care about how you feel after your purchase. Our team takes time to understand what you are looking for, explains what you are buying in plain language and stays available long after the sale. Your trust and satisfaction are the reason Sachin Jewellers exists.',
      ],
    },
    owner: {
      heading: 'About the Owner',
      name: 'Sachin Kumar Verma',
      role: 'Founder',
      experience: '15 years in the jewellery business',
      bio: 'Sachin Kumar Verma founded Sachin Jewellers and has spent the last 15 years working closely with gemstone dealers, rudraksha sourcers and bench craftspeople. He personally checks the pieces that carry the shop’s name and is always happy to answer your questions himself.',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      whatsapp: 'Chat on WhatsApp',
      waMessage:
        'Hello Sachin Jewellers! I would like to speak with Sachin Kumar Verma.',
    },
    quote:
      'A true piece of jewellery is never only an ornament. It carries the hands that shaped it, the earth that grew it and the intention of the one who wears it.',
    trust: {
      heading: 'Why Choose Sachin Jewellers',
      cards: [
        {
          heading: 'Certified Authenticity',
          body: 'Every gemstone and rudraksha comes with clear certification from recognised laboratories, so you know exactly what you own. We never sell treated stones as natural, and we put the details in writing.',
        },
        {
          heading: 'Honest, Affordable Pricing',
          body: 'Because we buy straight from artisans and mining families, we skip the middlemen and pass the saving to you. Fair prices, no inflated markups and no pressure to spend more than you planned.',
        },
        {
          heading: 'Customers Around the World',
          body: 'We pack and ship securely to homes across India and overseas, with tracking on every parcel. Thousands of buyers in different countries trust us to deliver their pieces safely.',
        },
        {
          heading: 'Expert Guidance',
          body: 'Not sure which stone or bead suits you? Our advisors help you choose based on what you actually need, sharing traditional knowledge and practical advice without any hard selling.',
        },
      ],
    },
    findStone: {
      heading: 'Find Your Stone',
      intro:
        'Enter your name and rashi, and we will show you the gemstone that tradition recommends for your sign.',
      name: 'Name',
      rashi: 'Rashi (Zodiac Sign)',
      rashiPlaceholder: 'Select your rashi',
      submit: 'Show My Stone',
      greeting: 'Namaste, {name}. Based on your rashi, tradition points to:',
      whatsapp: 'Enquire on WhatsApp',
      reset: 'Try another rashi',
      waMessage:
        'Hello Sachin Jewellers! My name is {name} and my rashi is {rashi}. I would like to know more about {stone}.',
    },
    kundali: {
      heading: 'Free Kundali Checker',
      intro:
        'Enter your birth details to find your Moon sign (Rashi), Nakshatra and the gemstone tradition recommends. Everything is calculated on your device — nothing is sent anywhere.',
      fullName: 'Full Name',
      dob: 'Date of Birth',
      tob: 'Time of Birth',
      bornOutside: 'Born outside India?',
      utcOffset: 'UTC offset at birth place',
      submit: 'Check My Kundali',
      forLabel: 'Kundali for',
      moonRashi: 'Moon Rashi',
      nakshatra: 'Nakshatra',
      pada: 'Pada',
      stone: 'Recommended Stone',
      metal: 'Metal',
      day: 'Wearing Day',
      finger: 'Finger',
      whatsapp: 'Talk to Sachin Jewellers for the exact stone / design',
      waMessage:
        'Namaste! My Moon Rashi is {rashi} and Nakshatra {nakshatra} (Pada {pada}). Recommended stone {stone}. I would like guidance on the exact stone and design.',
      error: 'Please enter a valid date and time of birth.',
      disclaimer:
        'This is a Moon-sign (Rashi-Nakshatra) calculation using astronomical data. For a complete Kundali including Lagna, Dasha and divisional charts, please consult a qualified astrologer.',
    },
    enquiry: {
      heading: 'Send Us an Enquiry',
      intro:
        'Have a question about a piece, an order or custom work? Fill in the form and our team will get back to you shortly.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      comment: 'Comment',
      send: 'Send',
      success: 'Thank you. Your message has reached us and we will reply soon.',
    },
    footer: {
      rights: 'All rights reserved.',
      business: {
        title: 'Business Details',
        gstin: 'GSTIN',
        address: 'Registered Address',
        proprietor: 'Proprietor',
      },
    },
    policy: {
      close: 'Close',
      updated: 'Last updated',
      contactHeading: 'Questions about this policy?',
      contactBody:
        'Write to us and we will respond personally. Sachin Jewellers, proprietor Sachin Kumar Verma.',
      phoneLabel: 'Phone / WhatsApp',
      emailLabel: 'Email',
      gstinLabel: 'GSTIN',
    },
  },

  hi: {
    langName: 'EN',
    brand: 'सचिन ज्वैलर्स',
    nav: { about: 'हमारे बारे में', catalogue: 'कैटलॉग' },
    catalogue: {
      heading: 'हमारा कैटलॉग',
      intro:
        'अभी उपलब्ध रत्न, रुद्राक्ष और ब्रेसलेट का चयन। दाम की पुष्टि, प्रमाणपत्र और दुनिया भर में शिपिंग के लिए “पूछें” पर टैप करें।',
      priceOnRequest: 'दाम पूछें',
      enquire: 'पूछें',
      waMessage:
        'नमस्ते सचिन ज्वैलर्स! मुझे इस उत्पाद में रुचि है: {product} ({price})। कृपया और जानकारी दें।',
    },
    ratna: {
      title: 'रत्न सलाह',
      subtitle: 'रत्न सलाहकार',
      close: 'बंद करें',
      greeting:
        'नमस्ते! अपनी राशि बताइए, मैं आपको सही रत्न, धातु और पहनने का दिन बताऊँगा।',
      pickPrompt: 'अपनी राशि चुनें:',
      stone: 'रत्न',
      metal: 'धातु',
      day: 'दिन',
      finger: 'उँगली',
      disclaimer: 'पारंपरिक वैदिक ज्योतिष के अनुसार।',
      cta: 'सटीक रत्न / डिज़ाइन के लिए सचिन ज्वैलर्स से बात करें',
      waMessage:
        'नमस्ते! मेरी राशि {rashi} है — अनुशंसित रत्न {stone}। मुझे सटीक रत्न और डिज़ाइन के लिए मार्गदर्शन चाहिए।',
    },
    featured: {
      heading: 'चुनिंदा रत्न',
      buy: 'अभी खरीदें',
      enquire: 'व्हाट्सएप पर पूछें',
      browse: 'कैटलॉग देखें',
      prev: 'पिछला रत्न',
      next: 'अगला रत्न',
      show: 'दिखाएँ',
      position: '{n} में से {i}',
      buyWaMessage:
        'नमस्ते सचिन ज्वैलर्स! मैं इसे अभी खरीदना चाहता/चाहती हूँ: {product} ({price})। कृपया ऑर्डर करने में मेरी मदद करें।',
    },
    checkout: {
      heading: 'सुरक्षित चेकआउट',
      close: 'बंद करें',
      item: 'आप खरीद रहे हैं',
      name: 'पूरा नाम',
      email: 'ईमेल',
      phone: 'फ़ोन',
      address: 'डिलीवरी पता',
      secure:
        'भुगतान PayU द्वारा सुरक्षित रूप से संसाधित होता है। आपके कार्ड, UPI और बैंक विवरण PayU पर दर्ज होते हैं और हम उन्हें कभी नहीं देखते या संग्रहीत नहीं करते।',
      pay: '{amount} सुरक्षित भुगतान करें',
      redirecting: 'PayU पर ले जाया जा रहा है…',
      error:
        'हम भुगतान शुरू नहीं कर सके। कृपया थोड़ी देर बाद पुनः प्रयास करें, या व्हाट्सएप पर संपर्क करें।',
    },
    result: {
      successTitle: 'भुगतान सफल',
      successLead:
        'धन्यवाद। हमें आपका भुगतान प्राप्त हो गया है और आपका ऑर्डर पुष्ट हो गया है।',
      failTitle: 'भुगतान पूरा नहीं हुआ',
      failLead:
        'आपका भुगतान पूरा नहीं हुआ। यदि कोई राशि कटी है तो वह आपके बैंक द्वारा स्वतः वापस कर दी जाएगी। आप किसी भी समय पुनः प्रयास कर सकते हैं।',
      verifyLead:
        'हमें भुगतान की प्रतिक्रिया मिली, पर हम इसे सुरक्षित रूप से सत्यापित नहीं कर सके। कृपया अभी दोबारा भुगतान न करें।',
      verifyNote:
        'यदि आपके खाते से कोई राशि कटी है, तो नीचे दिए ट्रांज़ैक्शन आईडी के साथ हमें व्हाट्सएप पर संदेश करें, हम उसकी पुष्टि या वापसी करेंगे।',
      reasonLabel: 'कारण',
      product: 'उत्पाद',
      amount: 'राशि',
      txn: 'ट्रांज़ैक्शन आईडी',
      payId: 'PayU पेमेंट आईडी',
      successNote:
        'हमारी टीम विवरण सत्यापित करेगी और डिस्पैच व ट्रैकिंग जानकारी आपको व्हाट्सएप पर साझा करेगी।',
      failNote:
        'ऑर्डर पूरा करने में मदद चाहिए? हमें व्हाट्सएप पर संदेश करें, हम स्वयं आपकी सहायता करेंगे।',
      home: 'होम पर लौटें',
      whatsapp: 'व्हाट्सएप पर संपर्क करें',
      waSuccess:
        'नमस्ते सचिन ज्वैलर्स! मैंने {product} के लिए भुगतान पूरा कर लिया है (ट्रांज़ैक्शन आईडी: {txnid})। कृपया मेरा ऑर्डर पुष्ट करें।',
      waFailure:
        'नमस्ते सचिन ज्वैलर्स! {product} के लिए मेरा भुगतान (ट्रांज़ैक्शन आईडी: {txnid}) पूरा नहीं हुआ। कृपया मेरी मदद करें।',
    },
    pdp: {
      back: 'कैटलॉग',
      details: 'विवरण देखें',
      brand: 'सचिन ज्वैलर्स',
      sale: 'सेल',
      off: '{pct}% छूट',
      originalPriceLabel: 'मूल दाम',
      shipping: 'शिपिंग चेकआउट पर तय की जाती है।',
      lucky: 'अपना भाग्यशाली रत्न और रुद्राक्ष जानें',
      carat: 'कैरेट',
      origin: 'उद्गम',
      quantity: 'मात्रा',
      decrease: 'मात्रा घटाएँ',
      increase: 'मात्रा बढ़ाएँ',
      addToCart: 'कार्ट में डालें',
      added: 'कार्ट में जोड़ा गया',
      buyNow: 'अभी खरीदें',
      enquire: 'व्हाट्सएप पर पूछें',
      priceOnRequest: 'दाम पूछें',
      prevImage: 'पिछली तस्वीर',
      nextImage: 'अगली तस्वीर',
      imageLabel: 'तस्वीर {n} दिखाएँ',
      waMessage:
        'नमस्ते सचिन ज्वैलर्स! मुझे {product}{carat} में रुचि है (मात्रा {qty}) — {price}। कृपया विवरण साझा करें।',
    },
    cart: {
      open: 'कार्ट खोलें',
      title: 'आपका कार्ट',
      empty: 'आपका कार्ट खाली है।',
      browse: 'कैटलॉग देखें',
      remove: 'हटाएँ',
      qty: 'मात्रा',
      each: 'प्रति नग',
      subtotal: 'उप-योग',
      note: 'शिपिंग और कर भुगतान से पहले व्हाट्सएप पर पुष्ट किए जाते हैं। तुरंत कार्ड / UPI भुगतान के लिए किसी उत्पाद पर “अभी खरीदें” का उपयोग करें।',
      checkout: 'व्हाट्सएप पर चेकआउट करें',
      waIntro: 'नमस्ते सचिन ज्वैलर्स! मैं यह ऑर्डर करना चाहता/चाहती हूँ:',
      waLine: '{n}. {product}{carat} — x{qty} ({price})',
      waSubtotal: 'उप-योग: {total}',
    },
    banner: {
      title: 'सचिन ज्वैलर्स',
      tagline:
        'असली रत्न, पवित्र रुद्राक्ष और हाथ से बने ब्रेसलेट — पूरी सावधानी से चुने गए और परंपरा से सँवारे गए।',
      shop: 'कलेक्शन देखें',
    },
    about: {
      heading: 'हमारे बारे में',
      paragraphs: [
        'सचिन ज्वैलर्स की स्थापना 2011 में एक सरल विश्वास के साथ हुई — कि लोग जो रत्न और मनके अपनी त्वचा के सबसे करीब पहनते हैं, वे असली, ज़िम्मेदारी से प्राप्त और अर्थपूर्ण होने चाहिए। जो एक छोटी पारिवारिक दुकान के रूप में शुरू हुआ, वह आज रत्न, रुद्राक्ष और ब्रेसलेट के लिए एक भरोसेमंद नाम है — और वही अपनापन आज भी बना हुआ है।',
        'हम जो भी वस्तु प्रदान करते हैं, वह सीधे उन विश्वसनीय कारीगरों और खनन परिवारों से आती है जिन्हें हम वर्षों से जानते हैं। हम अपने आपूर्तिकर्ताओं से मिलने जाते हैं, कच्चे माल की स्वयं जाँच करते हैं और कुशल कारीगरों के साथ काम करते हैं जो हर वस्तु को धैर्य से काटते, पिरोते और तैयार करते हैं। यही निकटता हमें हर ऑर्डर पर गुणवत्ता का वादा निभाने देती है।',
        'सबसे बढ़कर, हमें इस बात की परवाह है कि खरीद के बाद आप कैसा महसूस करते हैं। हमारी टीम यह समझने में समय लेती है कि आप क्या ढूँढ रहे हैं, सरल भाषा में बताती है कि आप क्या खरीद रहे हैं, और बिक्री के बाद भी आपके साथ बनी रहती है। आपका भरोसा और संतुष्टि ही सचिन ज्वैलर्स के होने का कारण है।',
      ],
    },
    owner: {
      heading: 'संस्थापक के बारे में',
      name: 'सचिन कुमार वर्मा',
      role: 'संस्थापक',
      experience: 'ज्वैलरी व्यवसाय में 15 वर्षों का अनुभव',
      bio: 'सचिन कुमार वर्मा ने सचिन ज्वैलर्स की स्थापना की और पिछले 15 वर्षों से रत्न व्यापारियों, रुद्राक्ष आपूर्तिकर्ताओं और कारीगरों के साथ मिलकर काम कर रहे हैं। दुकान के नाम से जुड़ी हर वस्तु को वे स्वयं परखते हैं और आपके सवालों का जवाब खुद देने में उन्हें ख़ुशी होती है।',
      phoneLabel: 'फ़ोन',
      emailLabel: 'ईमेल',
      whatsapp: 'व्हाट्सएप पर चैट करें',
      waMessage:
        'नमस्ते सचिन ज्वैलर्स! मैं सचिन कुमार वर्मा से बात करना चाहता/चाहती हूँ।',
    },
    quote:
      'एक सच्चा आभूषण कभी केवल एक गहना नहीं होता। इसमें उन हाथों की छाप होती है जिन्होंने इसे गढ़ा, उस धरती का अंश होता है जिसने इसे पाला, और उस व्यक्ति की भावना होती है जो इसे धारण करता है।',
    trust: {
      heading: 'हमें क्यों चुनें',
      cards: [
        {
          heading: 'प्रमाणित शुद्धता',
          body: 'हर रत्न और रुद्राक्ष मान्यता प्राप्त प्रयोगशालाओं के स्पष्ट प्रमाणपत्र के साथ आता है, ताकि आप ठीक-ठीक जानें कि आपके पास क्या है। हम कभी संस्कारित पत्थरों को प्राकृतिक बताकर नहीं बेचते, और हर विवरण लिखित में देते हैं।',
        },
        {
          heading: 'ईमानदार, किफ़ायती दाम',
          body: 'क्योंकि हम सीधे कारीगरों और खनन परिवारों से खरीदते हैं, हम बिचौलियों को हटा देते हैं और वह बचत आपको देते हैं। उचित दाम, कोई बढ़ा-चढ़ा मुनाफ़ा नहीं और ज़रूरत से ज़्यादा खर्च का कोई दबाव नहीं।',
        },
        {
          heading: 'दुनिया भर में ग्राहक',
          body: 'हम भारत और विदेशों में घर-घर तक सुरक्षित पैकिंग और ट्रैकिंग के साथ भेजते हैं। अलग-अलग देशों के हज़ारों ख़रीदार अपने आभूषण सुरक्षित पाने के लिए हम पर भरोसा करते हैं।',
        },
        {
          heading: 'विशेषज्ञ मार्गदर्शन',
          body: 'पता नहीं कौन-सा रत्न या मनका आपके लिए सही है? हमारे सलाहकार आपकी असल ज़रूरत के आधार पर चुनने में मदद करते हैं, पारंपरिक ज्ञान और व्यावहारिक सलाह साझा करते हैं — बिना किसी दबाव के।',
        },
      ],
    },
    findStone: {
      heading: 'अपना रत्न जानें',
      intro:
        'अपना नाम और राशि दर्ज करें, और हम आपको वह रत्न बताएँगे जो परंपरा आपकी राशि के लिए सुझाती है।',
      name: 'नाम',
      rashi: 'राशि',
      rashiPlaceholder: 'अपनी राशि चुनें',
      submit: 'मेरा रत्न दिखाएँ',
      greeting: 'नमस्ते, {name}। आपकी राशि के अनुसार, परंपरा यह रत्न बताती है:',
      whatsapp: 'व्हाट्सएप पर पूछें',
      reset: 'दूसरी राशि आज़माएँ',
      waMessage:
        'नमस्ते सचिन ज्वैलर्स! मेरा नाम {name} है और मेरी राशि {rashi} है। मुझे {stone} के बारे में और जानकारी चाहिए।',
    },
    kundali: {
      heading: 'निःशुल्क कुंडली जाँच',
      intro:
        'अपनी जन्म जानकारी भरें और जानें अपनी चंद्र राशि, नक्षत्र और परंपरा द्वारा सुझाया गया रत्न। सारी गणना आपके ही डिवाइस पर होती है — कुछ भी कहीं नहीं भेजा जाता।',
      fullName: 'पूरा नाम',
      dob: 'जन्म तिथि',
      tob: 'जन्म समय',
      bornOutside: 'क्या जन्म भारत के बाहर हुआ?',
      utcOffset: 'जन्म स्थान का UTC ऑफ़सेट',
      submit: 'मेरी कुंडली जाँचें',
      forLabel: 'कुंडली',
      moonRashi: 'चंद्र राशि',
      nakshatra: 'नक्षत्र',
      pada: 'पाद',
      stone: 'अनुशंसित रत्न',
      metal: 'धातु',
      day: 'धारण दिवस',
      finger: 'उँगली',
      whatsapp: 'सटीक रत्न / डिज़ाइन के लिए सचिन ज्वैलर्स से बात करें',
      waMessage:
        'नमस्ते! मेरी चंद्र राशि {rashi} और नक्षत्र {nakshatra} (पाद {pada}) है। अनुशंसित रत्न {stone}। मुझे सटीक रत्न और डिज़ाइन के लिए मार्गदर्शन चाहिए।',
      error: 'कृपया मान्य जन्म तिथि और समय दर्ज करें।',
      disclaimer:
        'यह खगोलीय आँकड़ों का उपयोग करते हुए चंद्र-राशि (राशि-नक्षत्र) गणना है। लग्न, दशा और वर्ग कुंडली सहित पूर्ण कुंडली के लिए कृपया किसी योग्य ज्योतिषी से परामर्श करें।',
    },
    enquiry: {
      heading: 'पूछताछ भेजें',
      intro:
        'किसी वस्तु, ऑर्डर या कस्टम काम के बारे में कोई सवाल है? फ़ॉर्म भरें और हमारी टीम जल्द ही आपसे संपर्क करेगी।',
      name: 'नाम',
      email: 'ईमेल',
      phone: 'फ़ोन',
      comment: 'टिप्पणी',
      send: 'भेजें',
      success: 'धन्यवाद। आपका संदेश हम तक पहुँच गया है और हम जल्द ही उत्तर देंगे।',
    },
    footer: {
      rights: 'सर्वाधिकार सुरक्षित।',
      business: {
        title: 'व्यावसायिक विवरण',
        gstin: 'जीएसटीआईएन',
        address: 'पंजीकृत पता',
        proprietor: 'स्वामी',
      },
    },
    policy: {
      close: 'बंद करें',
      updated: 'अंतिम अद्यतन',
      contactHeading: 'इस नीति के बारे में प्रश्न?',
      contactBody:
        'हमें लिखें, हम स्वयं उत्तर देंगे। सचिन ज्वैलर्स, स्वामी सचिन कुमार वर्मा।',
      phoneLabel: 'फ़ोन / व्हाट्सएप',
      emailLabel: 'ईमेल',
      gstinLabel: 'जीएसटीआईएन',
    },
  },
}

/* Statutory business details shown as a subtle block in the footer. */
const BUSINESS = {
  gstin: '05BKAPV6071M2ZP',
  address:
    '38/44/1, Canal Road, Near Bhagwati Provision Store, Jakhan, Dehradun, Uttarakhand - 248001',
  proprietor: 'Sachin Kumar Verma',
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
}

// Parent container: fades/slides itself up, then staggers its children.
const sectionContainer = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.08 },
  },
}

// Branded intro: logo scales up and fades in on black, then the whole splash
// fades out to reveal the homepage. Shown once per visit (see App).
function SplashScreen() {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <motion.img
        src={sjLogo}
        alt="Sachin Jewellers"
        className="splash-logo"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </motion.div>
  )
}

// True only on the first page load of this browser session (survives a reload,
// resets for a genuinely new visit).
function splashAlreadySeen() {
  try {
    return sessionStorage.getItem('sj-splash-seen') === '1'
  } catch {
    return false
  }
}

function FadeSection({ children, className, ...rest }) {
  return (
    <motion.section
      className={className}
      variants={sectionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </motion.section>
  )
}

function Button({ children, as = 'a', className = 'btn btn-solid', ...rest }) {
  const Comp = as === 'button' ? motion.button : motion.a
  return (
    <Comp
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

function TrustCard({ heading, children }) {
  return (
    <motion.div
      className="trust-card"
      variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <h3>{heading}</h3>
      <p>{children}</p>
    </motion.div>
  )
}

// Wrapper variant so grid items stagger in even though a grid <div> sits between
// them and the animating section.
const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

// Turn a plain rupee number into "₹18,500" (Indian digit grouping).
function formatPrice(price, t) {
  if (price == null) return t.catalogue.priceOnRequest
  return `₹${new Intl.NumberFormat('en-IN').format(price)}`
}

// Struck-through original price + current price + optional "Sale" badge.
function PriceTag({ product, variant, t, className = '' }) {
  const { current, original, onSale } = resolvePrice(product, variant)
  const cls = `price-tag ${className}`.trim()
  if (current == null) {
    return <p className={cls}>{t.pdp.priceOnRequest}</p>
  }
  const pct = onSale
    ? Math.round(((original - current) / original) * 100)
    : 0
  return (
    <p className={cls}>
      {onSale && (
        <span className="price-was">
          <span className="sr-only">{t.pdp.originalPriceLabel}: </span>
          {formatPrice(original, t)}
        </span>
      )}
      <span className="price-now">{formatPrice(current, t)}</span>
      {onSale && (
        <span className="price-badge">
          {t.pdp.sale}
          {pct >= 5 ? ` · ${t.pdp.off.replace('{pct}', pct)}` : ''}
        </span>
      )}
    </p>
  )
}

function ProductCard({ product, lang, t, onOpen }) {
  const name = product.name[lang]
  const open = () => onOpen(product.id)

  return (
    <motion.article
      className="product-card"
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="product-img">
        <img
          src={product.image}
          alt=""
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </span>
      <div className="product-info">
        {product.category && (
          <span className="product-tag">{product.category[lang]}</span>
        )}
        <h3>{name}</h3>
        <PriceTag product={product} t={t} className="product-price" />
        <p className="product-desc">{product.description[lang]}</p>
        <div className="product-card-actions">
          {/* ::after stretches this button over the whole card */}
          <button
            type="button"
            className="btn btn-outline product-details-btn"
            onClick={open}
          >
            {t.pdp.details}
            <span className="sr-only"> — {name}</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

/* ---------- Featured Gemstones — 3D coverflow carousel ----------
 * Desktop: portrait cards in a 3D coverflow — centre card large and sharp,
 * side cards rotated in 3D, scaled down, dimmed and blurred. Clicking a side
 * card (or a dot / arrow) brings it to the centre with a Motion spring.
 * Mobile (<=768px): the 3D transforms are dropped for a plain scroll-snap
 * swipe strip. Data comes from products.js (Gemstone category). */
const FEATURED = products.filter(
  (p) => p.category && p.category.en === 'Gemstone',
)

function useIsMobile(query = '(max-width: 768px)') {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return isMobile
}

function FeaturedCard({ product, lang, t, onBrowseCatalogue, onBuyNow }) {
  const priceText = formatPrice(product.price, t)
  const enquireMsg = t.catalogue.waMessage
    .replace('{product}', product.name.en)
    .replace('{price}', priceText)
  const enquireHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    enquireMsg,
  )}`
  // Fixed-price gemstones check out through PayU; "price on request" items
  // fall back to a WhatsApp order message.
  const canCheckout = product.price != null
  const buyMsg = t.featured.buyWaMessage
    .replace('{product}', product.name.en)
    .replace('{price}', priceText)
  const buyHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buyMsg,
  )}`

  return (
    <div className="cf-card-inner">
      <div className="cf-card-img">
        <img
          src={product.image}
          alt={product.name.en}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      <div className="cf-card-body">
        <h3 className="cf-card-name">
          {product.name.en}
          <span className="cf-card-name-hi">{product.name.hi}</span>
        </h3>
        <p className="cf-card-desc">{product.description[lang]}</p>
        <div className="cf-card-actions">
          {canCheckout ? (
            <button
              type="button"
              className="btn btn-solid cf-card-btn"
              onClick={() => onBuyNow(product)}
            >
              {t.featured.buy}
            </button>
          ) : (
            <a
              className="btn btn-solid cf-card-btn"
              href={buyHref}
              target="_blank"
              rel="noreferrer"
            >
              {t.featured.buy}
            </a>
          )}
          <a
            className="btn whatsapp-btn cf-card-btn"
            href={enquireHref}
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
              />
            </svg>
            {t.featured.enquire}
          </a>
          <button
            type="button"
            className="cf-card-link"
            onClick={onBrowseCatalogue}
          >
            {t.featured.browse}
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function FeaturedGemstones({ lang, t, onBrowseCatalogue, onBuyNow }) {
  const items = FEATURED
  const n = items.length
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile()

  const go = (dir) => setActive((a) => (a + dir + n) % n)
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    }
  }

  if (!n) return null

  if (isMobile) {
    return (
      <FadeSection id="featured-gemstones" className="section featured">
        <h2>{t.featured.heading}</h2>
        <ul className="cf-scroll">
          {items.map((p) => (
            <li className="cf-scroll-card" key={p.id}>
              <FeaturedCard
                product={p}
                lang={lang}
                t={t}
                onBrowseCatalogue={onBrowseCatalogue}
                onBuyNow={onBuyNow}
              />
            </li>
          ))}
        </ul>
      </FadeSection>
    )
  }

  return (
    <FadeSection id="featured-gemstones" className="section featured">
      <h2>{t.featured.heading}</h2>

      <div
        className="cf-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={t.featured.heading}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="cf-track">
          {items.map((p, i) => {
            let off = i - active
            if (off > n / 2) off -= n
            if (off < -n / 2) off += n
            const abs = Math.abs(off)
            const visible = abs <= 2
            const isCenter = off === 0
            return (
              <motion.div
                key={p.id}
                className={`cf-card${isCenter ? ' is-center' : ''}`}
                initial={false}
                animate={{
                  x: off * 132,
                  rotateY: isCenter ? 0 : off > 0 ? -40 : 40,
                  scale: isCenter ? 1 : abs === 1 ? 0.82 : 0.66,
                  opacity: !visible ? 0 : isCenter ? 1 : abs === 1 ? 0.62 : 0.28,
                  filter: isCenter ? 'blur(0px)' : `blur(${abs * 2.5}px)`,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                style={{
                  zIndex: 50 - abs,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                {!isCenter && (
                  <button
                    type="button"
                    className="cf-card-hit"
                    onClick={() => setActive(i)}
                    tabIndex={visible ? 0 : -1}
                    aria-label={`${t.featured.show}: ${p.name.en}`}
                  />
                )}
                {/* side cards are decorative — inert keeps their link/text
                    out of the tab order and the accessibility tree */}
                <div className="cf-card-content" inert={!isCenter}>
                  <FeaturedCard
                    product={p}
                    lang={lang}
                    t={t}
                    onBrowseCatalogue={onBrowseCatalogue}
                    onBuyNow={onBuyNow}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="cf-controls">
        <button
          type="button"
          className="cf-arrow"
          onClick={() => go(-1)}
          aria-label={t.featured.prev}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 5l-7 7 7 7"
            />
          </svg>
        </button>
        <div className="cf-dots">
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`cf-dot${i === active ? ' active' : ''}`}
              aria-label={p.name.en}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="cf-arrow"
          onClick={() => go(1)}
          aria-label={t.featured.next}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <p className="cf-status" aria-live="polite">
        {t.featured.position.replace('{i}', active + 1).replace('{n}', n)} —{' '}
        {items[active].name.en}
      </p>
    </FadeSection>
  )
}

/* ---------- Ratna Salaah chatbot widget ---------- */
function ChatBubble({ from, delay = 0, children }) {
  return (
    <motion.div
      className={`chat-bubble ${from}`}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

function RatnaSalaah({ lang, open: openProp, onOpenChange }) {
  const [openState, setOpenState] = useState(false)
  const open = openProp ?? openState
  const setOpen = onOpenChange ?? setOpenState
  const [picks, setPicks] = useState([]) // rashi keys, in the order chosen
  const bodyRef = useRef(null)
  const rt = TRANSLATIONS[lang].ratna

  // Keep the newest bubble in view.
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [picks, open, lang])

  return (
    <>
      <motion.button
        type="button"
        className="ratna-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={rt.title}
        aria-expanded={open}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2Z"
          />
        </svg>
        <span className="ratna-fab-label">{rt.title}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ratna-panel"
            role="dialog"
            aria-label={rt.title}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="ratna-header">
              <div>
                <p className="ratna-title">{rt.title}</p>
                <p className="ratna-subtitle">{rt.subtitle}</p>
              </div>
              <button
                type="button"
                className="ratna-close"
                onClick={() => setOpen(false)}
                aria-label={rt.close}
              >
                &times;
              </button>
            </div>

            <div className="ratna-body" ref={bodyRef}>
              <ChatBubble from="bot">{rt.greeting}</ChatBubble>

              {picks.map((key, i) => {
                const rashi = RASHIS.find((r) => r.key === key)
                const advice = RATNA_ADVICE[key]
                const rashiLabel = `${rashi.hi} / ${rashi.en} (${rashi.zodiac})`
                const waMsg = rt.waMessage
                  .replace('{rashi}', rashiLabel)
                  .replace('{stone}', advice.stone[lang])
                const waHref = `https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(
                  waMsg,
                )}`
                return (
                  <div className="ratna-exchange" key={`${key}-${i}`}>
                    <ChatBubble from="user">{rashiLabel}</ChatBubble>
                    <ChatBubble from="bot" delay={0.15}>
                      <p className="ratna-line">
                        <span>{rt.stone}:</span> {advice.stone[lang]}
                      </p>
                      <p className="ratna-line">
                        <span>{rt.metal}:</span> {advice.metal[lang]}
                      </p>
                      <p className="ratna-line">
                        <span>{rt.day}:</span> {advice.day[lang]}
                      </p>
                      <p className="ratna-line">
                        <span>{rt.finger}:</span> {advice.finger[lang]}
                      </p>
                      <p className="ratna-disclaimer">{rt.disclaimer}</p>
                      <Button
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="ratna-cta"
                      >
                        {rt.cta}
                      </Button>
                    </ChatBubble>
                  </div>
                )
              })}

              <p className="ratna-pick-prompt">{rt.pickPrompt}</p>
              <div className="ratna-rashi-grid">
                {RASHIS.map((r) => (
                  <button
                    type="button"
                    key={r.key}
                    className="ratna-rashi-btn"
                    onClick={() => setPicks((p) => [...p, r.key])}
                  >
                    <span className="rashi-hi">{r.hi}</span>
                    <span className="rashi-en">{r.en}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- Free Kundali Checker ---------- */
const NAK_SPAN = 13.3333 // 360 / 27, per the spec
const PADA_SPAN = 3.3333 // NAK_SPAN / 4, per the spec

// All maths is local — no API. Returns { rashiIndex, nakIndex, pada } or null.
function calcMoonChart({ dob, tob, offsetMinutes }) {
  const [y, m, d] = dob.split('-').map(Number)
  const [hh, mm] = tob.split(':').map(Number)
  if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null

  // 1. Combine date + time + offset into a precise UTC instant.
  const utcMs = Date.UTC(y, m - 1, d, hh, mm) - offsetMinutes * 60000
  const when = new Date(utcMs)
  if (Number.isNaN(when.getTime())) return null

  // 2. Moon's tropical geocentric ecliptic longitude (true equinox of date).
  const tropical = EclipticGeoMoon(when).lon

  // 3. Lahiri ayanamsa approximation -> sidereal longitude, normalised 0–360.
  const ayanamsa = 23.85 + 0.013972 * (y - 2000)
  let sidereal = (tropical - ayanamsa) % 360
  if (sidereal < 0) sidereal += 360

  // 4 & 5. Rashi, nakshatra and pada (clamped so rounding can't overflow).
  const rashiIndex = Math.min(11, Math.floor(sidereal / 30))
  const nakIndex = Math.min(26, Math.floor(sidereal / NAK_SPAN))
  const pada = Math.min(4, Math.floor((sidereal % NAK_SPAN) / PADA_SPAN) + 1)

  return { rashiIndex, nakIndex, pada }
}

function KundaliChecker({ lang }) {
  const t = TRANSLATIONS[lang]
  const kt = t.kundali
  const [form, setForm] = useState({
    name: '',
    dob: '',
    tob: '',
    outside: false,
    offset: '0',
  })
  const [result, setResult] = useState(null) // { id, name, rashiIndex, nakIndex, pada }
  const [error, setError] = useState('')

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setResult(null)
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    const offsetMinutes = form.outside ? Number(form.offset) : 330 // IST default
    let chart = null
    try {
      chart = calcMoonChart({ dob: form.dob, tob: form.tob, offsetMinutes })
    } catch {
      chart = null
    }
    if (!chart) {
      setError(kt.error)
      return
    }
    setResult({ id: Date.now(), name: form.name.trim(), ...chart })
  }

  const rashi = result ? RASHIS[result.rashiIndex] : null
  const advice = rashi ? RATNA_ADVICE[rashi.key] : null
  const nak = result ? NAKSHATRAS[result.nakIndex] : null

  let waHref = '#'
  if (result && rashi && advice && nak) {
    const msg = kt.waMessage
      .replace('{rashi}', `${rashi.hi} / ${rashi.en}`)
      .replace('{nakshatra}', `${nak.hi} / ${nak.en}`)
      .replace('{pada}', String(result.pada))
      .replace('{stone}', advice.stone[lang])
    waHref = `https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(msg)}`
  }

  return (
    <FadeSection id="kundali-checker" className="section kundali">
      <h2>{kt.heading}</h2>

      <div className="split">
        <div className="split-main">
      <form className="kundali-form" onSubmit={submit}>
        <label>
          {kt.fullName}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={update}
            required
          />
        </label>
        <div className="kundali-row">
          <label>
            {kt.dob}
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={update}
              required
            />
          </label>
          <label>
            {kt.tob}
            <input
              type="time"
              name="tob"
              value={form.tob}
              onChange={update}
              required
            />
          </label>
        </div>
        <label className="kundali-check">
          <input
            type="checkbox"
            name="outside"
            checked={form.outside}
            onChange={update}
          />
          {kt.bornOutside}
        </label>
        {form.outside && (
          <label>
            {kt.utcOffset}
            <select name="offset" value={form.offset} onChange={update}>
              {UTC_OFFSETS.map((o) => (
                <option key={o.minutes} value={o.minutes}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )}
        {error && <p className="kundali-error">{error}</p>}
        <Button as="button" type="submit" className="btn btn-solid">
          {kt.submit}
        </Button>
      </form>

      <AnimatePresence mode="wait">
        {result && rashi && advice && nak && (
          <motion.div
            key={result.id}
            className="kundali-result"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="kundali-brand">
              <img src={sjMonogram} alt="" className="kundali-brand-logo" />
              <span>{t.brand}</span>
            </div>

            {result.name && (
              <p className="kundali-person">
                {kt.forLabel}: <strong>{result.name}</strong>
              </p>
            )}

            <div className="kundali-lines">
              <p className="ratna-line">
                <span>{kt.moonRashi}:</span> {rashi.hi} / {rashi.en} ({rashi.zodiac})
              </p>
              <p className="ratna-line">
                <span>{kt.nakshatra}:</span> {nak.hi} / {nak.en}
              </p>
              <p className="ratna-line">
                <span>{kt.pada}:</span> {result.pada}
              </p>
            </div>

            <div className="kundali-divider" />

            <div className="kundali-lines">
              <p className="ratna-line">
                <span>{kt.stone}:</span> {advice.stone[lang]}
              </p>
              <p className="ratna-line">
                <span>{kt.metal}:</span> {advice.metal[lang]}
              </p>
              <p className="ratna-line">
                <span>{kt.day}:</span> {advice.day[lang]}
              </p>
              <p className="ratna-line">
                <span>{kt.finger}:</span> {advice.finger[lang]}
              </p>
            </div>

            <Button
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn whatsapp-btn kundali-cta"
            >
              {kt.whatsapp}
            </Button>

            <p className="kundali-disclaimer">{kt.disclaimer}</p>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
        <aside className="split-aside">
          <p className="split-lead">{kt.intro}</p>
          <img className="split-img" src={KUNDALI_IMG} alt="" loading="lazy" />
        </aside>
      </div>
    </FadeSection>
  )
}

/* ---------- Footer policy modal ---------- */
function PolicyModal({ policy, lang, t, onClose }) {
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })
  const pt = t.policy
  const policyKey = policy?.key

  // Runs once per open (keyed on the policy, not on every parent re-render, so
  // toggling the language while reading doesn't re-steal focus).
  useEffect(() => {
    if (!policyKey) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
    }
  }, [policyKey])

  // Keep Tab focus inside the open dialog.
  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const f = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (!f.length) return
    const first = f[0]
    const last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence>
      {policy && (
        <motion.div
          className="policy-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <motion.div
            className="policy-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-title"
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={trapFocus}
            initial={{ opacity: 0, y: 52, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 34, scale: 0.985 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <div className="policy-header">
              <div>
                <p className="policy-eyebrow">{t.brand}</p>
                <h2 id="policy-title">{policy.title[lang]}</h2>
              </div>
              <button
                type="button"
                className="policy-close"
                onClick={onClose}
                aria-label={pt.close}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </div>

            <div className="policy-body">
              {policy.updated && (
                <p className="policy-updated">
                  {pt.updated}: {policy.updated[lang]}
                </p>
              )}

              {policy.sections.map((s, i) => (
                <section
                  key={i}
                  className={
                    s.callout
                      ? 'policy-section policy-callout'
                      : 'policy-section'
                  }
                >
                  <h3>{s[lang].h}</h3>
                  {s[lang].p.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </section>
              ))}

              <section className="policy-section policy-contact">
                <h3>{pt.contactHeading}</h3>
                <p>{pt.contactBody}</p>
                <dl>
                  <div>
                    <dt>{pt.phoneLabel}</dt>
                    <dd>
                      <a href={`tel:+${OWNER_PHONE_INTL}`}>{OWNER_PHONE}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>{pt.emailLabel}</dt>
                    <dd>
                      <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>{pt.gstinLabel}</dt>
                    <dd>{BUSINESS.gstin}</dd>
                  </div>
                  <div>
                    <dt>{t.footer.business.address}</dt>
                    <dd>{BUSINESS.address}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Single-product "Buy Now" checkout (PayU) ---------- */
function CheckoutForm({ product, lang, t }) {
  const ct = t.checkout
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [phase, setPhase] = useState('idle') // 'idle' | 'submitting' | 'error'

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const priceText = formatPrice(product.price, t)

  const submit = async (e) => {
    e.preventDefault()
    if (phase === 'submitting') return
    setPhase('submitting')
    try {
      const txnid = makeTxnId()
      const amount = Number(product.price).toFixed(2)
      const productinfo = product.name.en
      const firstname = form.name.trim()
      const email = form.email.trim()

      const resp = await fetch('/api/payu-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txnid, amount, productinfo, firstname, email }),
      })
      const data = await resp.json().catch(() => ({}))
      if (!resp.ok || !data.key || !data.hash || !data.action) {
        throw new Error(data.error || 'gateway')
      }

      const origin = window.location.origin
      postToPayU(data.action, {
        key: data.key,
        txnid,
        amount,
        productinfo,
        firstname,
        email,
        phone: form.phone.trim(),
        surl: `${origin}/api/payu-response`,
        furl: `${origin}/api/payu-response`,
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
        udf5: '',
        lastname: '',
        address1: form.address.trim().slice(0, 100),
        city: '',
        state: '',
        country: 'India',
        zipcode: '',
      })
      // The browser now navigates to PayU's hosted checkout.
    } catch {
      setPhase('error')
    }
  }

  return (
    <>
      <div className="checkout-summary">
        <div className="checkout-summary-img">
          <img
            src={product.image}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div>
          <p className="checkout-summary-label">{ct.item}</p>
          <p className="checkout-summary-name">{product.name[lang]}</p>
          <p className="checkout-summary-price">{priceText}</p>
        </div>
      </div>

      <form className="enquiry-form checkout-form" onSubmit={submit}>
        <label>
          {ct.name}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={update}
            autoComplete="name"
            required
          />
        </label>
        <label>
          {ct.email}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
            required
          />
        </label>
        <label>
          {ct.phone}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={update}
            autoComplete="tel"
            pattern="[0-9+\- ]{7,15}"
            required
          />
        </label>
        <label>
          {ct.address}
          <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={update}
            autoComplete="street-address"
            required
          />
        </label>

        {phase === 'error' && <p className="kundali-error">{ct.error}</p>}

        <p className="checkout-note">{ct.secure}</p>

        <Button
          as="button"
          type="submit"
          className="btn btn-solid checkout-submit"
          disabled={phase === 'submitting'}
          aria-busy={phase === 'submitting'}
        >
          {phase === 'submitting'
            ? ct.redirecting
            : ct.pay.replace('{amount}', priceText)}
        </Button>
      </form>
    </>
  )
}

function CheckoutModal({ product, lang, t, onClose }) {
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })
  const ct = t.checkout
  const open = Boolean(product)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="policy-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <motion.div
            className="policy-panel checkout-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 52, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 34, scale: 0.985 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <div className="policy-header">
              <div>
                <p className="policy-eyebrow">{t.brand}</p>
                <h2 id="checkout-title">{ct.heading}</h2>
              </div>
              <button
                type="button"
                className="policy-close"
                onClick={onClose}
                aria-label={ct.close}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </div>

            <div className="policy-body checkout-body">
              {/* keyed so a fresh form mounts for each product opened */}
              <CheckoutForm
                key={product.id}
                product={product}
                lang={lang}
                t={t}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- PayU return pages: /checkout/success and /checkout/failure ---------- */
const CHECK_PATH = 'M20 6L9 17l-5-5'
const CROSS_PATH = 'M6 6l12 12M18 6L6 18'

function CheckoutResult({ kind }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('sj-lang') || 'hi'
    } catch {
      return 'hi'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('sj-lang', lang)
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = lang
  }, [lang])
  const toggleLang = () => setLang((l) => (l === 'en' ? 'hi' : 'en'))

  const t = TRANSLATIONS[lang]
  const rt = t.result
  const success = kind === 'success'

  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()
  const txnid = params.get('txnid') || ''
  const amountRaw = params.get('amount') || ''
  const pinfo = params.get('pinfo') || ''
  const pid = params.get('pid') || ''
  const errorKind = params.get('error') || ''
  const reason = params.get('reason') || ''
  const unverified = errorKind === 'verification'

  const amountText =
    amountRaw && !Number.isNaN(Number(amountRaw))
      ? `₹${new Intl.NumberFormat('en-IN').format(Number(amountRaw))}`
      : ''

  const waTemplate = success ? rt.waSuccess : rt.waFailure
  const waMsg = waTemplate
    .replace('{product}', pinfo || '—')
    .replace('{txnid}', txnid || '—')
  const waHref = `https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(
    waMsg,
  )}`

  const lead = success
    ? rt.successLead
    : unverified
      ? rt.verifyLead
      : rt.failLead
  const note = success
    ? rt.successNote
    : unverified
      ? rt.verifyNote
      : rt.failNote

  return (
    <MotionConfig reducedMotion="user">
      <div className="result-page">
        <header className="result-nav">
          <a className="result-brand" href="/">
            <img src={sjMonogram} alt="" />
            <span>{t.brand}</span>
          </a>
          <button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language / भाषा बदलें"
          >
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span className="lang-sep">/</span>
            <span className={lang === 'hi' ? 'active' : ''}>हि</span>
          </button>
        </header>

        <motion.main
          className="result-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div
            className={`result-badge ${success ? 'ok' : 'bad'}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" width="30" height="30">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={success ? CHECK_PATH : CROSS_PATH}
              />
            </svg>
          </div>

          <h1>{success ? rt.successTitle : rt.failTitle}</h1>
          <p className="result-lead">{lead}</p>

          {!success && !unverified && reason && (
            <p className="result-reason">
              {rt.reasonLabel}: {reason}
            </p>
          )}

          {(pinfo || amountText || txnid || pid) && (
            <dl className="result-details">
              {pinfo && (
                <div>
                  <dt>{rt.product}</dt>
                  <dd>{pinfo}</dd>
                </div>
              )}
              {amountText && (
                <div>
                  <dt>{rt.amount}</dt>
                  <dd>{amountText}</dd>
                </div>
              )}
              {txnid && (
                <div>
                  <dt>{rt.txn}</dt>
                  <dd>{txnid}</dd>
                </div>
              )}
              {success && pid && (
                <div>
                  <dt>{rt.payId}</dt>
                  <dd>{pid}</dd>
                </div>
              )}
            </dl>
          )}

          <p className="result-note">{note}</p>

          <div className="result-actions">
            <a className="btn btn-solid" href="/">
              {rt.home}
            </a>
            <a
              className="btn whatsapp-btn"
              href={waHref}
              target="_blank"
              rel="noreferrer"
            >
              {rt.whatsapp}
            </a>
          </div>
        </motion.main>
      </div>
    </MotionConfig>
  )
}

/* ---------- Product detail page ---------- */
function QtyStepper({ qty, setQty, t }) {
  return (
    <div className="pdp-qty">
      <button
        type="button"
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        aria-label={t.pdp.decrease}
        disabled={qty <= 1}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M5 12h14" />
        </svg>
      </button>
      <span aria-live="polite">{qty}</span>
      <button
        type="button"
        onClick={() => setQty((q) => Math.min(99, q + 1))}
        aria-label={t.pdp.increase}
        disabled={qty >= 99}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M12 5v14M5 12h14"
          />
        </svg>
      </button>
    </div>
  )
}

function ProductDetail({
  productId,
  lang,
  t,
  onBack,
  onBuyNow,
  onAddToCart,
  onCheckLucky,
}) {
  const product = products.find((p) => p.id === productId)
  const [imgIndex, setImgIndex] = useState(0)
  const [caratIndex, setCaratIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <section className="section pdp">
        <button type="button" className="pdp-back" onClick={onBack}>
          {t.pdp.back}
        </button>
      </section>
    )
  }

  const images = productImages(product)
  const variants =
    product.caratVariants && product.caratVariants.length
      ? product.caratVariants
      : null
  const variant = variants
    ? variants[Math.min(caratIndex, variants.length - 1)]
    : null
  const { current } = resolvePrice(product, variant)
  const purchasable = current != null
  const caratLabel = variant ? variant.label : ''
  const displayName = product.name[lang]

  const stepImg = (d) =>
    setImgIndex((v) => (v + d + images.length) % images.length)

  const waMsg = t.pdp.waMessage
    .replace('{product}', displayName)
    .replace(
      '{carat}',
      caratLabel ? ` (${caratLabel} ${t.pdp.carat.toLowerCase()})` : '',
    )
    .replace('{qty}', qty)
    .replace(
      '{price}',
      purchasable ? formatPrice(current, t) : t.pdp.priceOnRequest,
    )
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    waMsg,
  )}`

  const buyNow = () =>
    onBuyNow({
      id: `${product.id}::${caratLabel || 'std'}::${qty}`,
      name: {
        en:
          product.name.en +
          (caratLabel ? ` - ${caratLabel}ct` : '') +
          (qty > 1 ? ` x${qty}` : ''),
        hi:
          product.name.hi +
          (caratLabel ? ` - ${caratLabel}ct` : '') +
          (qty > 1 ? ` x${qty}` : ''),
      },
      image: images[imgIndex] || images[0],
      price: current * qty,
    })

  const addToCart = () => {
    onAddToCart({
      key: `${product.id}::${caratLabel}`,
      id: product.id,
      name: product.name,
      image: images[0],
      carat: caratLabel,
      unitPrice: current,
      qty,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.section
      className="section pdp"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <button type="button" className="pdp-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 5l-7 7 7 7"
          />
        </svg>
        {t.pdp.back}
      </button>

      <div className="pdp-grid">
        <div className="pdp-media">
          <div className="pdp-stage">
            <AnimatePresence initial={false}>
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                alt={displayName}
                className="pdp-main-img"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: EASE }}
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden'
                }}
              />
            </AnimatePresence>
          </div>

          <div className="pdp-reflection" aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <div className="pdp-thumbs">
              <button
                type="button"
                className="pdp-thumb-nav"
                onClick={() => stepImg(-1)}
                aria-label={t.pdp.prevImage}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 5l-7 7 7 7"
                  />
                </svg>
              </button>
              <div className="pdp-thumb-track">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-thumb${idx === imgIndex ? ' active' : ''}`}
                    onClick={() => setImgIndex(idx)}
                    aria-label={t.pdp.imageLabel.replace('{n}', idx + 1)}
                    aria-current={idx === imgIndex ? 'true' : undefined}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden'
                      }}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="pdp-thumb-nav"
                onClick={() => stepImg(1)}
                aria-label={t.pdp.nextImage}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="pdp-info">
          <p className="pdp-eyebrow">{t.pdp.brand}</p>
          <h1 className="pdp-title">{displayName}</h1>

          <PriceTag
            product={product}
            variant={variant}
            t={t}
            className="pdp-price"
          />

          <p className="pdp-shipping">{t.pdp.shipping}</p>

          <button type="button" className="pdp-lucky" onClick={onCheckLucky}>
            {t.pdp.lucky}
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {product.promoLines &&
            Array.isArray(product.promoLines[lang]) &&
            product.promoLines[lang].length > 0 && (
              <ul className="pdp-promo">
                {product.promoLines[lang].map((line, idx) => (
                  <li key={idx}>
                    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 6L9 17l-5-5"
                      />
                    </svg>
                    {line}
                  </li>
                ))}
              </ul>
            )}

          {variants && (
            <div className="pdp-field">
              <p className="pdp-field-label">{t.pdp.carat}</p>
              <div className="pdp-pills">
                {variants.map((v, idx) => (
                  <button
                    key={v.label}
                    type="button"
                    className={`pdp-pill${idx === caratIndex ? ' active' : ''}`}
                    onClick={() => setCaratIndex(idx)}
                    aria-pressed={idx === caratIndex}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.origin && (
            <div className="pdp-field">
              <p className="pdp-field-label">{t.pdp.origin}</p>
              <p className="pdp-origin">{product.origin[lang]}</p>
            </div>
          )}

          <div className="pdp-field">
            <p className="pdp-field-label">{t.pdp.quantity}</p>
            <QtyStepper qty={qty} setQty={setQty} t={t} />
          </div>

          <div className="pdp-actions">
            {purchasable && (
              <>
                <motion.button
                  type="button"
                  className="btn btn-outline pdp-add"
                  whileTap={{ scale: 0.97 }}
                  onClick={addToCart}
                >
                  {added ? t.pdp.added : t.pdp.addToCart}
                </motion.button>
                <motion.button
                  type="button"
                  className="btn btn-solid pdp-buy"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  onClick={buyNow}
                >
                  {t.pdp.buyNow}
                </motion.button>
              </>
            )}
            <Button
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn whatsapp-btn pdp-enquire"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                />
              </svg>
              {t.pdp.enquire}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ---------- Cart (localStorage) ---------- */
const CART_KEY = 'sj-cart'

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function useCart() {
  const [items, setItems] = useState(loadCart)
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items])

  const add = (item) =>
    setItems((cur) => {
      const idx = cur.findIndex((x) => x.key === item.key)
      if (idx === -1) return [...cur, { ...item, qty: item.qty || 1 }]
      const next = cur.slice()
      next[idx] = {
        ...next[idx],
        qty: Math.min(99, next[idx].qty + (item.qty || 1)),
      }
      return next
    })
  const setQty = (key, qty) =>
    setItems((cur) =>
      cur.map((x) =>
        x.key === key ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x,
      ),
    )
  const remove = (key) => setItems((cur) => cur.filter((x) => x.key !== key))

  const count = items.reduce((n, x) => n + x.qty, 0)
  const subtotal = items.reduce((s, x) => s + (x.unitPrice || 0) * x.qty, 0)
  return { items, add, setQty, remove, count, subtotal }
}

function CartDrawer({ open, cart, lang, t, onClose, onBrowse }) {
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      cancelAnimationFrame(raf)
    }
  }, [open])

  const ct = t.cart
  const waMsg = [
    ct.waIntro,
    ...cart.items.map((x, i) =>
      ct.waLine
        .replace('{n}', i + 1)
        .replace('{product}', (x.name && x.name[lang]) || '')
        .replace('{carat}', x.carat ? ` (${x.carat})` : '')
        .replace('{qty}', x.qty)
        .replace('{price}', formatPrice((x.unitPrice || 0) * x.qty, t)),
    ),
    ct.waSubtotal.replace('{total}', formatPrice(cart.subtotal, t)),
  ].join('\n')
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    waMsg,
  )}`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cart-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <motion.div
            className="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label={ct.title}
            ref={panelRef}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: EASE }}
          >
            <div className="cart-header">
              <h2>{ct.title}</h2>
              <button
                type="button"
                className="policy-close"
                onClick={onClose}
                aria-label={t.pdp.back}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>
            </div>

            {cart.items.length === 0 ? (
              <div className="cart-empty">
                <p>{ct.empty}</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onBrowse}
                >
                  {ct.browse}
                </button>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.items.map((x) => (
                    <li className="cart-item" key={x.key}>
                      <div className="cart-item-img">
                        <img
                          src={x.image}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.style.visibility = 'hidden'
                          }}
                        />
                      </div>
                      <div className="cart-item-body">
                        <p className="cart-item-name">
                          {(x.name && x.name[lang]) || ''}
                          {x.carat ? (
                            <span className="cart-item-carat">
                              {' '}
                              · {t.pdp.carat} {x.carat}
                            </span>
                          ) : null}
                        </p>
                        <p className="cart-item-price">
                          {formatPrice(x.unitPrice, t)} {ct.each}
                        </p>
                        <div className="cart-item-row">
                          <QtyStepper
                            qty={x.qty}
                            setQty={(fn) =>
                              cart.setQty(
                                x.key,
                                typeof fn === 'function' ? fn(x.qty) : fn,
                              )
                            }
                            t={t}
                          />
                          <button
                            type="button"
                            className="cart-remove"
                            onClick={() => cart.remove(x.key)}
                          >
                            {ct.remove}
                          </button>
                        </div>
                      </div>
                      <p className="cart-item-total">
                        {formatPrice((x.unitPrice || 0) * x.qty, t)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="cart-foot">
                  <div className="cart-subtotal">
                    <span>{ct.subtotal}</span>
                    <span>{formatPrice(cart.subtotal, t)}</span>
                  </div>
                  <p className="cart-note">{ct.note}</p>
                  <a
                    className="btn whatsapp-btn cart-checkout"
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ct.checkout}
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.84-.4.4-.64.8-.84 1.3-.16.4-.35 1-.4 2.1C2.55 9.9 2.55 10.3 2.55 12s0 2.1.07 3.3c.05 1.1.24 1.7.4 2.1.2.5.44.9.84 1.3.4.4.8.64 1.3.84.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.84.4-.4.64-.8.84-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-3.3s0-2.1-.07-3.3c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.84-1.3-.4-.4-.8-.64-1.3-.84-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.05A4.95 4.95 0 1 1 12 17a4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.15-.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z',
  },
  {
    label: 'Facebook',
    href: '#',
    path: 'M13.5 21v-8.2h2.75l.4-3.2H13.5V7.55c0-.92.26-1.55 1.58-1.55H17V3.15C16.7 3.1 15.68 3 14.5 3c-2.47 0-4.15 1.5-4.15 4.27V9.6H7.6v3.2h2.75V21h3.15Z',
  },
  {
    label: 'WhatsApp',
    href: '#',
    path: 'M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm0 1.8a6.6 6.6 0 0 1 5.5 10.25 6.6 6.6 0 0 1-8.2 2.35l-.3-.15-2.6.68.7-2.53-.18-.32A6.6 6.6 0 0 1 12 5.3Zm-2.6 3.1c-.13 0-.35.05-.53.25-.18.2-.7.68-.7 1.65 0 .97.72 1.9.82 2.03.1.13 1.4 2.23 3.45 3.03 1.7.67 2.05.53 2.42.5.37-.03 1.2-.5 1.37-.97.17-.47.17-.87.12-.95-.05-.08-.18-.13-.38-.23-.2-.1-1.2-.6-1.38-.67-.18-.07-.32-.1-.45.1-.13.2-.52.67-.63.8-.12.13-.23.15-.43.05-.2-.1-.85-.31-1.62-1-.6-.53-1-1.19-1.12-1.39-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.1-.62-1.5-.16-.4-.33-.34-.45-.34h-.4Z',
  },
  {
    label: 'YouTube',
    href: '#',
    path: 'M21.6 8.1s-.2-1.36-.8-1.96c-.76-.8-1.6-.8-2-.85C16 5 12 5 12 5h-.02s-4 0-6.8.2c-.4.05-1.24.05-2 .85-.6.6-.8 1.96-.8 1.96S2.2 9.7 2.2 11.3v1.4c0 1.6.2 3.2.2 3.2s.2 1.36.8 1.96c.76.8 1.76.77 2.2.86 1.6.15 6.6.2 6.6.2s4 0 6.8-.2c.4-.05 1.24-.05 2-.85.6-.6.8-1.96.8-1.96s.2-1.6.2-3.2v-1.4c0-1.6-.2-3.2-.2-3.2ZM10 14.6V9.4l4.6 2.6L10 14.6Z',
  },
]

// Route between the main site and the PayU return pages by pathname. Kept as a
// thin wrapper so MainSite's hooks never sit behind a conditional return.
function App() {
  const path =
    typeof window !== 'undefined' ? window.location.pathname : '/'
  if (path === '/checkout/success') return <CheckoutResult kind="success" />
  if (path === '/checkout/failure') return <CheckoutResult kind="failure" />
  return <MainSite />
}

function MainSite() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('sj-lang') || 'hi'
    } catch {
      return 'hi'
    }
  })
  const [view, setView] = useState('about') // 'about' | 'catalogue' | 'product'
  const [productId, setProductId] = useState(null) // open product detail page
  const [showSplash, setShowSplash] = useState(() => !splashAlreadySeen())
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '' })
  const [sent, setSent] = useState(false)
  const [stoneForm, setStoneForm] = useState({ name: '', rashi: '' })
  const [stoneResult, setStoneResult] = useState(null) // rashi key, once submitted
  const [policyKey, setPolicyKey] = useState(null) // open footer policy, or null
  const [checkoutProduct, setCheckoutProduct] = useState(null) // product in checkout, or null
  const [ratnaOpen, setRatnaOpen] = useState(false) // Ratna Salaah panel
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart()
  const policyTriggerRef = useRef(null) // element to refocus when the modal closes

  const t = TRANSLATIONS[lang]

  const openProduct = (id) => {
    setProductId(id)
    setView('product')
  }
  const addToCart = (item) => {
    cart.add(item)
    setCartOpen(true)
  }

  const openPolicy = (key, e) => {
    policyTriggerRef.current = e.currentTarget
    setPolicyKey(key)
  }
  const closePolicy = () => {
    setPolicyKey(null)
    policyTriggerRef.current?.focus()
  }
  const activePolicy = POLICIES.find((p) => p.key === policyKey) || null

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('sj-lang', lang)
    } catch {
      /* storage unavailable (private mode, etc.) */
    }
  }, [lang])

  // Jump to the top on any top-level view change (About / Catalogue / a product).
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [view, productId])

  // Play the intro splash once per visit, then fade it out after ~2s.
  useEffect(() => {
    if (!showSplash) return undefined
    try {
      sessionStorage.setItem('sj-splash-seen', '1')
    } catch {
      // storage unavailable (private mode, etc.) — splash just won't be suppressed
    }
    const id = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(id)
  }, [showSplash])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'hi' : 'en'))
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', comment: '' })
  }

  const updateStone = (e) => {
    setStoneForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setStoneResult(null) // hide a stale result until they submit again
  }
  const submitStone = (e) => {
    e.preventDefault()
    setStoneResult(stoneForm.rashi)
  }

  const resultRashi = RASHIS.find((r) => r.key === stoneResult)
  const resultStone = resultRashi ? STONES[resultRashi.stone] : null
  let waHref = '#'
  if (resultRashi && resultStone) {
    const stoneLabel = `${resultStone.en} (${resultStone.hiName} / ${resultStone.translit})`
    const rashiLabel = `${resultRashi.hi} / ${resultRashi.en} (${resultRashi.zodiac})`
    const msg = t.findStone.waMessage
      .replace('{name}', stoneForm.name)
      .replace('{rashi}', rashiLabel)
      .replace('{stone}', stoneLabel)
    waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      <nav className="navbar">
        <button
          type="button"
          className="navbar-brand"
          onClick={() => setView('about')}
        >
          <img src={sjMonogram} alt="" className="navbar-logo" />
          <span>{t.brand}</span>
        </button>
        <div className="navbar-right">
          <div className="navbar-links">
            <button
              type="button"
              className={view === 'about' ? 'active' : ''}
              onClick={() => setView('about')}
            >
              {t.nav.about}
            </button>
            <button
              type="button"
              className={
                view === 'catalogue' || view === 'product' ? 'active' : ''
              }
              onClick={() => setView('catalogue')}
            >
              {t.nav.catalogue}
            </button>
          </div>
          <motion.button
            type="button"
            className="nav-cart"
            onClick={() => setCartOpen(true)}
            aria-label={t.cart.open}
            whileTap={{ scale: 0.94 }}
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
            {cart.count > 0 && (
              <span className="nav-cart-count">{cart.count}</span>
            )}
          </motion.button>
          <motion.button
            type="button"
            className="lang-toggle"
            onClick={toggleLang}
            aria-label="Switch language / भाषा बदलें"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <span className={lang === 'en' ? 'active' : ''}>EN</span>
            <span className="lang-sep">/</span>
            <span className={lang === 'hi' ? 'active' : ''}>हि</span>
          </motion.button>
        </div>
      </nav>

      <main className="about-page">
        {view === 'product' && (
          <ProductDetail
            key={productId}
            productId={productId}
            lang={lang}
            t={t}
            onBack={() => setView('catalogue')}
            onBuyNow={setCheckoutProduct}
            onAddToCart={addToCart}
            onCheckLucky={() => setRatnaOpen(true)}
          />
        )}

        {view === 'catalogue' && (
          <FadeSection className="section catalogue">
            <h2>{t.catalogue.heading}</h2>
            <p className="enquiry-intro">{t.catalogue.intro}</p>
            <motion.div className="catalogue-grid" variants={gridStagger}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  t={t}
                  onOpen={openProduct}
                />
              ))}
            </motion.div>
          </FadeSection>
        )}

        {view === 'about' && (
          <>
        {/* 1. Banner */}
        <motion.header
          className="banner"
          style={{ backgroundImage: `url(${BANNER_IMG})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="banner-overlay" />
          <motion.div
            className="banner-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 }}
          >
            <h1 className="banner-logo-heading">
              <img src={sjLogo} alt={t.banner.title} className="banner-logo" />
            </h1>
            <p className="tagline">{t.banner.tagline}</p>
            <div className="banner-buttons">
              <Button
                href="#featured-gemstones"
                className="btn btn-solid"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollToId('featured-gemstones')
                }}
              >
                {t.banner.shop}
              </Button>
            </div>
          </motion.div>
        </motion.header>

        {/* 2. About Us */}
        <FadeSection className="section about">
          <h2>{t.about.heading}</h2>
          <div className="about-grid">
            <div className="about-copy">
              {t.about.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <aside className="about-aside">
              <img src={ABOUT_IMG} alt="" loading="lazy" />
            </aside>
          </div>
        </FadeSection>

        {/* 3. About the Owner */}
        <FadeSection className="section owner">
          <h2>{t.owner.heading}</h2>
          <motion.div className="owner-card" variants={fadeUp}>
            <div className="owner-monogram" aria-hidden="true">
              SV
            </div>
            <div className="owner-body">
              <p className="owner-name">{t.owner.name}</p>
              <p className="owner-role">{t.owner.role}</p>
              <p className="owner-badge">{t.owner.experience}</p>
              <p className="owner-bio">{t.owner.bio}</p>
              <div className="owner-contact">
                <a href={`tel:+${OWNER_PHONE_INTL}`}>
                  {t.owner.phoneLabel}: {OWNER_PHONE}
                </a>
                <a href={`mailto:${OWNER_EMAIL}`}>
                  {t.owner.emailLabel}: {OWNER_EMAIL}
                </a>
              </div>
              <Button
                href={`https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(
                  t.owner.waMessage,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn whatsapp-btn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                  />
                </svg>
                {t.owner.whatsapp}
              </Button>
            </div>
          </motion.div>
        </FadeSection>

        {/* 4. Philosophy / quote */}
        <FadeSection
          className="quote-block"
          style={{ backgroundImage: `url(${QUOTE_IMG})` }}
        >
          <div className="quote-overlay" />
          <blockquote>{t.quote}</blockquote>
        </FadeSection>

        {/* 4b. Featured Gemstones — 3D coverflow */}
        <FeaturedGemstones
          lang={lang}
          t={t}
          onBrowseCatalogue={() => setView('catalogue')}
          onBuyNow={setCheckoutProduct}
        />

        {/* 5. Why choose us */}
        <FadeSection className="section trust">
          <h2>{t.trust.heading}</h2>
          <div className="trust-grid">
            {t.trust.cards.map((card) => (
              <TrustCard key={card.heading} heading={card.heading}>
                {card.body}
              </TrustCard>
            ))}
          </div>
        </FadeSection>

        {/* 6. Find Your Stone */}
        <FadeSection id="find-your-stone" className="section find-stone">
          <h2>{t.findStone.heading}</h2>

          <div className="split">
            <div className="split-main">
          <form className="stone-form" onSubmit={submitStone}>
            <label>
              {t.findStone.name}
              <input
                type="text"
                name="name"
                value={stoneForm.name}
                onChange={updateStone}
                required
              />
            </label>
            <label>
              {t.findStone.rashi}
              <select
                name="rashi"
                value={stoneForm.rashi}
                onChange={updateStone}
                required
              >
                <option value="" disabled>
                  {t.findStone.rashiPlaceholder}
                </option>
                {RASHIS.map((r) => (
                  <option key={r.key} value={r.key}>
                    {`${r.hi} / ${r.en} (${r.zodiac})`}
                  </option>
                ))}
              </select>
            </label>
            <Button as="button" type="submit" className="btn btn-solid">
              {t.findStone.submit}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {resultRashi && resultStone && (
              <motion.div
                key={resultRashi.key}
                className="stone-result"
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="result-lead">
                  {t.findStone.greeting.replace('{name}', stoneForm.name)}
                </p>
                <p className="stone-name">
                  {resultStone.en} · {resultStone.hiName} ({resultStone.translit})
                </p>
                <p className="stone-desc">{resultStone.desc[lang]}</p>
                <Button
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn whatsapp-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.15A8.4 8.4 0 1 0 12 3.5Zm4.8 11.9c-.17.47-1 .94-1.37.97-.37.03-.72.17-2.42-.5-2.05-.8-3.35-2.9-3.45-3.03-.1-.13-.82-1.06-.82-2.03 0-.97.52-1.45.7-1.65.18-.2.4-.25.53-.25h.4c.12 0 .29-.06.45.34.17.4.57 1.4.62 1.5.05.1.08.22.02.35-.07.13-.1.21-.2.33-.1.12-.21.26-.3.35-.1.1-.21.21-.09.41.12.2.52.86 1.12 1.39.77.69 1.42.9 1.62 1 .2.1.31.08.43-.05.11-.13.5-.6.63-.8.13-.2.27-.17.45-.1.18.07 1.18.57 1.38.67.2.1.33.15.38.23.05.08.05.48-.12.95Z"
                    />
                  </svg>
                  {t.findStone.whatsapp}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
            </div>
            <aside className="split-aside">
              <p className="split-lead">{t.findStone.intro}</p>
              <img
                className="split-img"
                src={STONE_IMG}
                alt=""
                loading="lazy"
              />
            </aside>
          </div>
        </FadeSection>

        {/* 7. Free Kundali Checker */}
        <KundaliChecker lang={lang} />

        {/* 8. Enquiry form */}
        <FadeSection className="section enquiry">
          <h2>{t.enquiry.heading}</h2>
          <div className="split">
            <div className="split-main">
          {sent ? (
            <p className="form-success">{t.enquiry.success}</p>
          ) : (
            <form className="enquiry-form" onSubmit={submit}>
              <label>
                {t.enquiry.name}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                />
              </label>
              <label>
                {t.enquiry.email}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  required
                />
              </label>
              <label>
                {t.enquiry.phone}
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                />
              </label>
              <label>
                {t.enquiry.comment}
                <textarea
                  name="comment"
                  rows="4"
                  value={form.comment}
                  onChange={update}
                  required
                />
              </label>
              <Button as="button" type="submit" className="btn btn-solid">
                {t.enquiry.send}
              </Button>
            </form>
          )}
            </div>
            <aside className="split-aside">
              <p className="split-lead">{t.enquiry.intro}</p>
              <div className="split-contact">
                <a href={`tel:+${OWNER_PHONE_INTL}`}>
                  {t.owner.phoneLabel}: {OWNER_PHONE}
                </a>
                <a href={`mailto:${OWNER_EMAIL}`}>
                  {t.owner.emailLabel}: {OWNER_EMAIL}
                </a>
                <a
                  href={`https://wa.me/${OWNER_PHONE_INTL}?text=${encodeURIComponent(
                    t.owner.waMessage,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.owner.whatsapp}
                </a>
              </div>
            </aside>
          </div>
        </FadeSection>
          </>
        )}

        {/* 9. Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="socials">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="social-link"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="currentColor" d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
            <nav className="policies">
              {POLICIES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className="policy-link"
                  onClick={(e) => openPolicy(p.key, e)}
                >
                  {p.title[lang]}
                </button>
              ))}
            </nav>
            <p className="copyright">
              &copy; {new Date().getFullYear()} {t.brand}. {t.footer.rights}
            </p>

            <div className="footer-business">
              <p className="footer-business-title">
                {t.footer.business.title}
              </p>
              <p>
                <span>{t.footer.business.gstin}:</span> {BUSINESS.gstin}
              </p>
              <p>
                <span>{t.footer.business.proprietor}:</span>{' '}
                {BUSINESS.proprietor}
              </p>
              <p>
                <span>{t.footer.business.address}:</span> {BUSINESS.address}
              </p>
            </div>
          </div>
        </footer>
      </main>

      <RatnaSalaah
        lang={lang}
        open={ratnaOpen}
        onOpenChange={setRatnaOpen}
      />

      <PolicyModal
        policy={activePolicy}
        lang={lang}
        t={t}
        onClose={closePolicy}
      />

      <CheckoutModal
        product={checkoutProduct}
        lang={lang}
        t={t}
        onClose={() => setCheckoutProduct(null)}
      />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        lang={lang}
        t={t}
        onClose={() => setCartOpen(false)}
        onBrowse={() => {
          setCartOpen(false)
          setView('catalogue')
        }}
      />
    </MotionConfig>
  )
}

export default App
