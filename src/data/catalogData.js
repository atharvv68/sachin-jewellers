/* Gemstone catalogue. `translit` is the romanised Hindi name. */
export const STONES = {
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
export const RASHIS = [
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
 * Ratna Salaah (Stone Advisor) lookup table — rashi -> stone, metal,
 * recommended day and finger. Traditional Vedic astrology.
 * ------------------------------------------------------------------------- */
export const RATNA_ADVICE = {
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
export const NAKSHATRAS = [
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
export const UTC_OFFSETS = [
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

/* ---------- Rudraksha Products (Secondary primary collection) ---------- */
export const RUDRAKSHA_PRODUCTS = [
  {
    id: 'rudraksha-mukhi',
    name: '1 to 14 Mukhi Nepali Rudraksha',
    hindiName: '१ से १४ मुखी नेपाली रुद्राक्ष',
    origin: 'Nepal (Himalayan)',
    badge: 'Collector & Astrological',
    short: 'Authentic high-vibration Nepali beads, certified for natural Mukhi lines and density.',
    shortHi: 'प्राकृतिक नेपाली रुद्राक्ष मनके, प्राकृतिक मुखी रेखाओं एवं शुद्धता के साथ।',
  },
  {
    id: 'siddh-rudraksha-mala',
    name: 'Siddh Rudraksha Mala (108+1 Beads)',
    hindiName: 'सिद्ध रुद्राक्ष माला (१०८+१ दाने)',
    origin: 'Nepal / Indonesia',
    badge: 'Vedic Energised',
    short: 'Traditional 5-mukhi Japa mala knotted in red silk thread with silver caps available.',
    shortHi: 'पंचमुखी रुद्राक्ष की पारंपरिक १०८ दानों की जप माला, शुद्ध धागे में गुंथी हुई।',
  },
  {
    id: 'rudraksha-silver-bracelet',
    name: 'Rudraksha Silver Bracelet & Kada',
    hindiName: 'रुद्राक्ष चांदी ब्रेसलेट / कड़ा',
    origin: '925 Sterling Silver',
    badge: 'Everyday Sacred',
    short: 'Handcrafted in pure 925 sterling silver with authentic natural Rudraksha beads.',
    shortHi: 'शुद्ध चांदी में जड़ा हुआ प्राकृतिक रुद्राक्ष ब्रेसलेट एवं कड़ा।',
  },
  {
    id: 'gauri-shankar-rudraksha',
    name: 'Gauri Shankar Rudraksha',
    hindiName: 'गौरी शंकर रुद्राक्ष',
    origin: 'Nepal',
    badge: 'Rare & Auspicious',
    short: 'Rare naturally conjoined twin bead representing Lord Shiva & Goddess Parvati for harmony.',
    shortHi: 'प्राकृतिक रूप से जुड़े दो रुद्राक्ष मनके, शिव-शक्ति स्वरूप एवं पारिवारिक सुख हेतु।',
  },
  {
    id: 'rudraksha-pendant',
    name: 'Rudraksha Pendants & Lockets',
    hindiName: 'रुद्राक्ष पेंडेंट एवं लॉकेट',
    origin: 'Gold / Silver / Ashtadhatu',
    badge: 'Protection',
    short: 'Single selected Mukhi bead capped in gold or silver for astrological protection and focus.',
    shortHi: 'सोने, चांदी या अष्टधातु कैपिंग में एक मुखी से चौदह मुखी पेंडेंट।',
  },
  {
    id: 'indonesian-mala',
    name: 'Indonesian Small-Bead Mala',
    hindiName: 'इंडोनेशियाई सूक्ष्म दाना माला',
    origin: 'Indonesia',
    badge: 'Comfort Wear',
    short: 'Smooth, lightweight fine-grain beads suitable for continuous everyday wearing.',
    shortHi: 'हल्के व चिकने सूक्ष्म दानों की आरामदायक नित्य धारण माला।',
  },
]

/* ---------- Secondary / Traditional Collections (Preserved) ---------- */
export const SECONDARY_COLLECTIONS = [
  {
    id: 'puja-items',
    icon: '🕉️',
    name: 'Puja Items',
    hindiName: 'पूजा सामग्री',
    desc: {
      en: 'Gangajal containers, brass puja thali, authentic camphor, dhoop, agarbatti, shankh and ritual essentials.',
      hi: 'पूजा थाली, दक्षिणावर्ती शंख, गंगाजल कलश, शुद्ध भीमसेनी कपूर एवं दैनिक पूजा सामग्री।',
    },
  },
  {
    id: 'yantra-rashi',
    icon: '🔯',
    name: 'Yantra & Rashi Yantra',
    hindiName: 'यंत्र एवं राशि यंत्र',
    desc: {
      en: 'Energised copper, brass and silver Shree Yantra, Kuber Yantra, Mahamrityunjaya and 12 Rashi Yantras.',
      hi: 'श्री यंत्र, कुबेर यंत्र, महामृत्युंजय एवं १२ राशि यंत्र — तांबा, पीतल व चांदी में।',
    },
  },
  {
    id: 'kavach',
    icon: '🛡️',
    name: 'Kavach & Talismans',
    hindiName: 'सुरक्षा कवच एवं ताबीज',
    desc: {
      en: 'Consecrated protection pendants, Nazar Suraksha kavach, and planet-specific astrological amulets.',
      hi: 'नजर सुरक्षा, नवग्रह रक्षा एवं सिद्ध वैदिक सुरक्षा कवच।',
    },
  },
  {
    id: 'lockets-pendants',
    icon: '📿',
    name: 'Lockets & Pendants',
    hindiName: 'धार्मिक लॉकेट एवं पेंडेंट',
    desc: {
      en: 'Lord Shiva, Hanuman Ji, Om, Swastik and deity lockets in sterling silver and gold plating.',
      hi: 'चांदी व सोने में शिव, हनुमान जी, ॐ एवं स्वस्तिक लॉकेट।',
    },
  },
  {
    id: 'rings',
    icon: '💍',
    name: 'Astrological Rings',
    hindiName: 'ज्योतिषीय अंगूठियां',
    desc: {
      en: 'Custom rings handcrafted in gold, silver, panchdhatu and ashtadhatu with open-back setting.',
      hi: 'सोना, चांदी, पंचधातु एवं अष्टधातु में बैक-ओपन ज्योतिषीय अंगूठियां।',
    },
  },
  {
    id: 'horse-shoe',
    icon: '🐎',
    name: 'Black Horse Shoe (Kale Ghode Ki Naal)',
    hindiName: 'काले घोड़े की नाल व छल्ला',
    desc: {
      en: 'Authentic front-hoof black horse shoe and energized rings for Saturn / Shani protection.',
      hi: 'शनि दोष निवारण हेतु काले घोड़े की नाल एवं नाल का छल्ला।',
    },
  },
  {
    id: 'worship-idols',
    icon: '🛕',
    name: 'Worship Idols & Murti',
    hindiName: 'पूजा मूर्तियां',
    desc: {
      en: 'Solid brass, bronze, silver and panchdhatu murtis of Laddu Gopal, Ganesha, Laxmi, and Hanuman Ji.',
      hi: 'पीतल, अष्टधातु एवं चांदी में लड्डू गोपाल, गणेश, लक्ष्मी व हनुमान जी की मूर्तियां।',
    },
  },
  {
    id: 'shivling',
    icon: '🪨',
    name: 'Parad & Sphatik Shivling',
    hindiName: 'पारद एवं स्फटिक शिवलिंग',
    desc: {
      en: 'Authentic mercury (Parad) purified Shivling and natural transparent quartz Sphatik Shivling.',
      hi: 'सिद्ध पारद शिवलिंग एवं प्राकृतिक स्फटिक शिवलिंग।',
    },
  },
  {
    id: 'hanuman-frames',
    icon: '🖼️',
    name: 'Hanuman Ji Photo Frames',
    hindiName: 'हनुमान जी फोटो फ्रेम',
    desc: {
      en: 'Gold foil, embossed and wooden frames of Panchmukhi and Sankat Mochan Hanuman Ji.',
      hi: 'पंचमुखी व संकटमोचन हनुमान जी के स्वर्ण-वर्क एवं सुंदर काष्ठ फ्रेम।',
    },
  },
  {
    id: 'showpieces',
    icon: '🪔',
    name: 'Decorative Showpieces',
    hindiName: 'सजावटी शोपीस',
    desc: {
      en: 'Auspicious home decor items, brass diyas, hanging bells, tortoise, and Vastu artifacts.',
      hi: 'वास्तु कछुआ, पीतल के दीपक, घंटी एवं मांगलिक गृह-सज्जा वस्तुएं।',
    },
  },
  {
    id: 'jaap-mala',
    icon: '📿',
    name: 'Jaap Mala (Tulsi, Sphatik, Kamal Gatta)',
    hindiName: 'जाप माला (तुलसी, स्फटिक, कमलगट्टा)',
    desc: {
      en: 'Pure Vrindavan Tulsi mala, cooling Sphatik mala, and Lakshmi Kamal Gatta japa malas.',
      hi: 'मूल वृन्दावन तुलसी माला, स्फटिक माला एवं धनप्रद कमलगट्टा माला।',
    },
  },
  {
    id: 'kada-bracelet',
    icon: '💫',
    name: 'Kada & Astrological Bracelets',
    hindiName: 'कड़ा एवं ब्रेसलेट',
    desc: {
      en: 'Pure copper, brass, panchdhatu and silver kadas, Navratna bracelets and healing stone cuffs.',
      hi: 'शुद्ध तांबा, पंचधातु एवं चांदी के कड़े, नवरत्न ब्रेसलेट।',
    },
  },
]

export const FEATURED_STONE_IDS = [
  'burma-ruby',
  'emerald-stone',
  'ceylon-blue-sapphire',
  'ceylon-yellow-sapphire',
  'coral',
  'pitambari-neelam',
]

export const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z',
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
