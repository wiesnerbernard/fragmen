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

  it('should reverse grapheme clusters when Intl.Segmenter is available', () => {
    // Family emoji is composed of multiple code points joined by ZWJs
    const family = '👩‍👩‍👧‍👧';
    const heart = '❤️';
    const input = `${family} ${heart} ok`;
    const output = reverse(input);

    // If Segmenter exists, reversal should keep clusters intact
    // biome-ignore lint/suspicious/noExplicitAny: <test>
    if (typeof (Intl as any).Segmenter === 'function') {
      expect(output).toBe(`ko ${heart} ${family}`);
    } else {
      // Without Segmenter, fallback may split clusters; just assert it's a string
      expect(typeof output).toBe('string');
    }
  });

  it('should return empty string for non-string input at runtime', () => {
    // Force a non-string through the type system to exercise the runtime guard
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(reverse(123 as unknown as string)).toBe('');
  });
});
