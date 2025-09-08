# Coding Standards & Instructions

This document outlines the coding standards and conventions for the Fragmen project. Follow these guidelines to ensure consistency across the codebase.

## 🎯 Project Overview

Fragmen is a utility library and CLI tool that allows developers to copy high-quality utility functions into their projects. The codebase consists of:

- **Registry**: Collection of utility functions organized by category
- **CLI**: Command-line interface for managing utilities
- **Tests**: Comprehensive test coverage for all utilities

## 📝 Code Style & Formatting

### TypeScript Standards

- Use **TypeScript** for all source code
- Enable `strict` mode in TypeScript configuration
- Prefer explicit types when they improve readability
- Use type assertions sparingly and only when necessary

### Naming Conventions

- **Functions**: camelCase (`groupBy`, `safeParse`, `isTruthy`)
- **Variables**: camelCase (`configPath`, `targetDir`)
- **Constants**: UPPER_SNAKE_CASE (`CONFIG_FILE`, `SCHEMA_VERSION`)
- **Types/Interfaces**: PascalCase (`PromptObject`, `ConfigOptions`)
- **Files**: kebab-case for multi-word names (`index.test.ts`)

### Function Structure

```typescript
/**
 * Brief description of what the function does.
 * @param paramName Description of parameter
 * @returns Description of return value
 */
export function functionName<T>(param: T): ReturnType {
  // Implementation
}
```

## 🏗️ Project Structure

### Registry Organization

```
registry/
  category/
    utility-name/
      index.ts      # Main implementation
      index.test.ts # Tests
```

### Utility Function Guidelines

1. **Single Purpose**: Each utility should do one thing well
2. **Pure Functions**: Avoid side effects when possible
3. **Generic Types**: Use generics for reusability
4. **Error Handling**: Handle edge cases gracefully
5. **Documentation**: Include JSDoc comments with examples

### Example Utility Structure

````typescript
/**
 * Brief description of the utility function.
 * @param input Description of input parameter
 * @returns Description of what is returned
 * @example
 * ```typescript
 * const result = utilityFunction(input);
 * console.log(result); // Expected output
 * ```
 */
export function utilityName<T>(input: T): ReturnType {
  // Validation/edge case handling
  if (!input) {
    return defaultValue;
  }

  // Main logic
  return processedResult;
}
````

## ✅ Testing Standards

### Test File Structure

```typescript
import { describe, it, expect } from 'vitest';
import { utilityFunction } from './index';

describe('utilityFunction', () => {
  it('should handle typical case', () => {
    expect(utilityFunction(input)).toEqual(expectedOutput);
  });

  it('should handle edge cases', () => {
    expect(utilityFunction(edgeCase)).toEqual(expectedEdgeOutput);
  });
});
```

### Testing Guidelines

- Test the happy path
- Test edge cases (empty inputs, null/undefined, invalid types)
- Use descriptive test names that explain the scenario
- Keep tests simple and focused
- Aim for 100% code coverage

## 🔧 CLI Development

### CLI Standards

- Use `commander.js` for command structure
- Provide helpful descriptions for all commands and options
- Include progress indicators (🔎, ✅, ❌) in output messages
- Handle errors gracefully with clear error messages
- Support interactive prompts for better UX

### Error Handling

```typescript
if (!condition) {
  console.error('❌ Clear error message explaining what went wrong');
  process.exit(1);
}
```

### Success Messages

```typescript
console.log('✅ Success message with relevant details');
console.log('🎉 Encouraging message for next steps');
```

## 📦 Dependencies & Imports

### Import Order

1. Node.js built-in modules
2. Third-party packages
3. Local modules (relative imports)

```typescript
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import { loadConfig } from './config';
```

### Dependency Guidelines

- Minimize dependencies where possible
- Prefer well-maintained, popular packages
- Keep devDependencies separate from runtime dependencies
- Document any required peer dependencies

## 🚀 Performance Considerations

- Use efficient algorithms and data structures
- Avoid unnecessary loops or recursive calls
- Consider memory usage for large data sets
- Lazy load modules when possible
- Profile performance-critical functions

## 📖 Documentation

### Code Comments

- Explain **why** not **what** in comments
- Use JSDoc for all public functions
- Include usage examples in JSDoc
- Document complex algorithms or business logic

### README Guidelines

- Clear installation instructions
- Usage examples for all major features
- API documentation for public interfaces
- Contributing guidelines
- License information

## 🔄 Git Workflow

### Commit Messages

Follow conventional commits format:

```
type(scope): description

feat(cli): add init command for configuration setup
fix(array): handle empty arrays in groupBy function
docs(readme): update installation instructions
test(string): add edge cases for capitalize function
```

### Branch Naming

- `feature/description` for new features
- `fix/description` for bug fixes
- `docs/description` for documentation updates

## 🛠️ Tools & Automation

### Code Quality

- ESLint for linting (rules defined in `eslint.config.js`)
- Prettier for formatting (settings in `.prettierrc`)
- Husky for pre-commit hooks
- TypeScript for type checking

### Available Scripts

```bash
npm run quality      # Run all quality checks
npm run quality:fix  # Auto-fix formatting and linting issues
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run build        # Compile TypeScript
```

## 📋 Checklist for New Utilities

- [ ] Function follows naming conventions
- [ ] Comprehensive JSDoc documentation with examples
- [ ] Type-safe implementation with generics where appropriate
- [ ] Handles edge cases (null, undefined, empty values)
- [ ] Includes comprehensive tests
- [ ] Tests cover happy path and edge cases
- [ ] Function is pure (no side effects) when possible
- [ ] Performance is acceptable for expected use cases
- [ ] Code passes all linting and formatting checks

## 🎨 Style Preferences

### Code Organization

- Keep functions small and focused (< 20 lines when possible)
- Extract complex logic into smaller helper functions
- Group related functionality together
- Use early returns to reduce nesting

### TypeScript Preferences

- Prefer `unknown` over `any` when type is uncertain
- Use union types instead of `any` when possible
- Leverage TypeScript's inference, don't over-annotate
- Use `const assertions` for immutable data

### Error Handling Philosophy

- Fail fast with clear error messages
- Prefer returning `undefined` over throwing for expected failures
- Use custom error types for specific error cases
- Log errors at appropriate levels (CLI can use console.error)

## 📞 Questions & Clarifications

If you have questions about these standards or need clarification on specific patterns, please:

1. Check existing code in the repository for examples
2. Refer to this document
3. Ask for clarification with specific examples

These standards are living guidelines and can be updated as the project evolves.
