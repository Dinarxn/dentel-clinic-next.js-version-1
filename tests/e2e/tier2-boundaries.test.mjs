/**
 * Tier 2: Boundary, Viewport & Validation Edge Cases
 * Validates mobile layout safety, adversarial phone inputs, min-date limits,
 * 404 slug handling, and ethical content shields.
 */

import { TestSuite, assert } from './runner.mjs';
import {
  inspectRootLayout,
  inspectCssThemeTokens,
  inspectClinicConfig,
  auditContentIntegrity,
  readSourceFile,
  fileExists,
} from './utils/static-ast.mjs';
import {
  validateIndianPhone,
  validateAppointmentDate,
  validateAppointmentSubmission,
} from './utils/validators.mjs';
import {
  adversarialPhoneCases,
  adversarialDateCases,
} from './fixtures/inquiry-payloads.mjs';

export function createTier2Suite() {
  const suite = new TestSuite('Tier 2: Boundary & Corner Cases', { tier: 2 });

  // 1. Mobile Viewports Layout Safety (320px to 430px)
  suite.test('Mobile Viewport Safety: pb-24 collision prevention and overflow-x prevention', () => {
    const layout = inspectRootLayout();
    assert.ok(layout.hasPb24, 'Root layout container must specify pb-24 padding for mobile viewports');
    assert.ok(layout.hasMdPb0, 'Padding must collapse to md:pb-0 on desktop viewports');

    const cssTokens = inspectCssThemeTokens();
    assert.ok(cssTokens.bodyOverflowHidden, 'globals.css must apply overflow-x: hidden to prevent horizontal scrolling on 320px screens');
  }, { milestone: 'M1', featureId: 20 });

  // 2. Indian Phone Input Validation (Adversarial Matrix)
  suite.test('Phone Validation: Strict 10-digit Indian mobile regex (/^[6-9]\\d{9}$/)', () => {
    for (const testCase of adversarialPhoneCases) {
      const result = validateIndianPhone(testCase.input);
      if (testCase.expectedValid) {
        assert.ok(
          result.isValid,
          `Expected input "${testCase.input}" (${testCase.reason}) to be valid, but got error: ${result.error}`
        );
        if (testCase.expectedClean) {
          assert.equal(
            result.sanitized,
            testCase.expectedClean,
            `Expected sanitized number to be ${testCase.expectedClean}, got ${result.sanitized}`
          );
        }
      } else {
        assert.ok(
          !result.isValid,
          `Expected input "${testCase.input}" (${testCase.reason}) to be rejected, but it was marked valid`
        );
        assert.ok(result.error && result.error.length > 0, `Error message must be present for invalid input "${testCase.input}"`);
      }
    }
  }, { milestone: 'M1', featureId: 27 });

  // 3. Date Picker Min-Date Validation (Past Date Rejection)
  suite.test('Date Validation: Min-date validation rejects past dates and accepts today/future', () => {
    for (const testCase of adversarialDateCases) {
      const result = validateAppointmentDate(testCase.date);
      if (testCase.expectedValid) {
        assert.ok(
          result.isValid,
          `Expected date "${testCase.date}" (${testCase.description}) to be valid, but got error: ${result.error}`
        );
      } else {
        assert.ok(
          !result.isValid,
          `Expected date "${testCase.date}" (${testCase.description}) to be rejected, but it was accepted`
        );
        assert.ok(result.error && result.error.length > 0, `Error message must be present for rejected date "${testCase.date}"`);
      }
    }
  }, { milestone: 'M1', featureId: 27 });

  // 4. Invalid Treatment Slug Handling (404 / notFound)
  suite.test('Dynamic Routing: Invalid treatment slug triggers Next.js notFound()', () => {
    const config = inspectClinicConfig();
    assert.ok(config.slugs.length > 0, 'Config must provide valid treatment slugs');

    // Test slug resolution logic
    const validSlug = config.slugs[0];
    const invalidSlugs = ['laser-teeth-surgery-fake', 'not-a-treatment', 'root-canal-instant-cure', ''];

    // Read getTreatmentBySlug implementation or verify function
    const configFile = readSourceFile('src/config/clinic.config.ts');
    assert.includes(configFile, 'getTreatmentBySlug', 'clinic.config.ts must export getTreatmentBySlug helper');

    // Dynamic route contract verification
    const dynamicRoutePath = 'src/app/treatments/[slug]/page.tsx';
    if (!fileExists(dynamicRoutePath)) {
      assert.pendingMilestone('M4', `${dynamicRoutePath} scheduled for Milestone 4`);
    }

    const routeContent = readSourceFile(dynamicRoutePath);
    assert.includes(routeContent, 'notFound', 'Treatment detail page must invoke notFound() when slug is invalid');
  }, { milestone: 'M4', featureId: 23 });

  // 5. Demonstration Disclaimers Presence Across 4 Surfaces
  suite.test('Integrity Shield: Demonstration notices present across Navbar, Footer, Doctor, and Form', () => {
    const config = inspectClinicConfig();
    assert.ok(config.hasDemoDisclaimers, 'clinic.config.ts must define demoDisclaimers');

    const raw = config.raw;
    assert.includes(raw, 'navbarBanner', 'Navbar demonstration banner text must be defined');
    assert.includes(raw, 'footerNotice', 'Footer demonstration notice text must be defined');
    assert.includes(raw, 'formNotice', 'Appointment form demonstration notice text must be defined');
    assert.includes(raw, 'doctorNotice', 'Doctor profile demonstration notice text must be defined');

    // Verify notices explicitly state demonstration status
    assert.match(raw, /demonstration|prototype/i, 'Disclaimers must use "demonstration" or "prototype" wording');
  }, { milestone: 'M1', featureId: 29 });

  // 6. Ethical Content Shield: Prohibition of Fake Reviews and Fake Confirmed Bookings
  suite.test('Integrity Shield: Prohibition of fake patient reviews, fake stars, and fake bookings', () => {
    const audit = auditContentIntegrity();
    assert.ok(audit.hasDemonstrationNotice, 'Demonstration notice must be prominently present');
    assert.ok(!audit.hasFakeStarRatings, 'Strictly NO fake 5-star rating badges');
    assert.ok(!audit.hasFakePatientTestimonials, 'Strictly NO fabricated patient reviews or testimonials');
    assert.ok(!audit.hasFakeConfirmedBooking, 'Strictly NO fake "Your appointment is confirmed" confirmation');
    assert.ok(audit.isCompliant, 'Codebase must pass the Ethical Content Integrity Shield');
  }, { milestone: 'M1', featureId: 29 });

  // 7. Form Submission Demo Interception Contract
  suite.test('Form Submission: Valid submission triggers Demo Validation Modal, not fake booking', () => {
    const submissionResult = validateAppointmentSubmission({
      fullName: 'Dr. Rahul Verma',
      phoneNumber: '9820012345',
      preferredTreatment: 'porcelain-veneers',
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      message: 'Demo inquiry message',
    });

    assert.ok(submissionResult.isValid, 'Form submission must be valid');
    assert.ok(submissionResult.isDemoMode, 'Submission must operate in isDemoMode');
    assert.ok(submissionResult.demoModal !== null, 'Demo modal payload must be generated');
    assert.equal(submissionResult.isRealConfirmedBooking, false, 'Must never produce a fake confirmed booking');
    assert.includes(submissionResult.demoModal.notice, 'Demonstration Preview', 'Modal must explain demonstration status');
  }, { milestone: 'M1', featureId: 27 });

  return suite;
}
