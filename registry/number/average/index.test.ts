import { describe, it, expect } from 'vitest';
import { average } from './index';

describe('average', () => {
  it('should calculate average of positive numbers', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
  });

  it('should calculate average of mixed positive and negative numbers', () => {
    expect(average([10, -5, 3, -2])).toBe(1.5);
  });

  it('should calculate average of decimal numbers', () => {
    expect(average([2.5, 3.5, 4.5])).toBe(3.5);
  });

  it('should return 0 for empty array', () => {
    expect(average([])).toBe(0);
  });

  it('should handle single element array', () => {
    expect(average([42])).toBe(42);
  });

  it('should handle all negative numbers', () => {
    expect(average([-1, -2, -3])).toBe(-2);
  });

  it('should handle zero values', () => {
    expect(average([0, 0, 0])).toBe(0);
    expect(average([1, 0, 2])).toBe(1);
  });

  it('should handle large numbers', () => {
    expect(average([1000000, 2000000, 3000000])).toBe(2000000);
  });

  it('should handle decimal precision', () => {
    const result = average([0.1, 0.2, 0.3]);
    expect(result).toBeCloseTo(0.2, 10);
  });

  it('should return 0 for non-array input', () => {
    expect(average(null as never)).toBe(0);
    expect(average(undefined as never)).toBe(0);
    expect(average('not an array' as never)).toBe(0);
  });

  it('should return 0 if array contains non-numbers', () => {
    expect(average([1, 2, 'three' as never, 4])).toBe(0);
    expect(average([1, null as never, 3])).toBe(0);
    expect(average([1, undefined as never, 3])).toBe(0);
  });

  it('should return 0 if array contains NaN', () => {
    expect(average([1, 2, NaN, 4])).toBe(0);
  });

  it('should return 0 if array contains Infinity', () => {
    expect(average([1, 2, Infinity])).toBe(0);
    expect(average([1, -Infinity, 3])).toBe(0);
  });

  it('should calculate correct average for many elements', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    expect(average(arr)).toBe(50.5); // Average of 1 to 100
  });

  it('should handle mixed integer and decimal values', () => {
    expect(average([1, 2.5, 3, 4.5, 5])).toBeCloseTo(3.2, 10);
  });

  it('should handle very small numbers', () => {
    expect(average([0.001, 0.002, 0.003])).toBeCloseTo(0.002, 10);
  });

  it('should work with negative zero', () => {
    expect(average([-0, 0])).toBe(0);
  });

  it('should calculate average when sum is negative', () => {
    expect(average([-10, -20, -30])).toBe(-20);
  });

  it('should handle two element arrays', () => {
    expect(average([5, 15])).toBe(10);
    expect(average([-5, 5])).toBe(0);
  });

  it('should calculate grade average correctly', () => {
    const grades = [85, 92, 78, 95, 88];
    expect(average(grades)).toBe(87.6);
  });

  it('should handle arrays where average is not whole number', () => {
    expect(average([1, 2])).toBe(1.5);
    expect(average([1, 2, 3])).toBeCloseTo(2, 10);
  });
});
