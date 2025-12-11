import { describe, expect, it } from 'vitest';
import { isEqual } from '.';

describe('isEqual', () => {
  describe('primitives', () => {
    it('should return true for equal numbers', () => {
      expect(isEqual(42, 42)).toBe(true);
      expect(isEqual(0, 0)).toBe(true);
      expect(isEqual(-1, -1)).toBe(true);
    });

    it('should return false for different numbers', () => {
      expect(isEqual(42, 43)).toBe(false);
      expect(isEqual(0, -0)).toBe(false);
    });

    it('should handle NaN correctly', () => {
      expect(isEqual(NaN, NaN)).toBe(true);
    });

    it('should return true for equal strings', () => {
      expect(isEqual('hello', 'hello')).toBe(true);
      expect(isEqual('', '')).toBe(true);
    });

    it('should return false for different strings', () => {
      expect(isEqual('hello', 'world')).toBe(false);
      expect(isEqual('Hello', 'hello')).toBe(false);
    });

    it('should return true for equal booleans', () => {
      expect(isEqual(true, true)).toBe(true);
      expect(isEqual(false, false)).toBe(true);
    });

    it('should return false for different booleans', () => {
      expect(isEqual(true, false)).toBe(false);
    });

    it('should return true for null values', () => {
      expect(isEqual(null, null)).toBe(true);
    });

    it('should return true for undefined values', () => {
      expect(isEqual(undefined, undefined)).toBe(true);
    });

    it('should return false for different types', () => {
      expect(isEqual(0, '0')).toBe(false);
      expect(isEqual(1, true)).toBe(false);
      expect(isEqual(null, undefined)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('should return true for equal arrays', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(isEqual([], [])).toBe(true);
    });

    it('should return false for arrays with different lengths', () => {
      expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it('should return false for arrays with different elements', () => {
      expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('should return false for arrays with different order', () => {
      expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    });

    it('should handle nested arrays', () => {
      expect(
        isEqual(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 4],
          ]
        )
      ).toBe(true);
      expect(
        isEqual(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 5],
          ]
        )
      ).toBe(false);
    });

    it('should handle arrays with objects', () => {
      expect(isEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
      expect(isEqual([{ a: 1 }], [{ a: 2 }])).toBe(false);
    });
  });

  describe('objects', () => {
    it('should return true for equal objects', () => {
      expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
      expect(isEqual({}, {})).toBe(true);
    });

    it('should return false for objects with different keys', () => {
      expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
      expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('should return false for objects with different values', () => {
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should handle nested objects', () => {
      expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
      expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
    });

    it('should handle objects with different key order', () => {
      expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });

    it('should handle objects with arrays', () => {
      expect(isEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
      expect(isEqual({ a: [1, 2] }, { a: [2, 1] })).toBe(false);
    });
  });

  describe('Date', () => {
    it('should return true for equal dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-01');
      expect(isEqual(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      expect(isEqual(date1, date2)).toBe(false);
    });

    it('should return false for date vs non-date', () => {
      const date = new Date('2024-01-01');
      expect(isEqual(date, '2024-01-01')).toBe(false);
      expect(isEqual(date, date.getTime())).toBe(false);
    });
  });

  describe('RegExp', () => {
    it('should return true for equal regular expressions', () => {
      expect(isEqual(/test/, /test/)).toBe(true);
      expect(isEqual(/test/gi, /test/gi)).toBe(true);
    });

    it('should return false for different regular expressions', () => {
      expect(isEqual(/test/, /best/)).toBe(false);
      expect(isEqual(/test/i, /test/g)).toBe(false);
    });

    it('should return false for regex vs non-regex', () => {
      expect(isEqual(/test/, 'test')).toBe(false);
    });
  });

  describe('Map', () => {
    it('should return true for equal Maps', () => {
      const map1 = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      const map2 = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      expect(isEqual(map1, map2)).toBe(true);
    });

    it('should return false for Maps with different sizes', () => {
      const map1 = new Map([['a', 1]]);
      const map2 = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      expect(isEqual(map1, map2)).toBe(false);
    });

    it('should return false for Maps with different values', () => {
      const map1 = new Map([['a', 1]]);
      const map2 = new Map([['a', 2]]);
      expect(isEqual(map1, map2)).toBe(false);
    });

    it('should handle Maps with object values', () => {
      const map1 = new Map([['a', { b: 1 }]]);
      const map2 = new Map([['a', { b: 1 }]]);
      expect(isEqual(map1, map2)).toBe(true);
    });
  });

  describe('Set', () => {
    it('should return true for equal Sets', () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([1, 2, 3]);
      expect(isEqual(set1, set2)).toBe(true);
    });

    it('should return false for Sets with different sizes', () => {
      const set1 = new Set([1, 2]);
      const set2 = new Set([1, 2, 3]);
      expect(isEqual(set1, set2)).toBe(false);
    });

    it('should return false for Sets with different values', () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([1, 2, 4]);
      expect(isEqual(set1, set2)).toBe(false);
    });

    it('should handle Sets with object values', () => {
      const obj = { a: 1 };
      const set1 = new Set([obj]);
      const set2 = new Set([obj]);
      expect(isEqual(set1, set2)).toBe(true);
    });
  });

  describe('complex cases', () => {
    it('should handle deeply nested structures', () => {
      const obj1 = {
        a: [1, { b: [2, 3] }],
        c: { d: { e: [4, 5, 6] } },
      };
      const obj2 = {
        a: [1, { b: [2, 3] }],
        c: { d: { e: [4, 5, 6] } },
      };
      expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should handle mixed types', () => {
      const obj1 = {
        num: 42,
        str: 'hello',
        bool: true,
        arr: [1, 2, 3],
        obj: { a: 1 },
        date: new Date('2024-01-01'),
        regex: /test/,
      };
      const obj2 = {
        num: 42,
        str: 'hello',
        bool: true,
        arr: [1, 2, 3],
        obj: { a: 1 },
        date: new Date('2024-01-01'),
        regex: /test/,
      };
      expect(isEqual(obj1, obj2)).toBe(true);
    });
  });
});
