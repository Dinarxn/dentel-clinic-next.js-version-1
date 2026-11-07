/**
 * Tier 3: Cross-Feature Combinations & State Transitions
 * Validates cross-page data consistency, dynamic client rebrandability,
 * and mobile navigation state transitions.
 */

import { TestSuite, assert } from './runner.mjs';
import {
  inspectClinicConfig,
  readSourceFile,
  fileExists,
} from './utils/static-ast.mjs';
import {
  buildWhatsAppUrl,
  buildTelLink,
} from './utils/validators.mjs';
import { mockRebrandedClinicConfig } from './fixtures/clinic-config.mock.mjs';

export function createTier3Suite() {
  const suite = new TestSuite('Tier 3: Cross-Feature Combinations', { tier: 3 });

  // 1. Treatment Card -> Dynamic Treatment Detail Data Consistency
  suite.test('Cross-Route Consistency: Treatment slugs match catalog and dynamic route contract', () => {
    const config = inspectClinicConfig();
    assert.greaterThanOrEqual(config.slugs.length, 6, 'Must have at least 6 treatments configured');

    const dynamicRoutePath = 'src/app/treatments/[slug]/page.tsx';
    if (!fileExists(dynamicRoutePath)) {
      assert.pendingMilestone('M4', `${dynamicRoutePath} scheduled for Milestone 4`);
    }

    const routeContent = readSourceFile(dynamicRoutePath);
    assert.includes(routeContent, 'generateStaticParams', 'Treatment detail page must export generateStaticParams');
    assert.includes(routeContent, 'generateMetadata', 'Treatment detail page must export dynamic generateMetadata');

    // Each slug from config must be valid
    for (const slug of config.slugs) {
      assert.match(slug, /^[a-z0-9\-]+$/, `Slug "${slug}" must be URL-safe kebab-case`);
    }
  }, { milestone: 'M4', featureId: 23 });

  // 2. Doctor Profile Spotlight (Home) ↔ Dedicated Doctor Page Consistency
  suite.test('Cross-Page Consistency: Doctor identity and demo disclaimer aligned between Home and /doctor', () => {
    const config = inspectClinicConfig();
    assert.ok(config.hasDoctorMehta, 'Doctor Mehta must be defined in single source of truth');

    const doctorPagePath = 'src/app/doctor/page.tsx';
    if (!fileExists(doctorPagePath)) {
      assert.pendingMilestone('M4', `${doctorPagePath} scheduled for Milestone 4`);
    }

    const doctorPageContent = readSourceFile(doctorPagePath);
    assert.includes(doctorPageContent, 'clinicConfig.doctor', 'Doctor page must consume clinicConfig.doctor directly');
    assert.includes(doctorPageContent, 'demoDisclaimer', 'Doctor page must render the demonstration disclaimer');
  }, { milestone: 'M4', featureId: 24 });

  // 3. Centralized Rebranding Engine: Dynamic Reflection Across Pages
  suite.test('Rebranding Architecture: Updating clinicConfig updates all phone, WhatsApp, and identity links', () => {
    // Test that the helper functions and URLs dynamically adapt to new clinic configuration data
    const mock = mockRebrandedClinicConfig;
    
    // Test identity
    assert.equal(mock.identity.name, 'Apex Dental Studio');
    assert.equal(mock.identity.phone.display, '+91 99887 76655');

    // Test dynamic tel: link generation
    const telLink = buildTelLink(mock.identity.phone.dialable);
    assert.equal(telLink, 'tel:+919988776655', 'Rebranded dialable phone updates tel: link correctly');

    // Test dynamic WhatsApp URL generation
    const whatsappUrl = buildWhatsAppUrl(mock.identity.whatsapp.cleanDigits, mock.identity.whatsapp.defaultMessage);
    assert.includes(whatsappUrl, '919988776655', 'Rebranded WhatsApp URL points to new clinic digits');
    assert.includes(whatsappUrl, 'Apex%20Dental%20Studio', 'Rebranded WhatsApp text includes new clinic name');

    // Verify config isolation: config does not hardcode markup, only pure typed metadata
    assert.ok(typeof mock.identity.address.fullFormatted === 'string');
    assert.includes(mock.identity.address.fullFormatted, 'Bengaluru');
  }, { milestone: 'M1', featureId: 27 });

  // 4. Mobile Navigation Drawer State Transitions (Milestone 2)
  suite.test('Navigation State: Mobile drawer supports accessible open/close state transitions', () => {
    const mobileNavPath = 'src/components/layout/MobileNavigation.tsx';
    if (!fileExists(mobileNavPath)) {
      assert.pendingMilestone('M2', `${mobileNavPath} scheduled for Milestone 2`);
    }

    const content = readSourceFile(mobileNavPath);
    assert.includes(content, 'isOpen', 'Mobile drawer must manage open/close state');
    assert.includes(content, 'onClose', 'Mobile drawer must provide close handler');
    
    // Accessibility requirements
    const hasAria = /aria-expanded|aria-modal|aria-hidden/i.test(content);
    assert.ok(hasAria, 'Mobile drawer must implement accessible ARIA state attributes');
  }, { milestone: 'M2', featureId: 6 });

  return suite;
}
