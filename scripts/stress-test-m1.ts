import { clinicConfig, getTreatmentBySlug } from '../src/config/clinic.config';
import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, suite: string, name: string, failureDetails?: string) {
  if (condition) {
    results.push({ suite, name, passed: true });
    console.log(`  [PASS] ${name}`);
  } else {
    results.push({ suite, name, passed: false, details: failureDetails });
    console.error(`  [FAIL] ${name} - Details: ${failureDetails}`);
  }
}

console.log('=== EMPIRICAL STRESS TEST SUITE: MILESTONE 1 ===\n');

// 1. CONFIGURATION COMPLETENESS & INTEGRITY
console.log('--- 1. Configuration Completeness ---');
assert(!!clinicConfig, 'Config Completeness', 'clinicConfig exists and is truthy');
assert(clinicConfig.isDemoMode === true, 'Config Completeness', 'clinicConfig.isDemoMode is explicitly true');
assert(!!clinicConfig.identity, 'Config Completeness', 'clinicConfig.identity exists');
assert(!!clinicConfig.identity.phone, 'Config Completeness', 'clinicConfig.identity.phone exists');
assert(!!clinicConfig.identity.whatsapp, 'Config Completeness', 'clinicConfig.identity.whatsapp exists');
assert(!!clinicConfig.identity.hours, 'Config Completeness', 'clinicConfig.identity.hours exists');
assert(!!clinicConfig.doctor, 'Config Completeness', 'clinicConfig.doctor exists');
assert(Array.isArray(clinicConfig.treatments) && clinicConfig.treatments.length > 0, 'Config Completeness', 'clinicConfig.treatments is a non-empty array');
assert(!!clinicConfig.demoDisclaimers, 'Config Completeness', 'clinicConfig.demoDisclaimers exists');

// Deep check demoDisclaimers
const disclaimers = clinicConfig.demoDisclaimers;
assert(typeof disclaimers.navbarBanner === 'string' && disclaimers.navbarBanner.trim().length > 10, 'Disclaimers', 'navbarBanner is non-empty string');
assert(typeof disclaimers.footerNotice === 'string' && disclaimers.footerNotice.trim().length > 10, 'Disclaimers', 'footerNotice is non-empty string');
assert(typeof disclaimers.formNotice === 'string' && disclaimers.formNotice.trim().length > 10, 'Disclaimers', 'formNotice is non-empty string');
assert(typeof disclaimers.doctorNotice === 'string' && disclaimers.doctorNotice.trim().length > 10, 'Disclaimers', 'doctorNotice is non-empty string');
assert(typeof disclaimers.generalNotice === 'string' && disclaimers.generalNotice.trim().length > 10, 'Disclaimers', 'generalNotice is non-empty string');

// 2. PHONE NUMBER SPECIFICATION
console.log('\n--- 2. Phone Specification Verification ---');
const phone = clinicConfig.identity.phone;
assert(phone.display === '+91 98200 12345', 'Phone Verification', 'phone.display matches exact string "+91 98200 12345"', `Got: "${phone.display}"`);
assert(phone.dialable === 'tel:+919820012345' || phone.dialable === '+919820012345', 'Phone Verification', 'phone.dialable matches dialable format', `Got: "${phone.dialable}"`);
assert(phone.cleanDigits === '919820012345', 'Phone Verification', 'phone.cleanDigits matches "919820012345"', `Got: "${phone.cleanDigits}"`);

// 3. WHATSAPP SPECIFICATION
console.log('\n--- 3. WhatsApp Specification Verification ---');
const wa = clinicConfig.identity.whatsapp;
assert(wa.number.includes('98200') && wa.cleanDigits === '919820012345', 'WhatsApp Verification', 'wa.cleanDigits is 919820012345');
assert(wa.defaultMessage === 'Hello, I would like to enquire about a dental appointment', 'WhatsApp Verification', 'wa.defaultMessage matches exact required prefill string', `Got: "${wa.defaultMessage}"`);
assert(wa.prefilledUrl.includes('919820012345'), 'WhatsApp Verification', 'wa.prefilledUrl contains 919820012345');
assert(
  decodeURIComponent(wa.prefilledUrl).includes('Hello, I would like to enquire about a dental appointment'),
  'WhatsApp Verification',
  'wa.prefilledUrl contains prefilled enquiry text when decoded',
  `Got: "${wa.prefilledUrl}"`
);

// 4. TREATMENTS CATALOG & CLINICAL TAXONOMY
console.log('\n--- 4. Treatments Catalog Verification ---');
assert(clinicConfig.treatments.length === 6, 'Treatments Catalog', `Exact 6 treatments defined. Found: ${clinicConfig.treatments.length}`);

const expectedSlugs = [
  'porcelain-veneers',
  'dental-implants',
  'invisible-aligners',
  'single-visit-root-canal',
  'laser-teeth-whitening',
  'preventive-periodontics'
];

const foundSlugs = clinicConfig.treatments.map(t => t.slug);
for (const slug of expectedSlugs) {
  assert(foundSlugs.includes(slug), 'Treatments Catalog', `Expected slug "${slug}" exists`);
}

for (const t of clinicConfig.treatments) {
  const steps = t.procedureSteps || (t as any).proceduralSteps;
  assert(Array.isArray(steps) && steps.length >= 3, `Treatment [${t.slug}]`, `procedureSteps has at least 3 steps (found: ${steps ? steps.length : 0})`);
  assert(Array.isArray(t.faqs) && t.faqs.length >= 3, `Treatment [${t.slug}]`, `faqs has at least 3 FAQs (found: ${t.faqs ? t.faqs.length : 0})`);
  assert(typeof t.title === 'string' && t.title.length > 0, `Treatment [${t.slug}]`, 'title is non-empty');
  assert(typeof t.tagline === 'string' && t.tagline.length > 0, `Treatment [${t.slug}]`, 'tagline is non-empty');
  assert(typeof t.shortDescription === 'string' && t.shortDescription.length > 0, `Treatment [${t.slug}]`, 'shortDescription is non-empty');
  assert(typeof t.fullDescription === 'string' && t.fullDescription.length > 0, `Treatment [${t.slug}]`, 'fullDescription is non-empty');
  assert(typeof t.duration === 'string' && t.duration.length > 0, `Treatment [${t.slug}]`, 'duration is non-empty');
  assert(typeof t.recoveryTime === 'string' && t.recoveryTime.length > 0, `Treatment [${t.slug}]`, 'recoveryTime is non-empty');
  assert(typeof t.anesthesia === 'string' && t.anesthesia.length > 0, `Treatment [${t.slug}]`, 'anesthesia is non-empty');
  assert(t.image.startsWith('https://images.unsplash.com/'), `Treatment [${t.slug}]`, 'image is valid Unsplash URL');
  
  // Verify steps data integrity
  for (const step of steps) {
    assert(typeof step.title === 'string' && step.title.length > 0, `Treatment [${t.slug}] Step`, `Step has non-empty title`);
    assert(typeof step.description === 'string' && step.description.length > 0, `Treatment [${t.slug}] Step`, `Step has non-empty description`);
  }

  // Verify faqs data integrity
  for (const faq of t.faqs) {
    assert(typeof faq.question === 'string' && faq.question.endsWith('?'), `Treatment [${t.slug}] FAQ`, `FAQ question is non-empty and ends with '?'`);
    assert(typeof faq.answer === 'string' && faq.answer.length > 20, `Treatment [${t.slug}] FAQ`, `FAQ answer has substance (>20 chars)`);
  }
}

// Test getTreatmentBySlug helper
for (const slug of expectedSlugs) {
  const item = getTreatmentBySlug(slug);
  assert(!!item && item.slug === slug, 'Slug Resolver', `getTreatmentBySlug("${slug}") returns correct treatment`);
}
assert(getTreatmentBySlug('non-existent-slug-xyz') === undefined, 'Slug Resolver', 'getTreatmentBySlug handles invalid slug gracefully returning undefined');

// 5. CSS TOKENS IN globals.css
console.log('\n--- 5. CSS Tokens Verification ---');
const globalsCssPath = path.resolve(process.cwd(), 'src/app/globals.css');
assert(fs.existsSync(globalsCssPath), 'CSS Tokens', 'src/app/globals.css exists');
const globalsCss = fs.readFileSync(globalsCssPath, 'utf-8');

assert(globalsCss.includes('--color-ivory: #F7F5F0;'), 'CSS Tokens', 'globals.css declares --color-ivory: #F7F5F0;');
assert(globalsCss.includes('--color-navy: #17324D;'), 'CSS Tokens', 'globals.css declares --color-navy: #17324D;');
assert(globalsCss.includes('--color-gold: #C49A59;'), 'CSS Tokens', 'globals.css declares --color-gold: #C49A59;');
assert(globalsCss.includes('@theme'), 'CSS Tokens', 'globals.css contains Tailwind v4 @theme declaration');
assert(globalsCss.includes('--color-border-subtle: #E7E1D7;'), 'CSS Tokens', 'globals.css declares --color-border-subtle: #E7E1D7;');

// 6. MOBILE COLLISION PREVENTION IN layout.tsx
console.log('\n--- 6. Mobile Collision Prevention in layout.tsx ---');
const layoutPath = path.resolve(process.cwd(), 'src/app/layout.tsx');
assert(fs.existsSync(layoutPath), 'Mobile Collision', 'src/app/layout.tsx exists');
const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

const hasMobilePadding = layoutContent.includes('pb-24') || layoutContent.includes('pb-20');
assert(hasMobilePadding, 'Mobile Collision', 'src/app/layout.tsx contains pb-24 or pb-20 for mobile bottom bar collision prevention');
assert(layoutContent.includes('md:pb-0'), 'Mobile Collision', 'src/app/layout.tsx resets bottom padding on desktop with md:pb-0');

// 7. DOCTOR PROFILE INTEGRITY
console.log('\n--- 7. Doctor Profile & Demo Integrity ---');
const doc = clinicConfig.doctor;
assert(doc.name === 'Dr. Aanya Mehta', 'Doctor Profile', 'Doctor name is Dr. Aanya Mehta');
assert(doc.experienceYears === 12, 'Doctor Profile', 'Doctor experience is 12 years');
assert(Array.isArray(doc.credentials) && doc.credentials.length >= 3, 'Doctor Profile', 'Doctor has at least 3 credentials');
assert(Array.isArray(doc.specialties) && doc.specialties.length >= 3, 'Doctor Profile', 'Doctor has at least 3 specialties');
assert(Array.isArray(doc.educationTimeline) && doc.educationTimeline.length >= 3, 'Doctor Profile', 'Doctor has education timeline items');
assert(doc.isDemoProfile === true, 'Doctor Profile', 'doc.isDemoProfile is true');
assert(typeof doc.demoDisclaimer === 'string' && doc.demoDisclaimer.length > 20, 'Doctor Profile', 'Doctor disclaimer is prominent and clear');

// 8. GALLERY ASSETS INTEGRITY
console.log('\n--- 8. Gallery Items Verification ---');
assert(Array.isArray(clinicConfig.galleryItems) && clinicConfig.galleryItems.length >= 6, 'Gallery Assets', 'At least 6 gallery items defined');
for (const item of clinicConfig.galleryItems) {
  assert(item.imageUrl.startsWith('https://images.unsplash.com/'), 'Gallery Assets', `Gallery item [${item.id}] uses Unsplash CDN`);
  assert(typeof item.alt === 'string' && item.alt.length > 10, 'Gallery Assets', `Gallery item [${item.id}] has descriptive alt text`);
}

// 9. RECURSIVE NULL / UNDEFINED SCAN
console.log('\n--- 9. Deep Null / Undefined Scan of clinicConfig ---');
let nullOrUndefinedCount = 0;
function deepCheck(obj: any, path: string) {
  if (obj === null || obj === undefined) {
    console.error(`  [FAIL] Null or undefined found at: ${path}`);
    nullOrUndefinedCount++;
    return;
  }
  if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      deepCheck(obj[key], `${path}.${key}`);
    }
  }
}
deepCheck(clinicConfig, 'clinicConfig');
assert(nullOrUndefinedCount === 0, 'Deep Integrity', `No null or undefined values found across config (count: ${nullOrUndefinedCount})`);

// SUMMARY
console.log('\n====================================');
const total = results.length;
const passed = results.filter(r => r.passed).length;
const failed = total - passed;
console.log(`TOTAL CHECKS: ${total}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('====================================\n');

if (failed > 0) {
  console.error(`CRITICAL: ${failed} verification checks failed!`);
  process.exit(1);
} else {
  console.log('SUCCESS: All 100% of Milestone 1 empirical checks passed!');
  process.exit(0);
}
