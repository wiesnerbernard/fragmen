import { describe, it, expect } from 'vitest';
import { flatten } from './index';

describe('flatten', () => {
  it('should flatten one level by default', () => {
    const nested = [1, [2, 3], [4, 5]];
    expect(flatten(nested)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle deeply nested arrays with default depth', () => {
    const deepNested = [1, [2, [3, 4]]];
    expect(flatten(deepNested)).toEqual([1, 2, [3, 4]]);
  });

  it('should flatten to specified depth', () => {
    const multiLevel = [1, [2, [3, [4, 5]]]];
    expect(flatten(multiLevel, 2)).toEqual([1, 2, 3, [4, 5]]);
  });

  it('should flatten completely with Infinity depth', () => {
    const deepNested = [1, [2, [3, [4, [5]]]]];
    expect(flatten(deepNested, Infinity)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle depth of 0', () => {
    const nested = [1, [2, 3], [4, 5]];
    expect(flatten(nested, 0)).toEqual([1, [2, 3], [4, 5]]);
  });

  it('should handle negative depth', () => {
    const nested = [1, [2, 3], [4, 5]];
    expect(flatten(nested, -1)).toEqual([1, [2, 3], [4, 5]]);
  });

  it('should handle empty array', () => {
    expect(flatten([])).toEqual([]);
  });

  it('should handle already flat array', () => {
    const flat = [1, 2, 3, 4, 5];
    expect(flatten(flat)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle array with empty sub-arrays', () => {
    const withEmpty = [1, [], [2, 3], [], [4]];
    expect(flatten(withEmpty)).toEqual([1, 2, 3, 4]);
  });

  it('should work with different data types', () => {
    const strings = ['a', ['b', 'c'], ['d', ['e']]];
    expect(flatten(strings)).toEqual(['a', 'b', 'c', 'd', ['e']]);

    const mixed = [1, ['a', [true, null]]];
    expect(flatten(mixed, 2)).toEqual([1, 'a', true, null]);
  });

  it('should handle non-array input', () => {
    expect(flatten(null as any)).toEqual([]);
    expect(flatten(undefined as any)).toEqual([]);
    expect(flatten('not an array' as any)).toEqual([]);
  });

  it('should not mutate the original array', () => {
    const original = [1, [2, 3], [4, 5]];
    const originalCopy = JSON.parse(JSON.stringify(original));
    flatten(original);
    expect(original).toEqual(originalCopy);
  });

  it('should handle complex nested structures', () => {
    const complex = [1, [2, 3], [4, [5, 6, [7, 8]]], 9, [10]];
    expect(flatten(complex, 1)).toEqual([1, 2, 3, 4, [5, 6, [7, 8]], 9, 10]);
    expect(flatten(complex, 2)).toEqual([1, 2, 3, 4, 5, 6, [7, 8], 9, 10]);
    expect(flatten(complex, 3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
