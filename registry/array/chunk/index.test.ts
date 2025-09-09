import { describe, it, expect } from 'vitest';
import { chunk } from './index';

describe('chunk', () => {
  it('should split array into chunks of specified size', () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(chunk(numbers, 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('should handle arrays that do not divide evenly', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7];
    expect(chunk(numbers, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('should handle chunk size larger than array length', () => {
    const numbers = [1, 2, 3];
    expect(chunk(numbers, 5)).toEqual([[1, 2, 3]]);
  });

  it('should handle chunk size of 1', () => {
    const numbers = [1, 2, 3];
    expect(chunk(numbers, 1)).toEqual([[1], [2], [3]]);
  });

  it('should handle empty array', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('should handle zero chunk size', () => {
    const numbers = [1, 2, 3];
    expect(chunk(numbers, 0)).toEqual([]);
  });

  it('should handle negative chunk size', () => {
    const numbers = [1, 2, 3];
    expect(chunk(numbers, -1)).toEqual([]);
  });

  it('should handle non-integer chunk size', () => {
    const numbers = [1, 2, 3];
    expect(chunk(numbers, 2.5)).toEqual([]);
  });

  it('should handle non-array input', () => {
    expect(chunk(null as any, 2)).toEqual([]);
    expect(chunk(undefined as any, 2)).toEqual([]);
    expect(chunk('not an array' as any, 2)).toEqual([]);
  });

  it('should work with different data types', () => {
    const strings = ['a', 'b', 'c', 'd', 'e'];
    expect(chunk(strings, 2)).toEqual([['a', 'b'], ['c', 'd'], ['e']]);

    const objects = [{ a: 1 }, { b: 2 }, { c: 3 }];
    expect(chunk(objects, 2)).toEqual([[{ a: 1 }, { b: 2 }], [{ c: 3 }]]);
  });

  it('should not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const originalCopy = [...original];
    chunk(original, 2);
    expect(original).toEqual(originalCopy);
  });
});
