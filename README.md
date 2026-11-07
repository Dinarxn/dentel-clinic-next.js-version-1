# 🦷 Lumière Dental Studio — Premium Dental Clinic Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Quality Gate](https://img.shields.io/badge/Quality_Gate-Passed_100%25-2EA043?style=for-the-badge&logo=github-actions)](https://github.com/Dinarxn/dentel-clinic-next.js-version-1)

A production-quality, visually stunning dental clinic website designed and engineered to serve as a high-converting demonstration platform when presenting professional web development services to dental clinics and private healthcare practices across India.

Built with **Next.js 15 App Router**, **React 19**, **TypeScript in strict mode**, and **Tailwind CSS v4**, the application delivers an editorial, luxury brand experience tailored to leave an immediate, exceptional impression on mobile devices and desktop screens alike.

---

## 🌟 Highlights

- **Strict 60/30/10 Colour System**: Follows architectural colour distribution rules:
  - **60% Primary** — *Warm Ivory* (`#F7F5F0`) for soothing canvases, hero backdrops, and generous whitespace.
  - **30% Secondary** — *Deep Navy* (`#17324D`) for authoritative headings, navigation headers, footers, and contrast panels.
  - **10% Accent** — *Champagne Gold* (`#C49A59`) for primary CTA buttons, badges, icons, and focus rings.
- **Mobile-First Experience**: Designed mobile-first and tested rigorously across 9 viewport breakpoints (`320px`, `360px`, `375px`, `390px`, `414px`, `430px`, `768px`, `1024px`, `1440px`) with **zero horizontal overflow**.
- **Fixed Mobile Quick-Action Bar**: Persistent bottom bar (`Call Clinic`, `WhatsApp`, `Appointment`) active on mobile devices with `pb-24` layout clearance ensuring page content and footers are never obscured.
- **Turnkey 5-Minute Rebranding**: Single-source configuration in `src/config/clinic.config.ts`. Change clinic name, address, phone numbers, WhatsApp concierge, doctor profile, treatments, and hours in one file to rebrand the entire 7-page platform.
- **Demonstration & Clinical Integrity**: No fabricated patient reviews, fake star ratings, or synthetic medical claims. All doctor credentials and appointment workflows feature transparent demonstration disclaimers.
- **Interactive Form Validation**: Real-time validation for 10-digit Indian mobile numbers (`/^[6-9]\d{9}$/`), date-picker bounds (no past dates), and clear submission status modals.
- **Enterprise SEO & Core Web Vitals**: Prerendered Static Site Generation (SSG) across all 17 routes, dynamic Open Graph tags, automated `sitemap.xml`, and `robots.txt`. Shared initial JS bundle is just 103 kB.

---

## 📑 Multi-Page Structure & Route Matrix

| Route | Type | Description |
|---|---|---|
| `/` | Static (SSG) | **Homepage** with 10 editorial sections (Navbar, Hero, Trust Intro, Treatments Showcase, Why Choose Us, Doctor Profile, Gallery Grid, Appointment CTA, Location & Hours, Footer). |
| `/about` | Static (SSG) | **About Us**: Clinical ethos, Indian healthcare context, sterilization protocols, and patient comfort philosophy. |
| `/treatments` | Static (SSG) | **Treatment Catalog**: Interactive service filter across *Preventive*, *Restorative*, *Cosmetic*, and *Orthodontics*. |
| `/treatments/[slug]` | Dynamic (SSG) | **Dynamic Treatment Pages**: 6 pre-rendered routes with procedural steps, recovery details, FAQs, and pricing in INR. |
| `/doctor` | Static (SSG) | **Our Doctor**: Dr. Aanya Mehta clinical background, BDS/MDS credentials, and demonstration badges. |
| `/gallery` | Static (SSG) | **Clinic Gallery**: High-resolution photography of reception, consultation rooms, and equipment with interactive lightbox. |
| `/contact` | Static (SSG) | **Contact Us**: Address, hours, direct `tel:` dialing, WhatsApp concierge, and validated appointment inquiry form. |
| `/sitemap.xml` | Dynamic (Route) | Automatically indexed XML sitemap for search engine bots. |
| `/robots.txt` | Dynamic (Route) | Search engine indexing directives. |
| `/_not-found` | Static (SSG) | Branded 404 error page. |

### Pre-Rendered Treatment Detail Slugs:
1. `/treatments/porcelain-veneers` — Handcrafted aesthetic dental veneers
2. `/treatments/dental-implants` — Permanent titanium root replacements
3. `/treatments/invisible-aligners` — Clear orthodontic alignment systems
4. `/treatments/root-canal-treatment` — Single-visit microscopic endodontics
5. `/treatments/teeth-whitening` — In-office cold-light laser whitening
6. `/treatments/preventive-periodontics` — Ultrasonic scaling & periodontal wellness

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15.1.0](https://nextjs.org/) (App Router, Server Components & SSG)
- **Library**: [React 19.0.0](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) with `strict: true` and `noImplicitAny: true`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS-first custom theme variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: Node.js test runner, custom E2E test suites, and Chromium CDP viewport stress harness

---

## 📁 Project Directory Structure

```text
├── src/
│   ├── app/                                # Next.js 15 App Router
│   │   ├── about/page.tsx                  # About Us page
│   │   ├── contact/page.tsx                # Contact Us & inquiry form
│   │   ├── doctor/page.tsx                 # Doctor profile & credentials
│   │   ├── gallery/page.tsx                # Clinic photo gallery with lightbox
│   │   ├── treatments/                     # Treatments index
│   │   │   ├── page.tsx                    # Category filtered treatment catalog
│   │   │   ├── TreatmentsClient.tsx        # Client interactive filtering component
│   │   │   └── [slug]/page.tsx             # Pre-rendered treatment detail pages (SSG)
│   │   ├── globals.css                     # Tailwind CSS v4 design tokens & iOS safe area
│   │   ├── layout.tsx                      # Root layout, metadata & shell container
│   │   ├── not-found.tsx                   # Branded 404 page
│   │   ├── page.tsx                        # 10-section luxury Homepage
│   │   ├── robots.ts                       # SEO robots.txt generator
│   │   └── sitemap.ts                      # SEO sitemap.xml generator
│   ├── components/
│   │   ├── index.ts                        # Barrel export for UI components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                  # Desktop header navigation
│   │   │   ├── MobileNavigation.tsx        # Responsive slide-out mobile drawer
│   │   │   ├── MobileBottomBar.tsx         # Sticky bottom mobile action bar
│   │   │   ├── FloatingWhatsApp.tsx        # Floating WhatsApp concierge trigger
│   │   │   └── Footer.tsx                  # Luxury clinic footer & sitemap
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx             # Hero section with dual CTAs
│   │   │   ├── TrustIntroSection.tsx       # 3 pillars of patient care
│   │   │   ├── TreatmentsSection.tsx       # 6-treatment preview grid
│   │   │   ├── WhyChooseUsSection.tsx      # Clinical philosophy & technology
│   │   │   ├── AppointmentCTASection.tsx   # Appointment banner
│   │   │   └── LocationSection.tsx         # Bandra West address, map link & hours
│   │   └── ui/
│   │       ├── ContactForm.tsx             # Validated inquiry form with Indian phone regex
│   │       ├── TreatmentCard.tsx           # Luxury treatment card with hover depth
│   │       ├── DoctorProfile.tsx           # Doctor spotlight card with demo badge
│   │       ├── GalleryGrid.tsx             # Responsive image gallery grid
│   │       ├── SectionHeading.tsx          # Reusable editorial section heading
│   │       └── DemoDisclaimerBadge.tsx     # Demonstration integrity badge
│   ├── config/
│   │   └── clinic.config.ts                # Centralized clinic data & rebranding model
│   └── types/
│       └── index.ts                        # Strict TypeScript models & interfaces
├── tests/
│   ├── e2e/
│   │   ├── run-tests.mjs                   # Master test runner (26/26 assertions)
│   │   ├── tier1-features.test.mjs         # Multi-page routing contracts
│   │   ├── tier2-boundaries.test.mjs       # Form boundary & phone regex tests
│   │   ├── tier3-combinations.test.mjs     # 60/30/10 colour balance verification
│   │   ├── tier4-scenarios.test.mjs        # End-to-end appointment submission simulation
│   │   └── tier5-responsive-matrix.mjs     # 9-viewport responsive stress harness
│   └── stress/                             # Adversarial edge case & contract suites
├── public/                                 # Static assets & SVG icons
├── next.config.ts                          # Next.js optimization configuration
├── tsconfig.json                           # Strict TypeScript settings
└── package.json                            # Package scripts & dependencies
```

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Dinarxn/dentel-clinic-next.js-version-1.git
cd dentel-clinic-next.js-version-1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production (SSG)
```bash
npm run build
npm start
```

---

## 🧪 Verification & Quality Testing

Run the automated quality gates used during development:

```bash
# 1. Strict TypeScript check (0 errors)
npx tsc --noEmit

# 2. ESLint code quality check (0 warnings, 0 errors)
npm run lint

# 3. Next.js 15 clean production build (17/17 routes)
npm run build

# 4. Master E2E test suite (26/26 assertions passed)
node tests/e2e/run-tests.mjs

# 5. Adversarial input & dynamic route stress test (18/18 tests passed)
node .agents/teamwork/challenger_m5_1/test-m5-stress.mjs

# 6. Responsive matrix test across 9 viewports (63/63 permutations passed)
node tests/e2e/tier5-responsive-matrix.mjs
```

---

## 🎨 Rebranding in 5 Minutes

All clinic-specific data is centralized in **`src/config/clinic.config.ts`**. To customize this website for any dental clinic in India:

```typescript
// Open src/config/clinic.config.ts and update:

export const clinicConfig: ClinicConfig = {
  identity: {
    name: "Your Clinic Name",
    tagline: "Your Clinic Tagline",
    city: "Mumbai",
    area: "Bandra West",
    // ...
  },
  contact: {
    phone: "+91 98200 12345",
    phoneTel: "+919820012345",
    whatsapp: "919820012345",
    whatsappMessage: "Hello, I would like to enquire about an appointment at [Your Clinic].",
    email: "enquiry@yourclinic.com",
    address: {
      street: "Your Street Address",
      city: "Mumbai",
      postalCode: "400050",
      googleMapsUrl: "https://maps.google.com/?q=Your+Clinic",
    },
  },
  doctor: {
    name: "Dr. Your Name",
    title: "Chief Cosmetic & Implant Surgeon",
    qualifications: "BDS, MDS",
    // ...
  },
  // Update treatments, pricing, and operating hours here...
};
```

Once saved, the entire 7-page website updates automatically, including SEO metadata, Open Graph cards, WhatsApp concierge links, and telephone call buttons.

---

## 📱 Mobile-First Demonstration Checklist

When presenting this website to a dentist on a smartphone:
1. **First Impression**: Warm Ivory background, editorial typography, and high-end clinic photography.
2. **One-Tap Actions**: The bottom action bar gives instant access to **Call Clinic** and **WhatsApp Concierge**.
3. **Smooth Navigation**: Hamburger menu slides out cleanly with zero stutter.
4. **Interactive Treatment Explorer**: Tap any treatment to see procedure steps, recovery timeline, and pricing in INR.
5. **No Layout Breakage**: Test in portrait or landscape—zero horizontal scroll or overlapping elements.

---

## ⚖️ Demonstration Integrity Notice

This website uses realistic but demonstration-only content for **Lumière Dental Studio**. Doctor credentials, testimonials, and case studies are fictional demo placeholders designed for live sales presentations. Form submissions operate in demo mode unless an active backend API or CRM webhook is connected.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built for **Naxmedia** demonstration purposes.
