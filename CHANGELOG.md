# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Web App: Related Utilities** - Smart algorithm shows 6 related utilities on detail pages based on category, tags, and name similarity
- **Web App: Changelog Page** - Markdown-rendered changelog accessible at `/changelog` with full project history
- **Web App: Utility Requests** - Community voting system for utility ideas at `/requests` with upvoting and status tracking
- **Web App: RSS Feed** - Automated feed at `/rss.xml` with latest 20 utilities sorted by date added
- **Web App: Enhanced Search** - Search icon, clear button, dynamic results count, and keyboard shortcuts (⌘K, Esc)
- **Web App: Back-to-Top Button** - Smooth scroll button appears after 500px of scrolling
- **Web App: Quick Actions Sidebar** - Copy code and install command with visual feedback
- **Web App: Clickable Tags** - Tags on utility pages link to filtered search results
- **Web App: Meta Information Panel** - Shows dependencies, test coverage, and date added
- **Documentation: Release Process** - Comprehensive guide for changelog maintenance and version releases

### Changed

- **Web App: Code Blocks** - Improved with rounded corners, shadows, and better theme integration
- **Web App: Navigation** - Added Changelog and Requests links to main navigation
- **Web App: Homepage** - New "Explore More" section with cards for Changelog, Requests, and RSS

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
