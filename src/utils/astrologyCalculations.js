import { EclipticGeoMoon } from 'astronomy-engine'
import { products } from '../data/stonesData.js'

export const EASE = [0.22, 1, 0.36, 1]

// Smoothly scroll a section into view (honours prefers-reduced-motion).
export function smoothScrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

const NAK_SPAN = 13.3333 // 360 / 27
const PADA_SPAN = 3.3333 // NAK_SPAN / 4

// All maths is local — no API. Returns { rashiIndex, nakIndex, pada } or null.
export function calcMoonChart({ dob, tob, offsetMinutes }) {
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

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const WEEKDAYS_HI = [
  'रविवार',
  'सोमवार',
  'मंगलवार',
  'बुधवार',
  'गुरुवार',
  'शुक्रवार',
  'शनिवार',
]

export const WEEKDAY_PLANET = {
  Sunday: 'Sun',
  Monday: 'Moon',
  Tuesday: 'Mars',
  Wednesday: 'Mercury',
  Thursday: 'Jupiter',
  Friday: 'Venus',
  Saturday: 'Saturn',
}

// 0–6 for a YYYY-MM-DD date (parsed as a local calendar date), or -1.
export function weekdayIndex(dob) {
  const [y, m, d] = String(dob).split('-').map(Number)
  if (!y || !m || !d) return -1
  const when = new Date(y, m - 1, d, 12)
  return Number.isNaN(when.getTime()) ? -1 : when.getDay()
}

export function stonesForWeekday(weekday) {
  const planet = WEEKDAY_PLANET[weekday]
  if (!planet) return []
  const matches = []
  for (const product of products) {
    for (const variant of product.variants) {
      const planetMatch = variant.planet.split('/')[0].trim() === planet
      const dayMatch = variant.day
        .split('/')
        .map((s) => s.trim())
        .includes(weekday)
      if (planetMatch && dayMatch) matches.push({ product, variant })
    }
  }
  return matches
}
