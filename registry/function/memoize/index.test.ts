import { describe, expect, it, vi } from 'vitest';
import { memoize } from '.';

describe('memoize', () => {
  it('should cache function results', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with multiple arguments', () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    expect(memoized(2, 3)).toBe(5);
    expect(memoized(2, 3)).toBe(5);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(3, 4)).toBe(7);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should distinguish between different arguments', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(10)).toBe(20);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should work with string arguments', () => {
    const fn = vi.fn((s: string) => s.toUpperCase());
    const memoized = memoize(fn);

    expect(memoized('hello')).toBe('HELLO');
    expect(memoized('hello')).toBe('HELLO');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should work with object arguments', () => {
    const fn = vi.fn((obj: { x: number }) => obj.x * 2);
    const memoized = memoize(fn);

    expect(memoized({ x: 5 })).toBe(10);
    expect(memoized({ x: 5 })).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized({ x: 10 })).toBe(20);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should respect maxCacheSize parameter', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn, 2);

    memoized(1); // Cache: [1]
    memoized(2); // Cache: [1, 2]
    memoized(3); // Cache: [2, 3] (1 evicted)

    expect(fn).toHaveBeenCalledTimes(3);

    memoized(2); // Cache hit
    expect(fn).toHaveBeenCalledTimes(3);

    memoized(1); // Cache miss (was evicted)
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('should clear cache', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    memoized(5);
    expect(fn).toHaveBeenCalledTimes(1);

    memoized.clear();

    memoized(5);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should handle zero arguments', () => {
    const fn = vi.fn(() => Math.random());
    const memoized = memoize(fn);

    const result1 = memoized();
    const result2 = memoized();

    expect(result1).toBe(result2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle null and undefined arguments', () => {
    const fn = vi.fn((x: number | null | undefined) => String(x));
    const memoized = memoize(fn);

    expect(memoized(null)).toBe('null');
    expect(memoized(null)).toBe('null');
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(undefined)).toBe('undefined');
    expect(memoized(undefined)).toBe('undefined');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should work with array arguments', () => {
    const fn = vi.fn((arr: number[]) => arr.reduce((a, b) => a + b, 0));
    const memoized = memoize(fn);

    expect(memoized([1, 2, 3])).toBe(6);
    expect(memoized([1, 2, 3])).toBe(6);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized([1, 2, 4])).toBe(7);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should handle functions that return objects', () => {
    const fn = vi.fn((name: string) => ({ name, timestamp: Date.now() }));
    const memoized = memoize(fn);

    const result1 = memoized('Alice');
    const result2 = memoized('Alice');

    expect(result1).toBe(result2); // Same reference
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle expensive computations', () => {
    const fibonacci = vi.fn((n: number): number => {
      if (n <= 1) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    });

    const memoizedFib = memoize(fibonacci);

    expect(memoizedFib(10)).toBe(55);
    const firstCallCount = fibonacci.mock.calls.length;

    expect(memoizedFib(10)).toBe(55);
    expect(fibonacci).toHaveBeenCalledTimes(firstCallCount); // No additional calls
  });

  it('should work with different argument types', () => {
    const fn = vi.fn((a: number, b: string, c: boolean) => `${a}-${b}-${c}`);
    const memoized = memoize(fn);

    expect(memoized(1, 'test', true)).toBe('1-test-true');
    expect(memoized(1, 'test', true)).toBe('1-test-true');
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoized(1, 'test', false)).toBe('1-test-false');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
