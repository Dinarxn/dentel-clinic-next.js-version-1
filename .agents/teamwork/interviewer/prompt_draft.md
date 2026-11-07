Design and build a complete, production-quality, visually stunning premium dental clinic website for Lumière Dental Studio, acting as a world-class senior UI/UX designer, creative director, healthcare website specialist, and senior full-stack Next.js developer, to serve as a live demonstration website for selling professional website development services to dental clinics across India.

Working directory: c:\Users\Admin\Desktop\all project\dentel website next.js
Integrity mode: demo
The team must NOT: copy code from existing open-source projects for core logic, run external scripts or delegate execution to other tools

## Requirements

### R1. Website Architecture and Multi-Page Structure
Build a complete, production-quality multi-page website using Next.js 15 App Router, React 19, TypeScript with strict mode, Tailwind CSS v4, Lucide React icons, and semantic HTML with no unnecessary dependencies. Implement all 7 pages with consistent header navigation and footer:
1. Home (featuring 10 sections: Premium Navbar, Hero, Trust Introduction, Treatments, Why Choose Us, Doctor Profile, Clinic Gallery, Appointment CTA, Location, and Footer)
2. About Us
3. Treatments
4. Individual Treatment Details
5. Our Doctor
6. Gallery
7. Contact Us

### R2. Premium Visual Design and Strict 60/30/10 Colour System
Create an elegant, high-end healthcare brand experience following strict 60/30/10 colour distribution:
- 60% Primary Colour: Warm Ivory (#F7F5F0) for main website background, hero background, large content sections, treatment backgrounds, and whitespace.
- 30% Secondary Colour: Deep Navy (#17324D) for header and footer, main headings, important content panels, navigation elements, and premium dark sections.
- 10% Accent Colour: Champagne Gold (#C49A59) for primary CTA buttons, small decorative details, icons, highlights, and active navigation indicators.
- Additional palette: Main text (#243244), secondary text (#687789), border (#E7E1D7), white (#FFFFFF), soft green (#DDE9E2).
- Typography & Aesthetics: Elegant serif for major headlines, modern sans-serif for body text, strong visual hierarchy, spacious editorial layout, subtle shadows, fine borders, and smooth transitions. Avoid generic AI dashboard styles, excessive cards, cheap gradients, and unnecessary carousels.

### R3. Mobile-First Experience and Fixed Action Bar
Design mobile-first so the website immediately impresses a dentist when opened on a smartphone, tested across 320px, 360px, 375px, 390px, 414px, 430px, 768px, 1024px, and 1440px viewports:
- Zero horizontal scrolling, no overlapping text, no cut-off images, and comfortable touch targets.
- Clean mobile hamburger navigation with a slide-out or dropdown menu.
- Fixed mobile bottom action bar containing Call Clinic, WhatsApp, and Appointment actions, configured so it never obscures page content or the footer.

### R4. Clinic Contact, Lead Capture, and Configuration
- Curate high-resolution royalty-free dental and clinical photography (e.g. from Unsplash) with Next.js image optimization.
- Store realistic Indian clinic details (e.g. Bandra West, Mumbai address, contact numbers, hours, map location, Dr. Aanya Mehta profile) in a central configuration data file for easy client rebranding.
- WhatsApp appointment inquiries with prefilled message ("Hello, I would like to enquire about a dental appointment") using the configured clinic number.
- Direct phone call links via configured `tel:` action.
- Appointment inquiry form collecting patient name, phone number, preferred treatment, preferred date, and message with input validation, clearly stating demonstration status unless a real backend is attached.
- Fully working internal navigation and configurable Google Maps link/embed.

### R5. Content Integrity, SEO, and Performance
- All demo identity information (such as Dr. Aanya Mehta and qualifications) must be realistic but clearly marked as fictional demonstration placeholders requiring clinic verification. Strictly no fabricated medical credentials, patient reviews, clinical results, or certifications.
- Implement comprehensive SEO metadata (page titles, meta descriptions, Open Graph tags, semantic heading structure, image alt text, sitemap, robots configuration).
- Ensure fast mobile loading, accessibility, keyboard navigation, clean code, and solid Core Web Vitals.

## Acceptance Criteria

### Build and Code Quality
- [ ] `next build` completes with zero TypeScript errors in strict mode and zero ESLint errors.
- [ ] Reusable components are implemented: Navbar, MobileNavigation, HeroSection, SectionHeading, TreatmentCard, DoctorProfile, GalleryGrid, AppointmentCTA, ContactForm, FloatingWhatsApp, MobileBottomBar, and Footer.
- [ ] Centralized configuration data files contain clinic identity, treatment catalog, doctor profile, and contact details.
- [ ] All 7 pages (Home, About Us, Treatments, Individual Treatment Details, Our Doctor, Gallery, Contact Us) exist and all internal navigation links resolve without 404s.

### Visual Design and Mobile Responsiveness
- [ ] Strict 60/30/10 colour distribution (#F7F5F0 Warm Ivory, #17324D Deep Navy, #C49A59 Champagne Gold) is maintained across all pages.
- [ ] Mobile viewports (320px, 360px, 375px, 390px, 414px, 430px) render with zero horizontal overflow and comfortable touch targets.
- [ ] Fixed mobile bottom action bar with Call Clinic, WhatsApp, and Appointment is visible on mobile and does not obscure page content or footer.

### Functionality & Demonstration Integrity
- [ ] WhatsApp button initiates a link with the prefilled inquiry text ("Hello, I would like to enquire about a dental appointment").
- [ ] Phone call buttons trigger the configured `tel:` action.
- [ ] Appointment inquiry form validates input fields and clearly displays the demonstration mode disclaimer.
- [ ] Fictional credentials and doctor profiles are clearly marked as demonstration placeholders.
