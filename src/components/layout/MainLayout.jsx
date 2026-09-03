import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import RatnaSalaah from '../common/RatnaSalaah.jsx'

export default function MainLayout({
  lang = 'en',
  onToggleLang,
  t,
  cartCount = 0,
}) {
  const location = useLocation()

  // Scroll to top on path change unless there is a hash target
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    } else {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.pathname, location.hash])

  return (
    <div className="site-root-layout">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-to-content-link">
        {lang === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
      </a>

      {/* Global Top Navigation */}
      <Navbar
        cartCount={cartCount}
        lang={lang}
        onToggleLang={onToggleLang}
        t={t}
      />

      {/* Routed Main Page Content */}
      <main id="main-content" className="site-main-content">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer lang={lang} t={t} />

      {/* Floating Vedic Astrological Assistant */}
      <RatnaSalaah lang={lang} />
    </div>
  )
}
