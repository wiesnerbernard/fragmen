import { describe, expect, it } from 'vitest';
import { deepEqual } from './index';

describe('deepEqual', () => {
  it('should return true for same reference', () => {
    const obj = { a: 1 };
    expect(deepEqual(obj, obj)).toBe(true);
  });

  it('should return true for equal primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  it('should return false for different primitives', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('hello', 'world')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
  });

  it('should handle null and undefined', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual(null, 0)).toBe(false);
    expect(deepEqual(undefined, 0)).toBe(false);
  });

  it('should compare simple objects', () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it('should compare nested objects', () => {
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(
      true
    );
    expect(deepEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(
      false
    );
  });

  it('should compare arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('should compare nested arrays', () => {
    expect(
      deepEqual(
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
      deepEqual(
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

  it('should compare objects with arrays', () => {
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBe(true);
    expect(deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] })).toBe(false);
  });

  it('should compare arrays with objects', () => {
    expect(deepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    expect(deepEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }])).toBe(false);
  });

  it('should handle empty objects and arrays', () => {
    expect(deepEqual({}, {})).toBe(true);
    expect(deepEqual([], [])).toBe(true);
    expect(deepEqual({}, [])).toBe(false);
  });

  it('should handle objects with different key counts', () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it('should handle different types', () => {
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual(true, 1)).toBe(false);
    expect(deepEqual({}, [])).toBe(false);
    expect(deepEqual(null, {})).toBe(false);
  });

  it('should compare dates', () => {
    const date1 = new Date('2024-01-01');
    const date2 = new Date('2024-01-01');
    const date3 = new Date('2024-01-02');

    expect(deepEqual(date1, date2)).toBe(true);
    expect(deepEqual(date1, date3)).toBe(false);
  });

  it('should handle complex nested structures', () => {
    const obj1 = {
      a: 1,
      b: {
        c: [1, 2, { d: 3, e: [4, 5] }],
        f: 'test',
      },
      g: null,
    };

    const obj2 = {
      a: 1,
      b: {
        c: [1, 2, { d: 3, e: [4, 5] }],
        f: 'test',
      },
      g: null,
    };

    const obj3 = {
      a: 1,
      b: {
        c: [1, 2, { d: 3, e: [4, 6] }],
        f: 'test',
      },
      g: null,
    };

    expect(deepEqual(obj1, obj2)).toBe(true);
    expect(deepEqual(obj1, obj3)).toBe(false);
  });

  it('should handle objects with undefined values', () => {
    expect(deepEqual({ a: undefined }, { a: undefined })).toBe(true);
    expect(deepEqual({ a: undefined }, { b: undefined })).toBe(false);
    expect(deepEqual({ a: undefined }, {})).toBe(false);
  });

  it('should handle arrays with different lengths', () => {
    expect(deepEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(deepEqual([1], [1, 2, 3])).toBe(false);
  });

  it('should handle special number values', () => {
    expect(deepEqual(NaN, NaN)).toBe(false); // NaN !== NaN in JS
    expect(deepEqual(Infinity, Infinity)).toBe(true);
    expect(deepEqual(-Infinity, -Infinity)).toBe(true);
    expect(deepEqual(Infinity, -Infinity)).toBe(false);
  });

  it('should handle boolean objects', () => {
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(false, false)).toBe(true);
    expect(deepEqual(true, false)).toBe(false);
  });

  it('should handle mixed nested types', () => {
    const complex1 = {
      users: [
        { id: 1, name: 'John', tags: ['admin', 'user'] },
        { id: 2, name: 'Jane', tags: ['user'] },
      ],
      metadata: {
        count: 2,
        active: true,
      },
    };

    const complex2 = {
      users: [
        { id: 1, name: 'John', tags: ['admin', 'user'] },
        { id: 2, name: 'Jane', tags: ['user'] },
      ],
      metadata: {
        count: 2,
        active: true,
      },
    };

    expect(deepEqual(complex1, complex2)).toBe(true);
  });
});
