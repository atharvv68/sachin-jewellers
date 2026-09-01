/**
 * ============================================================================
 *  SACHIN JEWELLERS — PRODUCT CATALOGUE DATA
 * ============================================================================
 *
 *  This is the ONLY file you need to touch to add, remove, or change a product.
 *  The Catalogue grid and the Product Detail page both read the `products`
 *  array below.
 *
 *  ----------------------------------------------------------------------------
 *  HOW TO ADD A PRODUCT
 *  ----------------------------------------------------------------------------
 *  1. Copy one whole { ... } block, including the comma at the end.
 *  2. Paste it inside the [ ] list (order does not matter).
 *  3. Change the values. Give it a new, unique `id`.
 *
 *  HOW TO EDIT A PRODUCT   -> find its block and change the value (e.g. price).
 *  HOW TO REMOVE A PRODUCT -> delete its whole { ... } block (and its comma).
 *
 *  ----------------------------------------------------------------------------
 *  FIELD REFERENCE
 *  ----------------------------------------------------------------------------
 *  id          Unique short text id. Letters, numbers and hyphens only.
 *              Example: 'yellow-sapphire-5ct'. Never reuse an id.
 *
 *  name        Product name shown everywhere. { en: 'English', hi: 'हिंदी' }
 *
 *  price       Number ONLY, in Indian Rupees. No ₹ symbol, no commas.
 *                18500        -> shown as  ₹18,500
 *              Use  null  to show "Price on request" (Buy Now / Add to Cart
 *              are then hidden and only "Enquire on WhatsApp" is offered).
 *
 *  originalPrice / salePrice   OPTIONAL numbers.
 *              If BOTH are given and originalPrice > salePrice, the detail page
 *              strikes through originalPrice, shows salePrice as the live price
 *              and adds a small "Sale" badge. If you only set `price`, it is
 *              shown plainly with no discount.
 *
 *  image       Single card thumbnail (full web link, or '/file.jpg' in public/).
 *
 *  images      OPTIONAL list of picture links for the detail-page gallery.
 *              The first one is the main image. If omitted, `image` is used.
 *
 *  category    OPTIONAL small tag. { en: '...', hi: '...' }
 *
 *  description One or two SHORT lines. { en: '...', hi: '...' }
 *
 *  origin      OPTIONAL { en: 'Bangkok', hi: 'बैंकॉक' } — where the stone is from.
 *
 *  promoLines  OPTIONAL { en: [ '...', '...' ], hi: [ '...', '...' ] }
 *              Short marketing / assurance lines listed on the detail page.
 *
 *  caratVariants   OPTIONAL list of size options, shown as pill buttons:
 *                { label: '5-6', price: 21500 }
 *                { label: '6-7', price: 27500, originalPrice: 30000 }
 *              `label` is the pill text (a carat range). `price` becomes the
 *              live price when that pill is selected. `originalPrice` is an
 *              optional struck price for that one option. The first variant is
 *              selected by default.
 *
 *  Keep every block in the same shape. Keep the commas. That's it.
 * ============================================================================
 */

export const products = [
  {
    id: 'ruby-manikya-natural',
    name: { en: 'Natural Ruby (Manikya)', hi: 'प्राकृतिक माणिक्य' },
    price: 21500,
    originalPrice: 24500,
    salePrice: 21500,
    image:
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Certified untreated ruby with a warm red tone, ready for a ring or pendant setting.',
      hi: 'प्रमाणित बिना संस्कारित माणिक्य, गहरे लाल रंग के साथ — अंगूठी या लॉकेट में जड़ने के लिए तैयार।',
    },
    origin: { en: 'Burma (Mogok)', hi: 'बर्मा (मोगोक)' },
    promoLines: {
      en: [
        'Certified natural & unheated — laboratory report included',
        'Free insured shipping across India',
        'Lifetime exchange and buy-back assurance',
      ],
      hi: [
        'प्रमाणित प्राकृतिक और बिना गरम किया — प्रयोगशाला रिपोर्ट सहित',
        'भारत भर में निःशुल्क बीमित शिपिंग',
        'आजीवन विनिमय और वापस-खरीद आश्वासन',
      ],
    },
    caratVariants: [
      { label: '4-5', price: 16500 },
      { label: '5-6', price: 21500, originalPrice: 24500 },
      { label: '6-7', price: 27500, originalPrice: 30000 },
      { label: '7-8', price: 34000 },
      { label: '8-9', price: 42000 },
      { label: '9-10', price: 51000 },
      { label: '10-11', price: 62000 },
    ],
  },
  {
    id: 'yellow-sapphire-pukhraj',
    name: { en: 'Yellow Sapphire (Pukhraj)', hi: 'पुखराज' },
    price: 27800,
    originalPrice: 31000,
    salePrice: 27800,
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Clean Ceylon-type yellow sapphire, lab-certified, traditionally worn for Jupiter.',
      hi: 'साफ़ सीलोन प्रकार का पुखराज, प्रयोगशाला-प्रमाणित, परंपरागत रूप से बृहस्पति के लिए धारण किया जाता है।',
    },
    origin: { en: 'Sri Lanka (Ceylon)', hi: 'श्रीलंका (सीलोन)' },
    promoLines: {
      en: [
        'Eye-clean Ceylon material with a bright golden tone',
        'Certified by a recognised gem laboratory',
        'Free resizing guidance for your jeweller',
      ],
      hi: [
        'चमकीले सुनहरे रंग वाला साफ़ सीलोन रत्न',
        'मान्यता प्राप्त रत्न प्रयोगशाला द्वारा प्रमाणित',
        'आपके जौहरी के लिए निःशुल्क रीसाइज़िंग मार्गदर्शन',
      ],
    },
    caratVariants: [
      { label: '4-5', price: 22000 },
      { label: '5-6', price: 27800, originalPrice: 31000 },
      { label: '6-7', price: 35000 },
      { label: '7-8', price: 44000 },
      { label: '8-9', price: 55000 },
    ],
  },
  {
    id: 'blue-sapphire-neelam',
    name: { en: 'Blue Sapphire (Neelam)', hi: 'नीलम' },
    price: 32000,
    originalPrice: 36500,
    salePrice: 32000,
    image:
      'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Deep cornflower-blue sapphire with strong clarity. Supplied with full certification.',
      hi: 'गहरे नीले रंग का नीलम, अच्छी पारदर्शिता के साथ। पूर्ण प्रमाणपत्र के साथ दिया जाता है।',
    },
    origin: { en: 'Bangkok, Thailand', hi: 'बैंकॉक, थाईलैंड' },
    promoLines: {
      en: [
        'Rich cornflower blue, tested and trial-worn on request',
        'Full laboratory certificate included',
        'Free insured shipping across India',
      ],
      hi: [
        'गहरा कॉर्नफ़्लावर नीला, माँगने पर परीक्षण और ट्रायल-धारण की सुविधा',
        'पूर्ण प्रयोगशाला प्रमाणपत्र सहित',
        'भारत भर में निःशुल्क बीमित शिपिंग',
      ],
    },
    caratVariants: [
      { label: '4-5', price: 26000 },
      { label: '5-6', price: 32000, originalPrice: 36500 },
      { label: '6-7', price: 41000 },
      { label: '7-8', price: 52000 },
      { label: '8-9', price: 66000 },
    ],
  },
  {
    id: 'emerald-panna',
    name: { en: 'Emerald (Panna)', hi: 'पन्ना' },
    price: 18900,
    image:
      'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Natural emerald with a lively green colour and typical garden inclusions.',
      hi: 'प्राकृतिक पन्ना, चमकीले हरे रंग और सामान्य आंतरिक रेशों के साथ।',
    },
    origin: { en: 'Zambia', hi: 'ज़ाम्बिया' },
    promoLines: {
      en: [
        'Lively green with a natural "jardin" — a sign of a genuine emerald',
        'Certified by a recognised gem laboratory',
      ],
      hi: [
        'प्राकृतिक "जार्दिन" के साथ जीवंत हरा — असली पन्ने की पहचान',
        'मान्यता प्राप्त रत्न प्रयोगशाला द्वारा प्रमाणित',
      ],
    },
    caratVariants: [
      { label: '3-4', price: 14500 },
      { label: '4-5', price: 18900 },
      { label: '5-6', price: 24000 },
      { label: '6-7', price: 31000 },
    ],
  },
  {
    id: 'south-sea-pearl-moti',
    name: { en: 'South Sea Pearl (Moti)', hi: 'दक्षिण सागर मोती' },
    price: 9500,
    originalPrice: 11000,
    salePrice: 9500,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Round natural pearl with a soft lustre, popular for rings and lockets.',
      hi: 'गोल प्राकृतिक मोती, कोमल चमक के साथ — अंगूठी और लॉकेट के लिए लोकप्रिय।',
    },
    origin: { en: 'South Sea (Australia)', hi: 'दक्षिण सागर (ऑस्ट्रेलिया)' },
    promoLines: {
      en: [
        'Soft natural lustre, drilled or undrilled on request',
        'Free insured shipping across India',
      ],
      hi: [
        'कोमल प्राकृतिक चमक, माँगने पर छिद्रित या बिना छिद्र',
        'भारत भर में निःशुल्क बीमित शिपिंग',
      ],
    },
  },
  {
    id: 'red-coral-moonga',
    name: { en: 'Red Coral (Moonga)', hi: 'लाल मूँगा' },
    price: 7200,
    originalPrice: 8400,
    salePrice: 7200,
    image:
      'https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Italian red coral, oval cabochon cut, untreated and ready to set.',
      hi: 'इतालवी लाल मूँगा, अंडाकार काबोशन कट, बिना संस्कारित और जड़ने के लिए तैयार।',
    },
    origin: { en: 'Italy (Sardinia)', hi: 'इटली (सार्डिनिया)' },
    promoLines: {
      en: [
        'Untreated Italian coral with an even ox-blood tone',
        'Certificate of natural origin included',
      ],
      hi: [
        'एक-समान गहरे लाल रंग वाला बिना संस्कारित इतालवी मूँगा',
        'प्राकृतिक उद्गम का प्रमाणपत्र सहित',
      ],
    },
  },
  {
    id: 'rudraksha-mala-5mukhi',
    name: {
      en: '5-Mukhi Rudraksha Mala (108 beads)',
      hi: '5 मुखी रुद्राक्ष माला (108 दाने)',
    },
    price: 2400,
    image:
      'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Rudraksha', hi: 'रुद्राक्ष' },
    description: {
      en: 'Hand-knotted Nepali five-face rudraksha mala for daily japa and wear.',
      hi: 'हाथ से गुँथी नेपाली पाँच मुखी रुद्राक्ष माला — नित्य जप और धारण के लिए।',
    },
    origin: { en: 'Nepal', hi: 'नेपाल' },
    promoLines: {
      en: [
        'Genuine Nepali beads, hand-knotted on cotton thread',
        'Cleansed and ready to wear on arrival',
      ],
      hi: [
        'असली नेपाली दाने, सूती धागे पर हाथ से गुँथे',
        'आगमन पर शुद्ध और धारण के लिए तैयार',
      ],
    },
  },
  {
    id: 'rudraksha-bracelet-8mm',
    name: { en: 'Rudraksha Bracelet (8 mm)', hi: 'रुद्राक्ष ब्रेसलेट (8 मिमी)' },
    price: 1100,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Bracelet', hi: 'ब्रेसलेट' },
    description: {
      en: 'Stretchable rudraksha bead bracelet with sterling silver spacers.',
      hi: 'लचीला रुद्राक्ष ब्रेसलेट, स्टर्लिंग चाँदी के स्पेसर के साथ।',
    },
    origin: { en: 'Nepal', hi: 'नेपाल' },
    promoLines: {
      en: ['Fits most wrists — stretch cord', '92.5 silver spacers'],
      hi: ['अधिकांश कलाइयों में फ़िट — इलास्टिक कॉर्ड', '92.5 चाँदी के स्पेसर'],
    },
  },
  {
    id: 'navratna-bracelet-silver',
    name: { en: 'Navratna Silver Bracelet', hi: 'नवरत्न चाँदी ब्रेसलेट' },
    price: 15400,
    originalPrice: 17900,
    salePrice: 15400,
    image:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Bracelet', hi: 'ब्रेसलेट' },
    description: {
      en: 'Nine natural stones set in 92.5 silver, arranged in the traditional order.',
      hi: '92.5 चाँदी में जड़े नौ प्राकृतिक रत्न, पारंपरिक क्रम में सजाए गए।',
    },
    origin: { en: 'Handmade in India', hi: 'भारत में हस्तनिर्मित' },
    promoLines: {
      en: [
        'All nine stones natural and individually set',
        'Adjustable clasp, hallmarked 92.5 silver',
        'Free insured shipping across India',
      ],
      hi: [
        'सभी नौ रत्न प्राकृतिक और अलग-अलग जड़े हुए',
        'समायोज्य क्लैस्प, हॉलमार्क 92.5 चाँदी',
        'भारत भर में निःशुल्क बीमित शिपिंग',
      ],
    },
  },
  {
    id: 'certified-gemstone-consultation',
    name: {
      en: 'Certified Gemstone — Custom Sourcing',
      hi: 'प्रमाणित रत्न — कस्टम सोर्सिंग',
    },
    price: null, // shows "Price on request"
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=1200&q=80',
    ],
    category: { en: 'Service', hi: 'सेवा' },
    description: {
      en: 'Tell us the stone, weight and budget you need and we will source certified options for you.',
      hi: 'हमें बताएँ कि आपको कौन-सा रत्न, वज़न और बजट चाहिए — हम आपके लिए प्रमाणित विकल्प मँगवाएँगे।',
    },
    origin: { en: 'Sourced to order', hi: 'ऑर्डर के अनुसार मँगवाया गया' },
    promoLines: {
      en: [
        'Options shortlisted within 48 hours',
        'Only laboratory-certified stones presented',
        'No obligation — pay only when you choose a stone',
      ],
      hi: [
        '48 घंटों के भीतर विकल्प चुने जाते हैं',
        'केवल प्रयोगशाला-प्रमाणित रत्न प्रस्तुत किए जाते हैं',
        'कोई बाध्यता नहीं — रत्न चुनने पर ही भुगतान करें',
      ],
    },
  },
]

/**
 * Resolve the price to display for a product and (optionally) a selected carat
 * variant. Returns { current, original, onSale } — `original` is only set when
 * there is a real discount to strike through.
 */
export function resolvePrice(product, variant) {
  const current =
    variant?.price ?? product.salePrice ?? product.price ?? null
  const original =
    variant?.originalPrice ?? (variant ? null : product.originalPrice) ?? null
  const onSale = original != null && current != null && original > current
  return { current, original: onSale ? original : null, onSale }
}

/** The gallery image list for a product (falls back to the single `image`). */
export function productImages(product) {
  if (Array.isArray(product.images) && product.images.length) return product.images
  return product.image ? [product.image] : []
}
