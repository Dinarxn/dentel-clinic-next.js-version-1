## 2026-11-07T16:00:30Z

You are the Milestone 3 Worker for Lumière Dental Studio.
State folder: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\worker_m3\
Working directory: c:\Users\Admin\Desktop\all project\dentel website next.js
Read the original request at: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\ORIGINAL_REQUEST.md
Read the project blueprint at: c:\Users\Admin\Desktop\all project\dentel website next.js\PROJECT.md
Read clinic configuration at: c:\Users\Admin\Desktop\all project\dentel website next.js\src\config\clinic.config.ts
Read layout and styles at: c:\Users\Admin\Desktop\all project\dentel website next.js\src\app\layout.tsx and src\app\globals.css

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Scope of Milestone 3: Content Components & Home Page (10 Sections)
Build a breathtaking, world-class, responsive, luxury dental clinic Home page following the strict 60/30/10 colour system:
- 60% Warm Ivory (`#F7F5F0`) as the primary calming architectural canvas
- 30% Deep Navy (`#17324D`) for authoritative headers, high-contrast narrative panels, and footers
- 10% Champagne Gold (`#C49A59`) for primary CTAs, refined badges, active accents, and subtle borders
- Supporting: Slate (`#243244`/`#687789`), Border (`#E7E1D7`), White (`#FFFFFF`)

Components to implement:
1. `src/components/sections/HeroSection.tsx`:
   - Editorial headline in elegant serif (`Playfair Display`), subtext, primary CTA button ("Book Consultation" linking to `/contact`), secondary CTA ("Explore Disciplines" linking to `/treatments`), and quick dialer link (`tel:+919820012345`).
   - High-resolution hero dental imagery from `clinicConfig.hero` or verified Unsplash URLs with Next.js image optimization.
   - Luxury trust pills: "Bandra West, Mumbai", "Bespoke Prosthodontics", "Hospital-Grade Sterilization".
2. `src/components/sections/TrustIntroSection.tsx`:
   - Narrative philosophy connecting medical precision with French atelier tranquility.
   - 4 foundational pillars: 7-Step Class-B Autoclave, 0.1mm Zeiss Microscopic Dentistry, 3D Swiss CBCT Imaging, Zero-Anxiety Suites.
3. `src/components/ui/TreatmentCard.tsx`:
   - Luxury card for treatment disciplines with category badge, procedural overview, key metrics (duration, recovery, anesthesia), and Champagne Gold button linking to `/treatments/[slug]`.
4. `src/components/sections/TreatmentsSection.tsx`:
   - Section heading with SectionHeading component.
   - Responsive grid rendering all 6 treatments from `clinicConfig.treatments`.
   - Link to full `/treatments` catalog.
5. `src/components/sections/WhyChooseUsSection.tsx`:
   - 4-6 distinctive architectural value proposition cards: Hospital-Grade Sterilization, Private Atelier Suites, Pain-Free Anesthesia Technology, Transparent Treatment Plans, Digital Smile Design.
6. `src/components/ui/DoctorProfile.tsx`:
   - Spotlight on Dr. Aanya Mehta (MDS Prosthodontics).
   - High-end portrait from `clinicConfig.doctor.image`.
   - Philosophy, credentials, experience ("15+ Years Clinical Precision"), and link to full `/doctor` page.
   - CRITICAL DEMO INTEGRITY: Prominently display the demonstration disclaimer badge/notice (`clinicConfig.demoDisclaimers.doctorNotice`): "Demonstration Profile — Fictional Prototype Placeholder for Demonstration Purposes Only".
   - Strictly NO fake patient reviews, NO fake star ratings (e.g. "5.0 ★ (2,500 reviews)"), NO fabricated awards.
7. `src/components/ui/GalleryGrid.tsx`:
   - Curated preview grid from `clinicConfig.galleryItems` with category filtering or preview layout.
   - Link to full `/gallery`.
8. `src/components/sections/AppointmentCTASection.tsx`:
   - High-contrast luxury Deep Navy (`#17324D`) callout section.
   - Dual actions: "Reserve Consultation" (`/contact`) and "Concierge WhatsApp" (`wa.me` universal link).
   - Transparent reminder that this is a demonstration prototype website.
9. `src/components/sections/LocationSection.tsx`:
   - Bandra West Turner Road address details, consultation hours, telephone, email.
   - Styled interactive Google Maps embed or directions card with external link to `clinicConfig.identity.maps.directionsUrl`.
10. Update `src/components/index.ts` to export all new components.
11. Assemble all 10 sections in `src/app/page.tsx` (Navbar and Footer are in layout.tsx, so page.tsx contains Hero, TrustIntro, Treatments, WhyChooseUs, DoctorProfile, GalleryGrid, AppointmentCTA, and Location).

Verification Tasks:
1. Run `npx tsc --noEmit` (must exit 0 with 0 errors).
2. Run `npm run lint` (must report zero warnings/errors).
3. Run `npm run build` (must compile and generate all static pages).
4. Run `node tests/e2e/run-tests.mjs` (Home Page 10 sections test must transition from pending to PASS, with 21 active tests passing).
5. Deliver handoff report to `c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\worker_m3\handoff.md`.
6. Send a message to orchestrator with conversation ID ab132ff0-0003-463b-a5cb-494fd44e486d.
