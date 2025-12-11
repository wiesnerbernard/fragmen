import { describe, it, expect } from 'vitest';
import { zip } from './index';

describe('zip', () => {
  it('should zip two arrays together', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b', 'c'];
    expect(zip(arr1, arr2)).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('should zip multiple arrays together', () => {
    const names = ['Alice', 'Bob'];
    const ages = [25, 30];
    const cities = ['NYC', 'LA'];
    expect(zip(names, ages, cities)).toEqual([
      ['Alice', 25, 'NYC'],
      ['Bob', 30, 'LA'],
    ]);
  });

  it('should truncate to shortest array length', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = ['a', 'b'];
    expect(zip(arr1, arr2)).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('should handle single array', () => {
    const arr = [1, 2, 3];
    expect(zip(arr)).toEqual([[1], [2], [3]]);
  });

  it('should return empty array when no arrays provided', () => {
    expect(zip()).toEqual([]);
  });

  it('should return empty array when any array is empty', () => {
    expect(zip([], [1, 2])).toEqual([]);
    expect(zip([1, 2], [])).toEqual([]);
    expect(zip([1, 2], [3, 4], [])).toEqual([]);
  });

  it('should handle arrays of different types', () => {
    const numbers = [1, 2];
    const strings = ['a', 'b'];
    const booleans = [true, false];
    expect(zip(numbers, strings, booleans)).toEqual([
      [1, 'a', true],
      [2, 'b', false],
    ]);
  });

  it('should handle arrays with one element', () => {
    expect(zip([1], ['a'], [true])).toEqual([[1, 'a', true]]);
  });

  it('should handle non-array inputs', () => {
    expect(zip(null as any)).toEqual([]);
    expect(zip(undefined as any)).toEqual([]);
    expect(zip([1, 2], null as any, [3, 4])).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  it('should not mutate original arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b', 'c'];
    const original1 = [...arr1];
    const original2 = [...arr2];
    zip(arr1, arr2);
    expect(arr1).toEqual(original1);
    expect(arr2).toEqual(original2);
  });

  it('should handle objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const arr1 = [obj1];
    const arr2 = [obj2];
    expect(zip(arr1, arr2)).toEqual([[obj1, obj2]]);
  });

  it('should handle nested arrays', () => {
    const arr1 = [
      [1, 2],
      [3, 4],
    ];
    const arr2 = [
      ['a', 'b'],
      ['c', 'd'],
    ];
    expect(zip(arr1, arr2)).toEqual([
      [
        [1, 2],
        ['a', 'b'],
      ],
      [
        [3, 4],
        ['c', 'd'],
      ],
    ]);
  });

  it('should work with many arrays', () => {
    const arrays = Array.from({ length: 5 }, (_, i) =>
      Array.from({ length: 3 }, (_, j) => i * 3 + j)
    );
    const result = zip(...arrays);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual([0, 3, 6, 9, 12]);
  });
});
