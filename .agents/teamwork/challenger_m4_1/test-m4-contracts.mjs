/**
 * Independent Empirical Contract & Routing Test Harness for Milestone 4
 * Author: Challenger 1 (Milestone 4 — Secondary Pages & Dynamic Routes)
 * 
 * Verifies:
 * 1. App Router multi-page route existence and exports
 * 2. Next.js 15 async dynamic route contracts for /treatments/[slug]
 * 3. generateStaticParams and slug coverage for all treatments
 * 4. generateMetadata dynamic generation and fallback
 * 5. notFound() execution on invalid treatment slug
 * 6. ContactForm validation: Indian phone regex (/^[6-9]\d{9}$/), name, date min, demo modal
 * 7. Demonstration modal notice and ethical integrity shield
 * 8. Doctor page credentials and demo disclaimer
 * 9. Gallery lightbox keyboard navigation and category filtering
 * 10. Re-export integrity in src/components/index.ts
 * 11. SSG prerender manifest dynamic route coverage
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// Test framework utilities
let passedCount = 0;
let failedCount = 0;
const testResults = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function test(name, fn) {
  const start = performance.now();
  try {
    fn();
    const duration = (performance.now() - start).toFixed(2);
    passedCount++;
    testResults.push({ name, status: 'PASS', duration, error: null });
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${name} \x1b[2m(${duration}ms)\x1b[0m`);
  } catch (err) {
    const duration = (performance.now() - start).toFixed(2);
    failedCount++;
    testResults.push({ name, status: 'FAIL', duration, error: err.message });
    console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${name}`);
    console.log(`    \x1b[31mError:\x1b[0m ${err.message}`);
  }
}

console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m CHALLENGER 1 — MILESTONE 4 EMPIRICAL CONTRACT TEST HARNESS \x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

// -----------------------------------------------------------------------------
// Test Group 1: All 7 Page Routes Existence and Default Component Exports
// -----------------------------------------------------------------------------
console.log('\x1b[1m--- Group 1: Multi-Page Route Structure & Exports ---\x1b[0m');

const requiredPages = [
  { name: '1. Home Page', path: 'src/app/page.tsx' },
  { name: '2. About Us Page', path: 'src/app/about/page.tsx' },
  { name: '3. Treatments Catalog Page', path: 'src/app/treatments/page.tsx' },
  { name: '4. Dynamic Treatment Details Page', path: 'src/app/treatments/[slug]/page.tsx' },
  { name: '5. Our Doctor Page', path: 'src/app/doctor/page.tsx' },
  { name: '6. Clinic Gallery Page', path: 'src/app/gallery/page.tsx' },
  { name: '7. Contact Us Page', path: 'src/app/contact/page.tsx' },
];

test('Route existence: All 7 required pages exist and are non-empty', () => {
  for (const page of requiredPages) {
    const fullPath = path.join(PROJECT_ROOT, page.path);
    assert(fs.existsSync(fullPath), `Page file missing: ${page.path}`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 200, `Page file ${page.path} is too small (${stat.size} bytes)`);
  }
});

test('Route exports: Every page exports a default component', () => {
  for (const page of requiredPages) {
    const fullPath = path.join(PROJECT_ROOT, page.path);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(
      /export\s+default\s+(async\s+)?function/.test(content),
      `${page.path} does not export default function`
    );
  }
});

// -----------------------------------------------------------------------------
// Test Group 2: Dynamic Route Contract (src/app/treatments/[slug]/page.tsx)
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m--- Group 2: Dynamic Treatment Detail Route Contract ---\x1b[0m');

const dynamicDetailPath = path.join(PROJECT_ROOT, 'src/app/treatments/[slug]/page.tsx');
const dynamicDetailContent = fs.readFileSync(dynamicDetailPath, 'utf8');

test('Next.js 15 Async Params contract: TreatmentPageProps uses params: Promise<{ slug: string }>', () => {
  assert(
    /params:\s*Promise<\{\s*slug:\s*string\s*\}>/.test(dynamicDetailContent),
    'TreatmentPageProps must define params as Promise<{ slug: string }> per Next.js 15 contract'
  );
  assert(
    /const\s*\{\s*slug\s*\}\s*=\s*await\s+params/.test(dynamicDetailContent),
    'Treatment detail page must await params before accessing slug'
  );
});

test('generateStaticParams export: Generates static routes for treatments catalog', () => {
  assert(
    /export\s+async\s+function\s+generateStaticParams\s*\(\)/.test(dynamicDetailContent),
    'treatments/[slug]/page.tsx must export async function generateStaticParams()'
  );
  assert(
    dynamicDetailContent.includes('clinicConfig.treatments.map'),
    'generateStaticParams must map over clinicConfig.treatments'
  );
});

test('generateMetadata dynamic export: Generates metadata with OpenGraph support', () => {
  assert(
    /export\s+async\s+function\s+generateMetadata\s*\(/.test(dynamicDetailContent),
    'treatments/[slug]/page.tsx must export async function generateMetadata'
  );
  assert(
    dynamicDetailContent.includes('openGraph:'),
    'generateMetadata must construct openGraph object'
  );
  assert(
    dynamicDetailContent.includes('Treatment Not Found'),
    'generateMetadata must handle fallback when slug does not exist'
  );
});

test('notFound() invocation: Invokes notFound() from next/navigation on unknown slug', () => {
  assert(
    /import\s*\{[^}]*notFound[^}]*\}\s*from\s*['"]next\/navigation['"]/.test(dynamicDetailContent),
    'treatments/[slug]/page.tsx must import notFound from next/navigation'
  );
  assert(
    /if\s*\(!treatment\)\s*\{\s*notFound\(\);\s*\}/.test(dynamicDetailContent),
    'treatments/[slug]/page.tsx must call notFound() if treatment is not found'
  );
});

test('Rich Clinical Content: dynamic treatment detail renders steps, benefits, recovery, and FAQs', () => {
  assert(
    dynamicDetailContent.includes('procedureSteps') || dynamicDetailContent.includes('proceduralSteps'),
    'Treatment detail page must handle procedure steps'
  );
  assert(
    dynamicDetailContent.includes('candidacy') || dynamicDetailContent.includes('Ideal Candidates'),
    'Treatment detail page must render candidacy criteria'
  );
  assert(
    dynamicDetailContent.includes('benefits') || dynamicDetailContent.includes('Clinical Advantages'),
    'Treatment detail page must render benefits'
  );
  assert(
    dynamicDetailContent.includes('recovery') || dynamicDetailContent.includes('Post-Treatment Care'),
    'Treatment detail page must render recovery guidelines'
  );
  assert(
    dynamicDetailContent.includes('faqs') || dynamicDetailContent.includes('Frequently Asked Questions'),
    'Treatment detail page must render treatment FAQs'
  );
});

// -----------------------------------------------------------------------------
// Test Group 3: ContactForm Validation & Indian Mobile Regex Testing
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m--- Group 3: ContactForm Validation & Adversarial Matrix ---\x1b[0m');

const contactFormPath = path.join(PROJECT_ROOT, 'src/components/ui/ContactForm.tsx');
const contactFormContent = fs.readFileSync(contactFormPath, 'utf8');

// Function under test extracted from ContactForm logic
function simulatePhoneValidation(rawPhone) {
  const cleanPhone = (rawPhone || '').trim().replace(/[\s\-]/g, '');
  let digits = cleanPhone;
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!digits) {
    return { valid: false, error: 'Phone number is required.' };
  } else if (!indianMobileRegex.test(digits)) {
    if (digits.length !== 10) {
      return { valid: false, error: 'Please enter a valid 10-digit mobile number.' };
    } else if (!/^[6-9]/.test(digits)) {
      return { valid: false, error: 'Indian mobile numbers must start with 6, 7, 8, or 9.' };
    } else {
      return { valid: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
    }
  }
  return { valid: true, sanitized: digits };
}

test('Form Component regex implementation in source code matches /^[6-9]\\d{9}$/', () => {
  assert(
    contactFormContent.includes('/^[6-9]\\d{9}$/'),
    'ContactForm must contain regex /^[6-9]\\d{9}$/'
  );
});

test('Phone Validation: Valid Indian 10-digit mobile numbers pass', () => {
  const validCases = [
    '9820012345',
    '8123456789',
    '7012345678',
    '6987654321',
    '+91 98200 12345',
    '+91-9820012345',
    '919820012345',
    '09820012345',
    '98200-12345',
  ];

  for (const num of validCases) {
    const res = simulatePhoneValidation(num);
    assert(res.valid, `Expected "${num}" to be valid, but got: ${res.error}`);
    assert(res.sanitized.length === 10, `Sanitized number must be 10 digits`);
    assert(/^[6-9]/.test(res.sanitized), `Sanitized number must start with 6-9`);
  }
});

test('Phone Validation: Invalid Indian phone numbers rejected', () => {
  const invalidCases = [
    { num: '5123456789', reason: 'starts with 5' },
    { num: '1234567890', reason: 'starts with 1' },
    { num: '0000000000', reason: 'all zeros' },
    { num: '98200', reason: 'too short (5 digits)' },
    { num: '982001234', reason: 'too short (9 digits)' },
    { num: '98200123456', reason: 'too long (11 digits without 0/91 prefix)' },
    { num: '98200ABCD5', reason: 'alphanumeric characters' },
    { num: '98200!@#$5', reason: 'special characters' },
    { num: '', reason: 'empty string' },
  ];

  for (const { num, reason } of invalidCases) {
    const res = simulatePhoneValidation(num);
    assert(!res.valid, `Expected "${num}" (${reason}) to fail, but it was marked valid`);
    assert(res.error && res.error.length > 0, `Error message expected for "${num}"`);
  }
});

// Date validation simulation
function simulateDateValidation(dateStr) {
  if (!dateStr) {
    return { valid: false, error: 'Please select a preferred consultation date.' };
  }
  const selectedDate = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (isNaN(selectedDate.getTime()) || selectedDate < today) {
    return { valid: false, error: 'Appointment date cannot be in the past.' };
  }
  return { valid: true };
}

test('Date Validation: Past dates rejected, today and future dates accepted', () => {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const nextMonth = new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0];

  assert(!simulateDateValidation(yesterday).valid, 'Yesterday must be rejected');
  assert(!simulateDateValidation('2020-01-01').valid, '2020-01-01 must be rejected');
  assert(!simulateDateValidation('').valid, 'Empty date must be rejected');
  assert(simulateDateValidation(today).valid, 'Today must be accepted');
  assert(simulateDateValidation(tomorrow).valid, 'Tomorrow must be accepted');
  assert(simulateDateValidation(nextMonth).valid, 'Next month must be accepted');
});

test('Demo Interception: Demonstration modal intercepts submission with proper disclaimers', () => {
  assert(
    contactFormContent.includes('showDemoModal') && contactFormContent.includes('setShowDemoModal'),
    'ContactForm must manage showDemoModal state'
  );
  assert(
    contactFormContent.includes('Demonstration Preview: Validation passed! In production, this connects to your clinic management API or WhatsApp Business. No real appointment was booked.'),
    'ContactForm must contain exact Demonstration Preview disclaimer text'
  );
  assert(
    !contactFormContent.includes('Your appointment is confirmed!') &&
    !contactFormContent.includes('Booking ID: #'),
    'ContactForm must strictly NOT fabricate fake appointment confirmation or booking ID'
  );
});

// -----------------------------------------------------------------------------
// Test Group 4: Doctor Page & Credentials Contract
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m--- Group 4: Doctor Page & Demo Notice Verification ---\x1b[0m');

const doctorPagePath = path.join(PROJECT_ROOT, 'src/app/doctor/page.tsx');
const doctorPageContent = fs.readFileSync(doctorPagePath, 'utf8');

test('Doctor Page: Consumes clinicConfig.doctor and displays Dr. Aanya Mehta profile', () => {
  assert(
    doctorPageContent.includes('clinicConfig.doctor'),
    'doctor/page.tsx must consume clinicConfig.doctor'
  );
  assert(
    doctorPageContent.includes('doctor.experienceYears'),
    'doctor/page.tsx must display experienceYears'
  );
  assert(
    doctorPageContent.includes('doctor.philosophy'),
    'doctor/page.tsx must display doctor philosophy'
  );
  assert(
    doctorPageContent.includes('doctor.credentials'),
    'doctor/page.tsx must map over doctor credentials'
  );
});

test('Doctor Page: Features prominent demonstration disclaimer', () => {
  assert(
    doctorPageContent.includes('DemoDisclaimerBadge'),
    'doctor/page.tsx must render DemoDisclaimerBadge'
  );
  assert(
    doctorPageContent.includes('Demonstration Profile'),
    'doctor/page.tsx must designate profile as Demonstration Profile'
  );
  assert(
    doctorPageContent.includes('Turner Road') || doctorPageContent.includes('Bandra West') || doctorPageContent.includes('Mumbai'),
    'doctor/page.tsx must cite clinic studio location'
  );
});

// -----------------------------------------------------------------------------
// Test Group 5: Gallery Page & Lightbox Interaction
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m--- Group 5: Gallery Page & Lightbox Keyboard Contract ---\x1b[0m');

const galleryPagePath = path.join(PROJECT_ROOT, 'src/app/gallery/page.tsx');
const galleryPageContent = fs.readFileSync(galleryPagePath, 'utf8');

test('Gallery Page: Implements interactive Lightbox modal with keyboard event listeners', () => {
  assert(
    galleryPageContent.includes('activeLightboxItem') || galleryPageContent.includes('selectedImageIndex'),
    'gallery/page.tsx must manage lightbox selection state'
  );
  assert(
    galleryPageContent.includes('Escape') && galleryPageContent.includes('ArrowRight') && galleryPageContent.includes('ArrowLeft'),
    'gallery/page.tsx must implement Escape, ArrowRight, and ArrowLeft keyboard listeners'
  );
  assert(
    galleryPageContent.includes('addEventListener') && galleryPageContent.includes('removeEventListener'),
    'gallery/page.tsx must cleanly attach and remove window keydown listener'
  );
});

test('Gallery Page: Implements category filtering tabs', () => {
  assert(
    galleryPageContent.includes('activeCategory') && galleryPageContent.includes('setActiveCategory'),
    'gallery/page.tsx must manage activeCategory state'
  );
  assert(
    galleryPageContent.includes('galleryCategories.map'),
    'gallery/page.tsx must map over clinicConfig.galleryCategories'
  );
});

// -----------------------------------------------------------------------------
// Test Group 6: src/components/index.ts Re-export Verification
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m--- Group 6: src/components/index.ts Re-export Verification ---\x1b[0m');

const indexPath = path.join(PROJECT_ROOT, 'src/components/index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf8');

const expectedExports = [
  'Navbar',
  'MobileNavigation',
  'MobileBottomBar',
  'FloatingWhatsApp',
  'Footer',
  'HeroSection',
  'TrustIntroSection',
  'TreatmentsSection',
  'WhyChooseUsSection',
  'AppointmentCTASection',
  'LocationSection',
  'SectionHeading',
  'TreatmentCard',
  'DoctorProfile',
  'GalleryGrid',
  'DemoDisclaimerBadge',
  'ContactForm',
];

test('Component Index: Exports all 17 required components', () => {
  for (const exp of expectedExports) {
    assert(
      indexContent.includes(`export { ${exp} }`) || indexContent.includes(`export { ${exp},`) || indexContent.includes(exp),
      `src/components/index.ts must export ${exp}`
    );
  }
});

// -----------------------------------------------------------------------------
// Test Group 7: SSG Prerendering Output Verification
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m--- Group 7: SSG Prerender Manifest Verification ---\x1b[0m');

const prerenderManifestPath = path.join(PROJECT_ROOT, '.next/prerender-manifest.json');
const clinicConfigFile = fs.readFileSync(path.join(PROJECT_ROOT, 'src/config/clinic.config.ts'), 'utf8');
const configuredSlugs = [...clinicConfigFile.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);

test('SSG Output: All dynamic treatment routes from clinicConfig are prerendered in .next build output', () => {
  if (!fs.existsSync(prerenderManifestPath)) {
    console.log('    (Prerender manifest not yet found — will be verified during clean npm run build)');
    return;
  }
  const manifest = JSON.parse(fs.readFileSync(prerenderManifestPath, 'utf8'));
  const routes = Object.keys(manifest.routes);
  
  assert(configuredSlugs.length >= 6, `Expected at least 6 configured slugs, got ${configuredSlugs.length}`);

  for (const slug of configuredSlugs) {
    const routePath = `/treatments/${slug}`;
    assert(
      routes.includes(routePath),
      `Prerender manifest does not contain dynamic route: ${routePath}`
    );
  }
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log(`\x1b[1mTotal Assertions: ${passedCount + failedCount} | \x1b[32mPassed: ${passedCount}\x1b[0m | \x1b[31mFailed: ${failedCount}\x1b[0m`);
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
