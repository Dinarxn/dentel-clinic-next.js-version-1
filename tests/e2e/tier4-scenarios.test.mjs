/**
 * Tier 4: Real-World Clinical Application Scenarios
 * Simulates complete end-to-end patient discovery, emergency contact,
 * and WhatsApp concierge conversion journeys.
 */

import { TestSuite, assert } from './runner.mjs';
import {
  inspectClinicConfig,
  readSourceFile,
  fileExists,
} from './utils/static-ast.mjs';
import {
  validateAppointmentSubmission,
  buildWhatsAppUrl,
  buildTelLink,
} from './utils/validators.mjs';

export function createTier4Suite() {
  const suite = new TestSuite('Tier 4: Real-World Application Scenarios', { tier: 4 });

  // Scenario 1: End-to-End Patient Inquiry Journey (Cosmetic Smile Makeover)
  suite.test('Scenario 1: Full Patient Journey — Home -> Veneers -> Detail -> Consultation -> Demo Modal', () => {
    const config = inspectClinicConfig();
    assert.ok(config.hasIdentity, 'Clinic identity is active');

    // 1. Patient lands on Home, discovers Porcelain Veneers
    const veneerSlug = config.slugs.find(s => s.includes('veneer'));
    assert.ok(veneerSlug, 'Porcelain veneers treatment must exist in catalog');

    // 2. Patient visits dynamic detail route: /treatments/[slug]
    const treatmentDetailPath = 'src/app/treatments/[slug]/page.tsx';
    if (!fileExists(treatmentDetailPath)) {
      // Logic test still proceeds with simulated data
      console.log('    (Note: src/app/treatments/[slug]/page.tsx will be fully rendered in M4)');
    }

    // 3. Patient initiates booking inquiry
    const inquiryPayload = {
      fullName: 'Priya Sharma',
      phoneNumber: '9820012345',
      email: 'priya.sharma@example.com',
      preferredTreatment: veneerSlug,
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days ahead
      preferredTime: 'Morning: 9:00 AM – 1:00 PM',
      message: 'Looking for consultation regarding porcelain veneers for upper front teeth.',
    };

    // 4. Form validates inquiry
    const validationOutcome = validateAppointmentSubmission(inquiryPayload);
    assert.ok(validationOutcome.isValid, 'Validation must succeed for valid Mumbai patient inquiry');

    // 5. System triggers Demonstration Notice Modal, never fake confirmation
    assert.ok(validationOutcome.isDemoMode, 'Submission must execute in demo mode');
    assert.ok(validationOutcome.demoModal !== null, 'Demo modal must be populated');
    assert.equal(validationOutcome.isRealConfirmedBooking, false, 'Must never produce a fake confirmed booking');
    assert.equal(validationOutcome.demoModal.simulatedPayload.phoneNumber, '9820012345');
    assert.equal(validationOutcome.demoModal.simulatedPayload.preferredTreatment, veneerSlug);
  }, { milestone: 'M1', featureId: 27 });

  // Scenario 2: Direct Mobile Emergency Contact Journey
  suite.test('Scenario 2: Mobile Emergency Journey — 390px Viewport -> Fixed Bar -> tel:+919820012345', () => {
    const config = inspectClinicConfig();
    assert.ok(config.phoneDialable, 'Dialable phone number must be configured');

    // Verify direct tel: action
    const expectedTel = buildTelLink(config.phoneDialable);
    assert.equal(expectedTel, 'tel:+919820012345', 'Dialer action must invoke +91 98200 12345');

    // Verify mobile collision clearance
    const layoutContent = readSourceFile('src/app/layout.tsx');
    assert.ok(layoutContent.includes('pb-24'), 'Mobile layout must have pb-24 clearance for persistent action bar');
  }, { milestone: 'M1', featureId: 7 });

  // Scenario 3: WhatsApp Concierge Lead Capture Journey
  suite.test('Scenario 3: WhatsApp Concierge Journey — Instant Lead Capture with Prefilled Intent', () => {
    const config = inspectClinicConfig();
    assert.ok(config.whatsappPrefilledUrl, 'WhatsApp prefilled URL must be present');

    const expectedGreeting = 'Hello, I would like to enquire about a dental appointment';
    const canonicalUrl = buildWhatsAppUrl('919820012345', expectedGreeting);

    assert.equal(
      config.whatsappPrefilledUrl,
      canonicalUrl,
      'WhatsApp concierge trigger must match canonical Click-to-Chat URL format'
    );

    // Verify proper encoding of spaces and commas
    assert.includes(config.whatsappPrefilledUrl, '%20', 'Spaces must be percent-encoded (%20)');
    assert.includes(config.whatsappPrefilledUrl, '%2C', 'Commas must be percent-encoded (%2C)');
  }, { milestone: 'M1', featureId: 8 });

  return suite;
}
