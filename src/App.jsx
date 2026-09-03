import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { TRANSLATIONS } from './data/translations.js'
import { useCart } from './cart/cartContext.js'
import MainLayout from './components/layout/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CataloguePage from './pages/CataloguePage.jsx'
import StonePage from './pages/StonePage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CheckoutResultPage from './pages/CheckoutResultPage.jsx'
import { NotFound } from './pages/ShopChrome.jsx'
import './App.css'

export default function App() {
  const { count } = useCart()

  // Language state with localStorage memory
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('sj-lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('sj-lang', lang)
    } catch {
      // Ignore storage errors in restricted contexts
    }
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'))
  }

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en

  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        {/* Layout Route for Main Experience */}
        <Route
          path="/"
          element={
            <MainLayout
              lang={lang}
              onToggleLang={toggleLang}
              t={t}
              cartCount={count}
            />
          }
        >
          {/* Gemstone-First Main Homepage */}
          <Route index element={<HomePage lang={lang} t={t} />} />

          {/* Full Heritage & Leadership Profile */}
          <Route path="about" element={<AboutPage lang={lang} t={t} />} />

          {/* 2-Collection Sacred Catalogue */}
          <Route
            path="catalogue"
            element={<CataloguePage lang={lang} t={t} />}
          />
        </Route>

        {/* Dedicated PDP and Checkout Commerce Routes */}
        <Route path="/stone/:id" element={<StonePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/checkout/success"
          element={<CheckoutResultPage kind="success" />}
        />
        <Route
          path="/checkout/failure"
          element={<CheckoutResultPage kind="failure" />}
        />

        {/* 404 Catch-All */}
        <Route
          path="*"
          element={
            <NotFound
              title="Page not found"
              message="We could not find what you were looking for."
            />
          }
        />
      </Routes>
    </MotionConfig>
  )
}
