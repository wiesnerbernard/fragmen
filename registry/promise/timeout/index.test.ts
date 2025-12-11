import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { timeout } from './index';

describe('timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should resolve if promise resolves before timeout', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('success'), 100)
    );

    const timeoutPromise = timeout(promise, 200);
    vi.advanceTimersByTime(100);

    const result = await timeoutPromise;
    expect(result).toBe('success');
  });

  it('should reject if promise does not resolve before timeout', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('success'), 200)
    );

    const timeoutPromise = timeout(promise, 100);

    await expect(async () => {
      vi.advanceTimersByTime(100);
      await timeoutPromise;
    }).rejects.toThrow('Operation timed out after 100ms');
  });

  it('should use custom error message', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('success'), 200)
    );

    const timeoutPromise = timeout(promise, 100, 'Custom timeout message');

    await expect(async () => {
      vi.advanceTimersByTime(100);
      await timeoutPromise;
    }).rejects.toThrow('Custom timeout message');
  });

  it('should reject with TimeoutError name', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('success'), 200)
    );

    const timeoutPromise = timeout(promise, 100);

    try {
      vi.advanceTimersByTime(100);
      await timeoutPromise;
      expect.fail('Should have thrown');
    } catch (error) {
      expect((error as Error).name).toBe('TimeoutError');
    }
  });

  it('should resolve with promise value', async () => {
    const value = { data: [1, 2, 3], status: 'ok' };
    const promise = Promise.resolve(value);

    const result = await timeout(promise, 1000);
    expect(result).toBe(value);
  });

  it('should reject with original error if promise rejects before timeout', async () => {
    const error = new Error('Original error');
    const promise = new Promise<string>((_, reject) =>
      setTimeout(() => reject(error), 50)
    );

    const timeoutPromise = timeout(promise, 100);

    await expect(async () => {
      vi.advanceTimersByTime(50);
      await timeoutPromise;
    }).rejects.toThrow('Original error');
  });

  it('should throw TypeError for non-promise input', async () => {
    expect(() => timeout(null as never, 1000)).toThrow(TypeError);
    expect(() => timeout(undefined as never, 1000)).toThrow(TypeError);
    expect(() => timeout('not a promise' as never, 1000)).toThrow(TypeError);
    expect(() => timeout({} as never, 1000)).toThrow(TypeError);
  });

  it('should throw RangeError for negative timeout', () => {
    const promise = Promise.resolve('test');
    expect(() => timeout(promise, -100)).toThrow(RangeError);
  });

  it('should throw RangeError for non-number timeout', () => {
    const promise = Promise.resolve('test');
    expect(() => timeout(promise, 'not a number' as never)).toThrow(RangeError);
  });

  it('should handle zero timeout', async () => {
    const promise = new Promise<string>(resolve =>
      setTimeout(() => resolve('success'), 10)
    );

    const timeoutPromise = timeout(promise, 0);

    await expect(async () => {
      vi.advanceTimersByTime(0);
      await timeoutPromise;
    }).rejects.toThrow('Operation timed out after 0ms');
  });

  it('should handle already resolved promise', async () => {
    const promise = Promise.resolve('immediate');
    const result = await timeout(promise, 1000);
    expect(result).toBe('immediate');
  });

  it('should handle already rejected promise', async () => {
    const promise = Promise.reject(new Error('immediate error'));

    await expect(timeout(promise, 1000)).rejects.toThrow('immediate error');
  });

  it('should work with async functions', async () => {
    const asyncFn = async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return 'async result';
    };

    const timeoutPromise = timeout(asyncFn(), 100);
    vi.advanceTimersByTime(50);

    const result = await timeoutPromise;
    expect(result).toBe('async result');
  });

  it('should timeout async functions that take too long', async () => {
    const slowAsyncFn = async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return 'should not reach here';
    };

    const timeoutPromise = timeout(slowAsyncFn(), 100);

    await expect(async () => {
      vi.advanceTimersByTime(100);
      await timeoutPromise;
    }).rejects.toThrow('Operation timed out after 100ms');
  });

  it('should work with fetch-like promises', async () => {
    const mockFetch = () =>
      new Promise<Response>(resolve =>
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({ data: 'test' }),
          } as Response);
        }, 50)
      );

    const timeoutPromise = timeout(mockFetch(), 100);
    vi.advanceTimersByTime(50);

    const response = await timeoutPromise;
    expect(response.ok).toBe(true);
  });

  it('should preserve promise chain', async () => {
    const promise = Promise.resolve(5)
      .then(n => n * 2)
      .then(n => n + 3);

    const result = await timeout(promise, 1000);
    expect(result).toBe(13);
  });

  it('should handle very large timeout values', async () => {
    const promise = Promise.resolve('fast');
    const result = await timeout(promise, Number.MAX_SAFE_INTEGER);
    expect(result).toBe('fast');
  });
});
