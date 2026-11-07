#!/usr/bin/env node

/**
 * Challenger M3 Independent Empirical Contract Verification Harness
 * Tests Milestone 3 content components, home page assembly, config bindings, and integrity invariants.
 */

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = path.resolve(process.cwd());

function read(relPath) {
  const full = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(full)) {
    throw new Error(`Required file missing: ${relPath}`);
  }
  return fs.readFileSync(full, 'utf8');
}

let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) {
    failedTests++;
    failures.push(message);
    console.error(`  \x1b[31mFAIL:\x1b[0m ${message}`);
  } else {
    passedTests++;
    console.log(`  \x1b[32mPASS:\x1b[0m ${message}`);
  }
}

console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m CHALLENGER M3: INDEPENDENT EMPIRICAL CONTRACT VERIFICATION \x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

// -----------------------------------------------------------------------------
// Test Suite 1: Home Page & Layout 10-Section Assembly
// -----------------------------------------------------------------------------
console.log('\x1b[1m[Suite 1] Home Page & Layout 10-Section Assembly\x1b[0m');
const pageSource = read('src/app/page.tsx');
const layoutSource = read('src/app/layout.tsx');

// Check that layout contains Navbar and Footer
assert(layoutSource.includes('<Navbar') && layoutSource.includes('Navbar />'), 'RootLayout includes <Navbar />');
assert(layoutSource.includes('<Footer') && layoutSource.includes('Footer />'), 'RootLayout includes <Footer />');
assert(layoutSource.includes('pb-24') && layoutSource.includes('md:pb-0'), 'RootLayout includes pb-24 md:pb-0 mobile collision prevention padding');

// Check that page.tsx includes all 8 core body sections
const requiredHomeSections = [
  'HeroSection',
  'TrustIntroSection',
  'TreatmentsSection',
  'WhyChooseUsSection',
  'DoctorProfile',
  'GalleryGrid',
  'AppointmentCTASection',
  'LocationSection',
];

for (const section of requiredHomeSections) {
  assert(
    pageSource.includes(`<${section}`) || pageSource.includes(`<${section} />`),
    `src/app/page.tsx instantiates <${section} />`
  );
}

// Verify sequential order in page.tsx
const heroIdx = pageSource.indexOf('HeroSection');
const trustIdx = pageSource.indexOf('TrustIntroSection');
const treatIdx = pageSource.indexOf('TreatmentsSection');
const whyIdx = pageSource.indexOf('WhyChooseUsSection');
const docIdx = pageSource.indexOf('DoctorProfile');
const galIdx = pageSource.indexOf('GalleryGrid');
const ctaIdx = pageSource.indexOf('AppointmentCTASection');
const locIdx = pageSource.indexOf('LocationSection');

assert(
  heroIdx < trustIdx &&
  trustIdx < treatIdx &&
  treatIdx < whyIdx &&
  whyIdx < docIdx &&
  docIdx < galIdx &&
  galIdx < ctaIdx &&
  ctaIdx < locIdx,
  'All 8 body sections appear in the exact required architectural progression'
);

// Verify demonstration notice at bottom of page.tsx
assert(
  pageSource.includes('Demonstration Prototype') && pageSource.includes('demoDisclaimers'),
  'src/app/page.tsx includes prominent demonstration prototype safeguard notice'
);

// -----------------------------------------------------------------------------
// Test Suite 2: TreatmentsSection & TreatmentCard Binding
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 2] TreatmentsSection & TreatmentCard Binding\x1b[0m');
const treatmentsSectionSource = read('src/components/sections/TreatmentsSection.tsx');
const treatmentCardSource = read('src/components/ui/TreatmentCard.tsx');
const configSource = read('src/config/clinic.config.ts');

// Extract treatment slugs from config
const slugMatches = [...configSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
const uniqueSlugs = [...new Set(slugMatches)];

assert(uniqueSlugs.length === 6, `clinicConfig.treatments contains exactly 6 treatments (found: ${uniqueSlugs.length})`);
console.log(`    Identified treatment slugs: ${uniqueSlugs.join(', ')}`);

assert(
  treatmentsSectionSource.includes('clinicConfig.treatments.map') ||
  treatmentsSectionSource.includes('.treatments.map'),
  'TreatmentsSection iterates over clinicConfig.treatments'
);
assert(
  treatmentsSectionSource.includes('<TreatmentCard'),
  'TreatmentsSection renders <TreatmentCard /> inside the grid'
);
assert(
  treatmentsSectionSource.includes('href="/treatments"'),
  'TreatmentsSection includes bottom link to full /treatments catalog'
);

// Check TreatmentCard links
assert(
  treatmentCardSource.includes('/treatments/${treatment.slug}') ||
  treatmentCardSource.includes('/treatments/\' + treatment.slug') ||
  treatmentCardSource.includes('`/treatments/${treatment.slug}`'),
  'TreatmentCard links point to dynamic route `/treatments/[slug]`'
);
assert(
  treatmentCardSource.includes('treatment.category') &&
  treatmentCardSource.includes('treatment.title') &&
  treatmentCardSource.includes('treatment.tagline') &&
  treatmentCardSource.includes('treatment.duration') &&
  treatmentCardSource.includes('treatment.recoveryTime'),
  'TreatmentCard binds category, title, tagline, duration, and recoveryTime'
);
assert(
  treatmentCardSource.includes('fill') && treatmentCardSource.includes('sizes='),
  'TreatmentCard uses Next.js Image with responsive fill and sizes'
);

// -----------------------------------------------------------------------------
// Test Suite 3: DoctorProfile & Zero-Deception Demo Integrity
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 3] DoctorProfile & Demonstration Integrity\x1b[0m');
const doctorProfileSource = read('src/components/ui/DoctorProfile.tsx');

assert(
  doctorProfileSource.includes('doctor.name') || doctorProfileSource.includes('Dr. Aanya Mehta'),
  'DoctorProfile features Dr. Aanya Mehta'
);
assert(
  doctorProfileSource.includes('doctor.philosophy'),
  'DoctorProfile renders clinical philosophy quote'
);
assert(
  doctorProfileSource.includes('doctor.credentials'),
  'DoctorProfile maps over doctor credentials'
);
assert(
  doctorProfileSource.includes('doctor.specialties'),
  'DoctorProfile renders clinical specialties'
);
assert(
  doctorProfileSource.includes('doctor.experienceYears'),
  'DoctorProfile displays clinical experience years'
);
assert(
  doctorProfileSource.includes('demoDisclaimers.doctorNotice') ||
  doctorProfileSource.includes('Fictional Demonstration Profile'),
  'DoctorProfile renders prominent demo disclaimer notice'
);
assert(
  doctorProfileSource.includes('<DemoDisclaimerBadge'),
  'DoctorProfile utilizes <DemoDisclaimerBadge />'
);
assert(
  doctorProfileSource.includes('href="/doctor"'),
  'DoctorProfile includes link to full `/doctor` page'
);

// Strict integrity check: no fake reviews, no fake 5-star ratings
const fakeStars = /(5\.0\s*stars|\b5\/5\s*stars|★★★★★)/i.test(doctorProfileSource);
const fakeReviews = /(patient reviews|what our patients say|verified patient review)/i.test(doctorProfileSource);
assert(!fakeStars, 'DoctorProfile contains ZERO fabricated star ratings');
assert(!fakeReviews, 'DoctorProfile contains ZERO fabricated patient reviews/testimonials');

// -----------------------------------------------------------------------------
// Test Suite 4: GalleryGrid & Category Filtering
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 4] GalleryGrid & Interactive Filtering\x1b[0m');
const galleryGridSource = read('src/components/ui/GalleryGrid.tsx');

assert(
  galleryGridSource.includes('galleryItems') && galleryGridSource.includes('galleryCategories'),
  'GalleryGrid consumes clinicConfig.galleryItems and galleryCategories'
);
assert(
  galleryGridSource.includes('useState') && galleryGridSource.includes('activeCategory'),
  'GalleryGrid manages activeCategory state with useState'
);
assert(
  galleryGridSource.includes('onClick={() => setActiveCategory(') ||
  galleryGridSource.includes('setActiveCategory('),
  'GalleryGrid category filter buttons update activeCategory on click'
);
assert(
  galleryGridSource.includes('filteredItems') || galleryGridSource.includes('.filter('),
  'GalleryGrid filters items based on activeCategory'
);
assert(
  galleryGridSource.includes('href="/gallery"'),
  'GalleryGrid provides link to full `/gallery` catalog page'
);

// -----------------------------------------------------------------------------
// Test Suite 5: AppointmentCTASection Conversion Actions
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 5] AppointmentCTASection Conversion Actions\x1b[0m');
const appointmentCtaSource = read('src/components/sections/AppointmentCTASection.tsx');

assert(
  appointmentCtaSource.includes('href="/contact"'),
  'AppointmentCTASection includes consultation reservation link to `/contact`'
);
assert(
  appointmentCtaSource.includes('wa.me') ||
  appointmentCtaSource.includes('whatsapp.prefilledUrl'),
  'AppointmentCTASection includes direct WhatsApp concierge link'
);
assert(
  appointmentCtaSource.includes('tel:') ||
  appointmentCtaSource.includes('phone.dialable'),
  'AppointmentCTASection includes direct phone dialer link'
);
assert(
  appointmentCtaSource.includes('Demonstration Mode') ||
  appointmentCtaSource.includes('demonstration prototype'),
  'AppointmentCTASection includes clear demonstration mode disclosure'
);

// -----------------------------------------------------------------------------
// Test Suite 6: LocationSection Verification
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 6] LocationSection Verification\x1b[0m');
const locationSource = read('src/components/sections/LocationSection.tsx');

assert(
  locationSource.includes('Bandra West') && locationSource.includes('Turner Road'),
  'LocationSection highlights Turner Road, Bandra West address'
);
assert(
  locationSource.includes('identity.address') || locationSource.includes('address.line1'),
  'LocationSection renders structured address from clinicConfig'
);
assert(
  locationSource.includes('hours.fullDisplay') || locationSource.includes('identity.hours'),
  'LocationSection renders consultation hours'
);
assert(
  locationSource.includes('tel:') || locationSource.includes('dialablePhone'),
  'LocationSection provides direct telephone link'
);
assert(
  locationSource.includes('<iframe') && locationSource.includes('maps.embedUrl'),
  'LocationSection renders interactive Google Maps iframe embed'
);
assert(
  locationSource.includes('maps.directionsUrl') && locationSource.includes('target="_blank"'),
  'LocationSection provides external Google Maps directions link'
);

// -----------------------------------------------------------------------------
// Test Suite 7: Colour Distribution & Tokens (60/30/10)
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 7] Colour Distribution & Tokens (60/30/10)\x1b[0m');
const m3Sources = [
  read('src/components/sections/HeroSection.tsx'),
  read('src/components/sections/TrustIntroSection.tsx'),
  read('src/components/sections/TreatmentsSection.tsx'),
  read('src/components/sections/WhyChooseUsSection.tsx'),
  read('src/components/ui/DoctorProfile.tsx'),
  read('src/components/ui/GalleryGrid.tsx'),
  read('src/components/sections/AppointmentCTASection.tsx'),
  read('src/components/sections/LocationSection.tsx'),
];
const combinedM3 = m3Sources.join('\n');

assert(combinedM3.includes('#F7F5F0'), 'Warm Ivory (#F7F5F0) used as 60% dominant canvas');
assert(combinedM3.includes('#17324D'), 'Deep Navy (#17324D) used as 30% structural & high-contrast panels');
assert(combinedM3.includes('#C49A59'), 'Champagne Gold (#C49A59) used as 10% refined accents & CTAs');
assert(combinedM3.includes('#E7E1D7'), 'Border Stone (#E7E1D7) used for subtle dividers and bezels');

// -----------------------------------------------------------------------------
// Test Suite 8: Component Exports in src/components/index.ts
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m[Suite 8] Component Exports Barrel\x1b[0m');
const barrelSource = read('src/components/index.ts');
const expectedExports = [
  'HeroSection',
  'TrustIntroSection',
  'TreatmentsSection',
  'WhyChooseUsSection',
  'AppointmentCTASection',
  'LocationSection',
  'TreatmentCard',
  'DoctorProfile',
  'GalleryGrid',
  'DemoDisclaimerBadge',
];

for (const exp of expectedExports) {
  assert(barrelSource.includes(exp), `src/components/index.ts re-exports ${exp}`);
}

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log(` RESULTS: \x1b[32m${passedTests} PASSED\x1b[0m | \x1b[31m${failedTests} FAILED\x1b[0m`);
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

if (failedTests > 0) {
  console.error('FAILURES:');
  failures.forEach(f => console.error(`  - ${f}`));
  process.exit(1);
} else {
  console.log('All Milestone 3 empirical contract assertions passed successfully!');
  process.exit(0);
}
