# Convera Strategies — Pre-Launch QA

## Brand and visual
- [ ] Ryan Brown portrait crops correctly on desktop and mobile.
- [ ] Logo remains readable in light and dark mode.
- [ ] `Social Perspectives · Workplace Culture · Organizational Strategy` appears in the approved order.
- [ ] Homepage remains clean and personal rather than crowded.
- [ ] Mission retains the “moment of transition” tone without overwhelming the business purpose.

## Client conversion
- [ ] `Explore Our Mission` points to `/mission/`.
- [ ] `Work With Convera` pathways reach Services or the correct prefilled Contact inquiry.
- [ ] Services clearly explains the initial engagement process.
- [ ] Support remains visible but distinct from paid professional services.
- [ ] Contact form language does not imply legal, HR, investigative, or other licensed services.

## Contributions
- [ ] One-time contribution link works.
- [ ] Monthly contribution link works.
- [ ] Checkout provider returns successfully to `/support/thank-you/`.
- [ ] Contribution language does not imply tax deductibility.

## Content
- [ ] Featured Publication title, date, author order, description, and original-publisher URL are verified.
- [ ] Only completed/publicly supportable publications appear at launch.
- [ ] Founder and organization language remains singular/founder-led.
- [ ] No accidental references to a large team, HR investigations, legal advice, or legal representation.

## Mobile and accessibility
- [ ] Navigation is usable at 320px, 375px, 768px, and desktop widths.
- [ ] All interactive controls are comfortably tappable.
- [ ] Dark mode has sufficient contrast.
- [ ] Keyboard navigation reaches all controls in logical order.
- [ ] Focus indicators remain visible.
- [ ] Reduced-motion preference is respected.
- [ ] Support active state is visible and announced with `aria-current`.

## Technical
- [ ] `npm run launch:audit` passes.
- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] Contact form appears in Netlify Forms.
- [ ] `/rss.xml`, sitemap, manifest, robots.txt, canonical tags, and social metadata resolve.
- [ ] 404 page works.
- [ ] HTTPS and custom domain resolve correctly.
