/**
 * Zero-Dependency E2E Test Runner Harness
 * Designed for Lumière Dental Studio E2E Test Suite
 * Compatible with Node.js 18+ / 20+ / 22+ / 25+
 */

import { performance } from 'node:perf_hooks';
import fs from 'node:fs';
import path from 'node:path';

// ANSI Colors for high-contrast, beautiful terminal reporting
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgNavy: '\x1b[48;5;17m',
  gold: '\x1b[38;5;178m',
  ivory: '\x1b[38;5;230m',
};

export class TestSuite {
  constructor(name, options = {}) {
    this.name = name;
    this.tier = options.tier || 1;
    this.milestone = options.milestone || 'M1';
    this.tests = [];
    this.results = [];
    this.startTime = 0;
    this.endTime = 0;
  }

  /**
   * Register a test case
   * @param {string} title 
   * @param {Function} fn 
   * @param {Object} metadata { milestone, tier, featureId }
   */
  test(title, fn, metadata = {}) {
    this.tests.push({
      title,
      fn,
      metadata: {
        milestone: metadata.milestone || this.milestone,
        tier: metadata.tier || this.tier,
        featureId: metadata.featureId || null,
      },
    });
  }

  async run(filterOptions = {}) {
    const { milestoneFilter, tierFilter, verbose } = filterOptions;
    this.startTime = performance.now();
    this.results = [];

    console.log(`\n${colors.bold}${colors.gold}▶ Running Suite: ${this.name}${colors.reset} ${colors.dim}(Tier ${this.tier})${colors.reset}`);

    for (const t of this.tests) {
      // Milestone filter check
      if (milestoneFilter && milestoneFilter !== 'all' && t.metadata.milestone.toLowerCase() !== milestoneFilter.toLowerCase()) {
        continue;
      }
      // Tier filter check
      if (tierFilter && tierFilter !== 'all' && String(t.metadata.tier) !== String(tierFilter)) {
        continue;
      }

      const testStart = performance.now();
      try {
        await t.fn();
        const duration = (performance.now() - testStart).toFixed(2);
        this.results.push({
          title: t.title,
          status: 'passed',
          duration: parseFloat(duration),
          metadata: t.metadata,
        });
        console.log(`  ${colors.green}✔${colors.reset} ${t.title} ${colors.dim}(${duration}ms)${colors.reset}`);
      } catch (err) {
        const duration = (performance.now() - testStart).toFixed(2);
        
        // Handle pending / progressive testability flags
        if (err.isPendingMilestone) {
          this.results.push({
            title: t.title,
            status: 'pending',
            reason: err.message,
            duration: parseFloat(duration),
            metadata: t.metadata,
          });
          console.log(`  ${colors.yellow}○${colors.reset} ${colors.dim}[${t.metadata.milestone} Pending]${colors.reset} ${t.title}`);
        } else {
          this.results.push({
            title: t.title,
            status: 'failed',
            error: {
              message: err.message,
              stack: err.stack,
            },
            duration: parseFloat(duration),
            metadata: t.metadata,
          });
          console.log(`  ${colors.red}✖${colors.reset} ${t.title} ${colors.dim}(${duration}ms)${colors.reset}`);
          console.log(`    ${colors.red}${err.message}${colors.reset}`);
          if (verbose && err.stack) {
            console.log(`    ${colors.dim}${err.stack.split('\n').slice(1, 4).join('\n    ')}${colors.reset}`);
          }
        }
      }
    }

    this.endTime = performance.now();
    return this.getSummary();
  }

  getSummary() {
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const pending = this.results.filter(r => r.status === 'pending').length;
    const total = this.results.length;
    const duration = (this.endTime - this.startTime).toFixed(2);

    return {
      suite: this.name,
      tier: this.tier,
      total,
      passed,
      failed,
      pending,
      duration: parseFloat(duration),
      results: this.results,
    };
  }
}

/**
 * Lightweight custom assertion library
 */
export const assert = {
  ok(condition, message = 'Expected condition to be truthy') {
    if (!condition) {
      throw new Error(`AssertionError: ${message}`);
    }
  },

  equal(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(`AssertionError: ${message || `Expected ${JSON.stringify(actual)} to strictly equal ${JSON.stringify(expected)}`}`);
    }
  },

  notEqual(actual, expected, message) {
    if (actual === expected) {
      throw new Error(`AssertionError: ${message || `Expected actual not to equal ${JSON.stringify(expected)}`}`);
    }
  },

  deepEqual(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(`AssertionError: ${message || `Expected deep equality:\nActual:   ${actualStr}\nExpected: ${expectedStr}`}`);
    }
  },

  match(str, regex, message) {
    if (typeof str !== 'string' || !regex.test(str)) {
      throw new Error(`AssertionError: ${message || `Expected "${str}" to match regex ${regex}`}`);
    }
  },

  doesNotMatch(str, regex, message) {
    if (typeof str === 'string' && regex.test(str)) {
      throw new Error(`AssertionError: ${message || `Expected "${str}" NOT to match regex ${regex}`}`);
    }
  },

  includes(haystack, needle, message) {
    if (!haystack || !haystack.includes(needle)) {
      throw new Error(`AssertionError: ${message || `Expected string/array to include "${needle}"`}`);
    }
  },

  greaterThan(actual, min, message) {
    if (!(actual > min)) {
      throw new Error(`AssertionError: ${message || `Expected ${actual} to be greater than ${min}`}`);
    }
  },

  greaterThanOrEqual(actual, min, message) {
    if (!(actual >= min)) {
      throw new Error(`AssertionError: ${message || `Expected ${actual} to be >= ${min}`}`);
    }
  },

  /**
   * Mark a test as pending because its milestone dependency is not yet implemented
   */
  pendingMilestone(milestone, reason) {
    const err = new Error(reason || `Feature scheduled for ${milestone}`);
    err.isPendingMilestone = true;
    throw err;
  },
};
