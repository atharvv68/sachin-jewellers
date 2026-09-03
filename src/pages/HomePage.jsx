import { useState } from 'react'
import GemstoneIntro from '../components/gemstone/GemstoneIntro.jsx'
import GemstoneHero from '../components/home/GemstoneHero.jsx'
import GemstoneShowcase from '../components/home/GemstoneShowcase.jsx'
import FeaturedGemstonesCoverflow from '../components/home/FeaturedGemstonesCoverflow.jsx'
import GemstoneCategoryGrid from '../components/home/GemstoneCategoryGrid.jsx'
import GemstoneTrustPillars from '../components/home/GemstoneTrustPillars.jsx'
import RudrakshaSpotlight from '../components/home/RudrakshaSpotlight.jsx'
import RashiStoneAdvisor from '../components/home/RashiStoneAdvisor.jsx'
import KundaliChecker from '../components/home/KundaliChecker.jsx'
import FounderStoryTeaser from '../components/home/FounderStoryTeaser.jsx'
import EnquirySection from '../components/home/EnquirySection.jsx'

export default function HomePage({ lang = 'en', t }) {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('sj-intro-seen')
    } catch {
      return false
    }
  })

  return (
    <div className="homepage-root">
      {/* Cinematic Gemstone Intro Animation on first open */}
      {showIntro && (
        <GemstoneIntro
          lang={lang}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* 1. Gemstone-First Hero Section with live ambient facet canvas */}
      <GemstoneHero lang={lang} t={t} />

      {/* 2. Curated Gemstone Showcase — real catalogue products */}
      <GemstoneShowcase t={t} />

      {/* 3. Featured Gemstones 3D Coverflow Showcase (Navratna) */}
      <FeaturedGemstonesCoverflow t={t} />

      {/* 3. Explore by Gemstone Categories (Navratna, Upratna, Semi-Precious, Pearl & Organic) */}
      <GemstoneCategoryGrid lang={lang} t={t} />

      {/* 4. Gemstone Expertise & Sacred Trust Pillars */}
      <GemstoneTrustPillars lang={lang} t={t} />

      {/* 5. Sacred Rudraksha Spotlight (1-14 Mukhi, Siddh Mala, Silver Kada) */}
      <RudrakshaSpotlight lang={lang} t={t} />

      {/* 6. Interactive Astrological Tools: Rashi Stone Advisor */}
      <RashiStoneAdvisor lang={lang} t={t} />

      {/* 7. Free Kundali Checker with Lahiri Ayanamsa */}
      <KundaliChecker lang={lang} t={t} />

      {/* 8. Master Gemologist Story Teaser */}
      <FounderStoryTeaser lang={lang} t={t} />

      {/* 9. Direct Enquiry & Personal Consultation Section */}
      <EnquirySection lang={lang} t={t} />
    </div>
  )
}
