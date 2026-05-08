# Claude Design Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the Claude Design redesign into the existing Next.js App Router + Tailwind v4 site. The redesign introduces a warm color palette (vermillion accent), new wordmark ("a/ltrntv" with accent slash), new hero SVG, rewritten copy, restructured Services page, new Research page, expanded footer, and a 404 page.

**Architecture:** The redesign changes design tokens (CSS variables), shared components (wordmark, header, footer, theme toggle), all page sections, and adds two new pages (Research, 404). All changes stay within the existing Next.js App Router + Tailwind v4 architecture. No new dependencies.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4 (`@theme inline`), TypeScript, `next/font/google`

---

## File Map

### Modified files
- `src/app/globals.css` — New warm palette, new tokens (fg-2, surface-2, border-2, muted-2, accent-soft, accent-ink), new utility classes, cleanup old animations
- `src/app/layout.tsx` — Remove unused fonts (Fraunces, Instrument Serif), update metadata (domain altrntv.io, new descriptions)
- `src/components/wordmark.tsx` — New slash variant with accent "/" in Newsreader
- `src/components/site-header.tsx` — Add Research nav link, nav-link hover underline animation, wordmark opacity hover
- `src/components/site-footer.tsx` — Expand to 4-column with service/research links, add bottom bar
- `src/components/theme-toggle.tsx` — Circular bordered button style, switch from class to data-attribute theming
- `src/components/sections/hero.tsx` — Replace CapitalFlowBackground with AssessmentScaffold, add StatusPill, 2-column grid layout
- `src/components/sections/what-we-do.tsx` — Rewrite all five questions and body text
- `src/components/sections/credibility.tsx` — Two-column editorial layout with pull-quote, methodology link
- `src/components/sections/cta.tsx` — Minor styling updates
- `src/components/sections/who-we-serve.tsx` — Update anchor targets, minor copy tweaks
- `src/app/services/page.tsx` — Complete restructure: new SKUs, full-width offering blocks, framework recap, process section
- `src/app/about/page.tsx` — Updated bio text (EMURGO + RWA vertical detail), serif body styling
- `src/app/contact/page.tsx` — Minor layout adjustments
- `src/app/contact/contact-form.tsx` — Filled toggle buttons, dynamic label text per role

### New files
- `src/app/research/page.tsx` — Research page with Sector Briefs
- `src/app/not-found.tsx` — 404 page ("Not in scope.")

### Assets to copy
- `public/og-image.png` — from ~/Downloads/
- `public/apple-touch-icon.png` — from ~/Downloads/
- `public/favicon.png` — from ~/Downloads/
- `public/favicon-16.png` — from ~/Downloads/

---

## Task 1: Design Tokens & CSS Foundation

**Files:**
- Modify: `src/app/globals.css`

This task updates the entire color palette from cool-tone + gold to warm-tone + vermillion, adds new intermediate tokens, adds utility classes from the Claude Design prototype, and cleans up unused animation classes.

- [ ] **Step 1: Update CSS variables — dark mode**

Replace the `:root` block with the warm palette and new tokens:

```css
:root {
  --bg: #0C0B09;
  --surface: #14110E;
  --surface-2: #1A1612;
  --border: #221E18;
  --border-2: #2D2820;
  --fg: #EAE7E1;
  --fg-2: #C9C5BD;
  --muted: #8A857B;
  --muted-2: #5A554B;
  --accent: #D4541F;
  --accent-soft: rgba(212, 84, 31, 0.10);
  --accent-ink: #0C0B09;
}
```

- [ ] **Step 2: Update light mode variables**

Replace `html.light` with the new warm light palette. Also switch the toggle mechanism from class (`html.light`) to data attribute (`html[data-theme="light"]`) to match the Claude Design approach:

```css
html[data-theme="light"] {
  --bg: #F8F5EE;
  --surface: #EFECE3;
  --surface-2: #E5E1D6;
  --border: #D6D2C5;
  --border-2: #BCB7A8;
  --fg: #1B1812;
  --fg-2: #38342B;
  --muted: #6B6759;
  --muted-2: #9A9588;
  --accent: #D4541F;
  --accent-soft: rgba(212, 84, 31, 0.10);
  --accent-ink: #FFFFFF;
}
```

- [ ] **Step 3: Update @theme inline block**

Add new Tailwind theme tokens for the new CSS variables:

```css
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-border: var(--border);
  --color-border-2: var(--border-2);
  --color-fg: var(--fg);
  --color-fg-2: var(--fg-2);
  --color-muted: var(--muted);
  --color-muted-2: var(--muted-2);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
  --color-accent-ink: var(--accent-ink);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
  --font-display: var(--font-newsreader);
  --default-transition-duration: 300ms;
  --default-transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 4: Update ::selection**

Change selection color to use accent-ink:

```css
::selection {
  background: var(--accent);
  color: var(--accent-ink);
}
```

- [ ] **Step 5: Add utility classes from Claude Design**

Add after the existing `.eyebrow` class:

```css
.serif {
  font-family: var(--font-newsreader), ui-serif, Georgia, serif;
}

.nav-link {
  color: var(--fg-2);
  position: relative;
  padding-bottom: 4px;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.nav-link:hover {
  color: var(--fg);
}
.nav-link:hover::after {
  transform: scaleX(1);
}

.link {
  color: var(--fg-2);
  border-bottom: 1px solid var(--border-2);
  padding-bottom: 2px;
}
.link:hover {
  color: var(--fg);
  border-bottom-color: var(--accent);
}

.link-quiet {
  color: var(--fg-2);
}
.link-quiet:hover {
  color: var(--fg);
}

.link-accent {
  color: var(--accent);
}
.link-accent:hover {
  color: var(--accent);
  opacity: 0.78;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--accent);
  color: var(--accent-ink);
  border: 1px solid var(--accent);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.btn-primary:hover {
  opacity: 0.86;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: transparent;
  color: var(--fg);
  border: 1px solid var(--border-2);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.btn-ghost:hover {
  border-color: var(--fg-2);
  color: var(--fg);
}
```

- [ ] **Step 6: Update .eyebrow class**

Change letter-spacing from `0.14em` to `0.04em` and remove `text-transform: uppercase` to match the Claude Design prototype:

```css
.eyebrow {
  font-family: var(--font-jetbrains), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--muted);
}
```

- [ ] **Step 7: Remove unused CSS classes and animations**

Remove: `.display-instrument`, `.display-newsreader`, `.hairline`, and all hero animation keyframes/classes (`hero-fade-up`, `hero-draw`, `hero-fade-in`, `hero-pulse`, `hero-sweep`, `hero-spin-cw`, `hero-spin-ccw`, `hero-rot-*`, `hero-sweep-hand`, `plotter-draw`, `plotter-path`, and the `@media (prefers-reduced-motion)` block). Keep only the `.display` class.

Add a simple fade-in animation for page transitions:

```css
.fade-in {
  animation: fadeIn 0.4s ease both;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: none; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

- [ ] **Step 8: Verify build**

Run: `npm run build`
Expected: Clean build with no errors.

- [ ] **Step 9: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update design tokens to warm palette with vermillion accent

Replace cool-tone palette with warm-tone, add intermediate tokens
(fg-2, surface-2, border-2, muted-2, accent-soft, accent-ink),
add utility classes (nav-link, link variants, btn-primary, btn-ghost),
clean up unused animation classes."
```

---

## Task 2: Layout — Remove Unused Fonts & Update Metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Remove Fraunces and Instrument Serif imports and variables**

Remove the `Fraunces` and `Instrument_Serif` imports from `next/font/google`, their font object declarations, and their CSS variable references from the `<html>` className.

After this change, only `Inter`, `JetBrains_Mono`, and `Newsreader` should remain.

- [ ] **Step 2: Update metadata**

Update `metadataBase` from `https://altrntv.xyz` to `https://altrntv.io`.

Update description to: `"altrntv labs runs fixed-scope assessments for issuers and allocators of tokenized financial products. Independent. Time-bound. Methodological."`

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "chore: remove unused fonts, update metadata domain to altrntv.io"
```

---

## Task 3: Wordmark Component

**Files:**
- Modify: `src/components/wordmark.tsx`

- [ ] **Step 1: Rewrite wordmark with slash variant**

Replace the entire file. The new wordmark renders "a/ltrntv labs" with an accent-colored slash in Newsreader serif, and italic muted "labs". Support three variants: slash (default), bracket, and plain.

```tsx
type Variant = "slash" | "bracket" | "plain";

type Props = {
  variant?: Variant;
  className?: string;
  includeLabs?: boolean;
};

export function Wordmark({
  variant = "slash",
  className = "",
  includeLabs = true,
}: Props) {
  return (
    <span
      className={`inline-flex items-baseline font-[family-name:var(--font-newsreader)] tracking-[-0.015em] leading-none whitespace-nowrap ${className}`}
    >
      {variant === "slash" && (
        <>
          <span>a</span>
          <span className="text-accent mx-[0.04em]">/</span>
          <span>ltrntv</span>
        </>
      )}
      {variant === "bracket" && (
        <>
          <span className="text-muted">[</span>
          <span>altrntv</span>
          <span className="text-muted">]</span>
        </>
      )}
      {variant === "plain" && <span>altrntv</span>}
      {includeLabs && (
        <span className="text-muted ml-[0.45em] italic">labs</span>
      )}
    </span>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/wordmark.tsx
git commit -m "feat: new wordmark with accent slash variant (a/ltrntv labs)"
```

---

## Task 4: Theme Toggle

**Files:**
- Modify: `src/components/theme-toggle.tsx`

- [ ] **Step 1: Update to data-attribute theming and circular bordered style**

Replace the component. Switch from toggling `html.light` class to `data-theme` attribute. Use circular bordered button styling:

```tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="w-8 h-8 rounded-full border border-border text-muted hover:border-border-2 hover:text-fg transition-colors inline-flex items-center justify-center"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/theme-toggle.tsx
git commit -m "feat: circular bordered theme toggle, switch to data-attribute theming"
```

---

## Task 5: Site Header

**Files:**
- Modify: `src/components/site-header.tsx`

- [ ] **Step 1: Add Research nav link and update styling**

Add Research link between Services and About. Use `nav-link` CSS class for hover underline animation. Add wordmark opacity hover. Update padding to `py-[18px]` instead of `h-16`. Use backdrop blur with `color-mix`.

```tsx
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{
        background: "color-mix(in srgb, var(--bg) 85%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-[18px] flex items-center justify-between">
        <Link
          href="/"
          className="transition-opacity hover:opacity-70"
        >
          <Wordmark className="text-xl" />
        </Link>
        <nav className="flex items-center gap-7 text-sm">
          <Link href="/services" className="nav-link">
            Services
          </Link>
          <Link href="/research" className="nav-link">
            Research
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site-header.tsx
git commit -m "feat: add Research nav link, nav-link hover underlines, wordmark opacity hover"
```

---

## Task 6: Site Footer

**Files:**
- Modify: `src/components/site-footer.tsx`

- [ ] **Step 1: Expand to 4-column footer with service/research links and bottom bar**

```tsx
import Link from "next/link";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-12 grid gap-8 md:grid-cols-4 items-start">
        <div>
          <Wordmark className="text-lg" />
          <p className="mt-3.5 text-[13px] text-muted max-w-[360px] leading-relaxed">
            Independent assessments for tokenized financial products.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">/ services</div>
          <Link href="/services#issuer-assessment" className="link-quiet text-[13px]">
            Issuer Assessment
          </Link>
          <Link href="/services#readiness-diagnostic" className="link-quiet text-[13px]">
            Readiness Diagnostic
          </Link>
          <Link href="/services#product-assessment" className="link-quiet text-[13px]">
            Product Assessment
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">/ research</div>
          <Link href="/research" className="link-quiet text-[13px]">
            Sector Briefs
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow mb-1">/ contact</div>
          <Link href="/contact" className="link-quiet text-[13px]">
            Start a conversation
          </Link>
          <Link href="/about" className="link-quiet text-[13px]">
            About
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex justify-between items-center py-6 border-t border-border text-xs text-muted-2">
          <span>&copy; {new Date().getFullYear()} altrntv labs</span>
          <span>altrntv.io</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/site-footer.tsx
git commit -m "feat: expand footer to 4-column with service/research links and bottom bar"
```

---

## Task 7: Hero Section

**Files:**
- Modify: `src/components/sections/hero.tsx`

- [ ] **Step 1: Replace CapitalFlowBackground with AssessmentScaffold**

Replace the entire file. The new hero uses a 2-column grid with text left and the AssessmentScaffold SVG right. The AssessmentScaffold is a client component with five horizontal "question rules" and a traveling accent dot. Add a StatusPill component.

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1.5 text-[11px] text-fg-2 bg-surface border border-border font-mono tracking-[0.04em]">
      <span
        className="w-1.5 h-1.5 bg-fg-2"
        style={{ animation: "pulse 2.4s ease-in-out infinite" }}
      />
      {children}
    </span>
  );
}

function AssessmentScaffold() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((p) => p + dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const ROWS = [
    "01 Structure",
    "02 Liquidity",
    "03 Distribution",
    "04 Operations",
    "05 Capital readiness",
  ];
  const CYCLE = 14;
  const u = (t % CYCLE) / CYCLE;
  const N = ROWS.length;
  const rowProgress = u * N;
  const rowIdx = Math.min(N - 1, Math.floor(rowProgress));
  const within = rowProgress - rowIdx;
  const eased = within < 0.6 ? 0 : (within - 0.6) / 0.4;
  const dotY = rowIdx + Math.min(1, eased);

  const W = 760,
    H = 520;
  const padL = 80,
    padR = 60,
    padT = 50,
    padB = 50;
  const colH = H - padT - padB;
  const rowGap = colH / (N - 1);
  const yFor = (i: number) => padT + i * rowGap;

  const activeRow = Math.round(dotY);
  const onRow = Math.abs(dotY - activeRow) < 0.15;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      className="block"
    >
      {/* Vertical guide */}
      <line x1={padL} y1={padT - 20} x2={padL} y2={H - padB + 20} stroke="var(--border)" strokeWidth="1" />
      <line x1={padL - 6} y1={padT - 20} x2={padL + 6} y2={padT - 20} stroke="var(--border-2)" strokeWidth="1" />
      <line x1={padL - 6} y1={H - padB + 20} x2={padL + 6} y2={H - padB + 20} stroke="var(--border-2)" strokeWidth="1" />

      {ROWS.map((label, i) => {
        const y = yFor(i);
        const isActive = activeRow === i && onRow;
        return (
          <g key={i}>
            <line
              x1={padL} y1={y} x2={W - padR} y2={y}
              stroke={isActive ? "var(--fg-2)" : "var(--border)"}
              strokeWidth="1"
              style={{ transition: "stroke .35s" }}
            />
            <text
              x={padL - 14} y={y + 3} textAnchor="end"
              fontFamily="'JetBrains Mono', monospace" fontSize="10"
              fill={isActive ? "var(--fg-2)" : "var(--muted)"}
              style={{ transition: "fill .35s" }}
            >
              {label.split(" ")[0]}
            </text>
            <text
              x={padL + 14} y={y - 8}
              fontFamily="'Newsreader', serif" fontSize="13"
              fill={isActive ? "var(--fg)" : "var(--muted)"}
              style={{ transition: "fill .35s" }}
            >
              {label.substring(3)}
            </text>
            <g opacity={isActive ? 1 : 0.25} style={{ transition: "opacity .35s" }}>
              <line x1={W - padR - 16} y1={y - 4} x2={W - padR - 8} y2={y + 4} stroke={isActive ? "var(--accent)" : "var(--border-2)"} strokeWidth="1.25" />
              <line x1={W - padR - 8} y1={y + 4} x2={W - padR + 4} y2={y - 8} stroke={isActive ? "var(--accent)" : "var(--border-2)"} strokeWidth="1.25" />
            </g>
          </g>
        );
      })}

      {/* Traveling mark */}
      <g transform={`translate(${padL}, ${padT + rowGap * dotY})`}>
        <line x1={-12} y1={0} x2={W - padR - padL + 12} y2={0} stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1" />
        <rect x={-3} y={-3} width="6" height="6" fill="var(--accent)" />
      </g>

      {/* Labels */}
      <text x={W - padR} y={padT - 28} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="var(--muted)">
        / assessment scaffold
      </text>
      <text x={padL - 14} y={padT - 28} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="var(--muted-2)">
        ref
      </text>
      <text x={padL - 14} y={H - padB + 35} textAnchor="end" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="var(--muted-2)">
        rev
      </text>
      <text x={padL + 14} y={H - padB + 35} fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="var(--muted)">
        v1.0 · fixed scope · {ROWS.length} questions
      </text>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 grid md:grid-cols-[6fr_5fr] gap-8 md:gap-16 items-center">
        <div>
          <StatusPill>currently accepting engagements</StatusPill>
          <h1 className="display mt-7 text-[44px] leading-[0.98] md:text-[72px] md:leading-[0.98] tracking-[-0.025em] text-fg" style={{ textWrap: "balance" }}>
            Independent assessments for tokenized financial products.
          </h1>
          <p className="mt-8 text-[17px] text-fg-2 max-w-[540px] leading-relaxed">
            Fixed-scope independent assessments for issuers preparing products for capital and allocators deciding whether to commit.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/services#issuer-assessment" className="btn-primary">
              For issuers
            </Link>
            <Link href="/services#product-assessment" className="btn-ghost">
              For allocators
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <AssessmentScaffold />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify dev server**

Run: `npm run dev`
Expected: Hero renders with two columns, scaffold animating on the right.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: replace hero with AssessmentScaffold SVG and 2-column layout"
```

---

## Task 8: What We Do Section

**Files:**
- Modify: `src/components/sections/what-we-do.tsx`

- [ ] **Step 1: Rewrite questions and body text**

Update the `focus` array with the new Claude Design copy. Change "Operational risk" to "Operations" and "Capital formation" to "Capital readiness". Update all questions and body text:

```typescript
const focus = [
  {
    n: "01",
    title: "Structure",
    question: "What is actually being underwritten?",
    body: "The asset exposure, wrapper, claim path, token rights, and economic reality behind the product narrative.",
  },
  {
    n: "02",
    title: "Liquidity",
    question: "How does capital get out, and what controls price and timing?",
    body: "Redemption mechanics, secondary-market assumptions, NAV, settlement, gates, discounts, and practical exit paths.",
  },
  {
    n: "03",
    title: "Distribution",
    question: "How does the product reach the right buyers?",
    body: "Qualified buyer pathways, product partnerships, platform integrations, custodians, advisors, ecosystems, jurisdictions, and the channels that determine whether the product can actually reach capital.",
  },
  {
    n: "04",
    title: "Operations",
    question: "Who performs the offchain work, and what happens if it fails?",
    body: "Counterparties, custody, administration, valuation, compliance, reporting, and the operational assumptions the product depends on.",
  },
  {
    n: "05",
    title: "Capital readiness",
    question: "Can the product withstand serious scrutiny?",
    body: "The data room, investor materials, target-capital fit, diligence responses, open questions, and whether the team can defend the product beyond the first meeting.",
  },
];
```

- [ ] **Step 2: Update question card styling**

Add italic styling to the question text. In each card's question `<p>`, add `italic` class:

Change: `className="mt-4 text-[15px] leading-snug text-fg"`
To: `className="mt-4 text-[15px] leading-snug text-fg-2 italic"`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/what-we-do.tsx
git commit -m "feat: rewrite five-question framework with updated copy"
```

---

## Task 9: Credibility / How We Work Section

**Files:**
- Modify: `src/components/sections/credibility.tsx`

- [ ] **Step 1: Update to two-column editorial layout with pull-quote**

Replace with the Claude Design layout: left column has an italic serif pull-quote, right column has the three prose paragraphs in serif with bold highlights. Remove the `bg-surface/40` background. Update the paired statements to use the border-gap grid pattern:

```tsx
export function Credibility() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
        <div className="eyebrow mb-6">/ how we work</div>
        <h2 className="display text-3xl md:text-4xl">
          Context, not conclusions.
        </h2>

        <div className="mt-14 grid md:grid-cols-[5fr_7fr] gap-8 md:gap-16">
          <div>
            <p className="serif text-[22px] text-fg-2 italic leading-[1.45] max-w-[20ch]">
              The real test is whether the work is usable in the room where a
              view has to be defended.
            </p>
          </div>
          <div className="serif text-[18px] text-fg-2 leading-[1.65] max-w-[620px] space-y-6">
            <p>
              Every engagement has a{" "}
              <strong className="text-fg font-medium">fixed scope</strong>. The
              questions, deliverables, and fee are agreed in writing before work
              begins. Work ends when the scope is complete. There are no
              retainers, and no quiet expansions of scope.
            </p>
            <p>
              The work is{" "}
              <strong className="text-fg font-medium">independent</strong> in
              the sense that matters. At both issuers and allocators, employees
              carry KPIs that can quietly bend decisions. Products get pushed to
              launch to hit a date. Capital gets placed to hit a target. An
              external assessor carries none of that pressure, and has nothing
              else for sale alongside the assessment.
            </p>
            <p>
              The real test is whether the work is{" "}
              <strong className="text-fg font-medium">usable</strong> in the
              room where a view has to be defended. An investment committee
              pressing on an allocation thesis. A board scrutinizing a product
              structure. The work is written to hold up in that conversation.
            </p>
          </div>
        </div>

        {/* Paired statements */}
        <div className="mt-16 pt-10 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {[
              {
                not: "We do not place capital.",
                but: "Our work is what gives capital the context to move.",
              },
              {
                not: "Distribution is not our job.",
                but: "But nothing reaches qualified buyers without first surviving real scrutiny.",
              },
            ].map((row) => (
              <div key={row.not} className="bg-bg p-7">
                <p className="serif text-[22px] text-fg leading-[1.3] tracking-[-0.01em]">
                  {row.not}
                </p>
                <p className="mt-3.5 text-sm text-muted leading-relaxed">
                  {row.but}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/credibility.tsx
git commit -m "feat: credibility section with editorial pull-quote layout"
```

---

## Task 10: Who We Serve Section

**Files:**
- Modify: `src/components/sections/who-we-serve.tsx`

- [ ] **Step 1: Update anchor targets**

Change CTA hrefs to match new Services page anchors:
- Issuers: `/services#issuers` → `/services#issuer-assessment`
- Allocators: `/services#allocators` → `/services#product-assessment`

Also update the third bullet for issuers from "A structure that has been tested against the questions allocators will actually ask" to "A structure tested against the questions allocators will actually ask" (minor trim).

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/who-we-serve.tsx
git commit -m "fix: update who-we-serve anchor targets for new services structure"
```

---

## Task 11: Closing CTA Section

**Files:**
- Modify: `src/components/sections/cta.tsx`

- [ ] **Step 1: Update CTA button to use btn-primary class**

Replace the inline button styles with the `btn-primary` CSS class:

```tsx
import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="eyebrow text-accent mb-6">[ get in touch ]</div>
        <h2
          className="display text-[40px] md:text-[72px] leading-[1.04] tracking-[-0.025em] max-w-[18ch]"
        >
          Have a tokenized product to assess, or one to allocate to?
        </h2>
        <div className="mt-10">
          <Link href="/contact" className="btn-primary">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/cta.tsx
git commit -m "refactor: simplify closing CTA to use btn-primary class"
```

---

## Task 12: Services Page — Complete Restructure

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1: Rewrite the entire Services page**

Replace with the new structure from Claude Design: hero, framework recap, three offering sections (Issuer Assessment, Readiness Diagnostic, Product Assessment), process section, and closing CTA.

```tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — altrntv labs",
  description:
    "Fixed-scope assessments for issuers launching tokenized financial products and allocators evaluating specific opportunities.",
};

const FIVE_QUESTIONS = [
  { n: "01", t: "Structure", q: "What is actually being underwritten?" },
  { n: "02", t: "Liquidity", q: "How does capital get out, and what controls price and timing?" },
  { n: "03", t: "Distribution", q: "How does the product reach the right buyers?" },
  { n: "04", t: "Operations", q: "Who performs the offchain work, and what happens if it fails?" },
  { n: "05", t: "Capital readiness", q: "Can the product withstand serious scrutiny?" },
];

type Deliverable = {
  title: string;
  description: string;
};

function OfferingBlock({
  code,
  title,
  duration,
  summary,
  deliverables,
}: {
  code: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: Deliverable[];
}) {
  return (
    <article className="py-10 border-t border-b border-border grid md:grid-cols-[4fr_8fr] gap-6 md:gap-16 items-start">
      <div>
        <div className="font-mono text-[11px] text-muted mb-3">{code}</div>
        <h3 className="display text-2xl md:text-[32px] leading-[1.15] tracking-[-0.015em]">
          {title}
        </h3>
        <div className="font-mono text-[11px] text-muted mt-4">/ {duration}</div>
      </div>
      <div>
        <p className="serif text-lg text-fg-2 leading-relaxed max-w-[620px]">
          {summary}
        </p>
        <div className="mt-7 pt-6 border-t border-border">
          <div className="eyebrow mb-4">/ deliverables</div>
          <ul className="space-y-2.5">
            {deliverables.map((d, i) => (
              <li key={i} className="grid grid-cols-[24px_1fr] gap-2 text-sm text-fg-2 leading-relaxed">
                <span className="font-mono text-[11px] text-muted pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="text-fg font-medium">{d.title}</strong>{" "}
                  {d.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

const PROCESS_STEPS = [
  { n: "01", t: "Intake", b: "A short conversation about the product or decision. We assess fit before committing to scope." },
  { n: "02", t: "Scope", b: "A written statement of work: scope, deliverables, timeline, and fee. Agreed before any assessment work begins." },
  { n: "03", t: "Assessment", b: "The work itself. Conducted independently, with structured check-ins where useful." },
  { n: "04", t: "Delivery", b: "The agreed deliverables, in writing, with a closing conversation. The work is what gets handed over; we do not place capital." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="eyebrow flex items-center gap-2 mb-6">
            <span className="text-accent">[</span>
            <span>services</span>
            <span className="text-accent">]</span>
          </div>
          <h1 className="display text-[40px] md:text-[72px] leading-[1.02] tracking-[-0.025em] max-w-[22ch]" style={{ textWrap: "balance" }}>
            Assessment work before the next serious decision.
          </h1>
          <p className="mt-5 max-w-[680px] text-base text-muted leading-relaxed">
            Fixed-scope assessments for issuers preparing tokenized financial products for capital and allocators evaluating specific opportunities before commitment.
          </p>
          <div className="mt-8 flex flex-wrap gap-5 items-center">
            <a href="#issuer-assessment" className="link text-sm">
              ↓ for issuers
            </a>
            <a href="#product-assessment" className="link text-sm">
              ↓ for allocators
            </a>
          </div>
        </div>
      </section>

      {/* Framework Recap */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ framework</div>
          <div className="grid md:grid-cols-[6fr_5fr] gap-8 md:gap-16 items-end mb-12">
            <h2 className="display text-3xl md:text-4xl max-w-[18ch]">
              Every assessment is organized around five questions.
            </h2>
            <p className="text-base text-muted leading-relaxed max-w-[460px]">
              The same five questions structure every engagement. The depth of each is shaped to the product and the decision at hand.
            </p>
          </div>
          <ol className="border-t border-border">
            {FIVE_QUESTIONS.map((q) => (
              <li key={q.n} className="py-6 border-b border-border grid grid-cols-[1fr_3fr_6fr] gap-4 md:gap-10 items-baseline">
                <div className="font-mono text-[11px] text-muted">{q.n}</div>
                <h3 className="display text-xl md:text-[26px] tracking-[-0.015em]">{q.t}</h3>
                <p className="serif text-[17px] text-fg-2 leading-[1.45] italic">{q.q}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Issuer Assessment */}
      <section id="issuer-assessment" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ for issuers · primary offer</div>
          <h2 className="display text-3xl md:text-[40px] leading-[1.1] max-w-[20ch]">
            Issuer Assessment
          </h2>
          <p className="mt-5 max-w-[640px] text-base text-muted leading-relaxed">
            A complete independent assessment before capital outreach. For teams launching tokenized financial products who need to understand whether the product, structure, materials, and distribution path can withstand serious allocator scrutiny.
          </p>
          <p className="mt-5 max-w-[640px] text-sm text-muted leading-relaxed">
            Organized around the five-question framework: structure, liquidity, distribution, operations, and capital readiness.
          </p>
          <div className="mt-12">
            <OfferingBlock
              code="I-01"
              title="Issuer Assessment"
              duration="4-6 weeks"
              summary="A written assessment across all five questions, with a remediation roadmap and an outward-facing summary the team can use without overstating readiness."
              deliverables={[
                { title: "Issuer assessment report.", description: "A written assessment across structure, liquidity, distribution, operations, and capital readiness." },
                { title: "Ranked blocker list.", description: "The issues most likely to damage allocator confidence or stall capital outreach." },
                { title: "Remediation roadmap.", description: "What needs to change before outreach, what can remain open, and what should be sequenced first." },
                { title: "Allocator-facing summary.", description: "A controlled outward-facing summary the team can use to frame the product without overstating readiness." },
              ]}
            />
          </div>
          <div className="mt-10">
            <Link href="/contact?role=issuer" className="btn-primary">
              Inquire about an Issuer Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Readiness Diagnostic */}
      <section id="readiness-diagnostic" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ for issuers · entry point</div>
          <h2 className="display text-3xl md:text-[40px] leading-[1.1] max-w-[20ch]">
            Readiness Diagnostic
          </h2>
          <p className="mt-5 max-w-[640px] text-base text-muted leading-relaxed">
            A shorter assessment for teams that are not yet ready for the full Issuer Assessment. For teams still early, still refining the product, or unsure whether they need a full assessment, foundational cleanup, or a narrower first step.
          </p>
          <div className="mt-12">
            <OfferingBlock
              code="I-02"
              title="Readiness Diagnostic"
              duration="1-2 weeks"
              summary="A directional read on where the product currently sits, what is most likely to block progress, and what the next step should be."
              deliverables={[
                { title: "Short diagnostic memo.", description: "A plain-language read on what the product appears to be and where it currently sits." },
                { title: "Top blockers.", description: "The 3 to 5 issues most likely to prevent progress." },
                { title: "Recommended next path.", description: "Proceed to Issuer Assessment, pause and fix first, narrow the target capital base, or clarify the product before deeper work." },
              ]}
            />
          </div>
          <div className="mt-10">
            <Link href="/contact?role=issuer" className="btn-primary">
              Inquire about a Readiness Diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* Product Assessment */}
      <section id="product-assessment" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ for allocators · primary offer</div>
          <h2 className="display text-3xl md:text-[40px] leading-[1.1] max-w-[20ch]">
            Product Assessment
          </h2>
          <p className="mt-5 max-w-[640px] text-base text-muted leading-relaxed">
            A specific tokenized product, evaluated in context. For allocators that need an independent assessment of a tokenized opportunity before committing time or capital.
          </p>
          <p className="mt-5 max-w-[640px] text-sm text-muted leading-relaxed">
            Not a product-level review in isolation. The report evaluates the specific product and places it in context of its sector, strategy, comparable structures, and available alternatives.
          </p>
          <div className="mt-12">
            <OfferingBlock
              code="A-01"
              title="Product Assessment"
              duration="2-3 weeks"
              summary="A written assessment of a specific tokenized opportunity, evaluated against the five-question framework and placed in context of its category."
              deliverables={[
                { title: "Product assessment report.", description: "A written assessment of structure, liquidity, counterparties, operations, and the product's fit within its category." },
                { title: "Operating assumptions.", description: "The assumptions the product depends on, including what is documented, implied, or unresolved." },
                { title: "Sector context and comparable structures.", description: "How the product fits within its category, including alternatives, common risks, and where it appears stronger or weaker." },
                { title: "Issuer question set.", description: "The questions to take back before conviction increases or capital is committed." },
              ]}
            />
          </div>
          <div className="mt-10">
            <Link href="/contact?role=allocator" className="btn-primary">
              Inquire about a Product Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ process</div>
          <h2 className="display text-3xl md:text-4xl max-w-[20ch]">
            Four steps. Every engagement.
          </h2>
          <ol className="mt-12 border-t border-border">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="py-7 border-b border-border grid grid-cols-[1fr_3fr_8fr] gap-4 md:gap-10 items-baseline">
                <div className="font-mono text-[11px] text-muted">{s.n}</div>
                <h3 className="display text-xl md:text-[26px] tracking-[-0.015em]">{s.t}</h3>
                <p className="text-[15px] text-fg-2 leading-relaxed max-w-[620px]">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-40">
          <div className="eyebrow text-accent mb-6">[ start an engagement ]</div>
          <h2 className="display text-[28px] md:text-[40px] leading-[1.1] max-w-[18ch]">
            Not sure which assessment fits?
          </h2>
          <p className="mt-4 max-w-[620px] text-muted leading-relaxed">
            Tell us about the product or the decision. We&apos;ll respond with the scope that matches.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Contact altrntv labs
            </Link>
            <Link href="/research" className="btn-ghost">
              See research
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: restructure services page with new offerings and process section

Replace 2+2 card grid with full-width offering blocks:
- Issuer Assessment (I-01, 4-6 weeks)
- Readiness Diagnostic (I-02, 1-2 weeks)
- Product Assessment (A-01, 2-3 weeks)
Add framework recap and four-step process section."
```

---

## Task 13: About Page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Update bio text and add serif body styling**

Update the EMURGO paragraph to include the RWA vertical founding member detail. Add `serif` class to body text container:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — altrntv labs",
  description:
    "altrntv labs is built and operated by Tyler Wales. Fixed-scope assessments and applied work on the liquidity and infrastructure problems underneath tokenized assets.",
};

export default function AboutPage() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[880px] px-6 md:px-10">
        <div className="eyebrow flex items-center gap-2 mb-6">
          <span className="text-accent">[</span>
          <span>about</span>
          <span className="text-accent">]</span>
        </div>
        <h1 className="display text-[44px] md:text-[80px] leading-[1.02] tracking-[-0.025em] max-w-[18ch]">
          We analyze and build
          <br />
          in tokenized finance.
        </h1>
        <div className="mt-8 font-mono text-xs text-muted pb-2 border-b border-border">
          / built and operated by Tyler Wales
        </div>

        <div className="mt-12 serif text-[19px] text-fg-2 leading-[1.65] max-w-[680px] space-y-6">
          <p>
            altrntv labs runs fixed-scope assessments for issuers and allocators
            of tokenized financial products, and builds tools for the liquidity
            and infrastructure problems in RWAs.
          </p>
          <p>
            Before altrntv labs, I held a senior position at EMURGO and was a
            founding member of its RWA vertical, where my work covered evaluation
            and integration pathways for tokenized private credit, commodities,
            reinsurance, and other yield-bearing assets.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/contact" className="btn-primary">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: update about page with serif body, expanded EMURGO bio"
```

---

## Task 14: Contact Form — Filled Toggle & Dynamic Labels

**Files:**
- Modify: `src/app/contact/contact-form.tsx`

- [ ] **Step 1: Update role toggle to filled button style**

Replace the radio fieldset with a button toggle where the active role gets filled background (`bg-fg text-bg`):

Change the role toggle from radio inputs to buttons:

```tsx
<fieldset>
  <legend className={labelClass}>/ I am inquiring as</legend>
  <div className="mt-3 inline-flex border border-border-2">
    {(["issuer", "allocator"] as const).map((r) => (
      <button
        key={r}
        type="button"
        onClick={() => setRole(r)}
        className={`px-5 py-2.5 text-sm transition-all ${
          role === r
            ? "bg-fg text-bg"
            : "bg-transparent text-fg-2"
        } ${r === "issuer" ? "border-r border-border-2" : ""}`}
      >
        {r === "issuer" ? "Issuer" : "Allocator"}
      </button>
    ))}
  </div>
</fieldset>
```

Note: this requires adding `role` state. The component already uses `useActionState`, so add a separate `useState` for the role toggle:

```tsx
const [role, setRole] = useState<Role>(initialRole ?? "issuer");
```

Add a hidden input to preserve the role value in form submission:

```tsx
<input type="hidden" name="role" value={role} />
```

- [ ] **Step 2: Update textarea label to be dynamic per role**

Change the message field label from static text to dynamic:

```tsx
<span className={labelClass}>
  / tell us about the {role === "issuer" ? "product" : "opportunity"}
</span>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/contact-form.tsx
git commit -m "feat: filled toggle buttons and dynamic label text per role"
```

---

## Task 15: Research Page (New)

**Files:**
- Create: `src/app/research/page.tsx`

- [ ] **Step 1: Create the Research page**

```tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — altrntv labs",
  description:
    "Sector Briefs: periodic reports on tokenized sectors, product patterns, risk surfaces, and emerging allocation categories.",
};

const briefs = [
  {
    code: "SB-01",
    title: "Tokenized private credit",
    status: "in preparation",
    note: "Originator structures, claim paths, and the gap between marketed yield and realized economics.",
  },
  {
    code: "SB-02",
    title: "Tokenized treasury products",
    status: "in preparation",
    note: "Wrapper choice, yield pass-through, redemption design, and the operational layer behind product comparability.",
  },
  {
    code: "SB-03",
    title: "RWA-backed lending markets",
    status: "planned",
    note: "Collateral assumptions, liquidation paths, and the relationship between onchain credit markets and the underlying assets.",
  },
  {
    code: "SB-04",
    title: "Tokenized commodities",
    status: "planned",
    note: "Custody, redemption mechanics, and the difference between a token claim and a physical or contractual claim.",
  },
  {
    code: "SB-05",
    title: "Tokenized carbon allowances",
    status: "planned",
    note: "Registry integration, vintage assumptions, and where tokenization adds or subtracts from the underlying claim.",
  },
  {
    code: "SB-06",
    title: "Onchain feeder fund structures",
    status: "planned",
    note: "Subscription mechanics, qualified-buyer pathways, and the operational dependencies between fund administrator and onchain wrapper.",
  },
];

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="eyebrow flex items-center gap-2 mb-6">
            <span className="text-accent">[</span>
            <span>research</span>
            <span className="text-accent">]</span>
          </div>
          <h1 className="display text-[40px] md:text-[72px] leading-[1.02] tracking-[-0.025em] max-w-[22ch]">
            Sector Briefs.
          </h1>
          <p className="mt-5 max-w-[680px] text-base text-muted leading-relaxed">
            Periodic reports on tokenized sectors, product patterns, risk
            surfaces, and emerging allocation categories.
          </p>
          <p className="mt-5 max-w-[640px] text-sm text-muted leading-relaxed">
            Sector Briefs are a research product, not a bespoke engagement.
            Distinct from{" "}
            <Link
              href="/services#product-assessment"
              className="link text-sm"
            >
              Product Assessment
            </Link>
            , which is commissioned and product-specific.
          </p>
        </div>
      </section>

      {/* Brief Slate */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-32">
          <div className="eyebrow mb-6">/ slate</div>
          <h2 className="display text-3xl md:text-4xl max-w-[18ch]">
            Categories under preparation.
          </h2>
          <p className="mt-4 text-base text-muted leading-relaxed max-w-[620px]">
            Briefs are issued as the work is ready. There is no fixed cadence.
            Sign up to be notified when the first issues are released.
          </p>

          <ol className="mt-12 border-t border-border">
            {briefs.map((b) => (
              <li
                key={b.code}
                className="py-8 border-b border-border grid grid-cols-[1.5fr_4fr_6fr_2fr] gap-4 md:gap-10 items-baseline"
              >
                <div className="font-mono text-[11px] text-muted">{b.code}</div>
                <h3 className="display text-xl md:text-[28px] tracking-[-0.015em]">
                  {b.title}
                </h3>
                <p className="text-sm text-fg-2 leading-relaxed">{b.note}</p>
                <div
                  className={`font-mono text-[11px] text-right ${
                    b.status === "in preparation" ? "text-fg-2" : "text-muted"
                  }`}
                >
                  / {b.status}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Notify CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-24 md:py-40">
          <div className="grid md:grid-cols-[5fr_6fr] gap-8 md:gap-16 items-start">
            <div>
              <div className="eyebrow text-accent mb-6">[ notify ]</div>
              <h2 className="display text-3xl md:text-4xl max-w-[18ch]">
                Be notified when briefs are issued.
              </h2>
            </div>
            <div>
              <p className="serif text-lg text-fg-2 leading-relaxed max-w-[540px]">
                No newsletter. No regular sends. A short email when a brief is
                published, with a link to read it.
              </p>
              <div className="mt-8">
                <Link href="/contact?intent=research" className="btn-primary">
                  Request research updates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build and navigation**

Run: `npm run build`
Expected: Clean build. Visit `/research` in dev mode.

- [ ] **Step 3: Commit**

```bash
git add src/app/research/page.tsx
git commit -m "feat: add research page with sector briefs slate"
```

---

## Task 16: 404 Page (New)

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create the 404 page**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-40">
      <div className="mx-auto max-w-[640px] px-6 md:px-10">
        <div className="font-mono text-[11px] text-muted mb-6">/ 404</div>
        <h1 className="display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em]">
          Not in scope.
        </h1>
        <p className="mt-6 text-base text-muted max-w-[480px]">
          That page does not exist. Return to the home page or contact altrntv
          labs.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add 404 page (Not in scope.)"
```

---

## Task 17: Assets — Favicons & OG Image

**Files:**
- Copy: favicon/OG assets from ~/Downloads/ to public/

- [ ] **Step 1: Copy assets**

```bash
cp ~/Downloads/og-image.png public/og-image.png
cp ~/Downloads/apple-touch-icon.png public/apple-touch-icon.png
cp ~/Downloads/favicon.png public/favicon.png
cp ~/Downloads/favicon-16.png public/favicon-16.png
```

- [ ] **Step 2: Remove default Next.js boilerplate SVGs**

```bash
rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 3: Update layout.tsx metadata with icon references**

Add icon configuration to the metadata export in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://altrntv.io"),
  title: "altrntv labs — independent assessments for tokenized financial products",
  description: "altrntv labs runs fixed-scope assessments for issuers and allocators of tokenized financial products. Independent. Time-bound. Methodological.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "altrntv labs",
    description: "Independent assessments for tokenized financial products.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "altrntv labs",
    description: "Independent assessments for tokenized financial products.",
    images: ["/og-image.png"],
  },
};
```

- [ ] **Step 4: Commit**

```bash
git add public/ src/app/layout.tsx
git commit -m "feat: add favicon and OG image assets, update metadata"
```

---

## Task 18: Final Verification

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Clean build with no errors.

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Visual verification**

Run: `npm run dev`
Check each page at http://localhost:3000:
- `/` — Hero with AssessmentScaffold, warm palette, vermillion accent
- `/services` — New structure with three offerings
- `/research` — Sector Briefs slate
- `/about` — Updated bio with serif body
- `/contact` — Filled toggle buttons
- `/nonexistent` — 404 "Not in scope."
- Theme toggle — switches between warm dark and warm light
- Footer — 4 columns with service/research links
- Wordmark — "a/ltrntv labs" with accent slash

- [ ] **Step 4: Responsive check**

Resize from 320px to 1440px. Verify:
- Hero scaffold hides on mobile (`hidden md:block`)
- Services grid stacks properly
- Research brief grid columns stack on mobile
- Footer 4-col → stacked on mobile

- [ ] **Step 5: Brand check**

Grep for incorrectly cased brand name:
```bash
grep -ri "Altrntv\|ALTRNTV" src/
```
Expected: No matches.
