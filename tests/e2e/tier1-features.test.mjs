/**
 * Tier 1: Feature & Contract Coverage Test Suite
 * Tests all required core features, page structures, color tokens, and clinic configurations.
 */

import { TestSuite, assert } from './runner.mjs';
import {
  fileExists,
  readSourceFile,
  inspectCssThemeTokens,
  inspectRootLayout,
  inspectClinicConfig,
} from './utils/static-ast.mjs';
import {
  buildWhatsAppUrl,
  buildTelLink,
  validateIndianPhone,
  validateAppointmentDate,
} from './utils/validators.mjs';

export function createTier1Suite() {
  const suite = new TestSuite('Tier 1: Feature & Contract Coverage', { tier: 1 });

  // 1. Color System Tokens (Milestone 1)
  suite.test('Theme Tokens: 60/30/10 colour system defined in globals.css', () => {
    const tokens = inspectCssThemeTokens();
    assert.ok(tokens.raw.length > 0, 'src/app/globals.css must exist and not be empty');
    assert.ok(tokens.hasIvory, '60% Warm Ivory (#F7F5F0) must be defined as background/surface token');
    assert.ok(tokens.hasNavy, '30% Deep Navy (#17324D) must be defined as primary brand/secondary token');
    assert.ok(tokens.hasGold, '10% Champagne Gold (#C49A59) must be defined as accent/CTA token');
    
    // Check supporting colors
    assert.ok(tokens.raw.includes('#243244'), 'Charcoal slate (#243244) main text token defined');
    assert.ok(tokens.raw.includes('#687789'), 'Muted slate (#687789) secondary text token defined');
    assert.ok(tokens.raw.includes('#E7E1D7'), 'Border stone (#E7E1D7) divider token defined');
  }, { milestone: 'M1', featureId: 2 });

  // 2. Centralized Clinic Configuration (Milestone 1)
  suite.test('Clinic Config: Single source of truth structure and Bandra West identity', () => {
    const config = inspectClinicConfig();
    assert.ok(config.raw.length > 0, 'src/config/clinic.config.ts must exist and export clinicConfig');
    assert.ok(config.hasIdentity, 'Clinic identity with Lumière Dental Studio must be defined');
    assert.ok(config.hasBandraAddress, 'Address must specify Bandra West, Mumbai, 400050');
    assert.ok(config.hasDoctorMehta, 'Doctor profile must define Dr. Aanya Mehta');
    assert.ok(config.hasDemoDisclaimers, 'demoDisclaimers object must be present with required notices');
  }, { milestone: 'M1', featureId: 3 });

  // 3. Centralized Treatments Catalog (Milestone 1)
  suite.test('Clinic Config: Catalog contains 6 comprehensive treatment definitions', () => {
    const config = inspectClinicConfig();
    assert.greaterThanOrEqual(config.treatmentCount, 6, `Expected at least 6 treatments, found ${config.treatmentCount}`);
    
    // Slugs must include core treatment categories
    const raw = config.raw;
    assert.ok(raw.includes('porcelain-veneers'), 'Porcelain veneers treatment slug defined');
    assert.ok(raw.includes('dental-implants'), 'Dental implants treatment slug defined');
    assert.ok(raw.includes('invisible-aligners'), 'Invisible aligners treatment slug defined');
    assert.ok(raw.includes('laser-teeth-whitening') || raw.includes('whitening'), 'Teeth whitening treatment slug defined');
  }, { milestone: 'M1', featureId: 3 });

  // 4. Direct Tel Link Format (Milestone 1 / Milestone 4)
  suite.test('Contact Links: Direct tel: dialer link matches +919820012345 format', () => {
    const config = inspectClinicConfig();
    assert.ok(config.phoneDialable, 'phone.dialable must be defined in clinic.config.ts');
    assert.equal(config.phoneDialable, '+919820012345', 'Dialable number must be +919820012345');
    
    const telLink = buildTelLink(config.phoneDialable);
    assert.equal(telLink, 'tel:+919820012345', 'tel: URI format must strictly match tel:+919820012345');
  }, { milestone: 'M1', featureId: 28 });

  // 5. WhatsApp Prefilled Message Format (Milestone 1 / Milestone 4)
  suite.test('Contact Links: WhatsApp universal link includes prefilled inquiry text', () => {
    const config = inspectClinicConfig();
    assert.ok(config.whatsappPrefilledUrl, 'whatsapp.prefilledUrl must be defined in clinic.config.ts');
    
    const expectedUrl = buildWhatsAppUrl('919820012345', 'Hello, I would like to enquire about a dental appointment');
    assert.includes(config.whatsappPrefilledUrl, 'https://wa.me/919820012345', 'WhatsApp URL must target wa.me with clean digits');
    assert.includes(config.whatsappPrefilledUrl, 'Hello', 'WhatsApp URL text must contain encoded prefilled greeting');
    assert.equal(config.whatsappPrefilledUrl, expectedUrl, 'WhatsApp prefilled URL must match canonical encoding');
  }, { milestone: 'M1', featureId: 28 });

  // 6. Root Layout & Mobile Bottom Bar Collision Prevention (Milestone 1)
  suite.test('Layout Architecture: Root layout container applies pb-24 md:pb-0 padding', () => {
    const layout = inspectRootLayout();
    assert.ok(layout.hasPb24, 'Root layout must apply pb-24 to prevent fixed mobile bottom bar collisions');
    assert.ok(layout.hasMdPb0, 'Root layout must reset to md:pb-0 on desktop viewports');
    assert.ok(layout.hasMetadataExport, 'Root layout must export Next.js Metadata');
    assert.ok(layout.hasViewportExport, 'Root layout must export Next.js Viewport configuration');
  }, { milestone: 'M1', featureId: 20 });

  // 7. SEO Sitemap & Robots Configuration (Milestone 1)
  suite.test('SEO Architecture: Dynamic sitemap.ts and robots.ts exist and conform to Next.js 15', () => {
    assert.ok(fileExists('src/app/sitemap.ts'), 'src/app/sitemap.ts must exist');
    assert.ok(fileExists('src/app/robots.ts'), 'src/app/robots.ts must exist');

    const sitemap = readSourceFile('src/app/sitemap.ts');
    assert.includes(sitemap, 'export default', 'sitemap.ts must export default function');
    assert.includes(sitemap, 'MetadataRoute.Sitemap', 'sitemap.ts must return Next.js MetadataRoute.Sitemap');

    const robots = readSourceFile('src/app/robots.ts');
    assert.includes(robots, 'export default', 'robots.ts must export default function');
    assert.includes(robots, 'sitemap', 'robots.ts must specify sitemap URL');
  }, { milestone: 'M1', featureId: 4 });

  // 8. Fixed Mobile Bottom Bar Actions (Milestone 2)
  suite.test('Mobile UX: Fixed bottom action bar implements Call, WhatsApp, and Appointment actions', () => {
    const barPath = 'src/components/layout/MobileBottomBar.tsx';
    if (!fileExists(barPath)) {
      assert.pendingMilestone('M2', `${barPath} scheduled for Milestone 2`);
    }

    const content = readSourceFile(barPath);
    assert.includes(content, 'tel:', 'Bottom bar must include tel: call action');
    assert.includes(content, 'wa.me', 'Bottom bar must include WhatsApp link');
    assert.includes(content, 'appointment', 'Bottom bar must include Book Appointment action');
    assert.includes(content, 'fixed bottom-0', 'Bottom bar must be fixed at screen bottom');
  }, { milestone: 'M2', featureId: 7 });

  // 9. Sticky Premium Navbar (Milestone 2)
  suite.test('Navigation: Premium Sticky Navbar includes logo, navigation links, and demo banner', () => {
    const navPath = 'src/components/layout/Navbar.tsx';
    if (!fileExists(navPath)) {
      assert.pendingMilestone('M2', `${navPath} scheduled for Milestone 2`);
    }

    const content = readSourceFile(navPath);
    assert.includes(content, 'Lumière', 'Navbar must display brand identity');
    assert.includes(content, 'tel:', 'Navbar must provide quick phone access');
    assert.includes(content, 'sticky', 'Navbar must be sticky/fixed at top');
  }, { milestone: 'M2', featureId: 5 });

  // 10. Home Page 10 Sections Presence (Milestone 3)
  suite.test('Home Page: 10 structured sections implemented in page.tsx', () => {
    const homePath = 'src/app/page.tsx';
    assert.ok(fileExists(homePath), 'src/app/page.tsx must exist');
    const content = readSourceFile(homePath);

    // Section markers or component imports
    const hasHero = /Hero/i.test(content);
    const hasTrust = /Trust|Pillars/i.test(content);
    const hasTreatments = /Treatment/i.test(content);
    const hasWhyChooseUs = /WhyChooseUs|Why Choose/i.test(content);
    const hasDoctor = /Doctor|Aanya/i.test(content);
    const hasGallery = /Gallery/i.test(content);
    const hasCTA = /Appointment|CTA|Book/i.test(content);
    const hasLocation = /Location|Map|Bandra/i.test(content);

    // During M1, home page is scaffolded. In M3, all 10 sections are fully wired.
    if (!hasWhyChooseUs || !hasGallery) {
      assert.pendingMilestone('M3', 'Home page 10 sections assembly scheduled for Milestone 3');
    }

    assert.ok(hasHero, 'Hero section present');
    assert.ok(hasTrust, 'Trust introduction section present');
    assert.ok(hasTreatments, 'Treatments preview present');
    assert.ok(hasWhyChooseUs, 'Why choose us section present');
    assert.ok(hasDoctor, 'Doctor profile spotlight present');
    assert.ok(hasGallery, 'Gallery preview present');
    assert.ok(hasCTA, 'Appointment CTA section present');
    assert.ok(hasLocation, 'Location & hours section present');
  }, { milestone: 'M3', featureId: 20 });

  // 11. All 7 Page Routes Existence and Structure (Milestone 4)
  suite.test('Route Structure: All 7 required pages exist and adhere to App Router conventions', () => {
    const requiredRoutes = [
      { route: '/', path: 'src/app/page.tsx', milestone: 'M1' },
      { route: '/about', path: 'src/app/about/page.tsx', milestone: 'M4' },
      { route: '/treatments', path: 'src/app/treatments/page.tsx', milestone: 'M4' },
      { route: '/treatments/[slug]', path: 'src/app/treatments/[slug]/page.tsx', milestone: 'M4' },
      { route: '/doctor', path: 'src/app/doctor/page.tsx', milestone: 'M4' },
      { route: '/gallery', path: 'src/app/gallery/page.tsx', milestone: 'M4' },
      { route: '/contact', path: 'src/app/contact/page.tsx', milestone: 'M4' },
    ];

    const missingM4Routes = requiredRoutes.filter(r => r.milestone === 'M4' && !fileExists(r.path));
    if (missingM4Routes.length > 0) {
      assert.pendingMilestone('M4', `Secondary pages [${missingM4Routes.map(r => r.route).join(', ')}] scheduled for Milestone 4`);
    }

    for (const r of requiredRoutes) {
      assert.ok(fileExists(r.path), `Route ${r.route} (${r.path}) must exist`);
      const fileContent = readSourceFile(r.path);
      assert.includes(fileContent, 'export default', `${r.path} must export a default page component`);
    }
  }, { milestone: 'M4', featureId: 1 });

  // 12. Appointment Form Fields Presence (Milestone 4)
  suite.test('Form Architecture: Appointment inquiry form contains all required fields', () => {
    const formPath = 'src/components/ui/ContactForm.tsx';
    if (!fileExists(formPath)) {
      assert.pendingMilestone('M4', `${formPath} scheduled for Milestone 4`);
    }

    const content = readSourceFile(formPath);
    assert.includes(content, 'fullName', 'Form must include fullName field');
    assert.includes(content, 'phoneNumber', 'Form must include phoneNumber field');
    assert.includes(content, 'preferredTreatment', 'Form must include preferredTreatment field');
    assert.includes(content, 'preferredDate', 'Form must include preferredDate field');
    assert.includes(content, 'message', 'Form must include message field');
  }, { milestone: 'M4', featureId: 27 });

  return suite;
}
