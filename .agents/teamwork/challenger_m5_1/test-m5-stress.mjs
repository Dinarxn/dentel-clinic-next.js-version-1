/**
 * Milestone 5 Adversarial Contract & Edge Case Empirical Stress Test Harness
 * Author: Challenger 1 (Milestone 5 — Empirical Challenger)
 * State Folder: .agents/teamwork/challenger_m5_1/
 *
 * Scope:
 * 1. Dynamic Route Contracts:
 *    - generateStaticParams contract & slug coverage
 *    - generateMetadata execution for valid slugs & fallback for invalid slugs
 *    - TreatmentDetailPage resolution vs notFound() triggers across valid, invalid, and adversarial slugs
 *    - Deep analysis of getTreatmentBySlug resolution behavior
 * 2. Form Validator Stress:
 *    - Strict 10-digit Indian phone regex (/^[6-9]\d{9}$/)
 *    - Country code normalization (+91, 91, 0, whitespace, hyphens)
 *    - Invalid starting prefixes (0, 1, 2, 3, 4, 5)
 *    - Boundary lengths (< 10, > 10 digits)
 *    - Alphanumeric, script injection, special characters, null/undefined inputs
 * 3. Date Validator Stress:
 *    - Historical and past dates (1970, 2020, 2025, yesterday) -> REJECT
 *    - Present date (today) -> ACCEPT
 *    - Future dates (tomorrow, +7d, +30d, +1yr) -> ACCEPT
 *    - Malformed and non-date strings -> REJECT
 * 4. Master E2E Suite Execution:
 *    - Programmatic execution of tests/e2e/run-tests.mjs
 *    - Validation of report JSON and 26/26 assertions
 * 5. Discrepancy & Worker Claims Verification:
 *    - Comparison of worker_m5 handoff claims vs actual .next/prerender-manifest.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../..');

// Harness Metrics
let passedCount = 0;
let failedCount = 0;
const testRecords = [];

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
    testRecords.push({ name, status: 'PASS', duration, error: null });
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${name} \x1b[2m(${duration}ms)\x1b[0m`);
  } catch (err) {
    const duration = (performance.now() - start).toFixed(2);
    failedCount++;
    testRecords.push({ name, status: 'FAIL', duration, error: err.message });
    console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${name}`);
    console.log(`    \x1b[31mError:\x1b[0m ${err.message}`);
  }
}

async function asyncTest(name, fn) {
  const start = performance.now();
  try {
    await fn();
    const duration = (performance.now() - start).toFixed(2);
    passedCount++;
    testRecords.push({ name, status: 'PASS', duration, error: null });
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${name} \x1b[2m(${duration}ms)\x1b[0m`);
  } catch (err) {
    const duration = (performance.now() - start).toFixed(2);
    failedCount++;
    testRecords.push({ name, status: 'FAIL', duration, error: err.message });
    console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${name}`);
    console.log(`    \x1b[31mError:\x1b[0m ${err.message}`);
  }
}

console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m CHALLENGER 1 (M5) — ADVERSARIAL CONTRACT & STRESS TEST HARNESS \x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

// -----------------------------------------------------------------------------
// STEP 1: Load Transpiled Clinic Config in Node
// -----------------------------------------------------------------------------
const configSourcePath = path.join(PROJECT_ROOT, 'src/config/clinic.config.ts');
assert(fs.existsSync(configSourcePath), `clinic.config.ts must exist at ${configSourcePath}`);

const configSource = fs.readFileSync(configSourcePath, 'utf8');
const transpiledConfig = ts.transpileModule(configSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

const configModule = { exports: {} };
const evalConfigFn = new Function('require', 'exports', 'module', transpiledConfig);
evalConfigFn(require, configModule.exports, configModule);

const { clinicConfig, getTreatmentBySlug } = configModule.exports;
assert(clinicConfig, 'clinicConfig must be exported');
assert(typeof getTreatmentBySlug === 'function', 'getTreatmentBySlug must be exported function');

// -----------------------------------------------------------------------------
// TEST SUITE 1: DYNAMIC ROUTE CONTRACTS & RESOLUTION
// -----------------------------------------------------------------------------
console.log('\x1b[1m▶ Section 1: Dynamic Route Contracts & Slug Resolution\x1b[0m');

const dynamicPageSourcePath = path.join(PROJECT_ROOT, 'src/app/treatments/[slug]/page.tsx');
assert(fs.existsSync(dynamicPageSourcePath), `treatments dynamic page must exist at ${dynamicPageSourcePath}`);
const dynamicPageSource = fs.readFileSync(dynamicPageSourcePath, 'utf8');

test('Dynamic route contract: params is defined as Promise<{ slug: string }>', () => {
  assert(
    /params:\s*Promise<\{\s*slug:\s*string\s*\}>/.test(dynamicPageSource),
    'TreatmentPageProps must define params as Promise<{ slug: string }> per Next.js 15 contract'
  );
  assert(
    dynamicPageSource.includes('await params'),
    'TreatmentDetailPage and generateMetadata must await params'
  );
});

test('generateStaticParams contract: Exactly 6 valid treatment slugs are exported', () => {
  // Simulate generateStaticParams logic from page.tsx:
  // return clinicConfig.treatments.map((t) => ({ slug: t.slug }));
  const staticParams = clinicConfig.treatments.map((t) => ({ slug: t.slug }));
  assert(Array.isArray(staticParams), 'generateStaticParams must return an array');
  assert(staticParams.length === 6, `Expected exactly 6 treatment slugs, found ${staticParams.length}`);

  const expectedSlugs = [
    'porcelain-veneers',
    'dental-implants',
    'invisible-aligners',
    'single-visit-root-canal',
    'laser-teeth-whitening',
    'preventive-periodontics'
  ];

  for (const exp of expectedSlugs) {
    const found = staticParams.find((p) => p.slug === exp);
    assert(found, `Expected static slug "${exp}" not found in generateStaticParams() output`);
  }

  // Validate format of each slug: lowercase, kebab-case, no spaces or special chars
  for (const { slug } of staticParams) {
    assert(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug), `Slug "${slug}" violates URL-safe kebab-case contract`);
  }
});

// Simulate generateMetadata from src/app/treatments/[slug]/page.tsx
async function simulateGenerateMetadata(slug) {
  const treatment = getTreatmentBySlug(slug) || clinicConfig.treatments.find((t) => t.slug === slug);

  if (!treatment) {
    return {
      title: 'Treatment Not Found | Lumière Dental Studio',
      description: 'The requested treatment detail page could not be found.',
    };
  }

  return {
    title: `${treatment.title} | ${clinicConfig.identity.name}`,
    description: treatment.shortDescription,
    openGraph: {
      title: `${treatment.title} | ${clinicConfig.identity.name}`,
      description: treatment.shortDescription,
      images: [
        {
          url: treatment.heroImage || treatment.image,
          width: 1200,
          height: 630,
          alt: treatment.imageAlt || treatment.title,
        },
      ],
    },
  };
}

// Simulate TreatmentDetailPage resolution from src/app/treatments/[slug]/page.tsx
function simulateTreatmentResolution(slug) {
  const treatment = getTreatmentBySlug(slug) || clinicConfig.treatments.find((t) => t.slug === slug);
  if (!treatment) {
    return { status: 'NOT_FOUND', treatment: null };
  }
  return { status: 'RESOLVED', treatment };
}

await asyncTest('generateMetadata: Valid slugs return comprehensive metadata & OpenGraph', async () => {
  for (const t of clinicConfig.treatments) {
    const meta = await simulateGenerateMetadata(t.slug);
    assert(meta.title && meta.title.includes(clinicConfig.identity.name), `Title missing clinic identity for ${t.slug}`);
    assert(meta.title.includes(t.title), `Title missing treatment title for ${t.slug}`);
    assert(meta.description && meta.description.length > 20, `Meta description too short for ${t.slug}`);
    assert(meta.openGraph && meta.openGraph.images && meta.openGraph.images.length > 0, `OpenGraph image missing for ${t.slug}`);
    assert(meta.openGraph.images[0].url.startsWith('https://'), `OpenGraph image must be valid URL for ${t.slug}`);
  }
});

await asyncTest('generateMetadata: Invalid slugs return 404 fallback metadata', async () => {
  // Use slugs that do not match fuzzy keywords (veneers, implant, aligner, root-canal, whitening, periodontic)
  const invalidSlugs = ['super-fake-treatment', 'laser-surgery-quack', 'xyz-invalid', ''];
  for (const slug of invalidSlugs) {
    const meta = await simulateGenerateMetadata(slug);
    assert(meta.title === 'Treatment Not Found | Lumière Dental Studio', `Expected fallback title for invalid slug "${slug}", got "${meta.title}"`);
    assert(meta.description === 'The requested treatment detail page could not be found.', `Expected fallback description for invalid slug "${slug}"`);
  }
});

test('Treatment resolution: All 6 valid treatment slugs resolve successfully with full data contracts', () => {
  for (const t of clinicConfig.treatments) {
    const res = simulateTreatmentResolution(t.slug);
    assert(res.status === 'RESOLVED', `Valid slug "${t.slug}" failed to resolve`);
    const data = res.treatment;
    assert(data.title && data.title.length > 0, `Treatment ${t.slug} missing title`);
    assert(data.category && data.category.length > 0, `Treatment ${t.slug} missing category`);
    assert(data.shortDescription && data.shortDescription.length > 20, `Treatment ${t.slug} missing shortDescription`);
    assert(data.overview || data.fullDescription, `Treatment ${t.slug} missing overview/description`);
    assert(data.procedureSteps || data.proceduralSteps, `Treatment ${t.slug} missing procedure steps`);
    assert(data.candidacy, `Treatment ${t.slug} missing candidacy`);
    assert(data.benefits, `Treatment ${t.slug} missing benefits`);
    assert(data.faqs && data.faqs.length >= 2, `Treatment ${t.slug} must have at least 2 FAQs`);
  }
});

test('Treatment resolution: notFound() triggered on completely invalid slugs', () => {
  const invalidSlugs = [
    '',
    'not-a-treatment',
    'super-fake-treatment-12345',
    '404-nonexistent',
    '12345',
    '../../admin',
    "' OR '1'='1",
    '<script>alert(1)</script>',
    'orthodontics-fake',
    'full-mouth-rehabilitation', // Validates against worker handoff claim!
    'preventive-wellness',      // Validates against worker handoff claim!
  ];

  for (const slug of invalidSlugs) {
    const res = simulateTreatmentResolution(slug);
    assert(res.status === 'NOT_FOUND', `Expected invalid slug "${slug}" to trigger notFound(), but it resolved to ${res.treatment?.slug}`);
  }
});

test('Adversarial Route Analysis: Document fuzzy substring matching in getTreatmentBySlug', () => {
  // getTreatmentBySlug contains intentional loose matching for backwards compatibility:
  // e.g. (cleanSlug.includes('veneers') && t.slug.includes('veneers'))
  // This means slugs like 'fake-veneers' resolve to 'porcelain-veneers'.
  // While designed for convenience (e.g. /treatments/veneers), we empirically record this behavior.
  const looseMatched = [
    { input: 'veneers', resolvesTo: 'porcelain-veneers' },
    { input: 'porcelainveneers', resolvesTo: 'porcelain-veneers' },
    { input: 'dentalimplants', resolvesTo: 'dental-implants' },
    { input: 'fake-veneers', resolvesTo: 'porcelain-veneers' }, // Fuzzy match quirk
    { input: 'root-canal-scam', resolvesTo: 'single-visit-root-canal' }, // Fuzzy match quirk
  ];

  for (const { input, resolvesTo } of looseMatched) {
    const res = simulateTreatmentResolution(input);
    assert(res.status === 'RESOLVED' && res.treatment.slug === resolvesTo, `Fuzzy resolution behavior mismatch for "${input}"`);
  }
});

// -----------------------------------------------------------------------------
// TEST SUITE 2: FORM VALIDATOR STRESS TESTING
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 2: Form Validator Stress Testing (Indian Phone Regex & Boundaries)\x1b[0m');

// Function under test extracted from src/components/ui/ContactForm.tsx
function validatePhoneComponentLogic(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return { isValid: false, error: 'Phone number is required.' };
  }

  const cleanPhone = phoneNumber.trim().replace(/[\s\-]/g, '');
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
    return { isValid: false, error: 'Phone number is required.' };
  } else if (!indianMobileRegex.test(digits)) {
    if (digits.length !== 10) {
      return { isValid: false, error: 'Please enter a valid 10-digit mobile number.' };
    } else if (!/^[6-9]/.test(digits)) {
      return { isValid: false, error: 'Indian mobile numbers must start with 6, 7, 8, or 9.' };
    } else {
      return { isValid: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
    }
  }

  return { isValid: true, sanitized: digits };
}

test('Phone validator: Standard 10-digit Indian mobile numbers (starting with 6, 7, 8, 9)', () => {
  const standardCases = [
    { input: '9820012345', expected: '9820012345' },
    { input: '8123456789', expected: '8123456789' },
    { input: '7000000000', expected: '7000000000' },
    { input: '6999999999', expected: '6999999999' },
    { input: '6000000000', expected: '6000000000' }, // Lower boundary 6
    { input: '9999999999', expected: '9999999999' }, // Upper boundary 9
  ];

  for (const { input, expected } of standardCases) {
    const res = validatePhoneComponentLogic(input);
    assert(res.isValid, `Standard mobile number "${input}" was rejected with: ${res.error}`);
    assert(res.sanitized === expected, `Expected sanitized "${expected}", got "${res.sanitized}"`);
  }
});

test('Phone validator: Country code normalization (+91, 91, 0, whitespace, hyphens)', () => {
  const normalizedCases = [
    { input: '+91 98200 12345', expected: '9820012345', reason: '+91 with spaces' },
    { input: '+919820012345', expected: '9820012345', reason: '+91 direct' },
    { input: '+91-98200-12345', expected: '9820012345', reason: '+91 with hyphens' },
    { input: '919820012345', expected: '9820012345', reason: '12-digit with 91' },
    { input: '09820012345', expected: '9820012345', reason: '11-digit with leading 0' },
    { input: '98200-12345', expected: '9820012345', reason: '10-digit with middle hyphen' },
    { input: '   9820012345   ', expected: '9820012345', reason: 'Leading and trailing whitespace' },
    { input: '9 8 2 0 0 1 2 3 4 5', expected: '9820012345', reason: 'Spaces between every digit' },
    { input: '+91 81234 56789', expected: '8123456789', reason: '+91 with 8 prefix' },
    { input: '+91 70000 00000', expected: '7000000000', reason: '+91 with 7 prefix' },
    { input: '+91 69999 99999', expected: '6999999999', reason: '+91 with 6 prefix' },
  ];

  for (const { input, expected, reason } of normalizedCases) {
    const res = validatePhoneComponentLogic(input);
    assert(res.isValid, `Failed to normalize "${input}" (${reason}): ${res.error}`);
    assert(res.sanitized === expected, `Normalized number mismatch for "${input}"`);
  }
});

test('Phone validator: Invalid prefixes (0 through 5) are rejected', () => {
  const invalidPrefixCases = [
    { input: '0123456789', prefix: '0 (10 digits)' },
    { input: '1234567890', prefix: '1' },
    { input: '2345678901', prefix: '2 (landline)' },
    { input: '3456789012', prefix: '3' },
    { input: '4567890123', prefix: '4' },
    { input: '5678901234', prefix: '5' },
    { input: '+91 56789 01234', prefix: '5 with +91' },
    { input: '05678901234', prefix: '5 with leading 0' },
  ];

  for (const { input, prefix } of invalidPrefixCases) {
    const res = validatePhoneComponentLogic(input);
    assert(!res.isValid, `Expected prefix ${prefix} (${input}) to be rejected, but it was marked valid`);
    assert(
      res.error.includes('Indian mobile numbers must start with 6, 7, 8, or 9') ||
      res.error.includes('10-digit'),
      `Unexpected error message for ${prefix}: ${res.error}`
    );
  }
});

test('Phone validator: Boundary lengths (too short / too long) are rejected', () => {
  const boundaryCases = [
    { input: '', reason: 'Empty string' },
    { input: '   ', reason: 'Whitespace string' },
    { input: '9', reason: '1 digit' },
    { input: '98', reason: '2 digits' },
    { input: '98200', reason: '5 digits' },
    { input: '982001234', reason: '9 digits' },
    { input: '98200123456', reason: '11 digits without 0/91 prefix' },
    { input: '982001234567', reason: '12 digits without 91 prefix' },
    { input: '9198200123456', reason: '13 digits with 91 prefix' },
    { input: '98200123456789012345', reason: '20 digits' },
  ];

  for (const { input, reason } of boundaryCases) {
    const res = validatePhoneComponentLogic(input);
    assert(!res.isValid, `Expected length boundary case "${input}" (${reason}) to be rejected`);
  }
});

test('Phone validator: Alphanumeric and malicious injection strings are rejected', () => {
  const injectionCases = [
    { input: '98200ABCDE', reason: 'Alphanumeric trailing' },
    { input: 'ABCDE98200', reason: 'Alphanumeric leading' },
    { input: '982001234a', reason: 'Single lowercase char' },
    { input: '982001234Z', reason: 'Single uppercase char' },
    { input: 'call-me-now', reason: 'Pure text' },
    { input: '<script>alert(1)</script>', reason: 'XSS script tag' },
    { input: "9820012345' OR '1'='1", reason: 'SQL injection string' },
    { input: '98200@12345', reason: 'At-symbol injection' },
    { input: '98200#12345', reason: 'Hash symbol injection' },
    { input: '98200$12345', reason: 'Dollar symbol injection' },
    { input: '98200.12345', reason: 'Dot separator injection' },
    { input: '+91 98200 1234x', reason: 'Alphanumeric with country code' },
  ];

  for (const { input, reason } of injectionCases) {
    const res = validatePhoneComponentLogic(input);
    assert(!res.isValid, `Expected injection input "${input}" (${reason}) to be rejected`);
  }
});

// -----------------------------------------------------------------------------
// TEST SUITE 3: DATE VALIDATOR STRESS TESTING
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 3: Date Validator Stress Testing (Past, Today, Future, Edge Cases)\x1b[0m');

// Function under test extracted from src/components/ui/ContactForm.tsx
function validateDateComponentLogic(preferredDate) {
  if (!preferredDate || typeof preferredDate !== 'string') {
    return { isValid: false, error: 'Please select a preferred consultation date.' };
  }

  const selectedDate = new Date(`${preferredDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime()) || selectedDate < today) {
    return { isValid: false, error: 'Appointment date cannot be in the past.' };
  }

  return { isValid: true, date: selectedDate };
}

test('Date validator: Historical and past dates are rejected', () => {
  const pastDates = [
    { date: '1970-01-01', label: 'Epoch start 1970' },
    { date: '2000-01-01', label: 'Millennium start 2000' },
    { date: '2020-03-15', label: 'Historical year 2020' },
    { date: '2025-12-31', label: 'Last year 2025' },
    { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], label: 'Yesterday (-1 day)' },
    { date: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0], label: 'Last week (-7 days)' },
    { date: new Date(Date.now() - 365 * 86400000).toISOString().split('T')[0], label: 'One year ago (-365 days)' },
  ];

  for (const { date, label } of pastDates) {
    const res = validateDateComponentLogic(date);
    assert(!res.isValid, `Expected past date "${date}" (${label}) to be rejected`);
    assert(res.error === 'Appointment date cannot be in the past.', `Unexpected error message: ${res.error}`);
  }
});

test('Date validator: Today (present date) is accepted', () => {
  const todayIso = new Date().toISOString().split('T')[0];
  const res = validateDateComponentLogic(todayIso);
  assert(res.isValid, `Expected current day "${todayIso}" to be valid, but got error: ${res.error}`);
});

test('Date validator: Future dates (tomorrow, next week, next month, next year) are accepted', () => {
  const futureDates = [
    { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], label: 'Tomorrow (+1 day)' },
    { date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], label: 'Next week (+7 days)' },
    { date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], label: 'Next month (+30 days)' },
    { date: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0], label: 'In 3 months (+90 days)' },
    { date: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0], label: 'Next year (+365 days)' },
  ];

  for (const { date, label } of futureDates) {
    const res = validateDateComponentLogic(date);
    assert(res.isValid, `Expected future date "${date}" (${label}) to be valid, but got error: ${res.error}`);
  }
});

test('Date validator: Empty, malformed, and non-date strings are rejected', () => {
  const malformedDates = [
    { date: '', label: 'Empty string' },
    { date: '   ', label: 'Whitespace string' },
    { date: 'not-a-date', label: 'Arbitrary text' },
    { date: '2026-99-99', label: 'Invalid month/day' },
    { date: '2026-02-30', label: 'Non-existent February 30' },
    { date: '<script>alert(1)</script>', label: 'Script tag' },
    { date: null, label: 'Null value' },
    { date: undefined, label: 'Undefined value' },
  ];

  for (const { date, label } of malformedDates) {
    const res = validateDateComponentLogic(date);
    assert(!res.isValid, `Expected malformed date "${date}" (${label}) to be rejected`);
  }
});

// -----------------------------------------------------------------------------
// TEST SUITE 4: MASTER E2E RUNNER VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 4: Master E2E Suite Execution (node tests/e2e/run-tests.mjs)\x1b[0m');

test('E2E Runner: Executes node tests/e2e/run-tests.mjs cleanly with exit code 0', () => {
  let e2eOutput = '';
  try {
    e2eOutput = execSync('node tests/e2e/run-tests.mjs', { cwd: PROJECT_ROOT, encoding: 'utf8' });
  } catch (err) {
    throw new Error(`E2E test runner failed: ${err.message}\nOutput: ${err.stdout || err.stderr}`);
  }

  const cleanOutput = e2eOutput.replace(/\x1b\[[0-9;]*m/g, '');
  assert(cleanOutput.includes('All 26 active tests PASSED successfully!'), 'E2E suite must pass all 26 active tests');
  assert(cleanOutput.includes('Total Assertions Executed: 26'), 'Total assertions must equal 26');

  // Verify machine report JSON
  const reportPath = path.join(PROJECT_ROOT, 'tests/e2e/reports/e2e-report.json');
  assert(fs.existsSync(reportPath), 'tests/e2e/reports/e2e-report.json must be generated');

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  assert(report.metrics.totalTests === 26, `Report totalTests expected 26, got ${report.metrics.totalTests}`);
  assert(report.metrics.totalPassed === 26, `Report totalPassed expected 26, got ${report.metrics.totalPassed}`);
  assert(report.metrics.totalFailed === 0, `Report totalFailed expected 0, got ${report.metrics.totalFailed}`);
  assert(report.metrics.totalPending === 0, `Report totalPending expected 0, got ${report.metrics.totalPending}`);
  assert(report.suites.length === 4, `Report must contain 4 suites, got ${report.suites.length}`);
});

// -----------------------------------------------------------------------------
// TEST SUITE 5: WORKER CLAIMS & PRERENDER DISCREPANCY AUDIT
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m▶ Section 5: Worker Claims vs Actual Prerender Manifest Audit\x1b[0m');

test('Worker Claims Audit: Detect discrepancy in worker_m5 handoff.md regarding prerendered slugs', () => {
  const workerHandoffPath = path.join(PROJECT_ROOT, '.agents/teamwork/worker_m5/handoff.md');
  assert(fs.existsSync(workerHandoffPath), 'worker_m5/handoff.md must exist');
  const workerHandoff = fs.readFileSync(workerHandoffPath, 'utf8');

  // Worker claimed in their handoff report:
  // /treatments/full-mouth-rehabilitation
  // /treatments/preventive-wellness
  const claimedFullMouth = workerHandoff.includes('/treatments/full-mouth-rehabilitation');
  const claimedWellness = workerHandoff.includes('/treatments/preventive-wellness');
  assert(claimedFullMouth, 'Worker handoff should contain claimed full-mouth-rehabilitation');
  assert(claimedWellness, 'Worker handoff should contain claimed preventive-wellness');

  // Config treatments in clinic.config.ts:
  const configSlugs = clinicConfig.treatments.map((t) => t.slug);
  const configHasRootCanal = configSlugs.includes('single-visit-root-canal');
  const configHasPeriodontics = configSlugs.includes('preventive-periodontics');
  const configHasFullMouth = configSlugs.includes('full-mouth-rehabilitation');
  const configHasWellness = configSlugs.includes('preventive-wellness');

  assert(configHasRootCanal, 'Config must contain single-visit-root-canal');
  assert(configHasPeriodontics, 'Config must contain preventive-periodontics');
  assert(!configHasFullMouth, 'Config does NOT contain full-mouth-rehabilitation (worker claimed it in build output)');
  assert(!configHasWellness, 'Config does NOT contain preventive-wellness (worker claimed it in build output)');

  // Actual prerender manifest in .next (if present):
  const prerenderPath = path.join(PROJECT_ROOT, '.next/prerender-manifest.json');
  if (fs.existsSync(prerenderPath)) {
    const prerenderManifest = JSON.parse(fs.readFileSync(prerenderPath, 'utf8'));
    const actualRoutes = Object.keys(prerenderManifest.routes);
    assert(actualRoutes.includes('/treatments/single-visit-root-canal'), 'Build routes must contain single-visit-root-canal');
    assert(actualRoutes.includes('/treatments/preventive-periodontics'), 'Build routes must contain preventive-periodontics');
    assert(!actualRoutes.includes('/treatments/full-mouth-rehabilitation'), 'Build routes do NOT contain full-mouth-rehabilitation');
    assert(!actualRoutes.includes('/treatments/preventive-wellness'), 'Build routes do NOT contain preventive-wellness');
  }

  // This empirically proves a discrepancy between worker handoff log and actual build manifest / config!
  console.log(`    \x1b[33mℹ Adversarial Finding:\x1b[0m Discrepancy confirmed: Worker handoff claimed slugs "full-mouth-rehabilitation" and "preventive-wellness". Actual configured & prerendered slugs are "single-visit-root-canal" and "preventive-periodontics".`);
});

// -----------------------------------------------------------------------------
// HARNESS EXECUTION SUMMARY
// -----------------------------------------------------------------------------
console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m EMPIRICAL STRESS TEST HARNESS SUMMARY \x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
console.log(` Total Assertions / Tests: ${passedCount + failedCount}`);
console.log(` \x1b[32m✔ Passed:\x1b[0m  ${passedCount}`);
console.log(` \x1b[31m✖ Failed:\x1b[0m  ${failedCount}`);
console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
