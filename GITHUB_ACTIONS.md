# GitHub Actions Setup

This project uses GitHub Actions for continuous integration and deployment. Here's how to set everything up:

## Workflows Overview

### 1. CI Workflow (`ci.yml`)

- **Triggers**: Pull requests to `main` and pushes to `main`
- **Actions**: Runs lint, format check, type check, tests, and build
- **Node versions**: Tests against Node.js 18, 20, and 22

### 2. Release Workflow (`release.yml`)

- **Triggers**: When a tag starting with `v` is pushed (e.g., `v1.0.0`)
- **Actions**: Runs all CI checks plus publishes to npm

## Setup Instructions

### 1. NPM Token Setup (Required for releases)

To enable automatic publishing to npm when tags are pushed:

1. Log in to [npmjs.com](https://npmjs.com)
2. Go to your profile settings → Access Tokens
3. Create a new token with "Automation" type
4. In your GitHub repository, go to Settings → Secrets and variables → Actions
5. Create a new repository secret named `NPM_TOKEN` with your token value

### 2. Release Process

The project includes npm scripts for easy releasing:

```bash
# Patch version (1.0.0 → 1.0.1)
npm run release:patch

# Minor version (1.0.0 → 1.1.0)
npm run release:minor

# Major version (1.0.0 → 2.0.0)
npm run release:major
```

Each command will:

1. Update the version in `package.json`
2. Create a git commit
3. Create a git tag (e.g., `v1.0.1`)
4. Push the commit and tag to GitHub
5. Trigger the release workflow to publish to npm

### 3. Manual Tag Creation

You can also create tags manually:

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

## Workflow Files

- `.github/workflows/ci.yml` - CI workflow for PRs and main branch
- `.github/workflows/release.yml` - Release workflow for tags

## Troubleshooting

### NPM Publish Fails

- Verify the `NPM_TOKEN` secret is set correctly
- Ensure your npm account has publish permissions for the package
- Check that the package name in `package.json` is available on npm

### CI Tests Fail

- All tests must pass before merging PRs
- Linting, formatting, and type checking must pass
- Build must complete successfully
