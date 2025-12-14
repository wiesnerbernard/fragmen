import { describe, expect, it } from 'vitest';
import { randomString } from '.';

describe('randomString', () => {
  it('should generate string of correct length', () => {
    expect(randomString(10)).toHaveLength(10);
    expect(randomString(20)).toHaveLength(20);
    expect(randomString(1)).toHaveLength(1);
  });

  it('should return empty string for zero or negative length', () => {
    expect(randomString(0)).toBe('');
    expect(randomString(-5)).toBe('');
  });

  it('should return empty string for non-integer length', () => {
    expect(randomString(3.5)).toBe('');
    expect(randomString(NaN)).toBe('');
  });

  it('should generate strings with default alphanumeric charset', () => {
    const result = randomString(100);
    const alphanumericRegex = /^[A-Za-z0-9]+$/;
    expect(result).toMatch(alphanumericRegex);
  });

  it('should use custom charset', () => {
    const result = randomString(50, '01');
    const binaryRegex = /^[01]+$/;
    expect(result).toMatch(binaryRegex);
  });

  it('should generate numeric strings with custom charset', () => {
    const result = randomString(10, '0123456789');
    const numericRegex = /^[0-9]+$/;
    expect(result).toMatch(numericRegex);
  });

  it('should throw error for empty charset', () => {
    expect(() => randomString(10, '')).toThrow(
      'Charset must be a non-empty string'
    );
  });

  it('should generate unique strings', () => {
    const strings = new Set<string>();
    for (let i = 0; i < 100; i++) {
      strings.add(randomString(16));
    }
    // Should have high uniqueness (allowing for small collision chance)
    expect(strings.size).toBeGreaterThan(95);
  });

  it('should handle single character charset', () => {
    const result = randomString(10, 'X');
    expect(result).toBe('XXXXXXXXXX');
  });

  it('should generate different results on consecutive calls', () => {
    const result1 = randomString(20);
    const result2 = randomString(20);
    expect(result1).not.toBe(result2);
  });

  it('should handle very long strings', () => {
    const result = randomString(1000);
    expect(result).toHaveLength(1000);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });
});
