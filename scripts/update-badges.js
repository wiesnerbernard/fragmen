#!/usr/bin/env node

/**
 * README Badge Updater
 * Automatically updates README.md with current coverage badges
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const README_PATH = 'README.md';
const COVERAGE_SUMMARY_PATH = join('coverage', 'coverage-summary.json');

// Badge markers for easy replacement
const BADGE_START_MARKER = '<!-- COVERAGE-BADGES:START -->';
const BADGE_END_MARKER = '<!-- COVERAGE-BADGES:END -->';

function getCoverageData() {
  if (!existsSync(COVERAGE_SUMMARY_PATH)) {
    console.log('⚠️  Coverage summary not found. Running coverage first...');
    return null;
  }

  try {
    const coverageData = JSON.parse(
      readFileSync(COVERAGE_SUMMARY_PATH, 'utf8')
    );
    const totalCoverage = coverageData.total;

    return {
      lines: totalCoverage.lines.pct,
      branches: totalCoverage.branches.pct,
      functions: totalCoverage.functions.pct,
      statements: totalCoverage.statements.pct,
    };
  } catch (error) {
    console.error('❌ Failed to read coverage summary:', error.message);
    return null;
  }
}

function calculateOverallCoverage(coverageData) {
  return Math.round(
    (coverageData.lines +
      coverageData.branches +
      coverageData.functions +
      coverageData.statements) /
      4
  );
}

function getCoverageColor(percentage) {
  if (percentage >= 90) return 'brightgreen';
  if (percentage >= 80) return 'green';
  if (percentage >= 70) return 'yellowgreen';
  if (percentage >= 60) return 'yellow';
  if (percentage >= 50) return 'orange';
  return 'red';
}

function createBadge(label, percentage) {
  const color = getCoverageColor(percentage);
  return `![${label}](https://img.shields.io/badge/${label.toLowerCase()}-${percentage}%25-${color})`;
}

function generateBadgesSection(coverageData) {
  const overallCoverage = calculateOverallCoverage(coverageData);

  return `${BADGE_START_MARKER}
${createBadge('Coverage', overallCoverage)}
${createBadge('Lines', coverageData.lines)}
${createBadge('Branches', coverageData.branches)}
${createBadge('Functions', coverageData.functions)}
${createBadge('Statements', coverageData.statements)}
${BADGE_END_MARKER}`;
}

function updateReadme(coverageData) {
  if (!existsSync(README_PATH)) {
    console.error('❌ README.md not found');
    return false;
  }

  let readmeContent = readFileSync(README_PATH, 'utf8');
  const badgesSection = generateBadgesSection(coverageData);

  // Check if badges section already exists
  const startIndex = readmeContent.indexOf(BADGE_START_MARKER);
  const endIndex = readmeContent.indexOf(BADGE_END_MARKER);

  if (startIndex !== -1 && endIndex !== -1) {
    // Replace existing badges section
    const before = readmeContent.substring(0, startIndex);
    const after = readmeContent.substring(endIndex + BADGE_END_MARKER.length);
    readmeContent = before + badgesSection + after;
  } else {
    // Add badges section after the first heading
    const firstHeadingMatch = readmeContent.match(/^(# .+$)/m);
    if (firstHeadingMatch) {
      const headingIndex = firstHeadingMatch.index;
      const firstHeadingEnd = readmeContent.indexOf('\n', headingIndex) + 1;
      const before = readmeContent.substring(0, firstHeadingEnd);
      const after = readmeContent.substring(firstHeadingEnd);
      readmeContent = before + '\n' + badgesSection + '\n' + after;
    } else {
      // Fallback: add at the beginning
      readmeContent = badgesSection + '\n\n' + readmeContent;
    }
  }

  writeFileSync(README_PATH, readmeContent, 'utf8');
  return true;
}

function main() {
  console.log('🏷️  Updating README with coverage badges...');

  const coverageData = getCoverageData();
  if (!coverageData) {
    console.log(
      '❌ Could not get coverage data. Make sure to run tests with coverage first.'
    );
    process.exit(1);
  }

  if (updateReadme(coverageData)) {
    console.log('✅ README updated successfully with coverage badges!');
    console.log(
      `📊 Overall Coverage: ${calculateOverallCoverage(coverageData)}%`
    );
  } else {
    console.log('❌ Failed to update README');
    process.exit(1);
  }
}

main();
