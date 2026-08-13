# Rene Health Clinic — Next.js Frontend

Headless frontend for the Rene Health Clinic site. Content will come from the WordPress install at `WP-SITES-SETUPS/rene-health-wp`; for now the homepage renders from a typed local data layer with the same shapes the WP REST API will return.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · GSAP + ScrollTrigger (`@gsap/react`) · Lenis smooth scroll · Framer Motion.

## Animation map

- **Preloader** — logo + 0→100 counter, curtain lift (once per session).
- **Hero** — split panels expand on hover; staggered load reveal after preloader.
- **Different Needs** — pinned section; half-circle dial rotates with scroll, snapping per care area (myhealthprac-style). Static list on mobile / reduced motion.
- **Good to Know** — pinned; background zoom + heading and glass cards staggered on scrub.
- **Video** — scales from inset card to full-bleed on scroll.
- **Reviews** — draggable horizontal track with progress bar.
- Everything else uses viewport-triggered fade-ups (Framer Motion `Reveal`).

Reduced motion is respected globally (Lenis and pinned scenes are skipped).

## WordPress integration

1. Copy `.env.local.example` → `.env.local` and set `WP_URL` to your Local WP site URL.
2. Content: create `team_member`, `faq`, `review` CPTs (with ACF fields matching `src/lib/wp.ts`), then set `NEXT_PUBLIC_CONTENT_SOURCE=wordpress`.
3. Contact form: install Contact Form 7, create a form with fields `first-name`, `last-name`, `your-email`, `your-phone`, `your-message`, and set `CF7_FORM_ID` / `CF7_UNIT_TAG`. The frontend posts to `/api/contact`, which proxies to CF7's REST endpoint. Until configured, submissions are accepted and logged server-side so the UI works.
