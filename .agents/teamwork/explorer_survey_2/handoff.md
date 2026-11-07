# Lumière Dental Studio — Exhaustive Specification & Architecture Mining Report

## Observation
An exhaustive audit of the authoritative specification sources (`.agents/teamwork/ORIGINAL_REQUEST.md` and user dispatch requirements) was conducted. The project requires engineering a production-quality, visually stunning dental clinic website for **Lumière Dental Studio** (Bandra West, Mumbai) using Next.js 15 App Router, React 19, TypeScript (strict mode), Tailwind CSS v4, and Lucide React. The platform serves as a high-converting demonstration website for dental practices across India while maintaining strict content integrity, mobile-first excellence, and complete rebrandability via a centralized configuration file.

The workspace is currently clean (git initialized on branch `main` at `https://github.com/Dinarxn/dentel-clinic-next.js-version-1.git` with only `.agents/` present). All source files, page routes, components, styles, configurations, and public assets must be created from scratch following this specification.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Page Architecture | Home Page (`/`) | Master landing page with 10 structured sections showcasing luxury aesthetic, treatments, doctor spotlight, gallery, and conversion paths | URL request `/` | Rendered 10-section landing page with interactive elements | 404 if routing fails | ORIGINAL_REQUEST.md § R1 |
| 2 | Page Architecture | About Us Page (`/about`) | Narrative of founding vision, boutique patient experience, sterilization protocols, and care philosophy | URL request `/about` | Rendered editorial About page with trust badges & clinic story | 404 if route missing | ORIGINAL_REQUEST.md § R1 |
| 3 | Page Architecture | Treatments Catalog (`/treatments`) | Categorized grid of all dental services with category tabs, procedure overviews, and detail links | URL request `/treatments` | Filterable treatment card catalog with CTA section | 404 if route missing | ORIGINAL_REQUEST.md § R1 |
| 4 | Page Architecture | Treatment Detail (`/treatments/[slug]`) | Dynamic long-form page for specific dental procedure with overview, candidate checklist, step-by-step process, FAQs, and booking trigger | URL request `/treatments/:slug` (e.g. `porcelain-veneers`) | Rich procedure deep dive with pre-filtered booking trigger | Next.js `notFound()` on invalid slug | ORIGINAL_REQUEST.md § R1 |
| 5 | Page Architecture | Our Doctor Page (`/doctor`) | In-depth professional profile of Dr. Aanya Mehta with philosophy, expertise, continuing education, and demo disclaimer | URL request `/doctor` | Rendered doctor biography, credentials spotlight, and consultation CTA | 404 if route missing | ORIGINAL_REQUEST.md § R1 |
| 6 | Page Architecture | Gallery Page (`/gallery`) | Curated high-res imagery showcase of clinic interior, consultation lounge, digital operatory, and sterilization suite | URL request `/gallery` | Responsive photo grid with category filters and image modal/lightbox | 404 if route missing | ORIGINAL_REQUEST.md § R1 |
| 7 | Page Architecture | Contact Us Page (`/contact`) | Primary contact and lead generation hub with phone, WhatsApp, address, clinic hours, Google Maps, and inquiry form | URL request `/contact` | Contact cards, interactive Google Maps embed, and inquiry form | 404 if route missing | ORIGINAL_REQUEST.md § R1 |
| 8 | Home Section | Premium Navbar | Sticky top navigation with brand logo, nav links, phone CTA button, demo banner, and mobile hamburger trigger | Desktop viewport or mobile toggle | Responsive header with smooth backdrop blur and navigation controls | Failsafe fallback to standard links | ORIGINAL_REQUEST.md § R1, R2 |
| 9 | Home Section | Hero Section | Luxury visual introduction with editorial headline, subheadline, dual CTAs (Book & Explore), and key trust badges | User page visit | High-impact visual hero with Warm Ivory background and Champagne Gold CTA | Fallback background color if image loads slowly | ORIGINAL_REQUEST.md § R1, R2 |
| 10 | Home Section | Trust Introduction | Three-pillar narrative emphasizing anxiety-free environment, conservative dentistry, and transparent pricing | User scroll | Editorial 3-column layout with gold hairline iconography | Graceful stack on mobile | ORIGINAL_REQUEST.md § R1 |
| 11 | Home Section | Treatments Preview | 6 featured treatment cards with category badges, summaries, and direct links to `/treatments/[slug]` | User interaction / click | Cards leading to specific treatment detail pages | Links to `/treatments` catalog | ORIGINAL_REQUEST.md § R1 |
| 12 | Home Section | Why Choose Us | Deep Navy contrast section showcasing 5 clinical differentiators (3D imaging, 7-step sterilization, bespoke design, comfort amenities) | User scroll | High-contrast luxury panel with gold icons and value propositions | Stacked grid on small screens | ORIGINAL_REQUEST.md § R1, R2 |
| 13 | Home Section | Doctor Profile Spotlight | Lead dentist feature (Dr. Aanya Mehta), portrait image, philosophy quote, and demo badge | User click / view | Profile card linking to `/doctor` | Fallback portrait placeholder | ORIGINAL_REQUEST.md § R1, R5 |
| 14 | Home Section | Clinic Gallery Preview | 4-6 curated architectural images of reception lounge, operatory, and smile studio | User hover / click | Smooth zoom preview with "Tour Full Gallery" CTA | Responsive grid fallback | ORIGINAL_REQUEST.md § R1 |
| 15 | Home Section | Appointment CTA Banner | High-impact Navy & Gold call-to-action block with online booking trigger, WhatsApp chat link, and phone call | User click | Navigation or anchor jump to booking form / WhatsApp trigger | None | ORIGINAL_REQUEST.md § R1 |
| 16 | Home Section | Location & Visiting Information | Bandra West Mumbai physical address, operating hours, parking/accessibility notes, and interactive map embed | User view / directions click | Embedded Google Maps frame + direct Google Maps navigation link | Fallback address text if iframe blocked | ORIGINAL_REQUEST.md § R1, R4 |
| 17 | Home Section | Footer | Deep Navy footer with brand identity, quick links, treatments list, clinic hours, contact details, and demo disclaimer | User scroll | Comprehensive navigational footer with copyright & disclaimer | Responsive column collapse | ORIGINAL_REQUEST.md § R1, R2 |
| 18 | Design System | Strict 60/30/10 Color Palette | Systematic distribution: 60% Warm Ivory (#F7F5F0), 30% Deep Navy (#17324D), 10% Champagne Gold (#C49A59) + support colors | Tailwind CSS classes / CSS variables | Visually cohesive luxury aesthetic avoiding generic AI dashboard looks | Enforced via design token constants | ORIGINAL_REQUEST.md § R2 |
| 19 | Mobile-First | Fixed Mobile Bottom Action Bar | Persistent bottom bar on viewports < 768px with Call Clinic (`tel:`), WhatsApp (`wa.me`), and Appointment buttons | Mobile screen viewport | Instant one-tap access to primary conversion actions | Hidden on desktop viewports | ORIGINAL_REQUEST.md § R3 |
| 20 | Mobile-First | Collision-Free Mobile Layout | Global layout bottom padding (`pb-20` / `pb-24`) preventing the fixed action bar from obscuring page content or footer | Mobile scroll | All page content and footer text completely readable above bottom bar | Visual clipping if padding omitted | ORIGINAL_REQUEST.md § R3 |
| 21 | Mobile-First | Responsive Hamburger Menu | Slide-out drawer or full overlay navigation with accessible close button and background scroll lock | Hamburger icon click | Animated drawer containing nav links, phone CTA, WhatsApp CTA, and hours | Closes on backdrop click or route change | ORIGINAL_REQUEST.md § R3 |
| 22 | Interactive Feature | WhatsApp Prefilled Link | Direct WhatsApp chat opener with prefilled message "Hello, I would like to enquire about a dental appointment" | User click on WhatsApp button | Opens `https://wa.me/919820012345?text=...` in new window/app | None (valid universal link) | ORIGINAL_REQUEST.md § R4 |
| 23 | Interactive Feature | Direct Phone Link (`tel:`) | Clickable phone link initiating direct phone dialer with configured clinic number (`+91 98200 12345`) | User click on Call button | Triggers device telephone dialer via `tel:+919820012345` | Handled natively by OS | ORIGINAL_REQUEST.md § R4 |
| 24 | Interactive Feature | Appointment Inquiry Form | Comprehensive form: Full Name, Phone (10-digit Indian format), Email, Treatment dropdown, Preferred Date, Preferred Time, Notes | Form inputs & submission | Client-side validated form submission trigger | Highlights invalid fields with specific error messages | ORIGINAL_REQUEST.md § R4 |
| 25 | Interactive Feature | Demo Mode Form Submission Modal | Form submission interceptor displaying explicit demonstration validation modal rather than a fake real confirmation | Valid form submission | Demonstration modal explaining simulated validation and integration paths | Blocks submission if fields are invalid | ORIGINAL_REQUEST.md § R4 & Follow-up |
| 26 | Interactive Feature | Google Maps Directions Link | External link opening Google Maps route search directly to the Bandra West Mumbai clinic address | User click on "Get Directions" | Launches Google Maps in new tab with exact clinic search query | Fallback to text address | ORIGINAL_REQUEST.md § R4 |
| 27 | Architecture | Centralized Configuration File | Single authoritative data file (`src/config/clinic.config.ts`) storing identity, phone, address, hours, doctor, treatments, disclaimers | Code consumption across all pages | 100% white-label rebrandability by modifying one file | Type errors if schema violated | ORIGINAL_REQUEST.md § R4 & Follow-up |
| 28 | Content Integrity | Demo Mode Disclaimer Banners | Persistent disclaimers in header, footer, appointment form, and doctor profile declaring fictional demonstration status | Page rendering | Clear legal and ethical disclosure preventing fake medical claims | None | ORIGINAL_REQUEST.md § R5 & Follow-up |
| 29 | Content Integrity | Ethical Content Shield | Strictly prohibits fabricated doctor credentials, fake patient reviews/testimonials, and unverified medical guarantees | Content curation | Realistic sample treatment procedures and educational information only | Code review gate prevents fake reviews | ORIGINAL_REQUEST.md § R5 & Follow-up |
| 30 | SEO & Discovery | Next.js Metadata API | Page-specific titles, meta descriptions, canonical URLs, and Open Graph tags across all 7 routes | Page request / crawler visit | HTML `<head>` populated with high-quality SEO tags | Fallback to site default metadata | ORIGINAL_REQUEST.md § R5 |
| 31 | SEO & Discovery | Dynamic XML Sitemap (`sitemap.ts`) | Generates standard XML sitemap indexing all 7 static pages plus all dynamic treatment slugs | Crawler request to `/sitemap.xml` | Valid XML response with URLs, lastModified, and changeFrequency | 500 error if slug resolution fails | ORIGINAL_REQUEST.md § R5 |
| 32 | SEO & Discovery | Robots Configuration (`robots.ts`) | Generates standard `/robots.txt` specifying crawl rules and sitemap location | Crawler request to `/robots.txt` | Standard robots directives | None | ORIGINAL_REQUEST.md § R5 |

---

## Edge Cases

| # | Feature | Input / Condition | Observed Behavior & Required Handling |
|---|---------|-------------------|---------------------------------------|
| 1 | Mobile Viewport | 320px ultra-small screen (e.g. iPhone SE 1st gen) | Layout must not produce horizontal overflow (`overflow-x: hidden`). Long words, brand titles, and button padding must wrap cleanly (`break-words`, `text-xs sm:text-sm`). |
| 2 | Fixed Bottom Action Bar | User scrolls to absolute bottom of page on mobile | The fixed action bar must not obscure the footer text, copyright, or disclaimer. A bottom spacer/padding (`pb-20` or `pb-24`) must exist in the layout container so the footer is fully visible above the bar. |
| 3 | Mobile Drawer | User opens mobile hamburger menu and scrolls | Background page scrolling must be locked (`document.body.style.overflow = 'hidden'`) while drawer is open. Closing the drawer or navigating must restore scrolling. |
| 4 | Mobile Drawer Navigation | User clicks a navigation link inside the drawer | Drawer must immediately close, body scroll must unlock, and the page must navigate smoothly to the chosen route. |
| 5 | Treatment Dynamic Route | User navigates to invalid slug (e.g. `/treatments/laser-teeth-surgery-fake`) | Application must call Next.js `notFound()`, rendering the custom, branded 404 page with a link back to `/treatments`. |
| 6 | Treatment Dynamic Route | User navigates to valid slug (e.g. `/treatments/porcelain-veneers`) | Next.js `generateStaticParams()` must pre-render the page at build time. `generateMetadata()` must dynamically populate page title and description matching the treatment. |
| 7 | Appointment Form Phone Validation | Patient enters invalid Indian phone number (e.g. `12345` or letters or 9 digits) | Input validation fails with message: "Please enter a valid 10-digit Indian mobile number (e.g. 98200 12345)". Submit button remains disabled or submission is halted with error focus. |
| 8 | Appointment Form Date Validation | Patient selects yesterday or a past date | Date input `min` attribute must be set to today's date (`new Date().toISOString().split('T')[0]`). If bypassed, validation rejects dates prior to current day. |
| 9 | Appointment Form Submission | Patient submits valid form in Demo Mode | System MUST NOT display a real confirmed booking confirmation. Instead, an explicit Demo Modal opens: "Demonstration Preview: Validation passed! In production, this connects to your clinic management API or WhatsApp Business. No real appointment was booked." |
| 10 | WhatsApp Prefilled Link | Device has WhatsApp installed vs. desktop browser | Standard universal URL `https://wa.me/919820012345?text=...` opens WhatsApp native app on mobile or WhatsApp Web on desktop smoothly without breaking. |
| 11 | Direct Telephone Link | User clicks `tel:` on desktop without telephony client | Standard browser behavior (prompts default calling app like FaceTime/Skype or displays phone number). In addition, visible phone text is always provided adjacent to icon. |
| 12 | Slow Image Loading | High-res Unsplash image loads on slow 3G mobile | Next.js `<Image>` component with responsive `sizes`, WebP/AVIF format, priority on hero image, and placeholder blur or warm ivory background prevents Cumulative Layout Shift (CLS). |
| 13 | Color System Consistency | Card hover states, badges, and text contrast | Supporting text on Warm Ivory (#F7F5F0) must strictly use Slate (#243244 or #687789), never low-contrast light gray. Gold (#C49A59) is used exclusively for accents, borders, and CTA buttons, never for large body paragraphs. |
| 14 | Google Maps Embed Blocked | User browser blocks 3rd-party cookies/iframes | The Location section provides both the iframe embed and a prominent external link button ("Open in Google Maps") so directions remain 100% accessible. |
| 15 | Active Navigation State | User is on nested route (e.g. `/treatments/invisible-aligners`) | Navbar highlights "Treatments" navigation item using Champagne Gold underline/pill indicator to maintain spatial orientation. |

---

## Detailed Specification Dimensions

### 1. Complete Page Route Enumeration & Matrix

| Page Name | URL Route | File Path | Layout & Meta Purpose | Key Components |
|-----------|-----------|-----------|------------------------|----------------|
| **Home** | `/` | `src/app/page.tsx` | Comprehensive clinic showcase with 10 structured sections | Navbar, HeroSection, TrustIntro, FeaturedTreatments, WhyChooseUs, DoctorSpotlight, GalleryPreview, AppointmentCTA, LocationSection, Footer |
| **About Us** | `/about` | `src/app/about/page.tsx` | Founding narrative, patient-centric philosophy, sterilization standards, clinic values | PageHero, PhilosophySection, StandardsGrid, ExperienceWalkthrough, BookingCTA |
| **Treatments Catalog** | `/treatments` | `src/app/treatments/page.tsx` | Full directory of services categorized by Cosmetic, Restorative, Orthodontics, Preventive | CategoryTabs, TreatmentCardGrid, ProcessTimeline, FAQAccordion, BookingCTA |
| **Treatment Detail** | `/treatments/[slug]` | `src/app/treatments/[slug]/page.tsx` | Deep dive for specific treatment (e.g. `porcelain-veneers`) | TreatmentHero, CandidateChecklist, ProcedureSteps, BenefitsGrid, TreatmentFAQ, ContextualAppointmentForm |
| **Our Doctor** | `/doctor` | `src/app/doctor/page.tsx` | Spotlight on Dr. Aanya Mehta, philosophy, clinical credentials placeholder, bedside manner | DoctorHero, PhilosophyQuote, ClinicalExpertise, EducationTimeline, DemoBadge, BookingCTA |
| **Gallery** | `/gallery` | `src/app/gallery/page.tsx` | Visual tour of consultation lounge, sterilized operatory, digital scanning suite | CategoryFilter, MasonryImageGrid, LightboxModal, ImageDisclaimer |
| **Contact Us** | `/contact` | `src/app/contact/page.tsx` | Primary inquiry hub with direct call, WhatsApp, address, clinic hours, interactive map, booking form | ContactInfoCards, InteractiveMap, AppointmentInquiryForm, DemoDisclaimerBanner |

---

### 2. Detailed Breakdown of Home Page 10 Sections

```
+-----------------------------------------------------------------------------------+
| 1. Premium Navbar (Brand Logo, Desktop Links, Phone CTA, Demo Banner, Hamburger)  |
+-----------------------------------------------------------------------------------+
| 2. Hero Section (Warm Ivory Canvas, Editorial Headline, Dual CTAs, Hero Image)    |
+-----------------------------------------------------------------------------------+
| 3. Trust Introduction (3 Pillars: Anxiety-Free, Conservative Care, Transparent)   |
+-----------------------------------------------------------------------------------+
| 4. Treatments Preview (6 Featured Cards with Category Badges & Detail Links)      |
+-----------------------------------------------------------------------------------+
| 5. Why Choose Us (Deep Navy Panel, 5 Gold Icon Pillars, Modern Tech & Sterilization)|
+-----------------------------------------------------------------------------------+
| 6. Doctor Profile Spotlight (Dr. Aanya Mehta, Portrait, Quote, Demo Disclaimer)   |
+-----------------------------------------------------------------------------------+
| 7. Clinic Gallery Preview (4-6 Architectural Space Images, Hover Zoom, Tour CTA)  |
+-----------------------------------------------------------------------------------+
| 8. Appointment CTA Banner (High-contrast Navy/Gold Conversion Card, WhatsApp link)|
+-----------------------------------------------------------------------------------+
| 9. Location & Visiting Info (Interactive Map Embed, Bandra West Address, Hours)   |
+-----------------------------------------------------------------------------------+
| 10. Footer (Deep Navy, 4 Columns: Identity, Navigation, Treatments, Hours, Legal) |
+-----------------------------------------------------------------------------------+
```

1. **Section 1: Premium Navbar**:
   - **Top Announcement / Demo Bar**: Subtle warm gold/ivory banner at the very top: *"Lumière Dental Studio • Demonstration Website for Premium Practices Across India"*.
   - **Logo**: Elegant serif mark "LUMIÈRE" with subtitle "DENTAL STUDIO • BANDRA WEST" + subtle Champagne Gold dental emblem.
   - **Navigation Items**: Home (`/`), About (`/about`), Treatments (`/treatments`), Our Doctor (`/doctor`), Gallery (`/gallery`), Contact (`/contact`).
   - **Call-to-Action**: Phone quick link (`+91 98200 12345`) + "Book Appointment" CTA button (`#C49A59`).
   - **Mobile Hamburger Toggle**: Animated icon transitioning between hamburger and X icon, opens slide-out drawer.
   - **Sticky Behavior**: Smooth blur background on scroll (`bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E7E1D7]`).

2. **Section 2: Hero Section**:
   - **Canvas**: Warm Ivory (`#F7F5F0`) with subtle editorial borders and generous whitespace.
   - **Eyebrow Tag**: *"Boutique Aesthetic & Restorative Dentistry • Bandra West, Mumbai"*.
   - **Headline (Serif)**: *"Artistry Meets Precision in Modern Dental Care"*.
   - **Subheadline**: *"Experience calm, unhurried dentistry in a serene boutique setting. From gentle preventive wellness to bespoke smile architecture, your comfort guides every decision."*
   - **CTA Group**:
     - Primary: "Book Consultation" (Champagne Gold button `#C49A59` with hover shadow, links to `/contact#appointment`).
     - Secondary: "Explore Treatments" (Navy outline button `#17324D`, links to `/treatments`).
   - **Hero Visual**: Curated high-resolution image of a modern, welcoming dental operatory with natural sunlight and architectural elegance.
   - **Trust Badges Row**: 3 key highlights beneath the visual: *"Digitally Guided Precision"*, *"Zero-Pain Philosophy"*, *"Bespoke Treatment Architecture"*.

3. **Section 3: Trust Introduction**:
   - **Narrative**: Framing the clinic as an antidote to clinical anxiety and rushed medical environments.
   - **3 Core Pillars**:
     1. *Anxiety-Free Serenity*: Private treatment suites, noise-cancelling acoustics, and gentle sedation options.
     2. *Conservative Precision*: Preserving natural tooth structure with minimally invasive biomimetic methods.
     3. *Radical Transparency*: Digital 3D smile previews before treatment begins and clear, upfront investment roadmaps.

4. **Section 4: Treatments Preview**:
   - **Heading**: Eyebrow: *"OUR CLINICAL EXPERTISE"*; Heading: *"Comprehensive Smile Architecture"*.
   - **6 Featured Treatment Cards**:
     1. *Porcelain Veneers* (Cosmetic Dentistry)
     2. *Invisible Aligners* (Orthodontics & Alignment)
     3. *Dental Implants* (Advanced Restorative)
     4. *Teeth Whitening* (Aesthetic Wellness)
     5. *Full Smile Makeover* (Comprehensive Reconstruction)
     6. *Preventive Wellness & Hygiene* (Preventive Oral Health)
   - **Card Anatomy**: High-res Unsplash image, treatment title, category badge, 2-line summary, and link to `/treatments/[slug]`.
   - **Section Action**: "View All Treatments & Pricing Guide" button pointing to `/treatments`.

5. **Section 5: Why Choose Us**:
   - **Design Style**: Deep Navy background (`#17324D`) providing rich visual contrast against the Warm Ivory sections.
   - **5 Value Pillars**:
     1. *3D Intraoral Scanning*: Eliminates messy physical impressions with instant digital accuracy.
     2. *Hospital-Grade 7-Step Sterilization*: Strict compliance with international infection prevention protocols.
     3. *Facially Driven Smile Design*: Designing teeth in harmony with facial proportions and lip dynamics.
     4. *Boutique Comfort Amenities*: Heated neck pillows, curated calming playlists, and aromatherapy.
     5. *Lifelong Preventive Partnership*: Clear post-treatment care plans and ongoing maintenance.

6. **Section 6: Doctor Profile Spotlight**:
   - **Feature**: Dr. Aanya Mehta (BDS, MDS - Prosthodontics & Cosmetic Dentistry).
   - **Visual**: Professional portrait photograph of the lead clinician.
   - **Philosophy Quote**: *"A smile should look radiantly healthy, never artificial. Our responsibility is to elevate your natural beauty while protecting your oral health for decades to come."*
   - **Specializations**: Aesthetic Veneers, Digital Smile Design, Implant Prosthetics.
   - **Demo Status Badge**: *"Fictional Demonstration Profile • Real credentials provided upon clinic deployment"*.
   - **Action**: "Read Full Biography & Philosophy →" linking to `/doctor`.

7. **Section 7: Clinic Gallery Preview**:
   - **Heading**: *"Designed for Peace of Mind"*.
   - **Visual Grid**: 4 curated architectural photographs showing the consultation lounge, sterilisation bay, treatment operatory, and digital diagnostics.
   - **Action**: "Explore the Full Clinic Gallery" button linking to `/gallery`.

8. **Section 8: Appointment CTA Banner**:
   - **Container**: Elegant Deep Navy card with Champagne Gold hairline border and ivory typography.
   - **Heading**: *"Begin Your Smile Journey Today"*.
   - **Copy**: *"Schedule a private consultation with Dr. Aanya Mehta to discuss your oral health goals in a calm, non-judgmental environment."*
   - **Action Pathways**:
     - "Request Appointment Online" button (links to `/contact#appointment`).
     - "Chat on WhatsApp" button with prefilled inquiry message.
     - Direct call button: `+91 98200 12345`.

9. **Section 9: Location & Visiting Information**:
   - **Interactive Map**: Embedded Google Maps iframe centered on Hill Road, Bandra West, Mumbai.
   - **Location Card**:
     - Address: *Lumière Dental Studio, 2nd Floor, Heritage Boulevard, Hill Road, Bandra West, Mumbai, Maharashtra 400050*.
     - Hours: *Monday – Saturday: 9:00 AM – 8:00 PM \| Sunday: By Prior Appointment Only*.
     - Accessibility: Valet parking available, elevator equipped, wheelchair accessible.
     - External Button: "Get Directions via Google Maps" opening route in new tab.

10. **Section 10: Footer**:
    - **Background**: Deep Navy (`#17324D`) with Warm Ivory text (`#F7F5F0`).
    - **Column 1**: Brand logo, tagline, brief mission statement.
    - **Column 2**: Quick navigation links (Home, About Us, Treatments, Our Doctor, Gallery, Contact Us).
    - **Column 3**: Featured Treatments list (direct links to `/treatments/[slug]`).
    - **Column 4**: Contact details (Phone `tel:`, WhatsApp link, Email `mailto:`, Address, Hours).
    - **Legal & Demo Disclaimer**:
      - Copyright: *© 2026 Lumière Dental Studio. All rights reserved.*
      - Prominent Demo Notice: *"Notice: This website is a live demonstration prototype developed to showcase modern web architecture for dental clinics across India. Clinic names, doctor profiles, and telephone numbers are demonstration placeholders."*

---

### 3. Strict 60/30/10 Colour System & Exact Usage Rules

| Color Token | Hex Code | System Ratio | Semantic Role & Exact Permitted Usage | Prohibited Usage |
|-------------|----------|--------------|---------------------------------------|------------------|
| **Warm Ivory** | `#F7F5F0` | **60% Primary** | Main body background, hero background, large editorial content sections, whitespace, card backgrounds on dark panels, navbar background canvas. | Never use as text color on white; never use for button borders on light backgrounds. |
| **Deep Navy** | `#17324D` | **30% Secondary** | Primary headings (`h1`, `h2`, `h3`), footer background, "Why Choose Us" dark panel, appointment CTA block background, structural borders on ivory, main navigation text. | Never use for small low-contrast captions on dark backgrounds; avoid covering >40% of page to maintain light editorial feel. |
| **Champagne Gold** | `#C49A59` | **10% Accent** | Primary CTA buttons, icon circles/accents, active navigation indicators, eyebrow badges, subtle hairline dividers, star highlights, focus rings. | **STRICTLY PROHIBITED** on large backgrounds, full page sections, or full body paragraphs (causes visual fatigue and cheapens brand). |
| **Charcoal Slate** | `#243244` | Supporting Text | Primary body text on Warm Ivory and White surfaces. Ensures WCAG AAA high contrast readability (contrast ratio > 7:1). | Avoid using for large background blocks. |
| **Muted Slate** | `#687789` | Supporting Subtitle | Secondary subtitles, helper text, form labels, metadata captions, operating hours details, disclaimer footnotes. | Do not use for primary headings or critical CTA button text. |
| **Border Stone** | `#E7E1D7` | Supporting Border | Subtle hairline dividers (`border-[#E7E1D7]`), table rules, card borders, form input borders on Warm Ivory background. | Do not use for text. |
| **Pure White** | `#FFFFFF` | Supporting Card | Card surfaces on Warm Ivory backgrounds, form input field backgrounds, modal dialog containers, light badges. | Do not use as the dominant page canvas (Warm Ivory #F7F5F0 is mandatory for the spa warmth). |
| **Sage Mist** | `#DDE9E2` | Supporting Status | Clinic status indicator ("Open Today until 8:00 PM"), hygiene badges, success checkmarks. | Do not use as primary brand accent. |

---

### 4. Mobile-First Requirements & Collision-Free Bottom Bar

#### A. Viewport Testing Grid
1. **320px (iPhone SE 1st gen)**: Zero horizontal scrolling. Text headings wrap without truncation. Form inputs and buttons stack vertically.
2. **360px (Standard Android / Galaxy)**: Balanced line lengths and readable font sizes.
3. **375px (iPhone standard)**: Standard baseline touch targets.
4. **390px (iPhone 12/13/14/15)**: Optimum mobile reading rhythm.
5. **414px (iPhone Plus/XR)**: Two-column grid where appropriate.
6. **430px (iPhone 14/15/16 Pro Max)**: Enhanced spacing and card padding.
7. **768px (Tablet portrait)**: Hamburger menu switches to full navigation or compact desktop nav. Bottom bar hides.
8. **1024px (Tablet landscape / small laptop)**: Full editorial multi-column layouts.
9. **1440px (Desktop wide)**: Constrained container `max-w-7xl` with centered margin and luxurious whitespace.

#### B. Fixed Mobile Bottom Action Bar Specification
- **Breakpoint**: Rendered on viewports `< 768px` (`md:hidden`).
- **Positioning**: `fixed bottom-0 left-0 right-0 z-50 bg-[#17324D]/95 backdrop-blur-md border-t border-[#C49A59]/30 text-white`.
- **Safe Area Inset**: `pb-[calc(0.5rem+env(safe-area-inset-bottom))]`.
- **Three Actions**:
  1. **Call Clinic**:
     - Icon: `Phone` from `lucide-react`.
     - Label: "Call Clinic".
     - Action: `<a href="tel:+919820012345">`.
     - Styling: Subtle hover glow, active touch feedback.
  2. **WhatsApp**:
     - Icon: `MessageCircle` from `lucide-react`.
     - Label: "WhatsApp".
     - Action: Direct link to WhatsApp prefilled URL.
     - Styling: Clean green/gold accent hover.
  3. **Book Appointment**:
     - Icon: `Calendar` from `lucide-react`.
     - Label: "Book Now".
     - Action: Anchor link to `/contact#appointment` or trigger inquiry drawer.
     - Styling: Distinct Champagne Gold button (`bg-[#C49A59] text-white font-medium px-4 py-2 rounded-lg`).
- **Collision Prevention Rule**:
  - The root layout or page wrapper MUST include `pb-24 md:pb-0` bottom padding.
  - This guarantees that when a user scrolls to the absolute bottom of any page, the footer copyright, disclaimer, and contact links remain 100% visible and clickable above the 64px-tall fixed bottom bar.

---

### 5. Interactive Features Specification

#### A. WhatsApp Prefilled Inquiries
- **Target Link**: `https://wa.me/919820012345?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment`
- **Required Prefilled Message**: `"Hello, I would like to enquire about a dental appointment"`
- **Implementation**: Utility function `getWhatsAppLink(customMessage?: string)` reading from `clinicConfig`.
- **Placements**:
  - Fixed Mobile Bottom Bar (Action 2)
  - Floating Desktop WhatsApp Button (bottom right on desktop screens)
  - Navbar quick button
  - Appointment CTA section button
  - Contact Us page communication card
  - Footer direct link

#### B. Direct Phone Dialing
- **Target Link**: `tel:+919820012345`
- **Display Format**: `+91 98200 12345`
- **Placements**:
  - Fixed Mobile Bottom Bar (Action 1)
  - Navbar phone button
  - Hero secondary CTA
  - Contact Us phone card
  - Footer phone link

#### C. Appointment Booking Form Specification
- **Fields**:
  1. `fullName`: Text, required. Minimum 2 characters, maximum 60 characters.
  2. `phoneNumber`: Tel/Text, required. Must match Indian 10-digit mobile pattern (`/^[6-9]\d{9}$/`).
  3. `email`: Email, optional/recommended. Standard email pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  4. `preferredTreatment`: Select dropdown, required. Prepopulated from `clinicConfig.treatments` list.
  5. `preferredDate`: Date picker, required. `min` attribute set dynamically to current date (`YYYY-MM-DD`). Rejects past dates.
  6. `preferredTime`: Select (Morning: 9:00 AM – 1:00 PM, Afternoon: 2:00 PM – 5:00 PM, Evening: 5:00 PM – 8:00 PM), optional.
  7. `message`: Textarea, optional. Maximum 500 characters.
- **Client-Side Validation**:
  - Real-time touch/blur validation and comprehensive submit validation.
  - Descriptive, accessible error messages below failing inputs.
  - ARIA attributes: `aria-invalid="true"`, `aria-describedby="[field]-error"`.
- **Demo Mode Integrity Behavior**:
  - **Banner on Form**: *"DEMONSTRATION PREVIEW: This form is running in demonstration mode. Form submissions simulate validation only and do not send real medical bookings."*
  - **On Valid Submit**:
    - Trigger state showing a **Demonstration Validation Modal / Dialog**:
      - Title: *"Demonstration Validation Passed"*
      - Message: *"All required fields (Name, Indian Mobile, Treatment, and Date) were verified successfully. In production mode, this request automatically dispatches to the clinic's CRM, WhatsApp Business API, and front-desk calendar. No real booking was placed."*
    - **CRITICAL CONSTRAINT**: Must NEVER display a message saying *"Your appointment is confirmed for [Date] with Dr. Aanya Mehta"* because no real backend booking exists.

#### D. Google Maps Embed & Navigation
- **Embed**: Responsive `<iframe>` with `loading="lazy"` pointing to Bandra West, Mumbai coordinates.
- **External Directions Button**: Links to `https://www.google.com/maps/search/?api=1&query=Lumiere+Dental+Studio+Bandra+West+Mumbai` with `target="_blank"` and `rel="noopener noreferrer"`.

---

### 6. Centralized Configuration Data Architecture

The single source of truth is located at `src/config/clinic.config.ts`. Modifying this single file must immediately rebrand the entire application:

```typescript
export interface ClinicAddress {
  line1: string;
  line2: string;
  landmark?: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullFormatted: string;
}

export interface ClinicPhone {
  display: string;    // e.g. "+91 98200 12345"
  dialable: string;   // e.g. "+919820012345"
  cleanDigits: string;// e.g. "919820012345"
}

export interface TreatmentItem {
  slug: string;
  name: string;
  category: 'Cosmetic' | 'Restorative' | 'Orthodontics' | 'Preventive';
  shortSummary: string;
  fullDescription: string;
  duration: string;
  idealFor: string[];
  procedureSteps: { step: number; title: string; description: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  heroImage: string;
  thumbnailImage: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  credentials: string[];
  experienceYears: number;
  specialties: string[];
  philosophy: string;
  bioParagraphs: string[];
  educationTimeline: { year: string; degree: string; institution: string }[];
  image: string;
  isDemoProfile: boolean;
  demoDisclaimer: string;
}

export interface ClinicConfig {
  isDemoMode: boolean;
  demoDisclaimers: {
    navbarBanner: string;
    footerNotice: string;
    formNotice: string;
    doctorNotice: string;
  };
  identity: {
    name: string;
    tagline: string;
    foundedYear: number;
    address: ClinicAddress;
    phone: ClinicPhone;
    email: string;
    whatsapp: {
      number: string;
      defaultMessage: string;
    };
    hours: {
      weekday: string;
      weekend: string;
      emergency: string;
    };
    maps: {
      embedUrl: string;
      directionsUrl: string;
      coordinates: { lat: number; lng: number };
    };
  };
  doctor: DoctorProfile;
  treatments: TreatmentItem[];
  galleryCategories: string[];
  galleryItems: {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    aspectRatio: string;
  }[];
}
```

---

### 7. Content Integrity & Ethical Guardrails

1. **Demonstration Mode**:
   - `isDemoMode: true` is hardcoded in the configuration.
   - Demo disclaimer banners are rendered on the top navbar, the footer, the doctor profile, and above the appointment form.
2. **Zero Fabrication Policy**:
   - **No fake patient testimonials**: Do not fabricate reviews with 5-star ratings from fake patients (e.g. "Priya S. says..."). Real testimonials require signed HIPAA/Indian Medical Council consent.
   - **No fake certifications**: Do not claim fake ISO, FDA, or medical board badges.
   - **No fabricated doctor credentials**: Dr. Aanya Mehta is explicitly marked as a *"Fictional Demonstration Profile created for layout demonstration"*.
   - **No fake medical guarantees**: Avoid claiming "100% pain-free permanent results" or unscientific medical claims.

---

### 8. SEO, Technical Quality Gates, & Build Contracts

1. **Next.js 15 Metadata Structure**:
   - Static metadata on root `layout.tsx`, `page.tsx`, `about/page.tsx`, `treatments/page.tsx`, `doctor/page.tsx`, `gallery/page.tsx`, `contact/page.tsx`.
   - Dynamic `generateMetadata()` on `treatments/[slug]/page.tsx` producing custom titles, descriptions, Open Graph images, and canonical URLs for every treatment.
   - Title template: `%s | Lumière Dental Studio Bandra West Mumbai`.
2. **Search Engine Discovery**:
   - `src/app/sitemap.ts`: Generates dynamic `/sitemap.xml` with priority, changeFrequency, and URLs for all 7 main routes + all treatment slugs.
   - `src/app/robots.ts`: Generates dynamic `/robots.txt` allowing indexing and referencing `/sitemap.xml`.
3. **Quality Gate Verification Commands**:
   - **Type Safety**: `npx tsc --noEmit` must exit with code 0 in strict mode.
   - **Linting**: `npm run lint` or `npx eslint .` must pass with zero errors.
   - **Build**: `npm run build` must complete successfully, producing optimized static HTML and server components.
   - **Responsive Viewport Audit**: Zero horizontal scroll (`overflow-x: hidden`) across 320px, 360px, 375px, 390px, 414px, 430px, 768px, 1024px, 1440px.

---

## Logic Chain

1. **Observation**: ORIGINAL_REQUEST.md establishes an ambitious goal: build a complete demonstration website for dental clinics across India with 7 full pages, a 10-section home page, strict 60/30/10 colors, mobile-first responsiveness, fixed bottom bar, realistic Indian clinic data, and ethical integrity.
2. **Analysis of R1 & Acceptance Criteria**: All 7 pages must exist as real Next.js App Router routes with zero 404s. The treatment details must use dynamic route `[slug]` with static parameter generation (`generateStaticParams`) so every treatment page is pre-rendered at build time.
3. **Analysis of R2 & Color Rules**: A luxury healthcare aesthetic requires avoiding the generic SaaS/crypto blue-purple gradient trope. Warm Ivory (#F7F5F0) establishes a calming, boutique spa feel; Deep Navy (#17324D) provides grounding authority and contrast; Champagne Gold (#C49A59) is reserved strictly for high-value interactions (CTAs, icons, badges) to retain elegance.
4. **Analysis of R3 & Mobile Constraints**: Dentists viewing demo links on smartphones must experience zero horizontal scroll and zero content obscuration. A fixed bottom action bar creates a native app feel, but if not coupled with `pb-24` on the page body, it will cover the footer copyright and disclaimers. Hence, the collision-free rule is mandatory.
5. **Analysis of R4 & Central Configuration**: Dental agency sales require rapid rebranding. A single, type-safe configuration file containing all clinic identity, doctor data, treatments catalog, and contact links enables instant customization without touching component code.
6. **Analysis of R5 & Demonstration Integrity**: Fabricating doctor credentials, patient testimonials, or showing a fake "appointment confirmed" message violates healthcare ethics and client trust. An explicit demonstration disclaimer combined with client-side form validation modal fulfills functional demonstration without misrepresentation.
7. **Conclusion**: The specification is complete, mathematically bounded, type-safe, and ready for immediate implementation by the development squad.

---

## Caveats
1. **Unsplash Image URLs**: External royalty-free dental photography from Unsplash must be configured in `next.config.ts` (`images.remotePatterns` for `images.unsplash.com`).
2. **Tailwind CSS v4 Integration**: In Tailwind CSS v4, custom theme colors can be configured via `@theme` directives in `globals.css` or CSS variables, ensuring `#F7F5F0`, `#17324D`, `#C49A59` are accessible as first-class utility classes (`bg-ivory`, `text-navy`, `bg-gold`, etc.).
3. **Real Backend Integration**: The appointment form is client-side validated with a demonstration modal. If a real backend (e.g., Supabase, Resend, or WhatsApp Business Webhook) is later connected, the form can post directly to an API route (`/api/appointment`).

---

## Conclusion
The Lumière Dental Studio specification is comprehensively mined, categorized, and documented. Every route, section, color rule, mobile viewport constraint, interactive link schema, configuration interface, and ethical requirement has been mapped to concrete technical deliverables. The orchestrator and development agents have all necessary contracts to begin project initialization and feature implementation.

---

## Verification Method

1. **Specification Verification**:
   - Verify all 7 pages are mapped to corresponding App Router paths:
     - `/` -> `src/app/page.tsx`
     - `/about` -> `src/app/about/page.tsx`
     - `/treatments` -> `src/app/treatments/page.tsx`
     - `/treatments/[slug]` -> `src/app/treatments/[slug]/page.tsx`
     - `/doctor` -> `src/app/doctor/page.tsx`
     - `/gallery` -> `src/app/gallery/page.tsx`
     - `/contact` -> `src/app/contact/page.tsx`
   - Verify the 10 Home sections correspond to required component definitions.
   - Verify color tokens match exact hex values (`#F7F5F0`, `#17324D`, `#C49A59`, `#243244`, `#687789`, `#E7E1D7`, `#FFFFFF`, `#DDE9E2`).
   - Verify WhatsApp URL conforms to: `https://wa.me/919820012345?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20a%20dental%20appointment`.
   - Verify fixed bottom action bar collision prevention (`pb-24` spacing).

2. **Codebase Quality Commands**:
   - `npx tsc --noEmit`
   - `npm run lint`
   - `npm run build`
