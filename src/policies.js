/**
 * ============================================================================
 *  SACHIN JEWELLERS — STORE POLICIES  (shown in the footer policy modals)
 * ============================================================================
 *
 *  Each policy is a list of sections. Every section carries its own English and
 *  Hindi heading (`h`) and paragraph list (`p`), so the existing language
 *  toggle switches the whole document at once. A section may set `callout: true`
 *  to be rendered as a highlighted box.
 *
 *  This is the only file you need to edit to change policy wording.
 * ========================================================================== */

export const POLICY_BUSINESS = {
  name: 'Sachin Jewellers',
  proprietor: 'Sachin Kumar Verma',
  address:
    '38/44/1, Canal Road, Near Bhagwati Provision Store, Jakhan, Dehradun, Uttarakhand 248001',
  gstin: '05BKAPV6071M2ZP',
  phone: '7409985747',
  phoneIntl: '917409985747',
  email: 'dudsachin0@gmail.com',
}

const UPDATED = { en: 'September 2026', hi: 'सितंबर 2026' }

export const POLICIES = [
  /* ======================================================================
   *  TERMS & CONDITIONS
   * ==================================================================== */
  {
    key: 'terms',
    title: { en: 'Terms & Conditions', hi: 'नियम एवं शर्तें' },
    updated: UPDATED,
    sections: [
      {
        en: {
          h: '1. Acceptance of these Terms',
          p: [
            'These Terms & Conditions govern your use of the Sachin Jewellers website and your purchase of any gemstone, rudraksha, bracelet or related service from us. By browsing this website, submitting an enquiry, or placing an order, you confirm that you have read, understood and agree to be bound by these Terms and by our Privacy Policy, Shipping Policy and Refund & Replacement Policy.',
            'If you do not agree with any part of these Terms, please do not use this website or place an order with us. We may update these Terms from time to time; the version in force is the one published on this page at the time of your order.',
          ],
        },
        hi: {
          h: '1. इन शर्तों की स्वीकृति',
          p: [
            'ये नियम एवं शर्तें सचिन ज्वैलर्स की वेबसाइट के उपयोग तथा हमसे किसी भी रत्न, रुद्राक्ष, ब्रेसलेट या संबंधित सेवा की खरीद पर लागू होती हैं। इस वेबसाइट को देखकर, पूछताछ भेजकर या ऑर्डर देकर आप पुष्टि करते हैं कि आपने इन शर्तों, हमारी गोपनीयता नीति, शिपिंग नीति तथा रिफ़ंड एवं रिप्लेसमेंट नीति को पढ़ा, समझा और इनसे बंधे रहने के लिए सहमत हैं।',
            'यदि आप इन शर्तों के किसी भी भाग से सहमत नहीं हैं, तो कृपया इस वेबसाइट का उपयोग न करें और हमें ऑर्डर न दें। हम समय-समय पर इन शर्तों को अद्यतन कर सकते हैं; आपके ऑर्डर के समय इस पृष्ठ पर प्रकाशित संस्करण ही लागू माना जाएगा।',
          ],
        },
      },
      {
        en: {
          h: '2. Who we are',
          p: [
            'This website is operated by Sachin Jewellers, a proprietorship of Sachin Kumar Verma, with its registered place of business at 38/44/1, Canal Road, Near Bhagwati Provision Store, Jakhan, Dehradun, Uttarakhand 248001, India. Our GSTIN is 05BKAPV6071M2ZP.',
            'You can reach us on phone or WhatsApp at 7409985747 or by email at dudsachin0@gmail.com. All enquiries and orders are handled personally by our team.',
          ],
        },
        hi: {
          h: '2. हम कौन हैं',
          p: [
            'यह वेबसाइट सचिन ज्वैलर्स द्वारा संचालित है, जो सचिन कुमार वर्मा की एकल स्वामित्व वाली फर्म है, जिसका पंजीकृत व्यवसाय स्थल 38/44/1, कैनाल रोड, भगवती प्रोविज़न स्टोर के पास, जाखन, देहरादून, उत्तराखंड 248001, भारत है। हमारा जीएसटीआईएन 05BKAPV6071M2ZP है।',
            'आप हमसे फ़ोन या व्हाट्सएप पर 7409985747 अथवा ईमेल dudsachin0@gmail.com के ज़रिए संपर्क कर सकते हैं। सभी पूछताछ और ऑर्डर हमारी टीम द्वारा व्यक्तिगत रूप से संभाले जाते हैं।',
          ],
        },
      },
      {
        en: {
          h: '3. Product descriptions and natural variation',
          p: [
            'Gemstones, rudraksha and coral are natural materials. No two stones are identical: colour, tone, transparency, size, weight, shape, surface texture and internal characteristics (inclusions, veils, growth lines) vary from stone to stone, and rudraksha beads vary in size, contour and the depth of their faces. Photographs on this website and on WhatsApp are taken in natural and studio light and are representative of the type and quality of the item; the exact piece you receive will have its own individual character.',
            'These natural variations are an inherent feature of genuine, untreated material and are not defects. Where a stone has been heated or treated in any way, we state this in writing before you buy. Weights and measurements are accurate to normal trade tolerances. If the specific characteristics of a piece matter to you, please ask us for additional photos, video or a full description before confirming your order.',
          ],
        },
        hi: {
          h: '3. उत्पाद विवरण और प्राकृतिक भिन्नता',
          p: [
            'रत्न, रुद्राक्ष और मूँगा प्राकृतिक पदार्थ हैं। कोई भी दो पत्थर एक जैसे नहीं होते: रंग, आभा, पारदर्शिता, आकार, वज़न, बनावट, सतह और आंतरिक विशेषताएँ (रेशे, धारियाँ, वृद्धि-रेखाएँ) पत्थर-दर-पत्थर अलग होती हैं, और रुद्राक्ष दानों का आकार, गोलाई तथा मुखों की गहराई भी भिन्न होती है। इस वेबसाइट और व्हाट्सएप पर दी गई तस्वीरें प्राकृतिक तथा स्टूडियो प्रकाश में ली जाती हैं और वस्तु के प्रकार व गुणवत्ता का प्रतिनिधित्व करती हैं; आपको प्राप्त होने वाला विशिष्ट टुकड़ा अपनी अलग पहचान रखेगा।',
            'ये प्राकृतिक भिन्नताएँ असली, बिना संस्कारित पदार्थ की स्वाभाविक विशेषता हैं और दोष नहीं मानी जातीं। यदि किसी पत्थर को किसी भी रूप में गर्म या संस्कारित किया गया है, तो हम खरीद से पहले यह लिखित में बताते हैं। वज़न और माप सामान्य व्यापारिक सहनशीलता के अनुसार सटीक होते हैं। यदि किसी टुकड़े की विशिष्ट विशेषताएँ आपके लिए महत्वपूर्ण हैं, तो कृपया ऑर्डर की पुष्टि से पहले हमसे अतिरिक्त तस्वीरें, वीडियो या पूरा विवरण माँगें।',
          ],
        },
      },
      {
        en: {
          h: '4. Pricing, taxes and GST',
          p: [
            'All prices are quoted in Indian Rupees (INR). Prices shown on the website are indicative; the final price of a specific piece is confirmed by us over WhatsApp or email at the time of enquiry, based on the actual weight, quality and certification of the stone. We reserve the right to correct pricing errors before an order is confirmed.',
            'Prices are inclusive of Goods and Services Tax (GST) unless stated otherwise, and a GST invoice is issued for every order. Shipping and insurance charges, where applicable, are shown separately before you confirm. You are responsible for any additional duties or local taxes on shipments outside India.',
          ],
        },
        hi: {
          h: '4. मूल्य, कर और जीएसटी',
          p: [
            'सभी मूल्य भारतीय रुपये (INR) में हैं। वेबसाइट पर दिखाए गए मूल्य सांकेतिक हैं; किसी विशिष्ट टुकड़े का अंतिम मूल्य पूछताछ के समय पत्थर के वास्तविक वज़न, गुणवत्ता और प्रमाणन के आधार पर व्हाट्सएप या ईमेल द्वारा हमारे द्वारा पुष्ट किया जाता है। ऑर्डर की पुष्टि से पहले मूल्य संबंधी त्रुटियों को सुधारने का अधिकार हमारे पास सुरक्षित है।',
            'जब तक अन्यथा न कहा जाए, मूल्यों में वस्तु एवं सेवा कर (जीएसटी) सम्मिलित है, और हर ऑर्डर के लिए जीएसटी चालान जारी किया जाता है। जहाँ लागू हो, शिपिंग और बीमा शुल्क पुष्टि से पहले अलग से दिखाए जाते हैं। भारत के बाहर भेजी गई खेप पर किसी भी अतिरिक्त शुल्क या स्थानीय कर की ज़िम्मेदारी आपकी होगी।',
          ],
        },
      },
      {
        en: {
          h: '5. Orders and order confirmation',
          p: [
            'Placing an enquiry or clicking "Buy Now" starts a conversation; it is not by itself a binding contract. Your order is confirmed only when we have (a) agreed the specific piece, final price, taxes and delivery charge with you in writing, and (b) received the agreed payment or advance. We will then send you a written order confirmation and a GST invoice.',
            'We may decline or cancel an order before dispatch if the item is no longer available, if there was a pricing or description error, if we are unable to verify the buyer, or if we suspect fraud. In such cases any amount you have paid is refunded in full to the original payment method.',
          ],
        },
        hi: {
          h: '5. ऑर्डर और ऑर्डर की पुष्टि',
          p: [
            'पूछताछ भेजना या "अभी खरीदें" पर क्लिक करना बातचीत शुरू करता है; यह स्वयं में कोई बाध्यकारी अनुबंध नहीं है। आपका ऑर्डर तभी पुष्ट होता है जब हमने (क) विशिष्ट टुकड़े, अंतिम मूल्य, करों और डिलीवरी शुल्क पर आपके साथ लिखित में सहमति बना ली हो, और (ख) सहमत भुगतान या अग्रिम प्राप्त कर लिया हो। इसके बाद हम आपको लिखित ऑर्डर पुष्टि और जीएसटी चालान भेजते हैं।',
            'यदि वस्तु अब उपलब्ध नहीं है, मूल्य या विवरण में त्रुटि थी, हम खरीदार की पहचान सत्यापित नहीं कर पाते, या हमें धोखाधड़ी का संदेह हो, तो हम डिस्पैच से पहले ऑर्डर अस्वीकार या रद्द कर सकते हैं। ऐसी स्थिति में आपके द्वारा भुगतान की गई कोई भी राशि मूल भुगतान माध्यम में पूरी तरह वापस कर दी जाती है।',
          ],
        },
      },
      {
        callout: true,
        en: {
          h: '6. Astrological and traditional recommendations',
          p: [
            'Sachin Jewellers sells gemstones, rudraksha and bracelets. Any information we provide about planetary rulership, rashi, nakshatra, the day or finger for wearing a stone, or the traditional properties attributed to a gemstone, is shared as part of long-standing cultural and Vedic-astrology tradition. It is offered for general interest only.',
            'Such recommendations — including anything shown by the Kundali Checker or the Ratna Salaah advisor on this website — are traditional beliefs. They are not medical, psychological, legal or financial advice, and they are not a prediction or guarantee of any outcome. Do not stop, delay or change any medical treatment, medication, or financial decision on the basis of an astrological recommendation. For health matters consult a qualified doctor; for financial matters consult a qualified adviser; for a complete horoscope consult a qualified astrologer. You wear and use any item entirely at your own discretion.',
          ],
        },
        hi: {
          h: '6. ज्योतिषीय और पारंपरिक अनुशंसाएँ',
          p: [
            'सचिन ज्वैलर्स रत्न, रुद्राक्ष और ब्रेसलेट बेचता है। ग्रह-स्वामित्व, राशि, नक्षत्र, रत्न धारण करने के दिन या उँगली, अथवा किसी रत्न से जुड़े पारंपरिक गुणों के बारे में हम जो भी जानकारी देते हैं, वह दीर्घकालीन सांस्कृतिक तथा वैदिक ज्योतिष परंपरा के अंग के रूप में साझा की जाती है और केवल सामान्य जानकारी हेतु है।',
            'ऐसी अनुशंसाएँ — इस वेबसाइट के कुंडली जाँच या रत्न सलाह द्वारा दिखाई गई किसी भी बात सहित — पारंपरिक मान्यताएँ हैं। ये चिकित्सीय, मनोवैज्ञानिक, कानूनी या वित्तीय सलाह नहीं हैं, और न ही किसी परिणाम की भविष्यवाणी या गारंटी हैं। किसी ज्योतिषीय अनुशंसा के आधार पर कोई चिकित्सा उपचार, दवा या वित्तीय निर्णय बंद, स्थगित या परिवर्तित न करें। स्वास्थ्य संबंधी विषयों के लिए योग्य चिकित्सक से, वित्तीय विषयों के लिए योग्य सलाहकार से, और पूर्ण कुंडली के लिए योग्य ज्योतिषी से परामर्श लें। किसी भी वस्तु को धारण करना और उपयोग करना पूर्णतः आपके अपने विवेक पर है।',
          ],
        },
      },
      {
        en: {
          h: '7. Certification',
          p: [
            'Where a gemstone is described as certified, it is accompanied by a report from an independent, recognised gem-testing laboratory. The certificate describes the stone as it was tested; it is a statement of identity and characteristics, not a valuation and not a promise of any astrological or physical effect. Please keep your certificate safe, as replacements from the laboratory take time and carry a fee.',
          ],
        },
        hi: {
          h: '7. प्रमाणन',
          p: [
            'जहाँ किसी रत्न को प्रमाणित बताया गया है, उसके साथ किसी स्वतंत्र, मान्यता प्राप्त रत्न-परीक्षण प्रयोगशाला की रिपोर्ट होती है। प्रमाणपत्र पत्थर का वैसा ही विवरण देता है जैसा परीक्षण के समय था; यह पहचान और विशेषताओं का कथन है, मूल्यांकन नहीं और किसी ज्योतिषीय या भौतिक प्रभाव का वादा नहीं। कृपया अपना प्रमाणपत्र सुरक्षित रखें, क्योंकि प्रयोगशाला से दोबारा प्रमाणपत्र लेने में समय लगता है और शुल्क भी लगता है।',
          ],
        },
      },
      {
        en: {
          h: '8. Intellectual property',
          p: [
            'All content on this website — the Sachin Jewellers name, logo and monogram, text, product descriptions, photographs, page design, and the code of the Kundali Checker and Ratna Salaah tools — is owned by or licensed to Sachin Jewellers and is protected by Indian and international intellectual-property law. You may view and share pages for personal, non-commercial use. You may not copy, reproduce, republish, scrape, or use our content, images or branding for any commercial purpose without our prior written permission.',
          ],
        },
        hi: {
          h: '8. बौद्धिक संपदा',
          p: [
            'इस वेबसाइट की समस्त सामग्री — सचिन ज्वैलर्स का नाम, लोगो और मोनोग्राम, पाठ, उत्पाद विवरण, तस्वीरें, पृष्ठ डिज़ाइन, तथा कुंडली जाँच और रत्न सलाह उपकरणों का कोड — सचिन ज्वैलर्स के स्वामित्व में या उसे लाइसेंस प्राप्त है और भारतीय एवं अंतर्राष्ट्रीय बौद्धिक-संपदा कानून द्वारा संरक्षित है। आप व्यक्तिगत, ग़ैर-व्यावसायिक उपयोग के लिए पृष्ठ देख और साझा कर सकते हैं। हमारी लिखित अनुमति के बिना आप हमारी सामग्री, छवियों या ब्रांडिंग को किसी भी व्यावसायिक उद्देश्य के लिए कॉपी, पुनरुत्पादित, पुनः प्रकाशित या उपयोग नहीं कर सकते।',
          ],
        },
      },
      {
        en: {
          h: '9. Limitation of liability',
          p: [
            'To the fullest extent permitted by law, our total liability arising out of or in connection with any order is limited to the amount you paid for that order. We are not liable for any indirect, incidental or consequential loss, or for any loss of profit, opportunity, or expected benefit — including any outcome you hoped for from wearing a gemstone or rudraksha.',
            'Nothing in these Terms limits liability that cannot be limited under Indian law, including liability for death or personal injury caused by our negligence or for fraud.',
          ],
        },
        hi: {
          h: '9. दायित्व की सीमा',
          p: [
            'कानून द्वारा अनुमत अधिकतम सीमा तक, किसी भी ऑर्डर से उत्पन्न या उससे संबंधित हमारा कुल दायित्व उस ऑर्डर के लिए आपके द्वारा भुगतान की गई राशि तक सीमित है। हम किसी अप्रत्यक्ष, आनुषंगिक या परिणामी हानि के लिए, अथवा लाभ, अवसर या अपेक्षित फ़ायदे की किसी हानि के लिए उत्तरदायी नहीं हैं — जिसमें रत्न या रुद्राक्ष धारण करने से आपकी अपेक्षित कोई भी परिणाम शामिल है।',
            'इन शर्तों में कुछ भी उस दायित्व को सीमित नहीं करता जिसे भारतीय कानून के तहत सीमित नहीं किया जा सकता, जिसमें हमारी लापरवाही से हुई मृत्यु या शारीरिक चोट अथवा धोखाधड़ी का दायित्व शामिल है।',
          ],
        },
      },
      {
        en: {
          h: '10. Governing law and jurisdiction',
          p: [
            'These Terms and any dispute or claim arising out of them or your use of this website are governed by the laws of India. The courts at Dehradun, Uttarakhand have exclusive jurisdiction, and you agree to submit to that jurisdiction. Before starting any legal proceeding, we ask that you contact us so we can try to resolve the matter directly.',
          ],
        },
        hi: {
          h: '10. लागू कानून और अधिकार-क्षेत्र',
          p: [
            'ये शर्तें तथा इनसे या इस वेबसाइट के आपके उपयोग से उत्पन्न कोई भी विवाद या दावा भारत के कानूनों द्वारा शासित होगा। देहरादून, उत्तराखंड के न्यायालयों को विशेष अधिकार-क्षेत्र प्राप्त है, और आप उस अधिकार-क्षेत्र के अधीन होने के लिए सहमत हैं। कोई भी कानूनी कार्यवाही शुरू करने से पहले, कृपया हमसे संपर्क करें ताकि हम मामले को सीधे सुलझाने का प्रयास कर सकें।',
          ],
        },
      },
    ],
  },

  /* ======================================================================
   *  PRIVACY POLICY
   * ==================================================================== */
  {
    key: 'privacy',
    title: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    updated: UPDATED,
    sections: [
      {
        en: {
          h: '1. Our approach to your privacy',
          p: [
            'Sachin Jewellers (proprietor Sachin Kumar Verma), 38/44/1, Canal Road, Near Bhagwati Provision Store, Jakhan, Dehradun, Uttarakhand 248001, is the data controller for the limited personal information handled through this website. We collect as little as possible, use it only to answer you and fulfil your order, and never sell it.',
            'This policy explains what we collect, why, how long we keep it, and the choices you have.',
          ],
        },
        hi: {
          h: '1. आपकी निजता के प्रति हमारा दृष्टिकोण',
          p: [
            'सचिन ज्वैलर्स (स्वामी सचिन कुमार वर्मा), 38/44/1, कैनाल रोड, भगवती प्रोविज़न स्टोर के पास, जाखन, देहरादून, उत्तराखंड 248001, इस वेबसाइट के माध्यम से संभाली गई सीमित व्यक्तिगत जानकारी का डेटा नियंत्रक है। हम यथासंभव कम जानकारी लेते हैं, उसका उपयोग केवल आपको उत्तर देने और आपका ऑर्डर पूरा करने के लिए करते हैं, और उसे कभी नहीं बेचते।',
            'यह नीति बताती है कि हम क्या एकत्र करते हैं, क्यों, कितने समय तक रखते हैं, और आपके पास कौन-से विकल्प हैं।',
          ],
        },
      },
      {
        en: {
          h: '2. Information we collect',
          p: [
            'When you send an enquiry or contact us, we collect the details you choose to give us: your name, phone number, email address and the content of your message. When you place an order we also collect your delivery address and, for high-value orders, identity-verification details required by the courier.',
            'When you use the Kundali Checker you enter your name, date of birth, time of birth and, if born outside India, the UTC offset of your birthplace. When you use the Ratna Salaah advisor you select your rashi. How this birth information is handled is described in the next section.',
            'We do not run analytics or advertising trackers on this website and we do not build profiles about you.',
          ],
        },
        hi: {
          h: '2. हम कौन-सी जानकारी एकत्र करते हैं',
          p: [
            'जब आप पूछताछ भेजते हैं या हमसे संपर्क करते हैं, तो हम वही विवरण एकत्र करते हैं जो आप हमें देना चुनते हैं: आपका नाम, फ़ोन नंबर, ईमेल पता और आपके संदेश की सामग्री। जब आप ऑर्डर देते हैं तो हम आपका डिलीवरी पता और, उच्च-मूल्य ऑर्डर के लिए, कूरियर द्वारा आवश्यक पहचान-सत्यापन विवरण भी लेते हैं।',
            'जब आप कुंडली जाँच का उपयोग करते हैं तो आप अपना नाम, जन्म तिथि, जन्म समय और, यदि जन्म भारत के बाहर हुआ है तो जन्म स्थान का UTC ऑफ़सेट दर्ज करते हैं। जब आप रत्न सलाह का उपयोग करते हैं तो आप अपनी राशि चुनते हैं। यह जन्म जानकारी कैसे संभाली जाती है, यह अगले भाग में बताया गया है।',
            'हम इस वेबसाइट पर कोई एनालिटिक्स या विज्ञापन ट्रैकर नहीं चलाते और आपके बारे में कोई प्रोफ़ाइल नहीं बनाते।',
          ],
        },
      },
      {
        callout: true,
        en: {
          h: '3. The Kundali Checker and Ratna Salaah run entirely in your browser',
          p: [
            'The Kundali Checker and the Ratna Salaah advisor are calculated on your own device, inside your web browser. Your date of birth, time of birth, birthplace offset, name and rashi are used only by code running locally on your phone or computer to work out the Moon sign, nakshatra, pada and the traditionally recommended stone.',
            'This birth information is never transmitted to our servers, never stored on any server, and never seen by us or by any third party. It is not logged, not backed up, and not shared. When you close or refresh the page, the values you typed are gone. The only time any of this reaches us is if you choose to press the WhatsApp button in the result — which opens WhatsApp with a message you can read and edit before you send it.',
          ],
        },
        hi: {
          h: '3. कुंडली जाँच और रत्न सलाह पूरी तरह आपके ब्राउज़र में चलते हैं',
          p: [
            'कुंडली जाँच और रत्न सलाह की गणना आपके अपने डिवाइस पर, आपके वेब ब्राउज़र के भीतर होती है। आपकी जन्म तिथि, जन्म समय, जन्मस्थान ऑफ़सेट, नाम और राशि का उपयोग केवल आपके फ़ोन या कंप्यूटर पर स्थानीय रूप से चलने वाले कोड द्वारा चंद्र राशि, नक्षत्र, पाद और पारंपरिक रूप से अनुशंसित रत्न निकालने के लिए किया जाता है।',
            'यह जन्म जानकारी कभी हमारे सर्वर पर नहीं भेजी जाती, किसी सर्वर पर संग्रहीत नहीं होती, और न ही हमारे या किसी तीसरे पक्ष द्वारा देखी जाती है। इसे लॉग नहीं किया जाता, बैकअप नहीं लिया जाता और साझा नहीं किया जाता। जब आप पृष्ठ बंद या रीफ़्रेश करते हैं, तो आपके द्वारा दर्ज मान समाप्त हो जाते हैं। यह जानकारी केवल तभी हम तक पहुँचती है जब आप परिणाम में व्हाट्सएप बटन दबाना चुनते हैं — जो व्हाट्सएप को एक संदेश के साथ खोलता है जिसे आप भेजने से पहले पढ़ और संपादित कर सकते हैं।',
          ],
        },
      },
      {
        en: {
          h: '4. How we use enquiry and order information',
          p: [
            'We use the details you send us to respond to your enquiry, quote and confirm prices, prepare your GST invoice, arrange packing, insurance and delivery, provide after-sales support, and keep the records we are required to keep under tax and company law. That is all. We do not use your information for automated decision-making or marketing profiles.',
            'We may send you occasional messages about your own order or a piece you asked about. We will not add you to a promotional list without your clear consent, and you can ask us to stop non-essential messages at any time.',
          ],
        },
        hi: {
          h: '4. हम पूछताछ और ऑर्डर जानकारी का उपयोग कैसे करते हैं',
          p: [
            'आपके भेजे विवरण का उपयोग हम आपकी पूछताछ का उत्तर देने, मूल्य बताने और पुष्ट करने, आपका जीएसटी चालान तैयार करने, पैकिंग, बीमा और डिलीवरी की व्यवस्था करने, बिक्री-पश्चात सहायता देने, तथा कर एवं कंपनी कानून के अंतर्गत आवश्यक रिकॉर्ड रखने के लिए करते हैं। बस इतना ही। हम आपकी जानकारी का उपयोग स्वचालित निर्णय-प्रक्रिया या मार्केटिंग प्रोफ़ाइल के लिए नहीं करते।',
            'हम आपको आपके अपने ऑर्डर या आपकी पूछी गई वस्तु के बारे में कभी-कभार संदेश भेज सकते हैं। आपकी स्पष्ट सहमति के बिना हम आपको किसी प्रचार सूची में नहीं जोड़ेंगे, और आप किसी भी समय हमें ग़ैर-ज़रूरी संदेश बंद करने के लिए कह सकते हैं।',
          ],
        },
      },
      {
        en: {
          h: '5. WhatsApp communication',
          p: [
            'Most of our contact with customers happens over WhatsApp. When you message us there, your phone number and the content of your chat are visible to us and are handled by WhatsApp (Meta) under its own terms and privacy policy, which we do not control. Please do not send sensitive documents over chat unless we ask for them for a specific purpose, such as courier identity verification.',
            'We keep order-related WhatsApp chats for as long as we may need them for support, warranty and legal records.',
          ],
        },
        hi: {
          h: '5. व्हाट्सएप संचार',
          p: [
            'ग्राहकों से हमारा अधिकांश संपर्क व्हाट्सएप पर होता है। जब आप हमें वहाँ संदेश भेजते हैं, तो आपका फ़ोन नंबर और आपकी चैट की सामग्री हमें दिखाई देती है और WhatsApp (Meta) द्वारा उसकी अपनी शर्तों और गोपनीयता नीति के अंतर्गत संभाली जाती है, जिस पर हमारा नियंत्रण नहीं है। कृपया संवेदनशील दस्तावेज़ चैट पर तब तक न भेजें जब तक हम किसी विशेष उद्देश्य, जैसे कूरियर पहचान सत्यापन, के लिए न माँगें।',
            'ऑर्डर से जुड़ी व्हाट्सएप चैट को हम तब तक रखते हैं जब तक सहायता, वारंटी और कानूनी रिकॉर्ड के लिए आवश्यकता हो सकती है।',
          ],
        },
      },
      {
        en: {
          h: '6. We do not sell your data',
          p: [
            'We never sell, rent or trade your personal information to anyone. We share it only with the service providers we need to complete your order — for example a courier and insurer for delivery, our payment provider, and our accountant — and only the minimum they need. These providers are required to protect your data and use it only for the service they provide to us. We may also disclose information where the law requires it, or to establish or defend a legal claim.',
          ],
        },
        hi: {
          h: '6. हम आपका डेटा नहीं बेचते',
          p: [
            'हम आपकी व्यक्तिगत जानकारी किसी को भी कभी नहीं बेचते, किराए पर नहीं देते या उसका व्यापार नहीं करते। हम इसे केवल उन सेवा प्रदाताओं के साथ साझा करते हैं जिनकी आपका ऑर्डर पूरा करने के लिए आवश्यकता होती है — उदाहरण के लिए डिलीवरी हेतु कूरियर और बीमाकर्ता, हमारा भुगतान प्रदाता, और हमारा लेखाकार — और केवल उतनी ही जितनी उन्हें न्यूनतम आवश्यकता हो। इन प्रदाताओं के लिए आपके डेटा की रक्षा करना और उसका उपयोग केवल हमें दी जाने वाली सेवा के लिए करना आवश्यक है। जहाँ कानून की माँग हो, या किसी कानूनी दावे को स्थापित या बचाव करने के लिए भी हम जानकारी प्रकट कर सकते हैं।',
          ],
        },
      },
      {
        en: {
          h: '7. Cookies and local storage',
          p: [
            'This website does not use advertising or tracking cookies. It uses a small amount of your browser’s local storage for essential things only — for example, to remember that you have already seen the intro animation during your visit. This information stays on your device and is not sent anywhere. You can clear it at any time through your browser settings.',
          ],
        },
        hi: {
          h: '7. कुकीज़ और लोकल स्टोरेज',
          p: [
            'यह वेबसाइट कोई विज्ञापन या ट्रैकिंग कुकी उपयोग नहीं करती। यह आपके ब्राउज़र के लोकल स्टोरेज का थोड़ा-सा उपयोग केवल आवश्यक कार्यों के लिए करती है — उदाहरण के लिए यह याद रखने के लिए कि आप अपनी यात्रा के दौरान परिचय एनिमेशन पहले ही देख चुके हैं। यह जानकारी आपके डिवाइस पर ही रहती है और कहीं नहीं भेजी जाती। आप इसे अपनी ब्राउज़र सेटिंग्स से किसी भी समय हटा सकते हैं।',
          ],
        },
      },
      {
        en: {
          h: '8. How long we keep information',
          p: [
            'Enquiry messages that do not lead to an order are kept only as long as needed to deal with them and are then deleted. Order records, invoices and related correspondence are kept for the period required by Indian tax and company law (currently at least eight years) and are then securely deleted.',
          ],
        },
        hi: {
          h: '8. हम जानकारी कितने समय तक रखते हैं',
          p: [
            'जो पूछताछ संदेश किसी ऑर्डर में नहीं बदलते, उन्हें केवल उतने समय तक रखा जाता है जितना उनसे निपटने के लिए आवश्यक हो, और फिर हटा दिया जाता है। ऑर्डर रिकॉर्ड, चालान और संबंधित पत्राचार भारतीय कर एवं कंपनी कानून द्वारा आवश्यक अवधि (वर्तमान में कम से कम आठ वर्ष) तक रखे जाते हैं और फिर सुरक्षित रूप से हटा दिए जाते हैं।',
          ],
        },
      },
      {
        en: {
          h: '9. Your rights and data removal',
          p: [
            'You can ask us to show you what personal information we hold about you, correct anything that is wrong, or delete your information where we are not legally required to keep it. To make a request, message us on WhatsApp at 7409985747 or email dudsachin0@gmail.com from the contact details we have on file. We will respond within a reasonable time, normally within 30 days.',
            'Because the Kundali and Ratna Salaah tools never send us your birth details, there is nothing of that kind for us to delete.',
          ],
        },
        hi: {
          h: '9. आपके अधिकार और डेटा हटाना',
          p: [
            'आप हमसे कह सकते हैं कि हम आपके बारे में रखी व्यक्तिगत जानकारी आपको दिखाएँ, किसी ग़लत बात को सुधारें, या जहाँ हमें कानूनी रूप से रखना आवश्यक नहीं है वहाँ आपकी जानकारी हटा दें। अनुरोध के लिए, हमारे पास दर्ज संपर्क विवरण से व्हाट्सएप पर 7409985747 पर संदेश भेजें या dudsachin0@gmail.com पर ईमेल करें। हम उचित समय में, सामान्यतः 30 दिनों के भीतर, उत्तर देंगे।',
            'चूँकि कुंडली और रत्न सलाह उपकरण आपकी जन्म जानकारी हमें कभी नहीं भेजते, इसलिए उस प्रकार का हमारे पास हटाने के लिए कुछ नहीं होता।',
          ],
        },
      },
    ],
  },

  /* ======================================================================
   *  SHIPPING POLICY
   * ==================================================================== */
  {
    key: 'shipping',
    title: { en: 'Shipping Policy', hi: 'शिपिंग नीति' },
    updated: UPDATED,
    sections: [
      {
        en: {
          h: '1. Order processing and dispatch',
          p: [
            'Ready-stock items are normally dispatched within 2 to 4 working days of your order being confirmed and payment being received. Items that need certification, sizing, stringing or a bespoke setting take longer; we tell you the expected date in writing before you confirm.',
            'Orders are packed and dispatched only on working days. Dispatch may pause during major festivals, bank holidays or courier disruptions, and we will keep you updated on WhatsApp.',
          ],
        },
        hi: {
          h: '1. ऑर्डर प्रोसेसिंग और डिस्पैच',
          p: [
            'तैयार-स्टॉक वस्तुएँ सामान्यतः ऑर्डर पुष्ट होने और भुगतान प्राप्त होने के 2 से 4 कार्य-दिवसों के भीतर भेज दी जाती हैं। जिन वस्तुओं को प्रमाणन, नाप, गुँथाई या विशेष जड़ाई की आवश्यकता होती है, उनमें अधिक समय लगता है; पुष्टि से पहले हम आपको अपेक्षित तिथि लिखित में बताते हैं।',
            'ऑर्डर केवल कार्य-दिवसों पर पैक और डिस्पैच किए जाते हैं। बड़े त्योहारों, बैंक अवकाशों या कूरियर व्यवधानों के दौरान डिस्पैच रुक सकता है, और हम आपको व्हाट्सएप पर अद्यतन रखेंगे।',
          ],
        },
      },
      {
        en: {
          h: '2. Packaging and insurance',
          p: [
            'Every piece is packed discreetly and securely, with no external marking that identifies the contents as jewellery. High-value gemstones, bracelets and made-to-order pieces are sent by fully insured courier or insured registered post, so that the item is covered against loss or damage while it is in transit to you.',
            'Lower-value items such as a single rudraksha bead or a bead bracelet may be sent by standard tracked courier. We will tell you which service applies and show any insurance or shipping charge separately before you confirm.',
          ],
        },
        hi: {
          h: '2. पैकिंग और बीमा',
          p: [
            'हर टुकड़ा सतर्कता और सुरक्षा के साथ पैक किया जाता है, जिस पर बाहर से ऐसा कोई निशान नहीं होता जो सामग्री को आभूषण के रूप में पहचानता हो। उच्च-मूल्य रत्न, ब्रेसलेट और मेड-टू-ऑर्डर टुकड़े पूर्ण बीमित कूरियर या बीमित रजिस्टर्ड डाक द्वारा भेजे जाते हैं, ताकि आप तक पहुँचने के दौरान वस्तु हानि या क्षति से सुरक्षित रहे।',
            'कम मूल्य की वस्तुएँ जैसे एकल रुद्राक्ष दाना या मनका ब्रेसलेट सामान्य ट्रैक्ड कूरियर से भेजी जा सकती हैं। कौन-सी सेवा लागू होती है और कोई बीमा या शिपिंग शुल्क, यह हम पुष्टि से पहले अलग से बताते और दिखाते हैं।',
          ],
        },
      },
      {
        en: {
          h: '3. Tracking',
          p: [
            'As soon as your order is dispatched we send you the courier name and tracking number on WhatsApp, along with a photo of the sealed parcel. We follow the shipment with you until it is delivered and are happy to chase the courier on your behalf if anything looks delayed.',
          ],
        },
        hi: {
          h: '3. ट्रैकिंग',
          p: [
            'आपका ऑर्डर डिस्पैच होते ही हम आपको व्हाट्सएप पर कूरियर का नाम और ट्रैकिंग नंबर भेजते हैं, साथ ही सील किए गए पार्सल की एक तस्वीर भी। हम डिलीवरी होने तक आपके साथ खेप का अनुसरण करते हैं और यदि कुछ विलंबित दिखे तो आपकी ओर से कूरियर से संपर्क करने में हमें प्रसन्नता होती है।',
          ],
        },
      },
      {
        en: {
          h: '4. Delivery estimates across India',
          p: [
            'As a guide, after dispatch: metro cities 2 to 4 working days; other state capitals and large towns 3 to 6 working days; smaller towns and remote or hill areas 5 to 9 working days. Uttarakhand deliveries are usually quicker. These are courier estimates, not guarantees.',
            'Overseas shipping is arranged case by case. If you are outside India, message us with your city and country and we will quote the carrier, cost, insurance and expected time before you order.',
          ],
        },
        hi: {
          h: '4. भारत भर में डिलीवरी अनुमान',
          p: [
            'मार्गदर्शन के रूप में, डिस्पैच के बाद: महानगर 2 से 4 कार्य-दिवस; अन्य राज्य राजधानियाँ और बड़े शहर 3 से 6 कार्य-दिवस; छोटे शहर तथा दूरस्थ या पहाड़ी क्षेत्र 5 से 9 कार्य-दिवस। उत्तराखंड में डिलीवरी सामान्यतः तेज़ होती है। ये कूरियर अनुमान हैं, गारंटी नहीं।',
            'विदेश शिपिंग हर मामले के अनुसार तय की जाती है। यदि आप भारत के बाहर हैं, तो हमें अपना शहर और देश बताते हुए संदेश भेजें और हम ऑर्डर से पहले वाहक, लागत, बीमा और अपेक्षित समय बता देंगे।',
          ],
        },
      },
      {
        en: {
          h: '5. Identity verification on delivery',
          p: [
            'For high-value orders, the courier will require the person accepting the parcel to show a government photo ID matching the recipient name, and may record an OTP or signature on delivery. Please make sure someone authorised is available at the address to complete this. If you need the parcel delivered to a different name or address, tell us in advance so we can arrange it correctly.',
          ],
        },
        hi: {
          h: '5. डिलीवरी पर पहचान सत्यापन',
          p: [
            'उच्च-मूल्य ऑर्डर के लिए, कूरियर पार्सल स्वीकार करने वाले व्यक्ति से प्राप्तकर्ता के नाम से मेल खाता सरकारी फ़ोटो पहचान-पत्र दिखाने को कहेगा, और डिलीवरी पर OTP या हस्ताक्षर दर्ज कर सकता है। कृपया सुनिश्चित करें कि इसे पूरा करने के लिए पते पर कोई अधिकृत व्यक्ति उपलब्ध हो। यदि आपको पार्सल किसी अन्य नाम या पते पर चाहिए, तो पहले से हमें बताएँ ताकि हम इसे सही ढंग से व्यवस्थित कर सकें।',
          ],
        },
      },
      {
        callout: true,
        en: {
          h: '6. Unboxing video is required for any damage or shortage claim',
          p: [
            'You must record one continuous, unedited video while opening the parcel, starting before the outer packaging is cut and showing all sides of the sealed parcel, the seals, every layer of packing, and the item and its certificate as they come out. Do not use this video if the outer seal is already broken or tampered — instead refuse delivery or accept it marked "packaging damaged" and call us immediately.',
            'A claim for an item that arrived damaged, broken, missing or incorrect cannot be considered without this unboxing video plus clear photos, sent to us on WhatsApp within 48 hours of delivery. This is the single condition that lets us claim from the courier and insurer on your behalf, so please treat it as essential. Full details are in our Refund & Replacement Policy.',
          ],
        },
        hi: {
          h: '6. किसी भी क्षति या कमी के दावे के लिए अनबॉक्सिंग वीडियो अनिवार्य है',
          p: [
            'आपको पार्सल खोलते समय एक निरंतर, बिना संपादित वीडियो बनाना होगा, जो बाहरी पैकेजिंग काटने से पहले शुरू हो और सील किए गए पार्सल के सभी हिस्से, सीलें, पैकिंग की हर परत, तथा बाहर निकलते समय वस्तु और उसका प्रमाणपत्र दिखाए। यदि बाहरी सील पहले से टूटी या छेड़छाड़ की गई है तो इस वीडियो का उपयोग न करें — इसके बजाय डिलीवरी अस्वीकार करें या "पैकेजिंग क्षतिग्रस्त" अंकित कराकर स्वीकार करें और तुरंत हमें फ़ोन करें।',
            'क्षतिग्रस्त, टूटी, गुम या ग़लत वस्तु के दावे पर इस अनबॉक्सिंग वीडियो तथा स्पष्ट तस्वीरों के बिना विचार नहीं किया जा सकता, जो डिलीवरी के 48 घंटों के भीतर हमें व्हाट्सएप पर भेजी जानी चाहिए। यही एकमात्र शर्त है जो हमें आपकी ओर से कूरियर और बीमाकर्ता से दावा करने देती है, इसलिए कृपया इसे आवश्यक मानें। पूरा विवरण हमारी रिफ़ंड एवं रिप्लेसमेंट नीति में है।',
          ],
        },
      },
      {
        en: {
          h: '7. Delays outside our control',
          p: [
            'Once a parcel is handed to the courier it is in their custody. We are not responsible for delays caused by the courier, weather, natural events, strikes, road or flight disruption, local restrictions, incorrect or incomplete address details provided by you, or the recipient being unavailable. We will always help you follow up and, where an item is insured, help you claim.',
          ],
        },
        hi: {
          h: '7. हमारे नियंत्रण से बाहर विलंब',
          p: [
            'पार्सल कूरियर को सौंपे जाने के बाद वह उनकी अभिरक्षा में होता है। कूरियर, मौसम, प्राकृतिक घटनाओं, हड़तालों, सड़क या उड़ान व्यवधान, स्थानीय प्रतिबंधों, आपके द्वारा दिए ग़लत या अधूरे पते, अथवा प्राप्तकर्ता के अनुपलब्ध होने से हुए विलंब के लिए हम उत्तरदायी नहीं हैं। हम अनुसरण में सदैव आपकी सहायता करेंगे और, जहाँ वस्तु बीमित है, दावे में मदद करेंगे।',
          ],
        },
      },
      {
        en: {
          h: '8. Wrong or incomplete address, failed delivery',
          p: [
            'Please check your delivery address and phone number on the order confirmation carefully. If a parcel is returned to us because the address was wrong or incomplete, or because delivery was refused or repeatedly unattempted at your location, we will re-send it after you pay the additional shipping and insurance for the second attempt.',
          ],
        },
        hi: {
          h: '8. ग़लत या अधूरा पता, विफल डिलीवरी',
          p: [
            'कृपया ऑर्डर पुष्टि पर अपना डिलीवरी पता और फ़ोन नंबर ध्यान से जाँचें। यदि पता ग़लत या अधूरा होने के कारण, अथवा डिलीवरी अस्वीकार होने या आपके स्थान पर बार-बार प्रयास न हो पाने के कारण पार्सल हमें वापस आता है, तो दूसरे प्रयास के लिए अतिरिक्त शिपिंग और बीमा का भुगतान करने पर हम इसे पुनः भेजेंगे।',
          ],
        },
      },
    ],
  },

  /* ======================================================================
   *  REFUND & REPLACEMENT POLICY
   * ==================================================================== */
  {
    key: 'refund',
    title: { en: 'Refund & Replacement Policy', hi: 'रिफ़ंड एवं रिप्लेसमेंट नीति' },
    updated: UPDATED,
    sections: [
      {
        callout: true,
        en: {
          h: '1. Products are non-refundable — replacement only',
          p: [
            'Because every gemstone, rudraksha and bracelet is a natural, individually selected item, all sales are final and no order is eligible for a monetary refund once it has been confirmed and dispatched.',
            'The only remedy we offer is replacement, and only in the specific situations set out below. Please read this policy fully and ask us any questions before you confirm your order.',
          ],
        },
        hi: {
          h: '1. उत्पाद रिफ़ंड-योग्य नहीं हैं — केवल रिप्लेसमेंट',
          p: [
            'चूँकि प्रत्येक रत्न, रुद्राक्ष और ब्रेसलेट एक प्राकृतिक, व्यक्तिगत रूप से चुनी गई वस्तु है, इसलिए सभी बिक्री अंतिम हैं और पुष्ट तथा डिस्पैच हो जाने के बाद किसी भी ऑर्डर पर मौद्रिक रिफ़ंड नहीं मिलता।',
            'हम केवल रिप्लेसमेंट का उपाय देते हैं, और वह भी नीचे दी गई विशिष्ट स्थितियों में ही। कृपया इस नीति को पूरा पढ़ें और ऑर्डर पुष्ट करने से पहले हमसे कोई भी प्रश्न पूछें।',
          ],
        },
      },
      {
        en: {
          h: '2. When a replacement applies',
          p: [
            'We will replace an item only if, when it reaches you, it is: (a) defective — for example a stone with a crack or chip it did not have when it left us, or a bracelet with a broken string or clasp; (b) damaged in transit; or (c) materially different from what was agreed in writing — for example the wrong stone type, or a weight significantly below what was confirmed on your invoice.',
            'A replacement is not available because you changed your mind, because you no longer want the piece, because an astrologer or family member suggested a different stone, or because of the natural differences in colour, tone, inclusions, size or shape described in our Terms & Conditions. Those natural variations are a feature of genuine material and are not a defect.',
          ],
        },
        hi: {
          h: '2. रिप्लेसमेंट कब लागू होता है',
          p: [
            'हम किसी वस्तु को केवल तभी बदलेंगे जब वह आप तक पहुँचने पर: (क) दोषपूर्ण हो — उदाहरण के लिए ऐसा पत्थर जिसमें दरार या टूट हमारे यहाँ से जाते समय नहीं थी, अथवा टूटी डोरी या क्लैस्प वाला ब्रेसलेट; (ख) परिवहन में क्षतिग्रस्त हो; या (ग) लिखित रूप में तय की गई वस्तु से भौतिक रूप से भिन्न हो — उदाहरण के लिए ग़लत प्रकार का पत्थर, या आपके चालान पर पुष्ट वज़न से काफ़ी कम वज़न।',
            'रिप्लेसमेंट इसलिए उपलब्ध नहीं है कि आपने विचार बदल दिया, अब वह टुकड़ा नहीं चाहते, किसी ज्योतिषी या परिवार के सदस्य ने अलग पत्थर सुझाया, या हमारी नियम एवं शर्तों में वर्णित रंग, आभा, रेशों, आकार या आकृति की प्राकृतिक भिन्नताओं के कारण। ये प्राकृतिक भिन्नताएँ असली पदार्थ की विशेषता हैं, दोष नहीं।',
          ],
        },
      },
      {
        callout: true,
        en: {
          h: '3. Claim window: 48 hours, with unboxing video and photos',
          p: [
            'Any replacement claim must reach us on WhatsApp (7409985747) or by email within 48 hours of the delivery time recorded by the courier.',
            'Your claim must include: the continuous, unedited unboxing video described in our Shipping Policy, showing the sealed parcel and every layer of packing being opened; clear, well-lit photos of the item and of the damage or difference; the certificate; and a short description of the problem. We cannot assess or approve a claim without the unboxing video — this is a firm condition, because it is what allows us to recover from the courier and insurer.',
          ],
        },
        hi: {
          h: '3. दावे की अवधि: 48 घंटे, अनबॉक्सिंग वीडियो और तस्वीरों सहित',
          p: [
            'कोई भी रिप्लेसमेंट दावा कूरियर द्वारा दर्ज डिलीवरी समय के 48 घंटों के भीतर हमें व्हाट्सएप (7409985747) पर या ईमेल द्वारा पहुँच जाना चाहिए।',
            'आपके दावे में शामिल होना चाहिए: हमारी शिपिंग नीति में वर्णित निरंतर, बिना संपादित अनबॉक्सिंग वीडियो, जो सील किया पार्सल और पैकिंग की हर परत खोलते हुए दिखाए; वस्तु तथा क्षति या अंतर की स्पष्ट, अच्छी रोशनी वाली तस्वीरें; प्रमाणपत्र; और समस्या का संक्षिप्त विवरण। अनबॉक्सिंग वीडियो के बिना हम दावे का आकलन या अनुमोदन नहीं कर सकते — यह एक निश्चित शर्त है, क्योंकि यही हमें कूरियर और बीमाकर्ता से वसूली करने देती है।',
          ],
        },
      },
      {
        en: {
          h: '4. Items that are not eligible',
          p: [
            'The following are sold as final and cannot be replaced except where they are genuinely defective on arrival: custom or made-to-order pieces; any item that has been cut, sized, engraved or personalised to your instruction; navratna and multi-stone settings assembled to your specification; items that have been energised, prana-pratishtha performed, or ritually prepared at your request; and any item that has been worn, used, resized, repaired or altered after delivery, or whose certificate or tags have been removed or damaged.',
          ],
        },
        hi: {
          h: '4. जो वस्तुएँ पात्र नहीं हैं',
          p: [
            'निम्नलिखित वस्तुएँ अंतिम रूप में बेची जाती हैं और आगमन पर वास्तव में दोषपूर्ण होने के अतिरिक्त बदली नहीं जा सकतीं: कस्टम या मेड-टू-ऑर्डर टुकड़े; ऐसी कोई वस्तु जिसे आपके निर्देश पर काटा, नापा, उत्कीर्ण (एनग्रेव) या वैयक्तिकृत किया गया हो; आपकी विशिष्टता के अनुसार जोड़ी गई नवरत्न और बहु-रत्न जड़ाई; आपके अनुरोध पर ऊर्जित की गई, प्राण-प्रतिष्ठा की गई या अनुष्ठानिक रूप से तैयार की गई वस्तुएँ; और ऐसी कोई वस्तु जिसे डिलीवरी के बाद पहना, उपयोग, पुनः नापा, मरम्मत या परिवर्तित किया गया हो, अथवा जिसका प्रमाणपत्र या टैग हटा या क्षतिग्रस्त कर दिया गया हो।',
          ],
        },
      },
      {
        en: {
          h: '5. How to raise a claim',
          p: [
            'Step 1 — Within 48 hours of delivery, message us on WhatsApp with your order number, the unboxing video, photos and a description of the issue. Step 2 — Keep the item, its certificate, tags and all packaging exactly as received; do not wear, clean or repair it. Step 3 — We acknowledge your claim, usually within 2 working days, and may ask for additional photos or a short video call to see the item.',
            'Step 4 — If we ask you to return the item, we will share a pickup or return address. Approved claims are returned by insured courier at our cost; use the original packaging. The item must reach us in the same condition you reported.',
          ],
        },
        hi: {
          h: '5. दावा कैसे दर्ज करें',
          p: [
            'चरण 1 — डिलीवरी के 48 घंटों के भीतर, हमें व्हाट्सएप पर अपना ऑर्डर नंबर, अनबॉक्सिंग वीडियो, तस्वीरें और समस्या का विवरण भेजें। चरण 2 — वस्तु, उसका प्रमाणपत्र, टैग और सारी पैकिंग ठीक वैसे ही रखें जैसे प्राप्त हुई; उसे पहनें, साफ़ या मरम्मत न करें। चरण 3 — हम आपका दावा स्वीकार करते हैं, सामान्यतः 2 कार्य-दिवसों में, और अतिरिक्त तस्वीरें या वस्तु देखने हेतु संक्षिप्त वीडियो कॉल माँग सकते हैं।',
            'चरण 4 — यदि हम आपसे वस्तु लौटाने को कहें, तो हम पिकअप या वापसी पता साझा करेंगे। स्वीकृत दावे हमारे खर्च पर बीमित कूरियर से लौटाए जाते हैं; मूल पैकिंग का उपयोग करें। वस्तु हमें उसी स्थिति में पहुँचनी चाहिए जैसी आपने बताई थी।',
          ],
        },
      },
      {
        en: {
          h: '6. Assessment and outcome',
          p: [
            'When the item reaches us we inspect it, and where relevant have it re-checked by the certifying laboratory. If the claim is valid, we will: send an identical or closely matching replacement of the same type, quality and weight where one is available; or, if an exact match is not available, offer you a piece of equal value to choose from, or a store credit for the full amount paid, valid for 12 months.',
            'A monetary refund is made only where an approved replacement claim cannot be satisfied by any of the above and a refund is required under applicable law. If our inspection shows the item was not defective, was damaged after delivery, or the claim falls outside this policy, we will explain why and return the item to you.',
          ],
        },
        hi: {
          h: '6. आकलन और परिणाम',
          p: [
            'वस्तु हम तक पहुँचने पर हम उसका निरीक्षण करते हैं, और जहाँ प्रासंगिक हो प्रमाणित करने वाली प्रयोगशाला से पुनः जाँच कराते हैं। यदि दावा वैध है, तो हम: उपलब्ध होने पर उसी प्रकार, गुणवत्ता और वज़न का समान या निकटतम मिलान वाला रिप्लेसमेंट भेजेंगे; या यदि सटीक मिलान उपलब्ध नहीं है, तो आपको चुनने के लिए समान मूल्य का टुकड़ा, अथवा भुगतान की पूरी राशि का स्टोर क्रेडिट देंगे, जो 12 महीनों तक मान्य होगा।',
            'मौद्रिक रिफ़ंड केवल तभी किया जाता है जब कोई स्वीकृत रिप्लेसमेंट दावा उपरोक्त में से किसी से पूरा न हो सके और लागू कानून के तहत रिफ़ंड आवश्यक हो। यदि हमारे निरीक्षण में पता चले कि वस्तु दोषपूर्ण नहीं थी, डिलीवरी के बाद क्षतिग्रस्त हुई, या दावा इस नीति के बाहर है, तो हम कारण बताएँगे और वस्तु आपको लौटा देंगे।',
          ],
        },
      },
      {
        en: {
          h: '7. Replacement timeline',
          p: [
            'For in-stock replacements, we dispatch within 3 to 5 working days of approving your claim (or of receiving the returned item, if a return was required). Replacements that need fresh sourcing, certification or a new setting take longer, and we give you a written estimate. The replacement is shipped by insured courier at our cost, with tracking on WhatsApp, under the same Shipping Policy as the original order.',
          ],
        },
        hi: {
          h: '7. रिप्लेसमेंट समयरेखा',
          p: [
            'स्टॉक में उपलब्ध रिप्लेसमेंट के लिए, हम आपका दावा स्वीकृत होने के (या वापसी आवश्यक होने पर लौटाई गई वस्तु प्राप्त होने के) 3 से 5 कार्य-दिवसों के भीतर डिस्पैच करते हैं। जिन रिप्लेसमेंट के लिए नई सोर्सिंग, प्रमाणन या नई जड़ाई चाहिए, उनमें अधिक समय लगता है, और हम आपको लिखित अनुमान देते हैं। रिप्लेसमेंट हमारे खर्च पर बीमित कूरियर से, व्हाट्सएप पर ट्रैकिंग के साथ, मूल ऑर्डर की तरह उसी शिपिंग नीति के अंतर्गत भेजा जाता है।',
          ],
        },
      },
      {
        en: {
          h: '8. Order cancelled before dispatch',
          p: [
            'If you need to cancel, tell us as soon as possible. An order that has not yet been dispatched, and that is not a custom, engraved, energised or made-to-order piece, may be cancelled with a full refund of what you paid, minus any bank or payment-gateway charge that cannot be recovered. Once an order has been dispatched it cannot be cancelled and this Refund & Replacement Policy applies.',
          ],
        },
        hi: {
          h: '8. डिस्पैच से पहले रद्द किया गया ऑर्डर',
          p: [
            'यदि आपको रद्द करना है, तो जितनी जल्दी हो सके हमें बताएँ। ऐसा ऑर्डर जो अभी डिस्पैच नहीं हुआ है, और जो कस्टम, एनग्रेव, ऊर्जित या मेड-टू-ऑर्डर टुकड़ा नहीं है, उसे भुगतान की पूरी राशि की वापसी के साथ रद्द किया जा सकता है, केवल उस बैंक या पेमेंट-गेटवे शुल्क को घटाकर जो वसूल नहीं किया जा सकता। ऑर्डर डिस्पैच हो जाने के बाद उसे रद्द नहीं किया जा सकता और यह रिफ़ंड एवं रिप्लेसमेंट नीति लागू होती है।',
          ],
        },
      },
    ],
  },
]
