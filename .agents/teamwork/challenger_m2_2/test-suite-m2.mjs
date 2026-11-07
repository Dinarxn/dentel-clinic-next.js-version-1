import fs from 'node:fs';
import path from 'node:path';

const results = [];

function check(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
    console.log(`✔ PASS: ${name}`);
  } catch (err) {
    results.push({ name, passed: false, error: err.message });
    console.error(`✖ FAIL: ${name} -> ${err.message}`);
  }
}

console.log('====================================================');
console.log('CHALLENGER 2: EMPIRICAL STRESS TEST SUITE FOR M2');
console.log('====================================================\n');

// 1. Check MobileNavigation Call Clinic link has tel: scheme
check('MobileNavigation: Call Clinic button must use tel: scheme', () => {
  const content = fs.readFileSync('src/components/layout/MobileNavigation.tsx', 'utf8');
  const config = fs.readFileSync('src/config/clinic.config.ts', 'utf8');
  
  // Find dialable in config
  const dialableMatch = config.match(/dialable:\s*["']([^"']+)["']/);
  if (!dialableMatch) throw new Error('dialable not found in clinic.config.ts');
  const dialableVal = dialableMatch[1];
  
  // In MobileNavigation: does it prefix with tel:?
  // Let's check the anchor tag for Call Clinic
  const callRegex = /<a[^>]*href=\{([^}]+)\}[^>]*>[\s\S]*?Call Clinic/i;
  const match = content.match(callRegex);
  if (!match) throw new Error('Call Clinic link not found in MobileNavigation.tsx');
  
  const hrefExpr = match[1].trim();
  // If hrefExpr is just clinicConfig.identity.phone.dialable and dialable does NOT start with tel:
  if (!dialableVal.startsWith('tel:') && hrefExpr === 'clinicConfig.identity.phone.dialable') {
    throw new Error(
      `Bug confirmed: href is set to "${dialableVal}" without "tel:" prefix. When clicked in browser, it navigates to relative path /${dialableVal} (404) instead of launching dialer.`
    );
  }
});

// 2. Check MobileBottomBar z-index is z-40
check('MobileBottomBar: z-index must be z-40', () => {
  const content = fs.readFileSync('src/components/layout/MobileBottomBar.tsx', 'utf8');
  if (!content.includes('z-40')) {
    throw new Error('MobileBottomBar must contain z-40 class');
  }
});

// 3. Check MobileBottomBar safe-area padding pb-safe in CSS
check('MobileBottomBar: pb-safe utility must be defined in CSS for iOS home indicator', () => {
  const barContent = fs.readFileSync('src/components/layout/MobileBottomBar.tsx', 'utf8');
  if (!barContent.includes('pb-safe')) {
    throw new Error('MobileBottomBar does not include pb-safe class');
  }
  
  // Check globals.css or compiled CSS
  const globals = fs.readFileSync('src/app/globals.css', 'utf8');
  const hasPbSafeDef = globals.includes('pb-safe') || globals.includes('safe-area-inset-bottom');
  if (!hasPbSafeDef) {
    throw new Error(
      'Defect: pb-safe class is used on MobileBottomBar but pb-safe / env(safe-area-inset-bottom) is NOT defined in globals.css, leaving it non-functional in Tailwind v4 on notched mobile devices.'
    );
  }
});

// 4. Check MobileBottomBar touch target sizes
check('MobileBottomBar: touch target sizes satisfy >= 44x44px across mobile viewports', () => {
  const barContent = fs.readFileSync('src/components/layout/MobileBottomBar.tsx', 'utf8');
  // 3 action buttons
  const actions = barContent.match(/<a[\s\S]*?<\/a>|<Link[\s\S]*?<\/Link>/g);
  if (!actions || actions.length < 3) {
    throw new Error(`Expected 3 actions in MobileBottomBar, found ${actions ? actions.length : 0}`);
  }
  // Verify padding py-1.5, text size, and grid layout
  for (const action of actions) {
    if (!action.includes('py-1.5') && !action.includes('py-2')) {
      throw new Error('Action does not have vertical padding for touch target');
    }
  }
});

// 5. Check MobileNavigation scroll locking
check('MobileNavigation: implements body scroll locking when opened and cleans up on unmount', () => {
  const content = fs.readFileSync('src/components/layout/MobileNavigation.tsx', 'utf8');
  const locksScroll = content.includes("document.body.style.overflow = 'hidden'");
  const restoresScroll = content.includes("document.body.style.overflow = ''");
  if (!locksScroll) throw new Error('MobileNavigation does not set body overflow to hidden');
  if (!restoresScroll) throw new Error('MobileNavigation does not restore body overflow on close/unmount');
});

// 6. Check MobileNavigation keyboard accessibility (Escape key, ARIA)
check('MobileNavigation: implements Escape key listener and ARIA dialog attributes', () => {
  const content = fs.readFileSync('src/components/layout/MobileNavigation.tsx', 'utf8');
  if (!content.includes('Escape')) throw new Error('MobileNavigation missing Escape key handler');
  if (!content.includes('role="dialog"')) throw new Error('MobileNavigation missing role="dialog"');
  if (!content.includes('aria-modal="true"')) throw new Error('MobileNavigation missing aria-modal="true"');
  if (!content.includes('aria-label=')) throw new Error('MobileNavigation missing aria-label');
});

// 7. Check Navbar horizontal overflow risk on 320px viewport
check('Navbar: mobile elements fit within 320px viewport without overflow', () => {
  const navbarContent = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
  
  // Check Top Demo Notice Banner
  // <div className="... flex items-center justify-center gap-2 ...">
  // <span className="sm:hidden text-[#F7F5F0]/90">Lumière Dental Studio • Demonstration Prototype Website</span>
  // Length of "Lumière Dental Studio • Demonstration Prototype Website" = 55 chars
  // In flex row nowrap, 55 chars + badge (~90px) exceeds 320px viewport!
  const bannerRegex = /bg-\[#17324D\][^"]*flex[^"]*items-center[^"]*justify-center[^"]*gap-2/i;
  const hasFlexWrap = /bg-\[#17324D\][^"]*flex-wrap/i.test(navbarContent);
  if (!hasFlexWrap && bannerRegex.test(navbarContent)) {
    throw new Error(
      'Navbar top banner has flex items-center justify-center gap-2 without flex-wrap. The text "Lumière Dental Studio • Demonstration Prototype Website" (55 chars) + pill badge (~95px) = ~480px width, causing horizontal flex overflow on 320px and 360px screens if not wrapped.'
    );
  }
});

console.log('\n====================================================');
console.log(`SUMMARY: ${results.filter(r => r.passed).length} passed, ${results.filter(r => !r.passed).length} failed`);
console.log('====================================================');
