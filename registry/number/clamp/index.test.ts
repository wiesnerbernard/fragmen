import { describe, it, expect } from 'vitest';
import { clamp } from './index.js';

describe('clamp', () => {
  it('should clamp values above the maximum', () => {
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(25, 10, 20)).toBe(20);
    expect(clamp(100, 0, 50)).toBe(50);
  });

  it('should clamp values below the minimum', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(5, 10, 20)).toBe(10);
    expect(clamp(-100, -50, 0)).toBe(-50);
  });

  it('should return the value if within bounds', () => {
    expect(clamp(7, 0, 10)).toBe(7);
    expect(clamp(15, 10, 20)).toBe(15);
    expect(clamp(0, -5, 5)).toBe(0);
    expect(clamp(-2, -10, 10)).toBe(-2);
  });

  it('should handle decimal numbers', () => {
    expect(clamp(3.7, 1.5, 8.2)).toBe(3.7);
    expect(clamp(0.5, 1.0, 2.0)).toBe(1.0);
    expect(clamp(2.5, 1.0, 2.0)).toBe(2.0);
    expect(clamp(1.75, 1.0, 2.0)).toBe(1.75);
  });

  it('should handle edge cases where value equals bounds', () => {
    expect(clamp(5, 5, 10)).toBe(5);
    expect(clamp(10, 5, 10)).toBe(10);
    expect(clamp(0, 0, 0)).toBe(0);
  });

  it('should handle negative numbers', () => {
    expect(clamp(-15, -20, -10)).toBe(-15);
    expect(clamp(-25, -20, -10)).toBe(-20);
    expect(clamp(-5, -20, -10)).toBe(-10);
  });

  it('should handle very large numbers', () => {
    expect(clamp(Number.MAX_SAFE_INTEGER, 0, 1000)).toBe(1000);
    expect(clamp(Number.MIN_SAFE_INTEGER, -1000, 0)).toBe(-1000);
  });

  it('should handle special number values', () => {
    expect(clamp(Infinity, 0, 100)).toBe(100);
    expect(clamp(-Infinity, 0, 100)).toBe(0);
    expect(clamp(NaN, 0, 100)).toBe(NaN);
  });

  it('should throw error when min > max', () => {
    expect(() => clamp(5, 10, 5)).toThrow(
      'Minimum value cannot be greater than maximum value'
    );
    expect(() => clamp(0, 1, 0)).toThrow(
      'Minimum value cannot be greater than maximum value'
    );
  });
});
