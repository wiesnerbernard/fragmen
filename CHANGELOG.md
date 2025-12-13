# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.3] - 2024-12-13

### Added

- **Web App: Framer Motion Animations** - Smooth animations throughout the app
  - Utility cards with hover lift and scale effects
  - Favorite button with bounce and wiggle animations
  - Copy button with tap feedback
  - Animated counter for hero stats (dependencies count down from 100 to 0)
  - Back-to-top button with slide-in/out animation
  - Staggered grid animations for utility listings
  - Tag pills with hover effects
  - Hero section sequential fade-in
  - Example cards with scroll-triggered animations
- **Git Hooks: Pre-push Validation** - Automatically run tests and lint before pushing to main branch
  - Prevents broken code from reaching the repository
  - Ensures code quality with every push
  - Configured via Husky

### Changed

- **Web App: Dark Mode Code Blocks** - Fixed syntax highlighting to properly switch between light and dark themes using Shiki dual theme CSS variables
- **Web App: Text Contrast** - Improved readability in dark mode (increased from 80% to 95% opacity)
- **Web App: Component Architecture** - Split category pages into server and client components for better Next.js compatibility
- **CI/CD: Package Manager Migration** - Migrated from npm to pnpm across all workflows for consistency with local development
- **CI/CD: Node Version** - Updated minimum Node.js requirement to v20+ to match dependency requirements

### Fixed

- **Web App: JSX Syntax Errors** - Fixed broken div tags and missing imports in multiple components
- **Web App: Copy Button Animation** - Simplified to remove distracting icon rotation
- **Web App: Build Errors** - Resolved server/client component conflicts and missing TypeScript properties

### Dependencies

- Added `framer-motion@12.23.26` for animations

## [1.0.2] - 2024-12-11

### Added

- **Web App: Related Utilities** - Smart algorithm shows 6 related utilities on detail pages based on category, tags, and name similarity
- **Web App: Changelog Page** - Markdown-rendered changelog accessible at `/changelog` with full project history
- **Web App: Utility Request Form** - Submit utility ideas that open pre-filled GitHub issues at `/requests`
- **Web App: RSS Feed** - Automated feed at `/rss.xml` with latest 20 utilities sorted by date added
- **Web App: Enhanced Search** - Search icon, clear button, dynamic results count, and keyboard shortcuts (⌘K, Esc)
- **Web App: Back-to-Top Button** - Smooth scroll button appears after 500px of scrolling
- **Web App: Quick Actions Sidebar** - Copy code and install command with visual feedback on utility pages
- **Web App: Clickable Tags** - Tags on utility pages link to filtered search results
- **Documentation: Release Process** - Comprehensive guide for changelog maintenance and version releases

### Changed

- **Web App: Code Blocks** - Improved with rounded corners, shadows, and better theme integration
- **Web App: Navigation** - Added Changelog and Requests links to main navigation
- **Web App: Homepage** - New "Explore More" section with cards for Changelog, Requests, and RSS
- **Web App: Utility Pages** - Removed fake metadata (dependencies, coverage) - now only shows real data

### Dependencies

- Added `remark` and `remark-html` for markdown processing

## [1.0.2] - 2024-12-11

### Added

- **Interactive Browse Command** - New `fragmen browse` command provides an interactive menu for discovering and adding utilities
  - Category selection with utility counts
  - Multi-select interface using spacebar
  - Bulk add selected utilities with progress feedback
  - Full keyboard navigation support
- **Show Command** - New `fragmen show <category/utility-name>` command to preview utility details before adding
  - Displays JSDoc description from source code
  - Shows usage examples
  - Provides source file location
  - Helps users make informed decisions before adding utilities
- **Bulk Add Support** - Enhanced `fragmen add` command now accepts multiple utilities at once
  - Add multiple utilities in a single command: `fragmen add util1 util2 util3`
  - Upfront validation of all utility names before processing
  - Progress feedback for each utility (✓ success or ✗ failure)
  - Summary report with success/failure counts
  - Fully backward compatible with single utility addition

### Changed

- **Improved Documentation** - Comprehensive README updates
  - Added detailed documentation for all new CLI commands
  - Reorganized "Getting Started" section with three discovery options
  - Added quick start examples showing common workflows
  - Enhanced command reference with all options and flags

## [1.0.1] - 2025-12-11

### Changed

- **Enhanced CLI UX**
  - Improved command descriptions and help text
  - Better error messages with actionable suggestions
  - Added validation for utility name format
  - Enhanced list command with optional category filter

## [1.0.0] - 2025-12-11

### Added

- **Initial Release** - First stable release of Fragmen
  - 50 high-quality utility functions across 9 categories
  - Comprehensive test coverage (99.09%)
  - CLI with `init`, `list`, `add`, and `release` commands
  - Support for TypeScript and JavaScript
  - Support for ESM and CommonJS module systems
  - Full JSDoc documentation for all utilities
  - GitHub Actions for CI/CD and automated releases

### Categories

- Array utilities (10): chunk, compact, difference, flatten, group-by, intersection, sort-by, union, unique, zip
- Boolean utilities (2): is-falsy, is-truthy
- Date utilities (4): add-days, format-date, is-weekend, time-ago
- Function utilities (3): debounce, once, throttle
- JSON utilities (1): safe-parse
- Number utilities (6): average, clamp, format-number, random, round, sum
- Object utilities (5): clone, has-path, merge, omit, pick
- Promise utilities (3): delay, retry, timeout
- String utilities (11): camel-case, capitalize, escape-html, kebab-case, pad-end, pad-start, pascal-case, reverse, slugify, snake-case, truncate
- URL utilities (5): build-query, is-valid-url, parse-url, resolve-url, sanitize-url

[1.0.2]: https://github.com/wiesnerbernard/fragmen/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/wiesnerbernard/fragmen/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/wiesnerbernard/fragmen/releases/tag/v1.0.0
