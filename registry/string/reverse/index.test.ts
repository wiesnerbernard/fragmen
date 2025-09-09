import { describe, expect, it } from 'vitest';
import { reverse } from '.';

describe('reverse', () => {
  it('should reverse a standard string', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });

  it('should handle an empty string', () => {
    expect(reverse('')).toBe('');
  });

  it('should handle a string with spaces', () => {
    expect(reverse('  a b c  ')).toBe('  c b a  ');
  });

  it('should handle a palindrome', () => {
    expect(reverse('madam')).toBe('madam');
  });

  it('should handle numbers and symbols', () => {
    expect(reverse('123!@#')).toBe('#@!321');
  });

  // Note: This test demonstrates the limitation with complex emojis (surrogate pairs).
  // A simple split/reverse/join will break them.
  it('should correctly reverse a string with simple unicode characters', () => {
    expect(reverse('你好')).toBe('好你');
  });

  it('should return empty string for non-string input at runtime', () => {
    // Force a non-string through the type system to exercise the runtime guard
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reverse(123 as unknown as string)).toBe('');
  });
});
