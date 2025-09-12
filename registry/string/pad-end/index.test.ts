import { describe, expect, it } from 'vitest';
import { padEnd } from '.';

describe('padEnd', () => {
  it('should pad the string to the target length', () => {
    expect(padEnd('a', 5, '0')).toBe('a0000');
  });

  it('should not pad if the string is already at or beyond the target length', () => {
    expect(padEnd('abcde', 5)).toBe('abcde');
    expect(padEnd('abcdef', 5)).toBe('abcdef');
  });

  it('should use a space as the default padding character', () => {
    expect(padEnd('a', 3)).toBe('a  ');
  });

  it('should handle longer padding strings correctly', () => {
    expect(padEnd('a', 5, 'xyz')).toBe('axyzx');
  });

  it('should handle an empty string', () => {
    expect(padEnd('', 3, '*')).toBe('***');
  });

  it('should return original when padString is empty', () => {
    expect(padEnd('abc', 10, '')).toBe('abc');
  });

  it('should correctly truncate multi-character pad at the boundary', () => {
    expect(padEnd('ab', 7, 'xyz')).toBe('abxyzxy');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(padEnd(undefined as unknown as string, 5, ' ')).toBe('');
  });
});
