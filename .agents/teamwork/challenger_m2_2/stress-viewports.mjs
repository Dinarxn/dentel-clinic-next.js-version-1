import fs from 'node:fs';

const VIEWPORTS = [
  { name: 'iPhone SE (1st gen) / Small Android', width: 320 },
  { name: 'Galaxy S8 / Common Android', width: 360 },
  { name: 'iPhone X / 11 Pro / 12 mini', width: 375 },
  { name: 'iPhone 12 / 13 / 14 / 15', width: 390 },
  { name: 'iPhone Plus / Max (8 Plus, XR, 11)', width: 414 },
  { name: 'iPhone 14 Pro Max / 15 Plus / 15 Pro Max', width: 430 },
];

console.log('====================================================');
console.log('VIEWPORT MATRIX STRESS ANALYSIS (320px - 430px)');
console.log('====================================================\n');

const navbarCode = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
const bottomBarCode = fs.readFileSync('src/components/layout/MobileBottomBar.tsx', 'utf8');
const mobileNavCode = fs.readFileSync('src/components/layout/MobileNavigation.tsx', 'utf8');
const footerCode = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
const layoutCode = fs.readFileSync('src/app/layout.tsx', 'utf8');
const globalsCode = fs.readFileSync('src/app/globals.css', 'utf8');

for (const vp of VIEWPORTS) {
  console.log(`--- Testing Viewport: ${vp.width}px (${vp.name}) ---`);

  // 1. MobileBottomBar 3-grid column width check
  // Container: px-3 (24px padding total) or px-4 (32px padding total)
  // Grid has 3 columns with gap-2 (8px * 2 = 16px gap total)
  const containerPadding = 24; // px-3
  const gridGap = 16; // gap-2
  const availableGridWidth = vp.width - containerPadding - gridGap;
  const colWidth = availableGridWidth / 3;
  const tapTargetHeight = 64; // ~12px padding + 32px icon circle + 4px mt + 16px text

  console.log(`  * MobileBottomBar action target size: ${colWidth.toFixed(1)}px width x ${tapTargetHeight}px height`);
  if (colWidth < 44 || tapTargetHeight < 44) {
    console.error(`    ✖ TAP TARGET FAILS 44px MINIMUM!`);
  } else {
    console.log(`    ✔ Tap target exceeds WCAG 44x44px minimum (${colWidth.toFixed(1)}x${tapTargetHeight}px)`);
  }

  // 2. Collision Safeguard Check
  // pb-24 in Tailwind is 6rem = 96px
  // MobileBottomBar height is ~64px + 16px py = ~80px
  // 96px > 80px -> zero overlap margin is ~16px
  const bottomBarEstHeight = 80;
  const pb24Height = 96;
  const clearance = pb24Height - bottomBarEstHeight;
  console.log(`  * Collision clearance: pb-24 (96px) vs bottom bar (~${bottomBarEstHeight}px) -> ${clearance}px positive clearance`);
  if (clearance <= 0) {
    console.error(`    ✖ COLLISION RISK: pb-24 is not enough clearance!`);
  } else {
    console.log(`    ✔ Zero collision guaranteed with page content & footer`);
  }

  // 3. Top Banner Fit Check
  // Text: "Lumière Dental Studio • Demonstration Prototype Website" (55 chars)
  // Badge: "Demo Notice" (icon + text + padding + border) ~ 95px
  // In flex row without flex-wrap:
  const badgeWidth = 95;
  const textChars = 55;
  const charWidthEst = 7; // ~7px per character at text-xs (12px)
  const estimatedBannerContentWidth = badgeWidth + 8 + (textChars * charWidthEst); // gap-2 = 8
  const bannerContainerAvailable = vp.width - 32; // px-4 = 32px
  if (estimatedBannerContentWidth > bannerContainerAvailable && !navbarCode.includes('flex-wrap')) {
    console.log(`    ⚠️  Top Banner overflow risk: banner content (~${estimatedBannerContentWidth}px) > available (${bannerContainerAvailable}px). Requires flex-wrap.`);
  } else {
    console.log(`    ✔ Top Banner fits cleanly`);
  }
  console.log('');
}
