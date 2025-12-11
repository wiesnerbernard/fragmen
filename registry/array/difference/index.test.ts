import { describe, expect, it } from 'vitest';
import { difference } from './index';

describe('difference', () => {
  it('should return elements from first array not in second', () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [2, 4];
    expect(difference(arr1, arr2)).toEqual([1, 3, 5]);
  });

  it('should handle multiple exclusion arrays', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(difference(arr, [2, 3], [4, 5])).toEqual([1, 6]);
  });

  it('should handle strings', () => {
    const words = ['apple', 'banana', 'cherry', 'date'];
    const exclude = ['banana', 'date'];
    expect(difference(words, exclude)).toEqual(['apple', 'cherry']);
  });

  it('should return copy when no exclusions provided', () => {
    const arr = [1, 2, 3];
    const result = difference(arr);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(arr); // Should be a new array
  });

  it('should return copy when empty exclusion array', () => {
    const arr = [1, 2, 3];
    expect(difference(arr, [])).toEqual([1, 2, 3]);
  });

  it('should return empty array when all elements excluded', () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  it('should handle empty first array', () => {
    expect(difference([], [1, 2, 3])).toEqual([]);
  });

  it('should preserve duplicates in first array', () => {
    const arr = [1, 2, 2, 3, 3, 3];
    expect(difference(arr, [2])).toEqual([1, 3, 3, 3]);
  });

  it('should handle no common elements', () => {
    expect(difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
  });

  it('should handle objects with same reference', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    expect(difference([obj1, obj2, obj3], [obj2])).toEqual([obj1, obj3]);
  });

  it('should handle non-array input for first parameter', () => {
    expect(difference(null as any, [1, 2])).toEqual([]);
    expect(difference(undefined as any, [1, 2])).toEqual([]);
  });

  it('should handle non-array in exclusion values', () => {
    const arr = [1, 2, 3, 4];
    expect(difference(arr, null as any, [2])).toEqual([1, 3, 4]);
    expect(difference(arr, undefined as any, [2, 3])).toEqual([1, 4]);
  });

  it('should return copy when only non-array exclusions provided', () => {
    const arr = [1, 2, 3];
    const result = difference(
      arr,
      null as any,
      undefined as any,
      'not an array' as any
    );
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(arr);
  });

  it('should maintain order from first array', () => {
    const arr = [5, 3, 1, 4, 2];
    expect(difference(arr, [3, 4])).toEqual([5, 1, 2]);
  });

  it('should work with mixed types', () => {
    const arr = [1, '2', 3, '4', 5];
    expect(difference(arr, ['2', '4'])).toEqual([1, 3, 5]);
  });
});
