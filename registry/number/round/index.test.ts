import { describe, it, expect } from 'vitest';
import { round } from './index.js';

describe('round', () => {
  it('should round to nearest integer by default', () => {
    expect(round(3.14159)).toBe(3);
    expect(round(3.6)).toBe(4);
    expect(round(2.5)).toBe(3);
    expect(round(1.4)).toBe(1);
  });

  it('should round to specified decimal places', () => {
    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(3.14159, 4)).toBe(3.1416);
    expect(round(123.456, 1)).toBe(123.5);
    expect(round(123.456, 3)).toBe(123.456);
  });

  it('should handle negative precision (round to tens, hundreds, etc.)', () => {
    expect(round(123.456, -1)).toBe(120);
    expect(round(123.456, -2)).toBe(100);
    expect(round(1234.56, -3)).toBe(1000);
    expect(round(156, -1)).toBe(160);
    expect(round(150, -2)).toBe(200);
  });

  it('should handle negative numbers', () => {
    expect(round(-3.14159)).toBe(-3);
    expect(round(-3.6)).toBe(-4);
    expect(round(-2.5)).toBe(-2); // JavaScript's Math.round behavior
    expect(round(-123.456, 2)).toBe(-123.46);
    expect(round(-156, -1)).toBe(-160);
  });

  it('should handle zero precision explicitly', () => {
    expect(round(3.7, 0)).toBe(4);
    expect(round(3.2, 0)).toBe(3);
    expect(round(-3.7, 0)).toBe(-4);
  });

  it('should handle edge cases with precision', () => {
    expect(round(1.005, 2)).toBe(1); // Due to floating-point precision, 1.005 is actually slightly less
    expect(round(1.004, 2)).toBe(1);
    expect(round(1.006, 2)).toBe(1.01); // This should round up clearly
    expect(round(0.1 + 0.2, 2)).toBe(0.3); // Handle floating-point precision issues
  });

  it('should handle special number values', () => {
    expect(round(Infinity)).toBe(Infinity);
    expect(round(-Infinity)).toBe(-Infinity);
    expect(round(NaN)).toBe(NaN);
    expect(round(Infinity, 2)).toBe(Infinity);
    expect(round(NaN, 2)).toBe(NaN);
  });

  it('should handle very large precision values', () => {
    expect(round(3.14159, 10)).toBe(3.14159);
    expect(round(3.14159, 20)).toBe(3.14159);
  });

  it('should handle zero values', () => {
    expect(round(0)).toBe(0);
    expect(round(0, 2)).toBe(0);
    expect(round(-0)).toBe(-0);
  });

  it('should handle very small numbers', () => {
    expect(round(0.0001, 3)).toBe(0);
    expect(round(0.0001, 4)).toBe(0.0001);
    expect(round(0.00015, 4)).toBe(0.0001); // Due to floating-point precision
    expect(round(0.0002, 4)).toBe(0.0002); // This should be exact
  });

  it('should handle very large numbers', () => {
    expect(round(999999.999, 2)).toBe(1000000);
    expect(round(999999.994, 2)).toBe(999999.99);
    expect(round(1e15, 2)).toBe(1e15);
  });
});
