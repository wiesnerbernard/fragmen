import { describe, it, expect, vi } from 'vitest';
import { once } from './index';

describe('once', () => {
  it('should only execute function once', () => {
    const fn = vi.fn(() => 'result');
    const onceWrapper = once(fn);

    onceWrapper();
    onceWrapper();
    onceWrapper();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should return same result for all calls', () => {
    const fn = () => ({ value: 42 });
    const onceWrapper = once(fn);

    const result1 = onceWrapper();
    const result2 = onceWrapper();
    const result3 = onceWrapper();

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toEqual({ value: 42 });
  });

  it('should use arguments from first call only', () => {
    const fn = vi.fn((name: string) => `Hello, ${name}`);
    const onceWrapper = once(fn as (...args: unknown[]) => string);

    const result1 = onceWrapper('Alice');
    const result2 = onceWrapper('Bob');
    const result3 = onceWrapper('Charlie');

    expect(result1).toBe('Hello, Alice');
    expect(result2).toBe('Hello, Alice');
    expect(result3).toBe('Hello, Alice');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('Alice');
  });

  it('should work with functions that return undefined', () => {
    const fn = vi.fn(() => undefined);
    const onceWrapper = once(fn);

    const result1 = onceWrapper();
    const result2 = onceWrapper();

    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with functions that return null', () => {
    const fn = vi.fn(() => null);
    const onceWrapper = once(fn);

    const result1 = onceWrapper();
    const result2 = onceWrapper();

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with functions that return primitives', () => {
    const fn = vi.fn(() => 123);
    const onceWrapper = once(fn);

    expect(onceWrapper()).toBe(123);
    expect(onceWrapper()).toBe(123);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with functions that return objects', () => {
    const obj = { id: 1, name: 'test' };
    const fn = vi.fn(() => obj);
    const onceWrapper = once(fn);

    const result1 = onceWrapper();
    const result2 = onceWrapper();

    expect(result1).toBe(obj);
    expect(result2).toBe(obj);
    expect(result1).toBe(result2); // Same reference
  });

  it('should work with functions that have side effects', () => {
    let counter = 0;
    const fn = () => {
      counter++;
      return counter;
    };
    const onceWrapper = once(fn);

    expect(onceWrapper()).toBe(1);
    expect(onceWrapper()).toBe(1);
    expect(onceWrapper()).toBe(1);
    expect(counter).toBe(1); // Side effect only happened once
  });

  it('should handle functions with multiple parameters', () => {
    const fn = vi.fn((a: number, b: number, c: number) => a + b + c);
    const onceWrapper = once(fn as (...args: unknown[]) => number);

    expect(onceWrapper(1, 2, 3)).toBe(6);
    expect(onceWrapper(4, 5, 6)).toBe(6); // Still returns first result
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1, 2, 3);
  });

  it('should handle functions with no parameters', () => {
    const fn = vi.fn(() => 'no params');
    const onceWrapper = once(fn);

    expect(onceWrapper()).toBe('no params');
    expect(onceWrapper()).toBe('no params');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with arrow functions', () => {
    const onceWrapper = once(() => 'arrow');

    expect(onceWrapper()).toBe('arrow');
    expect(onceWrapper()).toBe('arrow');
  });

  it('should work with async functions', async () => {
    const fn = vi.fn(async () => 'async result');
    const onceWrapper = once(fn);

    const result1 = await onceWrapper();
    const result2 = await onceWrapper();

    expect(result1).toBe('async result');
    expect(result2).toBe(result1); // Same promise reference
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should cache result even if function throws on first call', () => {
    const fn = vi.fn(() => {
      throw new Error('Test error');
    });
    const onceWrapper = once(fn);

    expect(() => onceWrapper()).toThrow('Test error');
    expect(() => onceWrapper()).not.toThrow(); // Returns undefined (cached)
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with functions returning arrays', () => {
    const arr = [1, 2, 3];
    const fn = vi.fn(() => arr);
    const onceWrapper = once(fn);

    const result1 = onceWrapper();
    const result2 = onceWrapper();

    expect(result1).toBe(arr);
    expect(result2).toBe(arr);
    expect(result1).toBe(result2);
  });

  it('should handle complex return types', () => {
    type ComplexType = {
      data: number[];
      meta: { count: number };
      fn: () => string;
    };

    const result: ComplexType = {
      data: [1, 2, 3],
      meta: { count: 3 },
      fn: () => 'test',
    };

    const fn = vi.fn(() => result);
    const onceWrapper = once(fn);

    const r1 = onceWrapper();
    const r2 = onceWrapper();

    expect(r1).toBe(result);
    expect(r2).toBe(result);
    expect(r1.fn()).toBe('test');
  });
});
