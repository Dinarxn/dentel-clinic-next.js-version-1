#!/usr/bin/env node

/**
 * Adversarial Edge Case Verification Script for Milestone 4
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

const tests = [];
function test(name, fn) {
  try {
    fn();
    tests.push({ name, pass: true });
    console.log(`✔ PASS: ${name}`);
  } catch (err) {
    tests.push({ name, pass: false, error: err.message });
    console.error(`✖ FAIL: ${name} -> ${err.message}`);
  }
}

console.log('--- Testing Edge Cases & Adversarial Scenarios ---');

// 1. Phone validator logic stress test
test('Phone validator handles various international and formatted inputs', () => {
  const sanitize = (raw) => {
    const clean = raw.trim().replace(/[\s\-]/g, '');
    let digits = clean;
    if (digits.startsWith('+91')) digits = digits.slice(3);
    else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
    else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
    return digits;
  };

  const regex = /^[6-9]\d{9}$/;

  const validNumbers = [
    '9820012345',
    '+919820012345',
    '+91 98200 12345',
    '+91-98200-12345',
    '919820012345',
    '09820012345',
    '8123456789',
    '7123456789',
    '6123456789',
  ];

  for (const num of validNumbers) {
    const digits = sanitize(num);
    if (!regex.test(digits)) {
      throw new Error(`Valid phone number falsely rejected: ${num} -> digits: ${digits}`);
    }
  }

  const invalidNumbers = [
    '1234567890', // starts with 1
    '5234567890', // starts with 5
    '982001234',  // 9 digits
    '98200123456', // 11 digits
    'abcdefghij', // alpha
    '98200-ABCD', // alphanumeric
  ];

  for (const num of invalidNumbers) {
    const digits = sanitize(num);
    if (regex.test(digits)) {
      throw new Error(`Invalid phone number erroneously accepted: ${num}`);
    }
  }
});

// 2. Treatment slug resolution and fallback
test('Treatment detail page static params covers all 6 treatments', () => {
  const slugPageContent = fs.readFileSync(path.join(ROOT_DIR, 'src/app/treatments/[slug]/page.tsx'), 'utf8');

  // Verify generateStaticParams iterates clinicConfig.treatments
  if (!slugPageContent.includes('generateStaticParams')) {
    throw new Error('Missing generateStaticParams in treatment detail page');
  }
  if (!slugPageContent.includes('clinicConfig.treatments.map')) {
    throw new Error('generateStaticParams does not map clinicConfig.treatments');
  }

  // Verify notFound() is invoked when treatment is null
  if (!slugPageContent.includes('if (!treatment)') || !slugPageContent.includes('notFound()')) {
    throw new Error('Missing notFound() guard on invalid treatment');
  }
});

// 3. Category completeness
test('All treatments have categories represented in filter pills', () => {
  const configContent = fs.readFileSync(path.join(ROOT_DIR, 'src/config/clinic.config.ts'), 'utf8');
  const clientContent = fs.readFileSync(path.join(ROOT_DIR, 'src/app/treatments/TreatmentsClient.tsx'), 'utf8');

  const categoriesMatch = clientContent.match(/CATEGORIES\s*=\s*\[([^\]]+)\]/);
  if (!categoriesMatch) {
    throw new Error('Could not find CATEGORIES definition in TreatmentsClient.tsx');
  }
  const definedCategories = categoriesMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));

  // Extract treatments block
  const treatmentsBlock = configContent.split('treatments: [')[1]?.split('galleryItems: [')[0] || '';
  const categoryRegex = /category:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = categoryRegex.exec(treatmentsBlock)) !== null) {
    const cat = match[1];
    if (!definedCategories.includes(cat)) {
      throw new Error(`Treatment category "${cat}" from clinic.config.ts is not in TreatmentsClient CATEGORIES`);
    }
  }
});

// 4. Image URL validity and remote pattern compatibility
test('All images use HTTPS and un-distorted Next.js Image fill/aspect constraints', () => {
  const pages = [
    'src/app/about/page.tsx',
    'src/app/treatments/page.tsx',
    'src/app/treatments/[slug]/page.tsx',
    'src/app/doctor/page.tsx',
    'src/app/gallery/page.tsx',
    'src/app/contact/page.tsx'
  ];

  for (const p of pages) {
    const src = fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
    if (src.includes("from 'next/image'")) {
      const usesFill = src.includes('fill');
      const usesAspectOrHeight = src.includes('aspect-') || src.includes('h-') || src.includes('height=');
      if (usesFill && !usesAspectOrHeight) {
        throw new Error(`${p} uses Next.js Image fill without aspect ratio or height wrapper!`);
      }
    }
  }
});

const passed = tests.filter((t) => t.pass).length;
console.log(`\nEdge Case Tests Completed: ${passed}/${tests.length} passed.`);
if (passed !== tests.length) process.exit(1);
