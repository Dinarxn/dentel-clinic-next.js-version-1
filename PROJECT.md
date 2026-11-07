# Project: Lumière Dental Studio — Premium Next.js 15 Demonstration Website

## Architecture
- **Framework**: Next.js 15 App Router, React 19, TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first configuration with `@theme` and `@tailwindcss/postcss`), Lucide React icons
- **Visual Design**: Strict 60/30/10 colour system:
  - 60% Warm Ivory (`#F7F5F0`): Primary background, spacious layout, calming aesthetic
  - 30% Deep Navy (`#17324D`): Header, footer, typography, high-contrast credibility sections
  - 10% Champagne Gold (`#C49A59`): Primary CTA buttons, subtle highlights, active states
  - Supporting: Charcoal Slate (`#243244`), Muted Slate (`#687789`), Border Stone (`#E7E1D7`), Pure White (`#FFFFFF`), Sage Mist (`#DDE9E2`)
- **Mobile-First Experience**: Fully responsive from 320px to 1440px with zero horizontal scroll; persistent 3-action fixed bottom action bar (`tel:`, WhatsApp, Appointment) with collision-prevention padding (`pb-24 md:pb-0`)
- **Centralized Rebranding**: Single source of truth at `src/config/clinic.config.ts` for instant clinic rebrandability across India
- **Demonstration & Content Integrity**: Transparent demonstration disclaimers throughout; strictly NO fabricated credentials, fake testimonials, or simulated confirmed bookings without real backends

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Toolchain & Next.js 15 App Router Scaffold | Setup package.json, tsconfig, next.config.ts (Unsplash remote patterns), postcss.config.mjs, eslint | M1 | Survey (Explorer 1) |
| 2 | Tailwind CSS v4 & 60/30/10 Theme Tokens | Configure @theme in globals.css with Ivory, Navy, Gold, and typography rules | M1 | Survey (Explorer 1, 2) |
| 3 | Centralized Clinic Configuration & Types | Single source of truth in src/config/clinic.config.ts (Bandra West clinic identity, phone, WhatsApp, hours, doctor, treatments) | M1 | Survey (Explorer 2, 3) |
| 4 | SEO, Metadata, Sitemap & Robots | Root metadata, dynamic sitemap.ts, robots.ts, Open Graph tags | M1 | Survey (Explorer 2) |
| 5 | Premium Sticky Navbar | Sticky island nav with brand logo, nav links, phone CTA, appointment CTA, demo banner, mobile toggle | M2 | Survey (Explorer 2, 3) |
| 6 | Mobile Navigation Drawer | Accessible full-screen / slide-out mobile drawer with navigation links and clinic contacts | M2 | Survey (Explorer 2, 3) |
| 7 | Fixed Mobile Bottom Action Bar | Persistent bottom bar on <768px with Call Clinic (tel:), WhatsApp, and Appointment action | M2 | Survey (Explorer 2, 3) |
| 8 | Floating WhatsApp Concierge | Fixed bottom-right concierge trigger on desktop viewports | M2 | Survey (Explorer 2, 3) |
| 9 | Luxury Deep Navy Footer | 4-column footer with brand, treatments, hours, contact, and prominent demo disclaimer | M2 | Survey (Explorer 2, 3) |
| 10 | Reusable Section Heading | Editorial section heading component with gold eyebrow badge and serif headline | M2 | Survey (Explorer 3) |
| 11 | Editorial Hero Section | Warm Ivory hero with high-impact headline, dual CTAs, trust badges, and operatory photography | M3 | Survey (Explorer 2, 3) |
| 12 | Trust Introduction Section | 3-pillar narrative: Anxiety-Free Serenity, Conservative Care, Transparent Care | M3 | Survey (Explorer 2) |
| 13 | Reusable Treatment Card | Double-bezel luxury card with image zoom, duration/recovery badges, and detail link | M3 | Survey (Explorer 3) |
| 14 | Treatments Preview Section | Featured 6-treatment showcase on Home page linking to treatment detail routes | M3 | Survey (Explorer 2) |
| 15 | Why Choose Us Section | Deep Navy contrast section with 5 clinical differentiators and gold iconography | M3 | Survey (Explorer 2) |
| 16 | Doctor Profile Spotlight | Lead dentist feature on Home page with Dr. Aanya Mehta portrait, quote, and demo badge | M3 | Survey (Explorer 2, 3) |
| 17 | Clinic Gallery Preview | 4-6 curated architectural images with hover zoom and link to full gallery | M3 | Survey (Explorer 2) |
| 18 | Appointment CTA Banner | High-impact Deep Navy conversion panel with online booking, WhatsApp, and phone options | M3 | Survey (Explorer 2, 3) |
| 19 | Location & Visiting Info Section | Bandra West address card, operating hours, parking notes, Google Maps embed + directions link | M3 | Survey (Explorer 2) |
| 20 | Complete 10-Section Home Page | Assemble all 10 sections into src/app/page.tsx | M3 | Survey (Explorer 1, 2) |
| 21 | About Us Page (`/about`) | Narrative of boutique patient experience, 7-step sterilization, and care philosophy | M4 | Survey (Explorer 2) |
| 22 | Treatments Catalog Page (`/treatments`) | Categorized grid of all 6 services with tabs, procedure summaries, and detail links | M4 | Survey (Explorer 2) |
| 23 | Dynamic Treatment Details (`/treatments/[slug]`) | Next.js 15 async params, generateStaticParams, procedural steps, recovery, candidacy, FAQs | M4 | Survey (Explorer 1, 2, 3) |
| 24 | Our Doctor Page (`/doctor`) | Dr. Aanya Mehta biography, philosophy, clinical expertise, and prominent demo disclaimer | M4 | Survey (Explorer 2, 3) |
| 25 | Gallery Page (`/gallery`) | Curated high-res imagery of clinic suites, technology, and smiles with category filter and modal | M4 | Survey (Explorer 2, 3) |
| 26 | Contact Us Page (`/contact`) | Complete contact hub with info cards, Google Maps embed, hours, and appointment form | M4 | Survey (Explorer 2) |
| 27 | Appointment Inquiry Form & Validation | Patient name, 10-digit Indian phone validation (/^[6-9]\d{9}$/), treatment select, date, demo modal | M4 | Survey (Explorer 2, 3) |
| 28 | Direct tel: and WhatsApp Prefilled Links | Direct tel:+919820012345 and WhatsApp prefilled "Hello, I would like to enquire about a dental appointment" | M4 | Survey (Explorer 2) |
| 29 | Comprehensive E2E Testing Suite | Requirements-driven test suite (Tiers 1-4) published in TEST_READY.md | E2E | Project Pattern |
| 30 | 100% E2E Pass & Adversarial Hardening | Verification of all pages, viewport responsiveness (320px-1440px), clean build, zero errors | M5 | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation, Toolchain & Config | Scaffolding, Tailwind v4 tokens, clinic.config.ts, types, SEO sitemap/robots, root layout | none | DONE |
| M2 | Navigation & Core Layout | Navbar, MobileNavigation, MobileBottomBar, FloatingWhatsApp, Footer, SectionHeading | M1 | DONE |
| M3 | Content Components & Home Page | Hero, TrustIntro, TreatmentCard, WhyChooseUs, DoctorProfile, GalleryGrid, AppointmentCTA, Location, Home page (10 sections) | M2 | DONE |
| M4 | Secondary Pages & Dynamic Routes | /about, /treatments, /treatments/[slug], /doctor, /gallery, /contact with validated ContactForm & demo modal | M3 | DONE |
| M5 | Final E2E Pass & Quality Verification | Pass 100% of E2E tests, responsive testing (320px-1440px), zero TS/ESLint errors, clean build | M4, E2E | DONE |
| E2E | E2E Testing Track | Independent opaque-box test suite (Tiers 1-4), TEST_INFRA.md, TEST_READY.md | M1 | DONE |

## Interface Contracts
### `src/config/clinic.config.ts` ↔ All Components & Pages
- Exported constant `clinicConfig` conforming to `ClinicConfig` in `src/types/index.ts`.
- Contains:
  - `identity`: name, tagline, address (line1, line2, city, state, postalCode), phone (`display`, `dialable`), email, hours, whatsapp (`number`, `defaultMessage`), maps (`embedUrl`, `directionsUrl`)
  - `doctor`: name, title, credentials, experienceYears, specialties, bio, philosophy, image, demoDisclaimer
  - `treatments`: array of 6 `TreatmentItem` objects with `slug`, `title`, `tagline`, `category`, `shortDescription`, `overview`, `duration`, `recoveryTime`, `anesthesia`, `image`, `proceduralSteps`, `candidacy`, `recoveryAndAftercare`, `benefits`, `faqs`
  - `galleryItems`: array of items with `id`, `title`, `category`, `imageUrl`, `aspectRatio`
  - `demoDisclaimers`: persistent strings for banner, footer, doctor, and appointment form

### Next.js 15 Dynamic Route Contract: `src/app/treatments/[slug]/page.tsx`
```typescript
interface TreatmentPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams(): Promise<{ slug: string }[]>;
export async function generateMetadata({ params }: TreatmentPageProps): Promise<Metadata>;
export default async function TreatmentDetailPage({ params }: TreatmentPageProps): Promise<JSX.Element>;
```

### Mobile Collision Prevention Contract: Root Layout & MobileBottomBar
- Root layout container must apply `pb-24 md:pb-0` padding.
- `MobileBottomBar` is fixed at `bottom-0 left-0 right-0 z-40 md:hidden`.
- Guarantees zero overlap with page content or footer across all viewports (320px to 767px).

### Appointment Form Validation & Demo Contract: `ContactForm.tsx`
- Fields: Full Name (min 2 chars), Phone (10-digit Indian regex `/^[6-9]\d{9}$/`), Email (valid regex), Treatment (required selection), Date (min today), Message (optional).
- On valid submit: opens Demonstration Notice modal explaining validation succeeded, without displaying a fake booking confirmation.

## Code Layout
```text
dentel website next.js/
├── .agents/teamwork/           # Agent coordination metadata only
├── public/                     # Static icons & branding placeholders
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 @theme and luxury styling tokens
│   │   ├── layout.tsx          # Root layout with metadata and pb-24 padding
│   │   ├── not-found.tsx       # Branded 404 page
│   │   ├── page.tsx            # 1. Home Page (10 sections)
│   │   ├── robots.ts           # Dynamic SEO robots.txt
│   │   ├── sitemap.ts          # Dynamic SEO sitemap.xml
│   │   ├── about/page.tsx      # 2. About Us
│   │   ├── contact/page.tsx    # 7. Contact Us & Appointment Booking
│   │   ├── doctor/page.tsx     # 5. Our Doctor
│   │   ├── gallery/page.tsx    # 6. Clinic Gallery & Lightbox
│   │   └── treatments/
│   │       ├── page.tsx        # 3. Treatments Catalog
│   │       └── [slug]/page.tsx # 4. Dynamic Treatment Details
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   ├── MobileBottomBar.tsx
│   │   │   ├── FloatingWhatsApp.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustIntroSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── AppointmentCTASection.tsx
│   │   │   └── LocationSection.tsx
│   │   └── ui/
│   │       ├── SectionHeading.tsx
│   │       ├── TreatmentCard.tsx
│   │       ├── DoctorProfile.tsx
│   │       ├── GalleryGrid.tsx
│   │       ├── ContactForm.tsx
│   │       └── DemoDisclaimerBadge.tsx
│   ├── config/
│   │   └── clinic.config.ts    # Authoritative single source of truth
│   └── types/
│       └── index.ts            # Type definitions
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```
