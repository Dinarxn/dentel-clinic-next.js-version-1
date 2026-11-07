#!/usr/bin/env node

/**
 * Tier 5: Viewport Matrix & Overflow Stress Test Engine
 * Lumière Dental Studio
 *
 * Empirically tests all 7 pages across 9 required viewports:
 * 320px, 360px, 375px, 390px, 414px, 430px, 768px, 1024px, 1440px
 *
 * Verifications:
 * 1. Horizontal overflow hazards (scrollWidth <= innerWidth).
 * 2. Mobile touch target dimensions (<768px meet >=44px guidelines).
 * 3. Collision-free root padding (pb-24 md:pb-0 protecting MobileBottomBar from obscuring content/footer).
 *
 * Supports:
 * - Dynamic browser rendering via Microsoft Edge Headless (CDP)
 * - Static prerendered HTML/CSS structural audit
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');

export const REQUIRED_VIEWPORTS = [
  { width: 320, height: 568, name: '320px (XS Mobile - iPhone SE 1st Gen)' },
  { width: 360, height: 640, name: '360px (Compact Android)' },
  { width: 375, height: 667, name: '375px (iPhone SE 2/3 / iPhone 8)' },
  { width: 390, height: 844, name: '390px (iPhone 12/13/14 Pro)' },
  { width: 414, height: 896, name: '414px (iPhone 11 Pro Max / Plus)' },
  { width: 430, height: 932, name: '430px (iPhone 14/15/16 Pro Max)' },
  { width: 768, height: 1024, name: '768px (Tablet Portrait - iPad Mini)' },
  { width: 1024, height: 768, name: '1024px (Tablet Landscape / Laptop)' },
  { width: 1440, height: 900, name: '1440px (Wide Desktop)' },
];

export const REQUIRED_PAGES = [
  { path: '/', name: 'Home (10 Sections)', file: '.next/server/app/index.html' },
  { path: '/about', name: 'About Us', file: '.next/server/app/about.html' },
  { path: '/treatments', name: 'Clinical Treatments Catalog', file: '.next/server/app/treatments.html' },
  { path: '/treatments/porcelain-veneers', name: 'Treatment Details (Veneers)', file: '.next/server/app/treatments/porcelain-veneers.html' },
  { path: '/doctor', name: 'Our Doctor (Dr. Aanya Mehta)', file: '.next/server/app/doctor.html' },
  { path: '/gallery', name: 'Studio & Technology Gallery', file: '.next/server/app/gallery.html' },
  { path: '/contact', name: 'Contact & Appointments', file: '.next/server/app/contact.html' },
];

/**
 * Simple Chrome DevTools Protocol (CDP) WebSocket client
 */
class CdpSession {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
    this.loadEventHandlers = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Page.loadEventFired') {
          for (const handler of this.loadEventHandlers) {
            handler(msg);
          }
        }
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message || JSON.stringify(msg.error)));
          } else {
            resolve(msg.result);
          }
        }
      };
    });
  }

  send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async waitForLoadEvent(timeoutMs = 6000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve(); // proceed on timeout fallback
      }, timeoutMs);

      const handler = () => {
        clearTimeout(timer);
        const idx = this.loadEventHandlers.indexOf(handler);
        if (idx >= 0) this.loadEventHandlers.splice(idx, 1);
        resolve();
      };
      this.loadEventHandlers.push(handler);
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || 'Runtime evaluation error');
    }
    return res.result?.value;
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

/**
 * Structural / Static CSS & HTML Verification
 */
export function runStaticStructuralAudit() {
  console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
  console.log('\x1b[1m PART 1: STATIC STRUCTURAL & RESPONSIVE ARCHITECTURE AUDIT \x1b[0m');
  console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

  const findings = [];

  // 1. Root Layout Collision Padding
  const layoutPath = path.join(PROJECT_ROOT, 'src/app/layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  const hasPb24 = layoutContent.includes('pb-24');
  const hasMdPb0 = layoutContent.includes('md:pb-0');

  console.log(`[RootLayout Audit]`);
  console.log(`  - pb-24 mobile padding present: ${hasPb24 ? '✔' : '✖'}`);
  console.log(`  - md:pb-0 desktop reset present: ${hasMdPb0 ? '✔' : '✖'}`);
  if (!hasPb24 || !hasMdPb0) {
    findings.push({ severity: 'HIGH', area: 'RootLayout', message: 'Missing pb-24 md:pb-0 collision clearance' });
  }

  // 2. Global CSS Overflow Protection
  const globalsCssPath = path.join(PROJECT_ROOT, 'src/app/globals.css');
  const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
  const hasBodyOverflowHidden = /body\s*\{[^}]*overflow-x:\s*hidden/s.test(globalsCss);
  console.log(`[Globals.css Audit]`);
  console.log(`  - body overflow-x: hidden present: ${hasBodyOverflowHidden ? '✔' : '✖'}`);
  if (!hasBodyOverflowHidden) {
    findings.push({ severity: 'HIGH', area: 'CSS', message: 'body missing overflow-x: hidden' });
  }

  // 3. MobileBottomBar Architecture
  const bottomBarPath = path.join(PROJECT_ROOT, 'src/components/layout/MobileBottomBar.tsx');
  const bottomBarContent = fs.readFileSync(bottomBarPath, 'utf8');
  const hasFixedBottom = bottomBarContent.includes('fixed bottom-0');
  const hasMdHidden = bottomBarContent.includes('md:hidden');
  const hasZ40 = bottomBarContent.includes('z-40');
  console.log(`[MobileBottomBar Audit]`);
  console.log(`  - fixed bottom-0: ${hasFixedBottom ? '✔' : '✖'}`);
  console.log(`  - md:hidden (collapses on desktop): ${hasMdHidden ? '✔' : '✖'}`);
  console.log(`  - z-40 layering: ${hasZ40 ? '✔' : '✖'}`);
  if (!hasFixedBottom || !hasMdHidden || !hasZ40) {
    findings.push({ severity: 'MEDIUM', area: 'MobileBottomBar', message: 'MobileBottomBar positioning attributes incomplete' });
  }

  // 4. FloatingWhatsApp Desktop-Only Constraint
  const floatingWaPath = path.join(PROJECT_ROOT, 'src/components/layout/FloatingWhatsApp.tsx');
  const floatingWaContent = fs.readFileSync(floatingWaPath, 'utf8');
  const isHiddenOnMobile = floatingWaContent.includes('hidden md:flex');
  console.log(`[FloatingWhatsApp Audit]`);
  console.log(`  - hidden md:flex (no mobile collision): ${isHiddenOnMobile ? '✔' : '✖'}`);
  if (!isHiddenOnMobile) {
    findings.push({ severity: 'MEDIUM', area: 'FloatingWhatsApp', message: 'FloatingWhatsApp not properly hidden on mobile' });
  }

  return findings;
}

/**
 * Dynamic Browser Viewport Matrix Runner via Headless Edge CDP
 */
export async function runBrowserViewportMatrix(port = 3005) {
  console.log('\n\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m');
  console.log('\x1b[1m PART 2: DYNAMIC CHROMIUM VIEWPORT MATRIX EXECUTION (CDP) \x1b[0m');
  console.log('\x1b[1m\x1b[38;5;178m======================================================================\x1b[0m\n');

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  if (!fs.existsSync(edgePath)) {
    console.log('✖ Microsoft Edge executable not found at standard path. Skipping live browser run.');
    return null;
  }

  // Launch Edge in headless mode with debugging port 9222
  console.log('Launching Headless Edge Browser on port 9222...');
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 1200));

  let cdp = null;
  const matrixResults = [];

  try {
    const versionRes = await fetch('http://127.0.0.1:9222/json/version');
    const versionData = await versionRes.json();
    console.log(`Connected to: ${versionData.Browser}`);

    // Create a new target/page
    const newTabRes = await fetch('http://127.0.0.1:9222/json/new?about:blank', { method: 'PUT' });
    const tabData = await newTabRes.json();
    cdp = new CdpSession(tabData.webSocketDebuggerUrl);
    await cdp.connect();

    // Enable Page and DOM domains
    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');

    console.log(`Starting matrix execution across ${REQUIRED_PAGES.length} pages x ${REQUIRED_VIEWPORTS.length} viewports (Total: ${REQUIRED_PAGES.length * REQUIRED_VIEWPORTS.length} permutations)...\n`);

    for (const page of REQUIRED_PAGES) {
      console.log(`\x1b[1m\x1b[34m▶ Testing Route:\x1b[0m \x1b[1m${page.path}\x1b[0m (${page.name})`);
      const targetUrl = `http://127.0.0.1:${port}${page.path}`;

      for (const vp of REQUIRED_VIEWPORTS) {
        // 1. Set device metrics override
        await cdp.send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768,
        });

        // 2. Navigate and wait for page load
        const loadPromise = cdp.waitForLoadEvent(4000);
        await cdp.send('Page.navigate', { url: targetUrl });
        await loadPromise;
        await new Promise((r) => setTimeout(r, 400));

        // 3. Measure Overflow: scrollWidth vs innerWidth
        const overflowMetrics = await cdp.evaluate(`(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const innerWidth = window.innerWidth;
          const hasOverflow = scrollWidth > innerWidth;
          
          let culpritElements = [];
          if (hasOverflow) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const r = el.getBoundingClientRect();
              if (r.right > innerWidth + 1) {
                culpritElements.push({
                  tag: el.tagName.toLowerCase(),
                  className: (el.className || '').toString().slice(0, 80),
                  right: Math.round(r.right),
                  width: Math.round(r.width),
                });
              }
            }
          }

          return {
            scrollWidth,
            innerWidth,
            hasOverflow,
            diff: scrollWidth - innerWidth,
            culpritElements: culpritElements.slice(0, 5),
          };
        })()`);

        // 4. Measure Touch Target Sizes on Mobile (<768px)
        let touchTargetAudit = null;
        if (vp.width < 768) {
          touchTargetAudit = await cdp.evaluate(`(() => {
            const interactives = document.querySelectorAll('button, a, input, select, textarea');
            let total = 0;
            let compliant = 0;
            let nonCompliant = [];

            interactives.forEach(el => {
              const style = window.getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                return;
              }
              const rect = el.getBoundingClientRect();
              if (rect.width === 0 || rect.height === 0) return;

              total++;
              const passes44 = rect.width >= 44 && rect.height >= 44;
              if (passes44) {
                compliant++;
              } else {
                nonCompliant.push({
                  tag: el.tagName.toLowerCase(),
                  text: (el.innerText || el.getAttribute('aria-label') || el.name || '').trim().replace(/\\n/g, ' ').slice(0, 30),
                  width: Math.round(rect.width),
                  height: Math.round(rect.height),
                  className: (el.className || '').toString().slice(0, 50),
                });
              }
            });

            return {
              total,
              compliant,
              sub44Count: nonCompliant.length,
              sub44Samples: nonCompliant.slice(0, 6),
            };
          })()`);
        }

        // 5. Measure Root Padding & MobileBottomBar Collision Clearance
        const collisionAudit = await cdp.evaluate(`(() => {
          const bottomBar = document.querySelector('nav[aria-label="Mobile Quick Action Bar"]');
          const rootWrapper = document.querySelector('.pb-24') || document.querySelector('body > div');
          const footer = document.querySelector('footer');

          const isMobile = window.innerWidth < 768;
          let barHeight = 0;
          let barVisible = false;
          let rootPaddingBottom = 0;
          let footerClearance = true;

          if (bottomBar) {
            const style = window.getComputedStyle(bottomBar);
            barVisible = style.display !== 'none' && style.visibility !== 'hidden';
            const rect = bottomBar.getBoundingClientRect();
            barHeight = Math.round(rect.height);
          }

          if (rootWrapper) {
            const rootStyle = window.getComputedStyle(rootWrapper);
            rootPaddingBottom = parseFloat(rootStyle.paddingBottom) || 0;
          }

          if (isMobile && barVisible && footer) {
            footerClearance = rootPaddingBottom >= barHeight;
          }

          return {
            isMobile,
            barVisible,
            barHeight,
            rootPaddingBottom,
            footerClearance,
            surplusClearance: rootPaddingBottom - barHeight,
          };
        })()`);

        const resultEntry = {
          page: page.path,
          viewport: vp.width,
          viewportName: vp.name,
          overflow: overflowMetrics,
          touchTargets: touchTargetAudit,
          collision: collisionAudit,
        };

        matrixResults.push(resultEntry);

        // Logging
        const overflowStatus = overflowMetrics.hasOverflow
          ? `\x1b[31m✖ OVERFLOW (+${overflowMetrics.diff}px)\x1b[0m`
          : `\x1b[32m✔ OK\x1b[0m`;

        const touchStatus = touchTargetAudit
          ? `| Touch >=44px: ${touchTargetAudit.compliant}/${touchTargetAudit.total} (${touchTargetAudit.sub44Count} sub-44px)`
          : `| Desktop`;

        const collisionStatus = vp.width < 768
          ? `| pb-24 clearance: ${collisionAudit.rootPaddingBottom}px vs bar ${collisionAudit.barHeight}px (Surplus: +${collisionAudit.surplusClearance}px)`
          : `| bar hidden (${collisionAudit.barVisible ? 'FAIL' : 'OK'})`;

        console.log(`    [${String(vp.width).padStart(4)}px] ${overflowStatus.padEnd(20)} ${touchStatus.padEnd(45)} ${collisionStatus}`);
      }
    }
  } catch (err) {
    console.error('CDP Error during viewport matrix execution:', err);
  } finally {
    if (cdp) cdp.close();
    edgeProc.kill();
  }

  return matrixResults;
}

// Self-executing runner
async function main() {
  const staticFindings = runStaticStructuralAudit();

  console.log('Testing dynamic Chromium CDP Matrix against port 3005...');
  const dynamicResults = await runBrowserViewportMatrix(3005);

  console.log('\n======================================================================');
  console.log(' TIER 5 RESPONSIVE MATRIX TESTING COMPLETE');
  console.log('======================================================================\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
