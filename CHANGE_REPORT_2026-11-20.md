# Change Report — 2026-11-20 (`aidynamic.pro`)

## Summary of Changes
Implemented conversion, UX, trust, and imagery fixes from the Nov 17 GA4 & UX audit (`356 insertions, 891 deletions` across `33` tracked files + `2` new WebP images).

### 1. Static Single-Fold, Free-First Hero & Decluttered Viewport
- `src/components/Hero.tsx`: Replaced the `250vh` staged scroll-jacking hero, rotating headlines, inline 4-tier pricing cards, and large WebGL 3D gold blob with a static single-fold layout:
  - Kept `"Until You Are Gold"` as an eyebrow tagline above a plain automation offer headline.
  - Set `"Book a Free 15-Minute Triage Call"` (`/booking?service=free_ai_consultation`) as primary CTA and `"Lock $99 Audit + 48h Prototype"` as secondary CTA.
  - Added `public/images/hero-embedded-engineering.webp` and verifiable live ecosystem links (`medicalbillingmb.com`, `aiscribers.com`, `hotelrateintel.com`).
- `src/LandingPage.tsx`, `src/App.tsx`, `src/components/Navigation.tsx`: Removed desktop right-edge `<SocialSidebar />`, hid `<EcosystemWidget />` on `/`, and removed the `LATAM` pill from the desktop navbar (retained in mobile menu & pricing toggle).

### 2. Chat Popup Language, Delay & Project Separation
- `src/components/AIAssistantWidget.tsx`: Integrated `useI18n()` so English routes display English copy, delayed attention grabber to `14s / 750px` scroll, and synchronized live call language selection.
- `src/components/FeaturedProjects.tsx`, `src/data/projects.ts`: Defaulted the featured projects filter to production/live deployments and separated Pilot / Active Development / R&D projects into a dedicated `pilot_rd` tab.

### 3. Contact, Compliance & Consistency Cleanup
- Replaced public `jasmelacosta@gmail.com` references with `jasmel@aidynamic.pro` (retaining `jasmelacosta@gmail.com` only in the internal admin allowlist).
- Replaced unsubstantiated `SOC 2 Type II` claims with `AES-256 & TLS 1.3`, `Zero Public Training`, and `HIPAA-Ready Workflows`.
- Unified PocketScribe links to `https://aiscribers.com` and resolved the `Mon–Fri 9:00 AM–6:00 PM` vs. `24/7 Support` contradiction across landing/legal/booking components (`Footer.tsx`, `Contact.tsx`, `DetailedServices.tsx`, `Pricing.tsx`, `FAQ.tsx`, `Stats.tsx`, `Partners.tsx`, `ROICalculator.tsx`, `SystemArchitectureShowcase.tsx`, `ProjectDetailView.tsx`, `SEO.tsx`, `I18nContext.tsx`, `Booking.tsx`, `Founders.tsx`, `HeroLab.tsx`, `LatamSaaS.tsx`, `Privacy.tsx`, `PrivacyPolicy.tsx`, `Terms.tsx`, `TermsOfService.tsx`, `index.html`).

### 4. Optimized Service Imagery
- `public/images/hero-embedded-engineering.webp` (`68,400` B)
- `public/images/voice-ai-receptionist.webp` (`43,788` B)
- `public/images/projects/consulting-boardroom.jpg` (`81,401` B)
- `public/images/projects/voice-ai-receptionist.jpg` (`53,924` B)
- `public/og-image.jpg` (`69,413` B), `public/og-image.png`, `public/hero.png`

## Verification
- `npm run build` (`tsc -b && vite build`): exited `0` (`2227` modules transformed, built in `1.33s`).
- `npx eslint` on `27` edited source files: `0` errors in `24` files; `18` pre-existing errors and `1` warning remain in `AIAssistantWidget.tsx`, `SEO.tsx`, and `I18nContext.tsx`.

## Remaining Manual Actions
- Add exact physical street/suite address if desired alongside Miami / Miami Beach location details.
- Add real client testimonials/case quotes once verified.
- Verify GA4 Key Events (`generate_lead`, `begin_booking`, `click_phone_call`) in property `G-M1RHKRVS9M` and inspect live mobile viewport spacing.
