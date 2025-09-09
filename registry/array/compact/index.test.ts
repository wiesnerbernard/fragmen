import { describe, it, expect } from 'vitest';
import { compact } from './index';

describe('compact', () => {
  it('should remove falsy values from array', () => {
    const mixed = [0, 1, false, 2, '', 3, null, 4, undefined, 5, NaN];
    expect(compact(mixed)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle array with only truthy values', () => {
    const truthy = [1, 'hello', true, {}, []];
    expect(compact(truthy)).toEqual([1, 'hello', true, {}, []]);
  });

  it('should handle array with only falsy values', () => {
    const falsy = [false, null, 0, '', undefined, NaN];
    expect(compact(falsy)).toEqual([]);
  });

  it('should handle empty array', () => {
    expect(compact([])).toEqual([]);
  });

  it('should handle strings correctly', () => {
    const strings = ['hello', '', 'world', null, 'foo', undefined, '0'];
    expect(compact(strings)).toEqual(['hello', 'world', 'foo', '0']);
  });

  it('should handle numbers correctly', () => {
    const numbers = [1, 0, 2, -1, 3, NaN, 4, null, 5];
    expect(compact(numbers)).toEqual([1, 2, -1, 3, 4, 5]);
  });

  it('should handle booleans correctly', () => {
    const booleans = [true, false, true, null, false, undefined];
    expect(compact(booleans)).toEqual([true, true]);
  });

  it('should handle objects and arrays', () => {
    const mixed = [{}, null, [], undefined, { a: 1 }, [1, 2], ''];
    expect(compact(mixed)).toEqual([{}, [], { a: 1 }, [1, 2]]);
  });

  it('should handle zero and negative zero', () => {
    const numbers = [1, 0, -0, 2, 3];
    expect(compact(numbers)).toEqual([1, 2, 3]);
  });

  it('should handle string "0" as truthy', () => {
    const values = ['0', 0, '1', 1, '', 'false', false];
    expect(compact(values)).toEqual(['0', '1', 1, 'false']);
  });

  it('should not mutate original array', () => {
    const original = [0, 1, false, 2, null, 3];
    const originalCopy = [...original];
    compact(original);
    expect(original).toEqual(originalCopy);
  });

  it('should handle non-array input', () => {
    expect(compact(null as any)).toEqual([]);
    expect(compact(undefined as any)).toEqual([]);
    expect(compact('not an array' as any)).toEqual([]);
  });

  it('should maintain correct types', () => {
    const stringArray = ['a', '', 'b', null, 'c'];
    const result = compact(stringArray);
    // TypeScript should infer this as string[]
    expect(result).toEqual(['a', 'b', 'c']);
    expect(typeof result[0]).toBe('string');
  });

  it('should handle mixed types correctly', () => {
    const mixed = [1, 'hello', null, true, undefined, 0, 'world', false];
    const result = compact(mixed);
    expect(result).toEqual([1, 'hello', true, 'world']);
  });
});
