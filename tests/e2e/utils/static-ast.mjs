/**
 * Opaque-Box Static and AST Inspectors
 * Validates file structure, CSS theme tokens, config exports, and code contracts
 */

import fs from 'node:fs';
import path from 'node:path';

export const PROJECT_ROOT = path.resolve(process.cwd());
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');

/**
 * Checks whether a given relative file path exists under PROJECT_ROOT
 * @param {string} relativePath 
 * @returns {boolean}
 */
export function fileExists(relativePath) {
  return fs.existsSync(path.join(PROJECT_ROOT, relativePath));
}

/**
 * Reads a text file safely
 * @param {string} relativePath 
 * @returns {string|null}
 */
export function readSourceFile(relativePath) {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Inspects src/app/globals.css for CSS theme tokens
 * @returns {{
 *   raw: string,
 *   hasIvory: boolean,
 *   hasNavy: boolean,
 *   hasGold: boolean,
 *   tokens: Record<string, string>,
 *   bodyOverflowHidden: boolean
 * }}
 */
export function inspectCssThemeTokens() {
  const css = readSourceFile('src/app/globals.css');
  if (!css) return { raw: '', hasIvory: false, hasNavy: false, hasGold: false, tokens: {}, bodyOverflowHidden: false };

  const tokens = {};
  const tokenRegex = /--([a-zA-Z0-9\-_]+):\s*([^;]+);/g;
  let match;
  while ((match = tokenRegex.exec(css)) !== null) {
    tokens[match[1]] = match[2].trim();
  }

  const hasIvory = css.includes('#F7F5F0') || Object.values(tokens).some(v => v.includes('#F7F5F0'));
  const hasNavy = css.includes('#17324D') || Object.values(tokens).some(v => v.includes('#17324D'));
  const hasGold = css.includes('#C49A59') || Object.values(tokens).some(v => v.includes('#C49A59'));
  const bodyOverflowHidden = /overflow-x:\s*hidden/.test(css);

  return {
    raw: css,
    hasIvory,
    hasNavy,
    hasGold,
    tokens,
    bodyOverflowHidden,
  };
}

/**
 * Inspects RootLayout in src/app/layout.tsx for mobile collision prevention padding
 * @returns {{
 *   hasPb24: boolean,
 *   hasMdPb0: boolean,
 *   hasViewportExport: boolean,
 *   hasMetadataExport: boolean
 * }}
 */
export function inspectRootLayout() {
  const layoutContent = readSourceFile('src/app/layout.tsx');
  if (!layoutContent) {
    return { hasPb24: false, hasMdPb0: false, hasViewportExport: false, hasMetadataExport: false };
  }

  const hasPb24 = layoutContent.includes('pb-24');
  const hasMdPb0 = layoutContent.includes('md:pb-0');
  const hasViewportExport = layoutContent.includes('export const viewport');
  const hasMetadataExport = layoutContent.includes('export const metadata');

  return {
    hasPb24,
    hasMdPb0,
    hasViewportExport,
    hasMetadataExport,
  };
}

/**
 * Inspects clinic.config.ts for required schema fields
 * @returns {{
 *   raw: string,
 *   hasIdentity: boolean,
 *   hasBandraAddress: boolean,
 *   hasDoctorMehta: boolean,
 *   hasTreatmentsCatalog: boolean,
 *   treatmentCount: number,
 *   hasDemoDisclaimers: boolean,
 *   phoneDisplay: string|null,
 *   phoneDialable: string|null,
 *   whatsappPrefilledUrl: string|null,
 *   slugs: string[]
 * }}
 */
export function inspectClinicConfig() {
  const config = readSourceFile('src/config/clinic.config.ts');
  if (!config) {
    return {
      raw: '',
      hasIdentity: false,
      hasBandraAddress: false,
      hasDoctorMehta: false,
      hasTreatmentsCatalog: false,
      treatmentCount: 0,
      hasDemoDisclaimers: false,
      phoneDisplay: null,
      phoneDialable: null,
      whatsappPrefilledUrl: null,
      slugs: [],
    };
  }

  const hasIdentity = config.includes('identity:') && config.includes('Lumière Dental Studio');
  const hasBandraAddress = config.includes('Bandra West') && config.includes('Mumbai') && config.includes('400050');
  const hasDoctorMehta = config.includes('Dr. Aanya Mehta');
  const hasDemoDisclaimers = config.includes('demoDisclaimers:') && config.includes('navbarBanner') && config.includes('footerNotice');

  // Slugs
  const slugMatches = [...config.matchAll(/slug:\s*["']([^"']+)["']/g)];
  const slugs = [...new Set(slugMatches.map(m => m[1]))];

  // Extract phone display
  const phoneDisplayMatch = config.match(/display:\s*["']([^"']+)["']/);
  const phoneDialableMatch = config.match(/dialable:\s*["']([^"']+)["']/);
  const whatsappUrlMatch = config.match(/prefilledUrl:\s*["']([^"']+)["']/);

  return {
    raw: config,
    hasIdentity,
    hasBandraAddress,
    hasDoctorMehta,
    hasTreatmentsCatalog: slugs.length >= 6,
    treatmentCount: slugs.length,
    hasDemoDisclaimers,
    phoneDisplay: phoneDisplayMatch ? phoneDisplayMatch[1] : null,
    phoneDialable: phoneDialableMatch ? phoneDialableMatch[1] : null,
    whatsappPrefilledUrl: whatsappUrlMatch ? whatsappUrlMatch[1] : null,
    slugs,
  };
}

/**
 * Scans codebase for demonstration disclaimers and checks absence of fake reviews / fake claims
 * @param {string[]} paths Array of relative paths to check
 */
export function auditContentIntegrity(paths = ['src/config/clinic.config.ts', 'src/app/layout.tsx', 'src/app/page.tsx']) {
  let combinedContent = '';
  for (const p of paths) {
    const fileText = readSourceFile(p);
    if (fileText) combinedContent += '\n' + fileText;
  }

  // Check presence of demo disclaimers
  const hasDemonstrationNotice = /demonstration|prototype|demo/i.test(combinedContent);

  // Check strict absence of prohibited fake elements:
  // - fake patient reviews / testimonials ("5 stars", "verified patient", "happy patient reviews")
  // - fake confirmed booking messages ("Your appointment is confirmed for")
  const hasFakeStarRatings = /(5\.0\s*stars|\b5\/5\s*stars|★★★★★)/i.test(combinedContent);
  const hasFakePatientTestimonials = /(patient reviews|what our patients say|verified patient review)/i.test(combinedContent);
  const hasFakeConfirmedBooking = /appointment is confirmed for/i.test(combinedContent);

  return {
    hasDemonstrationNotice,
    hasFakeStarRatings,
    hasFakePatientTestimonials,
    hasFakeConfirmedBooking,
    isCompliant: hasDemonstrationNotice && !hasFakeStarRatings && !hasFakePatientTestimonials && !hasFakeConfirmedBooking,
  };
}
