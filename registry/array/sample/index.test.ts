import { describe, expect, it } from 'vitest';
import { sample } from './index';

describe('sample', () => {
  it('should return a single element by default', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sample(arr);

    expect(arr).toContain(result);
  });

  it('should return a single element when count is 1', () => {
    const arr = ['a', 'b', 'c'];
    const result = sample(arr, 1);

    expect(arr).toContain(result);
  });

  it('should return multiple elements when count > 1', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sample(arr, 3);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
    result.forEach(item => {
      expect(arr).toContain(item);
    });
  });

  it('should not return more elements than array length', () => {
    const arr = [1, 2, 3];
    const result = sample(arr, 10);

    expect(result).toHaveLength(3);
  });

  it('should handle empty arrays', () => {
    const result1 = sample([], 1);
    const result2 = sample([], 5);

    expect(result1).toBeUndefined();
    expect(result2).toEqual([]);
  });

  it('should handle single-element arrays', () => {
    const result1 = sample([42], 1);
    const result2 = sample([42], 5);

    expect(result1).toBe(42);
    expect(result2).toEqual([42]);
  });

  it('should work with different data types', () => {
    const strings = ['apple', 'banana', 'cherry'];
    const stringResult = sample(strings);
    expect(strings).toContain(stringResult);

    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const objectResult = sample(objects);
    expect(objects).toContain(objectResult);
  });

  it('should return different elements over multiple runs', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<number>();

    // Sample 100 times
    for (let i = 0; i < 100; i++) {
      results.add(sample(arr));
    }

    // Should get multiple different values (statistically very likely)
    expect(results.size).toBeGreaterThan(3);
  });

  it('should not return duplicate elements in multi-sample', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sample(arr, 3);

    const unique = new Set(result);
    expect(unique.size).toBe(result.length);
  });

  it('should work with readonly arrays', () => {
    const arr: readonly number[] = [1, 2, 3] as const;
    const result1 = sample(arr);
    const result2 = sample(arr, 2);

    expect(arr).toContain(result1);
    expect(Array.isArray(result2)).toBe(true);
  });

  it('should handle count of 0', () => {
    const arr = [1, 2, 3];
    const result = sample(arr, 0);

    expect(result).toEqual([]);
  });

  it('should return all elements when count equals length', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = sample(arr, 5);

    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});
