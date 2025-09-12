import { describe, expect, it } from 'vitest';
import { capitalize } from './index';

describe('string/capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should handle an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle already capitalized strings', () => {
    expect(capitalize('World')).toBe('World');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(capitalize(null as unknown as string)).toBe('');
  });
});
