# Fragmen Website

The companion website for Fragmen, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Browse Utilities**: Search and filter through 50+ utilities across 9 categories
- **Utility Detail Pages**: View source code with syntax highlighting, documentation, and examples
- **Dark Mode**: Full dark mode support with theme toggle
- **Static Site Generation**: All pages pre-rendered at build time for optimal performance

## Development

```bash
# Install dependencies from root
cd ../..
npm install

# Start dev server
npm run web:dev

# Build for production
npm run web:build

# Start production server
npm run web:start
```

The dev server runs on `http://localhost:3000` (or 3001 if 3000 is in use).

## Architecture

### Registry Integration

The website reads utilities directly from `../../registry/` at build time:

- `lib/registry.ts` - Functions to read and parse registry files
- JSDoc comments are extracted for documentation
- Examples are parsed from `@example` tags
- Type information is extracted from `@param` and `@returns` tags

### Pages

- `/` - Homepage with hero, features, and quick start guide
- `/utilities` - Grid view with search and category filters
- `/utilities/[category]/[name]` - Individual utility detail pages
- `/docs` - Documentation page

### Syntax Highlighting

Uses [shiki](https://shiki.matsu.io/) to highlight code with both light and dark themes:

- Light theme: `github-light`
- Dark theme: `github-dark`

The correct theme is shown based on the user's preference.

## Deployment

The website can be deployed to Vercel with zero configuration:

1. Connect your GitHub repository to Vercel
2. Select the `apps/web` directory as the root
3. Deploy!

Vercel will automatically:

- Install dependencies
- Run `npm run build`
- Deploy the static site
- Set up preview deployments for PRs
