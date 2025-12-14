# Release Guide for Fragmen

This document outlines the complete process for creating a new release of the Fragmen CLI utility library.

## Table of Contents

- [Release Philosophy](#release-philosophy)
- [Pre-Release Checklist](#pre-release-checklist)
- [Release Process](#release-process)
- [Post-Release Tasks](#post-release-tasks)
- [Troubleshooting](#troubleshooting)

---

## Release Philosophy

Fragmen follows a dual-deployment strategy:

### CLI Package (npm)

- **Versioning**: Semantic versioning (major.minor.patch)
- **Release Cadence**: Manual releases when new utilities are added or bugs are fixed
- **Distribution**: Published to npm registry
- **Changelog**: Documented in CHANGELOG.md
- **What to include**: New utilities, bug fixes, breaking changes, CLI improvements

### Web Application (Vercel)

- **Deployment**: Continuous deployment from `main` branch
- **Versioning**: Not versioned separately
- **Release Cadence**: Automatic on every push to `main`
- **Changelog**: Not documented in CHANGELOG.md (follows shadcn/ui pattern)
- **What to include**: UI improvements, animations, design changes, documentation updates

**Important**: Only CLI-related changes should be documented in release notes and CHANGELOG.md. Web app improvements deploy automatically and don't require versioning.

---

## Pre-Release Checklist

### 1. Code Quality Verification

- [ ] **All tests pass**

  ```bash
  pnpm run test:run
  ```

  - Verify all 1308+ tests pass
  - Check for any test warnings or deprecations

- [ ] **Linting passes**

  ```bash
  pnpm run lint
  ```

  - No ESLint errors
  - Fix any warnings that affect code quality

- [ ] **Type checking passes**

  ```bash
  pnpm run build
  ```

  - No TypeScript compilation errors
  - Verify all type definitions are correct

- [ ] **Code formatting is consistent**

  ```bash
  pnpm run format:check
  ```

  - All files formatted with Prettier
  - Run `pnpm run format:write` if needed

### 2. Documentation Review

- [ ] **README.md is up to date**
  - Installation instructions current
  - Usage examples work correctly
  - Badge versions are accurate (updated by scripts/update-badges.js)
- [ ] **Each new utility has complete documentation**
  - Proper JSDoc comments in source code
  - Type definitions exported correctly
  - Test coverage for all functionality
  - Usage examples in tests

- [ ] **Schema file is current**
  - `fragmen.schema.json` includes all new utilities
  - Category classifications are correct
  - Descriptions are clear and accurate

### 3. Dependency Audit

- [ ] **Check for outdated dependencies**

  ```bash
  npx npm-check-updates
  ```

  - Review root package updates
  - Test with any critical security updates
  - Avoid major version updates before release (do after)

- [ ] **No security vulnerabilities**

  ```bash
  pnpm audit
  ```

  - Address any high or critical vulnerabilities
  - Document any accepted risks

- [ ] **Lockfile is up to date**

  ```bash
  pnpm install
  ```

  - Commit updated `pnpm-lock.yaml` if needed

### 4. Build Verification

- [ ] **CLI builds successfully**

  ```bash
  pnpm run build
  ```

  - Verify `dist/` directory contains all utilities
  - Check that types are generated correctly

- [ ] **Web app builds successfully**

  ```bash
  pnpm run web:build
  ```

  - No build errors or warnings
  - All pages render correctly
  - Static generation works for all routes

- [ ] **Test the CLI locally**

  ```bash
  # Link the package globally
  npm link

  # Test in a separate directory
  cd /tmp && mkdir test-fragmen && cd test-fragmen
  fragmen add array/chunk
  ```

  - Verify CLI commands work
  - Check that utilities can be added to a project
  - Test with both TypeScript and JavaScript projects

### 5. Coverage Check

- [ ] **Code coverage is adequate**

  ```bash
  pnpm run test:coverage
  ```

  - Aim for 90%+ coverage on new utilities
  - Review coverage report in `coverage/` directory
  - Identify any untested edge cases

- [ ] **Update coverage badges**

  ```bash
  node scripts/update-badges.js
  ```

  - Verify badges reflect current coverage
  - Commit updated README.md if badges changed

### 6. Git Hygiene

- [ ] **All changes committed**

  ```bash
  git status
  ```

  - No uncommitted changes
  - No untracked files that should be committed

- [ ] **Branch is up to date with main**

  ```bash
  git checkout main
  git pull origin main
  ```

- [ ] **No merge conflicts**

### 7. Changelog Preparation

- [ ] **CHANGELOG.md updated**
  - Add new version section with current date
  - List all new utilities added
  - Document any bug fixes
  - Note any breaking changes
  - Include migration guide for breaking changes
  - **Only include CLI-related changes** (no web app UI improvements)

- [ ] **Version number decided**
  - **Patch** (1.0.x): Bug fixes, minor improvements
  - **Minor** (1.x.0): New utilities added, backward compatible
  - **Major** (x.0.0): Breaking changes, removed utilities

- [ ] **Utility status badges updated**
  - Edit `apps/web/config/utility-status.ts`
  - Add "New" badge for newly added utilities
  - Add "Updated" badge for utilities with significant changes
  - Remove badges from previous release (typically 2-3 releases old)
  - Keep "Beta" or "Deprecated" badges as needed

  **Example**:

  ```typescript
  export const UTILITY_STATUS = {
    // New utilities in this release
    'array/shuffle': 'New',
    'array/sample': 'New',
    'string/mask': 'New',

    // Updated utilities
    'promise/retry': 'Updated',

    // Remove old badges from previous releases
    // 'function/throttle': 'New', // <- Remove after 1-2 releases
  } as const;
  ```

### 8. Final Manual Testing

- [ ] **Test on clean install**

  ```bash
  # Create a fresh test project
  mkdir /tmp/fragmen-test && cd /tmp/fragmen-test
  npm init -y
  npm install /path/to/fragmen
  ```

- [ ] **Verify key utilities work**
  - Test 3-5 most popular utilities
  - Test newly added utilities
  - Verify TypeScript types work in VSCode

- [ ] **Test CLI commands**
  ```bash
  fragmen --version
  fragmen --help
  fragmen add array/chunk
  fragmen list
  ```

---

## Release Process

### Step 1: Create and Push Git Tag

```bash
# Create a git tag for the new version
# For patch release (1.0.2 -> 1.0.3)
git tag v1.0.3

# For minor release (1.0.3 -> 1.1.0)
git tag v1.1.0

# For major release (1.1.0 -> 2.0.0)
git tag v2.0.0

# Push the tag to GitHub
git push origin v1.0.3  # Replace with your version
```

**Important**: The tag format must be `vX.Y.Z` (e.g., `v1.0.3`, `v1.1.0`, `v2.0.0`)

### Step 2: Verify Tag Creation

```bash
# Check that the tag was created
git tag -l

# Verify the tag points to the correct commit
git show v1.0.3
```

Verify:

- Tag name follows `vX.Y.Z` format
- Tag points to the correct commit
- All pre-release checks passed

### Step 3: Monitor GitHub Actions

The GitHub Actions workflow (`.github/workflows/release.yml`) will automatically:

1. Detect the tag push (e.g., `v1.0.3`)
2. Run tests and lint checks
3. Build the package
4. Bump version in `package.json` to match the tag
5. Publish to npm with provenance
6. Create a GitHub release

Monitor the workflow at: https://github.com/wiesnerbernard/fragmen/actions

**The workflow will**:

- Extract version from tag (e.g., `v1.0.3` → `1.0.3`)
- Update `package.json` with the new version
- Publish to npm as that version
- You don't need to manually update `package.json`

### Step 4: Verify Workflow Progress

```bash
# Watch the GitHub Actions workflow
# Visit: https://github.com/wiesnerbernard/fragmen/actions
```

The workflow typically takes 2-3 minutes. Watch for:

- ✅ Tests passing
- ✅ Build successful
- ✅ npm publish successful
- ✅ GitHub release created

### Step 5: Verify npm Publication

```bash
# Check the latest version on npm
npm view fragmen version

# Verify it matches your tag
echo "Expected: 1.0.3"  # Replace with your version

# Install from npm to verify
npm install -g fragmen@latest
fragmen --version
```

### Step 6: Verify GitHub Release

- Visit https://github.com/yourusername/fragmen/releases
- Confirm new release appears
- Review release notes (auto-generated from tag)
- Edit release notes if needed to add context

---

## Post-Release Tasks

### 1. Announce the Release

- [ ] **Update project README** (if needed)
- [ ] **Share on social media** (optional)
- [ ] **Post in relevant communities** (optional)
- [ ] **Update any external documentation** (optional)

### 2. Monitor for Issues

- [ ] **Watch for GitHub issues** in first 24-48 hours
- [ ] **Check npm download stats** after a few days
- [ ] **Monitor for bug reports** from users

### 3. Clean Up

- [ ] **Delete any release branches** (if used)
- [ ] **Archive old coverage reports** (if desired)
- [ ] **Update project board** (if using GitHub Projects)
- [ ] **Clean up utility status badges** (if not done pre-release)
  - Remove "New" badges after 1-2 releases
  - Remove "Updated" badges after the next release
  - This keeps the badge system fresh and meaningful

### 4. Plan Next Release

- [ ] **Review issues for next milestone**
- [ ] **Prioritize new utility requests**
- [ ] **Update roadmap** (if maintained)

---

## Troubleshooting

### npm Publish Fails with 2FA Error

**Problem**: `npm ERR! code EOTP` error during publish

**Solution**: The workflow uses `--provenance` flag which handles 2FA automatically with automation tokens. Ensure:

1. You're using `NPM_TOKEN` secret in GitHub Actions
2. The token has provenance/automation permissions
3. Update `.github/workflows/release.yml` if needed

### Tests Fail in CI but Pass Locally

**Problem**: Tests pass on your machine but fail in GitHub Actions

**Diagnosis**:

1. Check Node.js version match: CI uses Node 20 and 22
2. Review timezone/locale differences
3. Check for file system case sensitivity issues

**Solution**:

```bash
# Test with same Node version as CI
nvm use 20
pnpm run test:run
```

### Build Fails After Dependency Update

**Problem**: Build worked before updating dependencies

**Solution**:

1. Check for breaking changes in updated packages
2. Review package changelogs
3. Consider reverting to previous versions temporarily
4. File issue with problematic dependency

### Tag Already Exists

**Problem**: Tag already exists and you need to recreate it

**Solution**:

```bash
# Delete the tag locally and remotely
git tag -d v1.0.3
git push origin :refs/tags/v1.0.3

# Create it again
git tag v1.0.3
git push origin v1.0.3
```

**Warning**: Only do this if the release hasn't been published yet. Once published to npm, don't delete tags.

### Web Build Fails but CLI Works

**Problem**: `pnpm run web:build` fails

**This is acceptable for CLI releases!** The web app and CLI are independent. You can:

1. Fix the web build issue in a separate PR
2. Deploy web fixes independently via Vercel
3. Proceed with CLI release if tests and CLI build pass

The web app deploys continuously and doesn't block CLI releases.

### Package Size Too Large

**Problem**: npm warns about large package size

**Solution**:

1. Check `.npmignore` is properly configured
2. Verify `files` field in `package.json`
3. Remove unnecessary files from dist
4. Check for accidentally bundled dependencies

---

## Release Workflow Diagram

```
┌─────────────────────────┐
│  Pre-Release Checklist  │
│  - Tests passing        │
│  - Docs updated         │
│  - CHANGELOG ready      │
│  - Badges updated       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   git tag vX.Y.Z        │
│  - Create version tag   │
│  - No package.json edit │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   git push origin tag   │
│  - Triggers CI/CD       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   GitHub Actions        │
│  - Runs tests           │
│  - Builds package       │
│  - Bumps package.json   │
│  - Publishes to npm     │
│  - Creates GH release   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Post-Release          │
│  - Verify publication   │
│  - Monitor issues       │
│  - Plan next release    │
└─────────────────────────┘
```

---

## Quick Reference Commands

```bash
# Development
pnpm install                 # Install dependencies
pnpm run test:run           # Run all tests
pnpm run lint               # Check code style
pnpm run build              # Build CLI package
pnpm run web:build          # Build web app

# Coverage
pnpm run test:coverage      # Generate coverage report
node scripts/update-badges.js  # Update README badges

# Dependencies
npx npm-check-updates       # Check for updates
pnpm audit                  # Check for vulnerabilities

# Release
git tag v1.0.3              # Create version tag
git push origin v1.0.3      # Push tag (triggers release)
git tag -l                  # List all tags
git tag -d v1.0.3           # Delete local tag
git push origin :refs/tags/v1.0.3  # Delete remote tag

# Verification
npm view fragmen version    # Check npm version
npm install -g fragmen      # Install globally
fragmen --version           # Verify CLI works
```

---

## Support

If you encounter issues not covered in this guide:

1. Check existing GitHub issues
2. Review GitHub Actions workflow logs
3. Consult npm publish documentation
4. Open a new issue with detailed error information

---

_Last Updated: [Current Date]_
_Version: 1.0.0_
