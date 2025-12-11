import { describe, it, expect } from 'vitest';
import { union } from './index';

describe('union', () => {
  it('should combine two arrays removing duplicates', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    expect(union(arr1, arr2)).toEqual([1, 2, 3, 4]);
  });

  it('should handle multiple arrays', () => {
    const arr1 = [1, 2];
    const arr2 = [2, 3];
    const arr3 = [3, 4];
    expect(union(arr1, arr2, arr3)).toEqual([1, 2, 3, 4]);
  });

  it('should handle strings', () => {
    const words1 = ['apple', 'banana'];
    const words2 = ['banana', 'cherry'];
    expect(union(words1, words2)).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should remove duplicates within same array', () => {
    const arr = [1, 1, 2, 2, 3];
    expect(union(arr)).toEqual([1, 2, 3]);
  });

  it('should handle single array', () => {
    expect(union([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle no arrays', () => {
    expect(union()).toEqual([]);
  });

  it('should handle empty arrays', () => {
    expect(union([], [])).toEqual([]);
    expect(union([1, 2], [], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should maintain order of first occurrence', () => {
    const arr1 = [3, 1, 2];
    const arr2 = [2, 4, 1];
    expect(union(arr1, arr2)).toEqual([3, 1, 2, 4]);
  });

  it('should handle arrays with no overlap', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    expect(union(arr1, arr2)).toEqual([1, 2, 3, 4]);
  });

  it('should handle identical arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(union(arr1, arr2)).toEqual([1, 2, 3]);
  });

  it('should handle objects with same reference', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const arr1 = [obj1, obj2];
    const arr2 = [obj2, obj1];
    expect(union(arr1, arr2)).toEqual([obj1, obj2]);
  });

  it('should handle non-array inputs', () => {
    expect(union(null as any)).toEqual([]);
    expect(union(undefined as any)).toEqual([]);
    expect(union([1, 2], null as any, [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('should handle mixed types', () => {
    const arr1 = [1, '2', 3];
    const arr2 = ['2', 4, '5'];
    expect(union(arr1, arr2)).toEqual([1, '2', 3, 4, '5']);
  });

  it('should not mutate original arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 4, 5];
    const original1 = [...arr1];
    const original2 = [...arr2];
    union(arr1, arr2);
    expect(arr1).toEqual(original1);
    expect(arr2).toEqual(original2);
  });

  it('should handle large arrays efficiently', () => {
    const arr1 = Array.from({ length: 1000 }, (_, i) => i);
    const arr2 = Array.from({ length: 1000 }, (_, i) => i + 500);
    const result = union(arr1, arr2);
    expect(result.length).toBe(1500);
    expect(result[0]).toBe(0);
    expect(result[result.length - 1]).toBe(1499);
  });
});
