# MallCity Style & UI/UX Guidelines

This document sets the mandatory style guidelines for MallCity. Any developer or AI agent working on frontend tasks **must** strictly adhere to these rules without deviating.

---

## 1. Color Palette

* **Primary Accent**: `rgb(48, 221, 149)` (Bright Mint / Emerald)
  * Hex: `#30DD95`
  * Variable: `$color-primary: #30dd95;`
* **Secondary / Interactive Accent**: `#4F46E5` (Indigo)
  * Variable: `$color-secondary: #4f46e5;`
* **Backgrounds**:
  * Dark Canvas: `#0f172a` (Slate 900)
  * Dark Surface / Card: `rgba(30, 41, 59, 0.75)` (Slate 800 with 75% opacity)
  * Light Accent Surface: `#ffffff`
* **Text Colors**:
  * Primary Text: `#f8fafc` (Slate 50)
  * Muted / Secondary Text: `#94a3b8` (Slate 400)
  * Error / Danger: `#ef4444` (Red 500)
  * Success: `#22c55e` (Green 500)

---

## 2. Typography

* **Font Family**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`
* **Font Weights**:
  * Regular: `400`
  * Medium: `500`
  * Semi-Bold: `600`
  * Bold: `700`
* **Heading Scale**:
  * `h1`: 2.25rem (36px), Line-height: 1.25, Font-weight: 700
  * `h2`: 1.875rem (30px), Line-height: 1.3, Font-weight: 700
  * `h3`: 1.5rem (24px), Line-height: 1.35, Font-weight: 600
  * `body`: 1rem (16px), Line-height: 1.5, Font-weight: 400
  * `caption / small`: 0.875rem (14px), Line-height: 1.4

---

## 3. Spacing Scale (4px Base)

All margins, paddings, and gaps **must** use multiples of 4px:
* `$space-1`: `4px` (0.25rem)
* `$space-2`: `8px` (0.5rem)
* `$space-3`: `12px` (0.75rem)
* `$space-4`: `16px` (1rem)
* `$space-5`: `20px` (1.25rem)
* `$space-6`: `24px` (1.5rem)
* `$space-8`: `32px` (2rem)
* `$space-10`: `40px` (2.5rem)
* `$space-12`: `48px` (3rem)

---

## 4. Geometry & Radii

* **Standard Border Radius**: `8px` (`$radius-standard: 8px;`)
* **Card / Container Radius**: `12px` (`$radius-card: 12px;`)
* **Pill / Badge Radius**: `9999px` (Full circle for tabs, tags, and status chips)

---

## 5. Visual Effects & Glassmorphism

* **Glassmorphic Card Effect**:
  ```scss
  background: rgba(30, 41, 59, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 12px;
  ```
* **Card Hover States**:
  * Smooth transition: `transition: all 0.25s ease-in-out;`
  * Lift effect: `transform: translateY(-4px);`
  * Subtle glow border: `border-color: rgba(48, 221, 149, 0.4);`

---

## 6. UI Component Standards

* **Buttons**:
  * Primary Button: Angular Material `mat-raised-button` or `mat-flat-button` styled with `$color-primary` background and dark text for contrast.
  * Secondary / Outline Button: `mat-stroked-button` with mint or indigo border.
  * Icon Buttons: `mat-icon-button` with smooth hover ripple.
* **Forms & Inputs**:
  * Use Angular Material `mat-form-field` with `appearance="outline"`.
  * Ensure explicit placeholder/label and accessible ARIA attributes.
* **Dropdowns & Menus**:
  * Use `<mat-select>` and `<mat-menu>` with rounded corners (`border-radius: 8px`).
* **Interactive Filter Bars**:
  * Floor filters must be rendered as horizontal pill tabs with distinct active states.
  * Category filters must use a tune-icon button opening a Material menu.

---

## 7. Responsive Layout Rules

* Always utilize CSS Flexbox and CSS Grid.
* Grid layout for Malls and Shops:
  ```scss
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  ```
* Mobile Breakpoints:
  * Phone: `< 600px` (Single column, full-width buttons, collapsible header)
  * Tablet: `600px - 960px` (2 columns)
  * Desktop: `> 960px` (3 to 4 columns)
