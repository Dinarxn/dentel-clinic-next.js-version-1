# Dispatch Assignment: Milestone 4 Worker (Secondary Pages & Dynamic Routes)

## Mission
Implement all secondary pages and dynamic routes for Lumière Dental Studio in Next.js 15 App Router, React 19, TypeScript strict mode, and Tailwind CSS v4, adhering strictly to the 60/30/10 luxury colour palette (#F7F5F0 Warm Ivory, #17324D Deep Navy, #C49A59 Champagne Gold).

## Files to Create & Own Exclusively
1. `src/components/ui/ContactForm.tsx` (Client component with interactive validation and Demo Modal)
2. `src/app/about/page.tsx` (About Us page)
3. `src/app/treatments/page.tsx` (Treatments catalog page)
4. `src/app/treatments/[slug]/page.tsx` (Next.js 15 dynamic treatment details with generateStaticParams, generateMetadata, await params, and notFound())
5. `src/app/doctor/page.tsx` (Dr. Aanya Mehta profile page with prominent demo disclaimer)
6. `src/app/gallery/page.tsx` (Client component or page with interactive lightbox modal)
7. `src/app/contact/page.tsx` (Contact Us page embedding ContactForm and Location details)
8. Update `src/components/index.ts` to export `ContactForm` if needed.

## Key Requirements & Quality Contracts

### 1. `src/components/ui/ContactForm.tsx`
- Must be `'use client'`.
- Form fields:
  - Full Name (`name="name"`, min 2 chars)
  - Phone Number (`name="phone"`, Indian mobile regex `/^[6-9]\d{9}$/` with clear guidance: 10 digits starting with 6, 7, 8, or 9)
  - Email Address (`name="email"`, valid email regex)
  - Preferred Treatment (`name="treatment"`, select dropdown populated from `clinicConfig.treatments`)
  - Preferred Date (`name="date"`, min date set to today: `new Date().toISOString().split('T')[0]`)
  - Message/Notes (`name="message"`, textarea, optional)
- Validation:
  - Error messages in readable red/rose text for each invalid field.
  - Submit button with loading state and Champagne Gold styling.
- Submit Behavior (Demonstration Mode Modal):
  - On valid submission, DO NOT show a fake booking confirmation.
  - Open a sleek luxury modal dialog stating clearly:
    "Demonstration Mode: Consultation Request Validated"
    "This is a demonstration prototype website. Your request details have been validated successfully, but no real appointment has been scheduled on a live clinic calendar, and no personal medical data has been stored."
  - Show the submitted details in a clean card.
  - Provide an instant button: "Continue via WhatsApp Concierge" linking to `clinicConfig.identity.whatsapp.defaultUrl` with inquiry text.
  - Close/Dismiss button that resets the form.

### 2. `src/app/treatments/[slug]/page.tsx` (CRITICAL NEXT.JS 15 CONTRACT)
```typescript
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { clinicConfig } from '@/config/clinic.config';

interface TreatmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return clinicConfig.treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = clinicConfig.treatments.find((t) => t.slug === slug);
  if (!treatment) return { title: 'Treatment Not Found' };
  return {
    title: `${treatment.title} | ${clinicConfig.identity.name}`,
    description: treatment.shortDescription,
  };
}

export default async function TreatmentDetailPage({ params }: TreatmentPageProps) {
  const { slug } = await params; // MUST await params in Next.js 15
  const treatment = clinicConfig.treatments.find((t) => t.slug === slug);
  if (!treatment) {
    notFound(); // Triggers notFound() for invalid slugs
  }
  // Render rich treatment detail page
}
```
- Include: Breadcrumbs (`Home / Treatments / [Title]`), Hero with title, tagline, metrics (duration, recovery, anesthesia), Overview, Procedural Steps timeline, Candidacy, Recovery & Aftercare, Clinical Benefits, FAQs accordion, and Direct Consultation CTA with WhatsApp link.

### 3. `src/app/about/page.tsx`
- Breadcrumbs (`Home / About Us`).
- Editorial header, Clinic Heritage & Philosophy, 7-Step Class-B Sterilization Protocol, Biomimetic & Conservative Dentistry ethos, Private Suites & Patient Experience, and Consultation CTA.

### 4. `src/app/treatments/page.tsx`
- Breadcrumbs (`Home / Treatments`).
- Editorial header, category tabs/filters, responsive grid rendering all 6 treatments using `TreatmentCard`, Clinical Consultation Advisory panel, and Booking CTA.

### 5. `src/app/doctor/page.tsx`
- Breadcrumbs (`Home / Our Doctor`).
- Detailed profile for Dr. Aanya Mehta: biography, philosophy, educational background (MDS Prosthodontics), clinical approach, board certifications.
- PROMINENT DEMO DISCLAIMER: Must render `DemoDisclaimerBadge` and `clinicConfig.demoDisclaimers.doctorNotice` prominently before CTAs. Strictly NO fake reviews, NO fake star ratings.

### 6. `src/app/gallery/page.tsx`
- Breadcrumbs (`Home / Gallery`).
- Interactive category filter tabs (All, Atelier Suites, Precision Tech, Smile Artistry).
- Grid of images from `clinicConfig.galleryItems`.
- Interactive Lightbox Modal: Clicking an image opens a modal showing high-res view, caption, category, and close button (with ESC key listener).

### 7. `src/app/contact/page.tsx`
- Breadcrumbs (`Home / Contact Us`).
- Two-column responsive layout:
  - Left: Bandra West address, consultation hours, direct `tel:+919820012345` link, email link, WhatsApp link, Google Maps embed, valet parking notice.
  - Right: `ContactForm` component.
- Bottom demonstration disclaimer strip.

### 8. Strict Aesthetics & Mobile Responsiveness
- 60% Warm Ivory (`#F7F5F0`), 30% Deep Navy (`#17324D`), 10% Champagne Gold (`#C49A59`).
- Mobile-first responsiveness across 320px–1440px with zero horizontal scroll.
- Mobile bottom bar clearance: Root layout already provides `pb-24 md:pb-0`, ensure no elements clip.

## MANDATORY INTEGRITY WARNING
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Verification Requirements Before Handoff
Execute and document in `handoff.md`:
1. `npx tsc --noEmit` -> 0 errors.
2. `npm run lint` -> 0 warnings/errors.
3. Clean Next.js build: `if (Test-Path .next) { Remove-Item -Recurse -Force .next }; npm run build` -> all static pages generated cleanly.
4. `node tests/e2e/run-tests.mjs` -> all 26 assertions across Tiers 1–4 passing 100%!


## 2026-11-07T16:31:50Z
You are the Milestone 4 Worker.
Your mission is to implement all secondary pages and dynamic routes for Lumière Dental Studio.
Working directory: c:\Users\Admin\Desktop\all project\dentel website next.js
Your state folder: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\worker_m4\
Dispatch instructions: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\worker_m4\DISPATCH.md
Original user request: c:\Users\Admin\Desktop\all project\dentel website next.js\.agents\teamwork\ORIGINAL_REQUEST.md
Project blueprint: c:\Users\Admin\Desktop\all project\dentel website next.js\PROJECT.md
