#!/usr/bin/env node

/**
 * Coverage utility script for fragmen project
 * This script provides additional coverage reporting functionality
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const COVERAGE_DIR = 'coverage';
const HTML_REPORT = join(COVERAGE_DIR, 'index.html');

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function generateCoverage() {
  console.log('📊 Generating test coverage report...\n');

  try {
    await runCommand('npx', ['vitest', 'run', '--coverage']);

    if (existsSync(HTML_REPORT)) {
      console.log('\n✅ Coverage report generated successfully!');
      console.log(`📄 HTML report: ${HTML_REPORT}`);
      console.log(
        '💡 Use "npm run test:coverage:open" to open the HTML report'
      );
    }
  } catch (error) {
    console.error('❌ Failed to generate coverage report:', error.message);
    process.exit(1);
  }
}

async function watchCoverage() {
  console.log('👀 Running tests with coverage in watch mode...\n');

  try {
    await runCommand('npx', ['vitest', '--coverage']);
  } catch (error) {
    console.error('❌ Watch mode failed:', error.message);
    process.exit(1);
  }
}

async function checkThresholds() {
  console.log('🎯 Checking coverage thresholds...\n');

  try {
    await runCommand('npx', [
      'vitest',
      'run',
      '--coverage',
      '--reporter=verbose',
    ]);
  } catch (error) {
    console.error('❌ Coverage thresholds not met or test failed');
    process.exit(1);
  }
}

// CLI handling
const command = process.argv[2];

(async () => {
  switch (command) {
    case 'generate':
      await generateCoverage();
      break;
    case 'watch':
      await watchCoverage();
      break;
    case 'check':
      await checkThresholds();
      break;
    default:
      console.log('📊 Coverage Utilities');
      console.log('');
      console.log('Usage:');
      console.log(
        '  node scripts/coverage.js generate  - Generate coverage report'
      );
      console.log(
        '  node scripts/coverage.js watch     - Run tests with coverage in watch mode'
      );
      console.log(
        '  node scripts/coverage.js check     - Check if coverage meets thresholds'
      );
      console.log('');
      console.log('NPM Scripts:');
      console.log('  npm run test:coverage        - Generate coverage report');
      console.log(
        '  npm run test:coverage:watch  - Run coverage in watch mode'
      );
      console.log(
        '  npm run test:coverage:open   - Generate and open HTML report'
      );
  }
})();
