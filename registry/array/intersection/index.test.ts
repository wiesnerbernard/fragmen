import { describe, it, expect } from 'vitest';
import { intersection } from './index';

describe('intersection', () => {
  it('should find intersection of two arrays', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [2, 3, 4, 5];
    expect(intersection(arr1, arr2)).toEqual([2, 3, 4]);
  });

  it('should find intersection of multiple arrays', () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [2, 3, 4, 5, 6];
    const arr3 = [3, 4, 5, 6, 7];
    expect(intersection(arr1, arr2, arr3)).toEqual([3, 4, 5]);
  });

  it('should handle empty intersection', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    expect(intersection(arr1, arr2)).toEqual([]);
  });

  it('should handle empty arrays', () => {
    const arr1: number[] = [];
    const arr2 = [1, 2, 3];
    expect(intersection(arr1, arr2)).toEqual([]);
    expect(intersection(arr2, arr1)).toEqual([]);
  });

  it('should handle single array', () => {
    const arr = [1, 2, 3, 2, 1];
    expect(intersection(arr)).toEqual([1, 2, 3]);
  });

  it('should handle no arrays', () => {
    expect(intersection()).toEqual([]);
  });

  it('should remove duplicates from result', () => {
    const arr1 = [1, 1, 2, 2, 3];
    const arr2 = [1, 2, 2, 3, 3];
    expect(intersection(arr1, arr2)).toEqual([1, 2, 3]);
  });

  it('should maintain order from first array', () => {
    const arr1 = [3, 1, 4, 2];
    const arr2 = [1, 2, 3, 4];
    expect(intersection(arr1, arr2)).toEqual([3, 1, 4, 2]);
  });

  it('should work with strings', () => {
    const arr1 = ['apple', 'banana', 'cherry'];
    const arr2 = ['banana', 'cherry', 'date'];
    expect(intersection(arr1, arr2)).toEqual(['banana', 'cherry']);
  });

  it('should work with mixed data types', () => {
    const arr1 = [1, 'a', true, null];
    const arr2 = ['a', 1, false, null];
    expect(intersection(arr1, arr2)).toEqual([1, 'a', null]);
  });

  it('should handle objects (reference equality)', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const arr1 = [obj1, obj2];
    const arr2 = [obj1, obj3];
    expect(intersection(arr1, arr2)).toEqual([obj1]);
  });

  it('should handle non-array inputs', () => {
    expect(intersection([1, 2], null as any)).toEqual([]);
    expect(intersection(null as any, [1, 2])).toEqual([]);
    expect(intersection([1, 2], 'not an array' as any)).toEqual([]);
    expect(intersection(null as any, undefined as any)).toEqual([]);
  });

  it('should handle identical arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(intersection(arr1, arr2)).toEqual([1, 2, 3]);
  });

  it('should not mutate original arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    const arr1Copy = [...arr1];
    const arr2Copy = [...arr2];

    intersection(arr1, arr2);

    expect(arr1).toEqual(arr1Copy);
    expect(arr2).toEqual(arr2Copy);
  });

  it('should handle complex intersection scenarios', () => {
    const arr1 = [1, 2, 3, 4, 5, 6];
    const arr2 = [2, 4, 6, 8, 10];
    const arr3 = [4, 6, 8, 12];
    const arr4 = [6, 12, 18];

    expect(intersection(arr1, arr2)).toEqual([2, 4, 6]);
    expect(intersection(arr1, arr2, arr3)).toEqual([4, 6]);
    expect(intersection(arr1, arr2, arr3, arr4)).toEqual([6]);
  });
});
