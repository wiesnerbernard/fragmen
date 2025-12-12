# Release Process & Changelog Management

## Overview

This document outlines the process for maintaining the changelog and managing releases for Fragmen.

## Changelog Maintenance

The changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and is located at `/CHANGELOG.md`.

### When Adding New Utilities

1. **Add @since tag** to the utility's JSDoc comment:
   ```typescript
   /**
    * Description of your utility
    * 
    * @since 2024-12-15
    * @tags category, tags
    * @param {type} param Description
    * @returns {type} Description
    */
   ```

2. **Update CHANGELOG.md** under the `[Unreleased]` section:
   ```markdown
   ## [Unreleased]
   
   ### Added
   - `category/utility-name` - Brief description of what it does
   ```

### When Fixing Bugs

Add to the `### Fixed` section under `[Unreleased]`:
```markdown
### Fixed
- Fixed issue with `utility-name` where it didn't handle edge case X
- Corrected type definitions for `another-utility`
```

### When Making Breaking Changes

Add to the `### Changed` section with a `⚠️ BREAKING:` prefix:
```markdown
### Changed
- ⚠️ BREAKING: `utility-name` now returns `newType` instead of `oldType`
```

## Release Process

### 1. Prepare Release

1. Update version in `package.json`
2. Move `[Unreleased]` changes to a new version section in CHANGELOG.md
3. Add release date to the version header
4. Update the comparison links at the bottom of CHANGELOG.md

Example:
```markdown
## [1.1.0] - 2024-12-15

### Added
- `string/format-template` - Template string formatter with variable interpolation
- `array/sample` - Get random sample from array

### Fixed  
- Fixed `merge` utility deep copying circular references

[Unreleased]: https://github.com/wiesnerbernard/fragmen/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/wiesnerbernard/fragmen/compare/v1.0.2...v1.1.0
```

### 2. Create Release

```bash
# Commit changelog and version bump
git add CHANGELOG.md package.json
git commit -m "chore: release v1.1.0"

# Create git tag
git tag -a v1.1.0 -m "Release v1.1.0"

# Push changes and tag
git push origin main
git push origin v1.1.0
```

### 3. Publish

```bash
# Build and publish to npm
npm run build
npm publish

# Create GitHub release
gh release create v1.1.0 --title "v1.1.0" --notes-file RELEASE_NOTES.md
```

### 4. Post-Release

1. Verify the changelog page updates automatically on the website
2. RSS feed will automatically include new utilities
3. Update any external documentation if needed

## Automated Checks

The following checks happen automatically:

- ✅ **CI Tests** - All utilities must pass tests
- ✅ **Type Checking** - TypeScript strict mode validation
- ✅ **Linting** - ESLint and Prettier formatting
- ✅ **Coverage** - Maintain 99%+ test coverage

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (x.0.0) - Breaking changes
- **MINOR** (1.x.0) - New features (utilities), backwards compatible
- **PATCH** (1.0.x) - Bug fixes, documentation updates

## Utility Addition Checklist

When adding a new utility, ensure:

- [ ] Utility code is in `registry/category/name/index.ts`
- [ ] Comprehensive tests in `registry/category/name/index.test.ts`
- [ ] JSDoc with `@since` tag, description, examples, `@param`, and `@returns`
- [ ] Tags added for discoverability
- [ ] Test coverage is 100% for the utility
- [ ] Added to CHANGELOG.md under `[Unreleased]`
- [ ] Exported from appropriate index file if needed
- [ ] README.md updated if major utility

## Tips

1. **Be descriptive** - Write clear, helpful changelog entries
2. **Group related changes** - Combine similar updates
3. **Link issues/PRs** - Reference GitHub issues when applicable
4. **Highlight breaking changes** - Make them very obvious
5. **Update regularly** - Don't let the unreleased section get too large

## Questions?

Open an issue or discussion on GitHub if you have questions about the release process.
