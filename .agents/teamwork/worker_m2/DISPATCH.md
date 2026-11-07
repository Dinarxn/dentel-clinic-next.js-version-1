## 2026-11-07T15:22:09Z
You are a Worker subagent (Senior Frontend Engineer & UI Specialist) for the Lumière Dental Studio project executing Milestone 2: Navigation & Core Layout.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Working directory: c:\Users\Admin\Desktop\all project\dentel website next.js
Your state folder: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\worker_m2\
Original request path: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\ORIGINAL_REQUEST.md
Project blueprint: c:\Users\Admin\Desktop\all project\dentel website next.js\PROJECT.md
E2E Test Specification: c:\Users\Admin\Desktop\all project\dentel website next.js\TEST_INFRA.md

Skills to apply:
- C:\Users\Admin\.gemini\config\skills\react-nextjs-development\SKILL.md
- C:\Users\Admin\.gemini\config\skills\tailwind-patterns\SKILL.md
- C:\Users\Admin\.gemini\config\skills\frontend-dev-guidelines\SKILL.md
- C:\Users\Admin\.gemini\config\skills\ui-ux-design\SKILL.md

Write Ownership:
- src/components/layout/Navbar.tsx
- src/components/layout/MobileNavigation.tsx
- src/components/layout/MobileBottomBar.tsx
- src/components/layout/FloatingWhatsApp.tsx
- src/components/layout/Footer.tsx
- src/components/ui/SectionHeading.tsx
- src/components/index.ts
- src/app/layout.tsx (integrate Navbar, MobileBottomBar, FloatingWhatsApp, and Footer into the root shell)

Tasks:
1. Implement `src/components/layout/Navbar.tsx`:
   - Top demonstration disclaimer banner ("Lumière Dental Studio • Demonstration Website for Premium Practices Across India")
   - Luxury brand logo ("Lumière Dental Studio • Bandra West" with subtle gold tooth/star emblem) linking to `/`
   - Navigation links: Home (`/`), About Us (`/about`), Treatments (`/treatments`), Our Doctor (`/doctor`), Gallery (`/gallery`), Contact Us (`/contact`)
   - Direct phone call quick-action button with icon (`tel:+919820012345`)
   - Primary Champagne Gold CTA button ("Book Appointment" or "Book Consultation") linking to `/contact`
   - Mobile hamburger toggle icon button (accessible aria-label, triggers mobile drawer)
   - Sticky header styling with subtle backdrop blur and border
2. Implement `src/components/layout/MobileNavigation.tsx`:
   - Accessible slide-out or full-screen drawer for mobile viewports
   - Smooth opening/closing transitions
   - Close button ('X') with accessible label
   - Nav links with active route indicators
   - Lock body scroll when drawer is open
   - Contact cluster at bottom of drawer: direct phone call button, WhatsApp button, Bandra West address
3. Implement `src/components/layout/MobileBottomBar.tsx`:
   - Persistent fixed bottom action bar on mobile viewports `< 768px` (`md:hidden`)
   - Fixed at `bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E1D7] px-4 py-2.5 pb-safe`
   - 3 distinct touch targets:
     * "Call Clinic" with Phone icon linking to `tel:+919820012345`
     * "WhatsApp" with MessageCircle icon linking to universal WhatsApp prefilled URL
     * "Book Appointment" in Champagne Gold pill (`bg-[#C49A59] text-white`) linking to `/contact`
   - Zero overlap guarantee: verified safe because `src/app/layout.tsx` enforces `pb-24 md:pb-0` on page wrappers
4. Implement `src/components/layout/FloatingWhatsApp.tsx`:
   - Floating concierge button for desktop viewports (`hidden md:flex fixed bottom-6 right-6 z-40`)
   - Deep Navy / Champagne Gold luxury button with WhatsApp icon and tooltip
   - Clicking opens configured WhatsApp prefilled chat in new window
5. Implement `src/components/layout/Footer.tsx`:
   - Deep Navy (`#17324D`) background with Warm Ivory (`#F7F5F0`) and Champagne Gold accents
   - 4-column responsive layout:
     * Col 1: Brand story, "Lumière Dental Studio", boutique clinic heritage in Bandra West
     * Col 2: Navigation quick links
     * Col 3: Treatments catalog links (Porcelain Veneers, Dental Implants, Invisible Aligners, Single-Visit Root Canal, Laser Whitening, Preventive Periodontics)
     * Col 4: Contact details (Turner Road address, +91 98200 12345, hours, Google Maps link)
   - Prominent demonstration disclaimer banner in footer
   - Copyright line: `© 2026 Lumière Dental Studio. Demonstration Website — All Rights Reserved.`
6. Implement `src/components/ui/SectionHeading.tsx`:
   - Reusable editorial heading block
   - Champagne Gold pill eyebrow badge
   - Luxury serif title in Deep Navy or Ivory
   - Muted subtitle description
   - Alignment support: 'center' | 'left'
7. Update `src/app/layout.tsx`:
   - Integrate `Navbar`, `MobileBottomBar`, `FloatingWhatsApp`, and Footer into root shell.
8. Run quality verification:
   - `npx tsc --noEmit` (strict mode, zero errors)
   - `npm run lint` (zero warnings, zero errors)
   - `npm run build` (clean build)
   - `node tests/e2e/run-tests.mjs` (must pass all M1 and M2 test assertions)
