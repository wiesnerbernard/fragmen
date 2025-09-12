import { describe, expect, it } from 'vitest';
import { slugify } from '.';

describe('slugify', () => {
  it('should convert basic strings to lowercase and replace spaces', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    // Note: '&' is converted to 'and' by the implementation
    expect(slugify('!@#$%^&*()_+=-`~[]{}|;:",.<>?/')).toBe('and');
  });

  it('should handle leading and trailing spaces', () => {
    expect(slugify('  leading and trailing  ')).toBe('leading-and-trailing');
  });

  it('should collapse multiple spaces into a single separator', () => {
    expect(slugify('multiple   spaces')).toBe('multiple-spaces');
  });

  it('should handle strings with mixed content', () => {
    expect(slugify('A Title with 123 numbers & symbols!')).toBe(
      'a-title-with-123-numbers-and-symbols'
    );
  });

  it('should use a custom separator', () => {
    expect(slugify('custom_separator', { separator: '_' })).toBe(
      'custom_separator'
    );
  });

  it('should handle accented and special international characters', () => {
    expect(slugify('français & español')).toBe('francais-and-espanol');
  });

  it('should map ß to ss', () => {
    expect(slugify('straße')).toBe('strasse');
  });

  it('should return an empty string for empty or whitespace-only input', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(slugify(undefined as unknown as string)).toBe('');
  });
});
