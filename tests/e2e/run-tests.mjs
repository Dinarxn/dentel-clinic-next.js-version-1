#!/usr/bin/env node

/**
 * Lumière Dental Studio — Master E2E Test Suite Runner
 * Executes Tier 1, Tier 2, Tier 3, and Tier 4 Test Suites
 * Runnable directly via: node tests/e2e/run-tests.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createTier1Suite } from './tier1-features.test.mjs';
import { createTier2Suite } from './tier2-boundaries.test.mjs';
import { createTier3Suite } from './tier3-combinations.test.mjs';
import { createTier4Suite } from './tier4-scenarios.test.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORTS_DIR = path.join(__dirname, 'reports');

// Parse CLI Flags
const args = process.argv.slice(2);
let tierFilter = 'all';
let milestoneFilter = 'all';
let verbose = false;
let jsonOutput = false;

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    tierFilter = arg.split('=')[1];
  } else if (arg.startsWith('--milestone=')) {
    milestoneFilter = arg.split('=')[1];
  } else if (arg === '--verbose' || arg === '-v') {
    verbose = true;
  } else if (arg === '--json') {
    jsonOutput = true;
  }
}

// Banner
console.log('\x1b[1m\x1b[38;5;178m' + '='.repeat(70) + '\x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m LUMIÈRE DENTAL STUDIO — E2E TEST RUNNER \x1b[0m');
console.log('\x1b[2m Opaque-Box, Requirement-Driven Testing Engine (Tiers 1–4)\x1b[0m');
console.log('\x1b[1m\x1b[38;5;178m' + '='.repeat(70) + '\x1b[0m');
console.log(`\x1b[2mFilters: Tier=${tierFilter} | Milestone=${milestoneFilter} | Verbose=${verbose}\x1b[0m\n`);

async function main() {
  const suites = [
    createTier1Suite(),
    createTier2Suite(),
    createTier3Suite(),
    createTier4Suite(),
  ];

  const overallStartTime = performance.now();
  const suiteSummaries = [];

  for (const suite of suites) {
    if (tierFilter !== 'all' && String(suite.tier) !== String(tierFilter)) {
      continue;
    }
    const summary = await suite.run({
      milestoneFilter,
      tierFilter,
      verbose,
    });
    suiteSummaries.push(summary);
  }

  const overallEndTime = performance.now();
  const totalDuration = (overallEndTime - overallStartTime).toFixed(2);

  // Aggregate Metrics
  const totalTests = suiteSummaries.reduce((acc, s) => acc + s.total, 0);
  const totalPassed = suiteSummaries.reduce((acc, s) => acc + s.passed, 0);
  const totalFailed = suiteSummaries.reduce((acc, s) => acc + s.failed, 0);
  const totalPending = suiteSummaries.reduce((acc, s) => acc + s.pending, 0);

  // Print Summary Table
  console.log('\n' + '\x1b[1m\x1b[38;5;178m' + '='.repeat(70) + '\x1b[0m');
  console.log('\x1b[1m TEST EXECUTION SUMMARY \x1b[0m');
  console.log('\x1b[1m\x1b[38;5;178m' + '='.repeat(70) + '\x1b[0m');

  for (const s of suiteSummaries) {
    const statusColor = s.failed > 0 ? '\x1b[31m' : '\x1b[32m';
    console.log(
      ` ${statusColor}●\x1b[0m \x1b[1m${s.suite}\x1b[0m: ${s.passed} passed, ${s.failed} failed, ${s.pending} pending \x1b[2m(${s.duration}ms)\x1b[0m`
    );
  }

  console.log('\x1b[2m' + '-'.repeat(70) + '\x1b[0m');
  console.log(
    ` \x1b[1mTotal Assertions Executed:\x1b[0m ${totalTests}`
  );
  console.log(
    ` \x1b[32m✔ Passed:\x1b[0m  ${totalPassed}`
  );
  if (totalPending > 0) {
    console.log(
      ` \x1b[33m○ Pending Milestones:\x1b[0m ${totalPending}`
    );
  }
  if (totalFailed > 0) {
    console.log(
      ` \x1b[31m✖ Failed:\x1b[0m  ${totalFailed}`
    );
  }
  console.log(` \x1b[2mExecution Time: ${totalDuration}ms\x1b[0m`);
  console.log('\x1b[1m\x1b[38;5;178m' + '='.repeat(70) + '\x1b[0m');

  // Generate Report Artifact
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const reportData = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
    },
    filters: {
      tier: tierFilter,
      milestone: milestoneFilter,
    },
    metrics: {
      totalSuites: suiteSummaries.length,
      totalTests,
      totalPassed,
      totalFailed,
      totalPending,
      totalDuration: parseFloat(totalDuration),
    },
    suites: suiteSummaries,
  };

  const reportPath = path.join(REPORTS_DIR, 'e2e-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2), 'utf8');
  console.log(`\n\x1b[36mℹ Test report written to: ${path.relative(process.cwd(), reportPath)}\x1b[0m`);

  // Exit with appropriate status
  if (totalFailed > 0) {
    console.log(`\n\x1b[31m✖ E2E Test Suite FAILED with ${totalFailed} failure(s).\x1b[0m\n`);
    process.exit(1);
  } else {
    console.log(`\n\x1b[32m✔ All ${totalPassed} active tests PASSED successfully!\x1b[0m\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('\x1b[31mFatal Runner Error:\x1b[0m', err);
  process.exit(1);
});
