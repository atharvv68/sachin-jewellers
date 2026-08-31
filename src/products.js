/**
 * ============================================================================
 *  SACHIN JEWELLERS — PRODUCT CATALOGUE DATA
 * ============================================================================
 *
 *  This is the ONLY file you need to touch to add, remove, or change a product.
 *  The Catalogue page reads the `products` array below and shows one card per
 *  item (image, name, price, short description).
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
 *  name        Product name shown on the card.
 *              { en: 'English name', hi: 'हिंदी नाम' }
 *
 *  price       Number ONLY, in Indian Rupees. No ₹ symbol, no commas.
 *                18500        -> shown as  ₹18,500
 *              Use  null  to show "Price on request" instead of a number.
 *
 *  image       Picture for the card. Either:
 *                a) a full web link ending in .jpg / .png / .webp, OR
 *                b) a file you put in the  public/  folder, written like
 *                   '/ruby.jpg'  (then the file lives at  public/ruby.jpg )
 *              If an image fails to load, the card shows a maroon–gold panel.
 *
 *  description One or two SHORT lines about the product.
 *              { en: '...', hi: '...' }
 *
 *  category    OPTIONAL small tag on the card (e.g. Gemstone / Rudraksha /
 *              Bracelet). { en: '...', hi: '...' }. Delete the line to hide it.
 *
 *  ----------------------------------------------------------------------------
 *  Keep every block in the same shape. Keep the commas. That's it.
 * ============================================================================
 */

export const products = [
  {
    id: 'ruby-manikya-natural',
    name: { en: 'Natural Ruby (Manikya)', hi: 'प्राकृतिक माणिक्य' },
    price: 21500,
    image:
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Certified untreated ruby with a warm red tone, ready for a ring or pendant setting.',
      hi: 'प्रमाणित बिना संस्कारित माणिक्य, गहरे लाल रंग के साथ — अंगूठी या लॉकेट में जड़ने के लिए तैयार।',
    },
  },
  {
    id: 'yellow-sapphire-pukhraj',
    name: { en: 'Yellow Sapphire (Pukhraj)', hi: 'पुखराज' },
    price: 27800,
    image:
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Clean Ceylon-type yellow sapphire, lab-certified, traditionally worn for Jupiter.',
      hi: 'साफ़ सीलोन प्रकार का पुखराज, प्रयोगशाला-प्रमाणित, परंपरागत रूप से बृहस्पति के लिए धारण किया जाता है।',
    },
  },
  {
    id: 'blue-sapphire-neelam',
    name: { en: 'Blue Sapphire (Neelam)', hi: 'नीलम' },
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Deep cornflower-blue sapphire with strong clarity. Supplied with full certification.',
      hi: 'गहरे नीले रंग का नीलम, अच्छी पारदर्शिता के साथ। पूर्ण प्रमाणपत्र के साथ दिया जाता है।',
    },
  },
  {
    id: 'emerald-panna',
    name: { en: 'Emerald (Panna)', hi: 'पन्ना' },
    price: 18900,
    image:
      'https://images.unsplash.com/photo-1551732998-9573f695fdbb?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Natural emerald with a lively green colour and typical garden inclusions.',
      hi: 'प्राकृतिक पन्ना, चमकीले हरे रंग और सामान्य आंतरिक रेशों के साथ।',
    },
  },
  {
    id: 'south-sea-pearl-moti',
    name: { en: 'South Sea Pearl (Moti)', hi: 'दक्षिण सागर मोती' },
    price: 9500,
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Round natural pearl with a soft lustre, popular for rings and lockets.',
      hi: 'गोल प्राकृतिक मोती, कोमल चमक के साथ — अंगूठी और लॉकेट के लिए लोकप्रिय।',
    },
  },
  {
    id: 'red-coral-moonga',
    name: { en: 'Red Coral (Moonga)', hi: 'लाल मूँगा' },
    price: 7200,
    image:
      'https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Gemstone', hi: 'रत्न' },
    description: {
      en: 'Italian red coral, oval cabochon cut, untreated and ready to set.',
      hi: 'इतालवी लाल मूँगा, अंडाकार काबोशन कट, बिना संस्कारित और जड़ने के लिए तैयार।',
    },
  },
  {
    id: 'rudraksha-mala-5mukhi',
    name: { en: '5-Mukhi Rudraksha Mala (108 beads)', hi: '5 मुखी रुद्राक्ष माला (108 दाने)' },
    price: 2400,
    image:
      'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Rudraksha', hi: 'रुद्राक्ष' },
    description: {
      en: 'Hand-knotted Nepali five-face rudraksha mala for daily japa and wear.',
      hi: 'हाथ से गुँथी नेपाली पाँच मुखी रुद्राक्ष माला — नित्य जप और धारण के लिए।',
    },
  },
  {
    id: 'rudraksha-bracelet-8mm',
    name: { en: 'Rudraksha Bracelet (8 mm)', hi: 'रुद्राक्ष ब्रेसलेट (8 मिमी)' },
    price: 1100,
    image:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Bracelet', hi: 'ब्रेसलेट' },
    description: {
      en: 'Stretchable rudraksha bead bracelet with sterling silver spacers.',
      hi: 'लचीला रुद्राक्ष ब्रेसलेट, स्टर्लिंग चाँदी के स्पेसर के साथ।',
    },
  },
  {
    id: 'navratna-bracelet-silver',
    name: { en: 'Navratna Silver Bracelet', hi: 'नवरत्न चाँदी ब्रेसलेट' },
    price: 15400,
    image:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Bracelet', hi: 'ब्रेसलेट' },
    description: {
      en: 'Nine natural stones set in 92.5 silver, arranged in the traditional order.',
      hi: '92.5 चाँदी में जड़े नौ प्राकृतिक रत्न, पारंपरिक क्रम में सजाए गए।',
    },
  },
  {
    id: 'certified-gemstone-consultation',
    name: { en: 'Certified Gemstone — Custom Sourcing', hi: 'प्रमाणित रत्न — कस्टम सोर्सिंग' },
    price: null, // shows "Price on request"
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    category: { en: 'Service', hi: 'सेवा' },
    description: {
      en: 'Tell us the stone, weight and budget you need and we will source certified options for you.',
      hi: 'हमें बताएँ कि आपको कौन-सा रत्न, वज़न और बजट चाहिए — हम आपके लिए प्रमाणित विकल्प मँगवाएँगे।',
    },
  },
]
