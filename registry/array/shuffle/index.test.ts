import { describe, expect, it } from 'vitest';
import { shuffle } from './index';

describe('shuffle', () => {
  it('should return a new array', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original);

    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3, 4, 5]); // Original unchanged
  });

  it('should contain all original elements', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original);

    expect(result).toHaveLength(original.length);
    expect(result.sort()).toEqual(original.sort());
  });

  it('should handle empty arrays', () => {
    const result = shuffle([]);

    expect(result).toEqual([]);
  });

  it('should handle single-element arrays', () => {
    const result = shuffle([1]);

    expect(result).toEqual([1]);
  });

  it('should handle two-element arrays', () => {
    const original = [1, 2];
    const result = shuffle(original);

    expect(result).toHaveLength(2);
    expect(result).toContain(1);
    expect(result).toContain(2);
  });

  it('should work with different data types', () => {
    const strings = ['a', 'b', 'c'];
    const stringResult = shuffle(strings);
    expect(stringResult).toHaveLength(3);
    expect(stringResult.sort()).toEqual(['a', 'b', 'c']);

    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const objectResult = shuffle(objects);
    expect(objectResult).toHaveLength(3);
    expect(objectResult.map(o => o.id).sort()).toEqual([1, 2, 3]);
  });

  it('should produce different results over multiple runs', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<string>();

    // Run shuffle 50 times and collect unique results
    for (let i = 0; i < 50; i++) {
      results.add(JSON.stringify(shuffle(original)));
    }

    // With 10 elements, we should get multiple different shuffles
    // (not a guarantee, but statistically very likely)
    expect(results.size).toBeGreaterThan(10);
  });

  it('should handle arrays with duplicate elements', () => {
    const original = [1, 1, 2, 2, 3, 3];
    const result = shuffle(original);

    expect(result).toHaveLength(6);
    expect(result.filter(x => x === 1)).toHaveLength(2);
    expect(result.filter(x => x === 2)).toHaveLength(2);
    expect(result.filter(x => x === 3)).toHaveLength(2);
  });

  it('should work with readonly arrays', () => {
    const original: readonly number[] = [1, 2, 3] as const;
    const result = shuffle(original);

    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual([1, 2, 3]);
  });
});
