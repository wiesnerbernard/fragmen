import { describe, it, expect } from 'vitest';
import { sum } from './index';

describe('sum', () => {
  it('should calculate sum of positive numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it('should calculate sum of mixed positive and negative numbers', () => {
    expect(sum([10, -5, 3, -2])).toBe(6);
  });

  it('should calculate sum of decimal numbers', () => {
    expect(sum([2.5, 3.7, 1.8])).toBe(8);
  });

  it('should return 0 for empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('should handle single element array', () => {
    expect(sum([42])).toBe(42);
  });

  it('should handle all negative numbers', () => {
    expect(sum([-1, -2, -3])).toBe(-6);
  });

  it('should handle zero values', () => {
    expect(sum([0, 0, 0])).toBe(0);
    expect(sum([1, 0, 2])).toBe(3);
  });

  it('should handle large numbers', () => {
    expect(sum([1000000, 2000000, 3000000])).toBe(6000000);
  });

  it('should handle very small decimal precision', () => {
    const result = sum([0.1, 0.2, 0.3]);
    expect(result).toBeCloseTo(0.6, 10);
  });

  it('should return 0 for non-array input', () => {
    expect(sum(null as never)).toBe(0);
    expect(sum(undefined as never)).toBe(0);
    expect(sum('not an array' as never)).toBe(0);
  });

  it('should return 0 if array contains non-numbers', () => {
    expect(sum([1, 2, 'three' as never, 4])).toBe(0);
    expect(sum([1, null as never, 3])).toBe(0);
    expect(sum([1, undefined as never, 3])).toBe(0);
  });

  it('should return 0 if array contains NaN', () => {
    expect(sum([1, 2, NaN, 4])).toBe(0);
  });

  it('should return 0 if array contains Infinity', () => {
    expect(sum([1, 2, Infinity])).toBe(0);
    expect(sum([1, -Infinity, 3])).toBe(0);
  });

  it('should handle arrays with many elements', () => {
    const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
    expect(sum(largeArray)).toBe(500500); // Sum of 1 to 1000
  });

  it('should handle mixed integer and decimal values', () => {
    expect(sum([1, 2.5, 3, 4.7, 5])).toBe(16.2);
  });

  it('should work with negative zero', () => {
    expect(sum([-0, 0])).toBe(0);
  });
});
