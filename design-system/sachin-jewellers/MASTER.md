# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Sachin Jewellers
**Generated:** 2026-09-01 09:26:17
**Category:** E-commerce Luxury
**Design Dials:** Variance 4/10 (Balanced / Modern) | Motion 4/10 (Standard) | Density 3/10 (Spacious)

---

## Global Rules

### Color Palette

The generator returned an *E-commerce Luxury* palette that is light-background with a
dark primary. The brief for Sachin Jewellers is an explicitly **dark, elegant** store,
so we invert it: the dark primary becomes the ground, brand gold stays the single
accent, and a warm off-white carries text. Brand maroon is kept as a secondary depth
colour. All pairs below are checked to ≥4.5:1 on their intended background.

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Page background | `#100D0B` | `--bg` | warm near-black |
| Alt section background | `#16110E` | `--bg-2` | |
| Card / surface | `#1C1613` | `--surface` | |
| Raised surface / input | `#241C17` | `--surface-2` | |
| Text (headings + body) | `#F3ECDE` | `--ink` | ~14:1 on `--bg` |
| Secondary text | `#A99E8C` | `--muted` | ~7:1 on `--bg` |
| Accent (brand gold) | `#C9A227` | `--gold` | large text / UI / rules only |
| Accent text on dark | `#EBDCB4` | `--gold-soft` | body-size gold |
| On accent (text on gold) | `#20140A` | `--on-gold` | |
| Border (solid hairline) | `#2E2620` | `--border` | |
| Border (gold hairline) | `rgba(201,162,39,0.22)` | `--border-gold` | |
| Secondary depth | `#5A1A22` / `#3F1017` | `--maroon` / `--maroon-deep` | kept from old brand |
| WhatsApp | `#128C7E` | `--wa` | unchanged, brand-locked |

### Typography

- **Heading Font:** Playfair Display (400–700) — editorial display, generous tracking
- **Body Font:** Inter (300–600)
- **Devanagari fallback:** `'Nirmala UI'` kept in every stack for the Hindi toggle
- **Google Fonts:** loaded via `<link>` in `index.html` (preconnect + `display=swap`)

### Style direction

Generator suggested *Liquid Glass* (Apple system chrome) — **not applied**, it is the
wrong register for a jewellery storefront. We follow the skill's own style search
result instead: **Minimalism / editorial** — spacious grid, thin gold rules, high type
contrast, no gradients-as-decoration, imagery does the ornament. Motion tier: Standard
(keep the existing `motion/react` fade-and-stagger; respect `prefers-reduced-motion`
via the existing `MotionConfig`).

### Layout

- `--maxw: 1200px` container (was 820px). Text blocks still capped at ~62–68ch.
- Desktop (≥900px): two-column splits — form + explainer/imagery, copy + image.
- <900px: single column; decorative split images hidden.

---

_Original generator output retained below for reference._

<details><summary>Generator palette (light luxury, not used directly)</summary>

| Role | Hex |
|------|-----|
| Primary | `#1C1917` |
| Accent | `#A16207` |
| Background | `#FAFAF9` |
| Foreground | `#0C0A09` |
| Muted Foreground | `#475569` |
| Border | `#D6D3D1` |

**Color Notes:** Premium dark + gold accent [Accent adjusted from #CA8A04]

</details>

### Typography

- **Heading Font:** Playfair Display
- **Body Font:** Inter
- **Mood:** elegant, luxury, sophisticated, timeless, premium, editorial
- **Google Fonts:** [Playfair Display + Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #A16207;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1C1917;
  border: 2px solid #1C1917;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FAFAF9;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1C1917;
  outline: none;
  box-shadow: 0 0 0 3px #1C191720;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Liquid Glass

**Keywords:** dynamic material, optical glass, translucency, lensing, refraction, fluid morphing, system navigation

**Best For:** Apple-platform navigation, controls, and system-aligned app chrome

**Key Effects:** Lensing and refraction, adaptive translucency, and fluid morph transitions aligned to Apple platform behavior

### Page Pattern

**Pattern Name:** Feature-Rich Showcase

- **Conversion Strategy:** Clear feature hierarchy. One key message per card. Strong CTA repetition.
- **CTA Placement:** Hero (sticky) + After features + Bottom
- **Section Order:** Hero (value prop) > Feature grid/cards (4-6) > Use cases or benefits > Social proof or logos > CTA

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Vibrant & Block-based
- ❌ Playful colors

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
