import { describe, expect, it } from 'vitest';
import { padStart } from '.';

describe('padStart', () => {
  it('should pad the string to the target length', () => {
    expect(padStart('a', 5, '0')).toBe('0000a');
  });

  it('should not pad if the string is already at or beyond the target length', () => {
    expect(padStart('abcde', 5)).toBe('abcde');
    expect(padStart('abcdef', 5)).toBe('abcdef');
  });

  it('should use a space as the default padding character', () => {
    expect(padStart('a', 3)).toBe('  a');
  });

  it('should handle longer padding strings correctly', () => {
    expect(padStart('a', 5, 'xyz')).toBe('xyzxa');
  });

  it('should handle an empty string', () => {
    expect(padStart('', 3, '*')).toBe('***');
  });

  it('should return original when padString is empty', () => {
    expect(padStart('abc', 10, '')).toBe('abc');
  });

  it('should correctly truncate multi-character pad at the boundary', () => {
    expect(padStart('ab', 7, 'xyz')).toBe('xyzxyab');
  });

  it('should return empty string for non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(padStart(null as unknown as string, 5, ' ')).toBe('');
  });
});
