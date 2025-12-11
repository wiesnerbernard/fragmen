import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { retry } from './index';

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return result on first successful attempt', async () => {
    const fn = vi.fn(async () => 'success');

    const promise = retry(fn);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and succeed', async () => {
    let attempts = 0;
    const fn = vi.fn(async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error('Failed');
      }
      return 'success';
    });

    const promise = retry(fn, { retries: 3, delay: 100 });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should throw after all retries exhausted', async () => {
    const fn = vi.fn(async () => {
      throw new Error('Always fails');
    });

    const promise = retry(fn, { retries: 2, delay: 100 });
    promise.catch(() => {}); // Prevent unhandled rejection

    await expect(async () => {
      await vi.runAllTimersAsync();
      await promise;
    }).rejects.toThrow('Always fails');

    expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });

  it('should use default retry options', async () => {
    const fn = vi.fn(async () => {
      throw new Error('Fails');
    });

    const promise = retry(fn);
    promise.catch(() => {}); // Prevent unhandled rejection

    await expect(async () => {
      await vi.runAllTimersAsync();
      await promise;
    }).rejects.toThrow('Fails');

    expect(fn).toHaveBeenCalledTimes(4); // Initial + 3 retries (default)
  });

  it('should apply exponential backoff', async () => {
    const delays: number[] = [];
    let callCount = 0;

    const fn = vi.fn(async () => {
      callCount++;
      if (callCount > 1) {
        delays.push(Date.now());
      }
      throw new Error('Fails');
    });

    const promise = retry(fn, { retries: 3, delay: 100, backoff: 2 });
    promise.catch(() => {}); // Prevent unhandled rejection

    await expect(async () => {
      await vi.runAllTimersAsync();
      await promise;
    }).rejects.toThrow('Fails');

    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('should handle zero retries', async () => {
    const fn = vi.fn(async () => {
      throw new Error('Fails immediately');
    });

    const promise = retry(fn, { retries: 0 });
    promise.catch(() => {}); // Prevent unhandled rejection

    await expect(async () => {
      await vi.runAllTimersAsync();
      await promise;
    }).rejects.toThrow('Fails immediately');

    expect(fn).toHaveBeenCalledTimes(1); // Only initial attempt
  });

  it('should handle custom backoff multiplier', async () => {
    let attempts = 0;
    const fn = vi.fn(async () => {
      attempts++;
      if (attempts < 4) {
        throw new Error('Failed');
      }
      return 'success';
    });

    const promise = retry(fn, { retries: 3, delay: 10, backoff: 3 });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('should throw TypeError for non-function input', async () => {
    await expect(retry(null as never)).rejects.toThrow(TypeError);
    await expect(retry(undefined as never)).rejects.toThrow(TypeError);
    await expect(retry('not a function' as never)).rejects.toThrow(TypeError);
  });

  it('should throw RangeError for negative retries', async () => {
    const fn = async () => 'test';
    await expect(retry(fn, { retries: -1 })).rejects.toThrow(RangeError);
  });

  it('should throw RangeError for non-integer retries', async () => {
    const fn = async () => 'test';
    await expect(retry(fn, { retries: 2.5 })).rejects.toThrow(RangeError);
  });

  it('should throw RangeError for negative delay', async () => {
    const fn = async () => 'test';
    await expect(retry(fn, { delay: -100 })).rejects.toThrow(RangeError);
  });

  it('should throw RangeError for non-positive backoff', async () => {
    const fn = async () => 'test';
    await expect(retry(fn, { backoff: 0 })).rejects.toThrow(RangeError);
    await expect(retry(fn, { backoff: -1 })).rejects.toThrow(RangeError);
  });

  it('should work with async functions that return objects', async () => {
    const result = { data: [1, 2, 3], status: 'ok' };
    const fn = vi.fn(async () => result);

    const promise = retry(fn);
    await vi.runAllTimersAsync();
    const returned = await promise;

    expect(returned).toBe(result);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should preserve error details', async () => {
    const customError = new Error('Custom error message');
    (customError as Error & { code: string }).code = 'CUSTOM_CODE';
    const fn = vi.fn(async () => {
      throw customError;
    });

    const promise = retry(fn, { retries: 1, delay: 10 });
    promise.catch(() => {}); // Prevent unhandled rejection

    await expect(async () => {
      await vi.runAllTimersAsync();
      await promise;
    }).rejects.toThrow('Custom error message');

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should handle different error types', async () => {
    const stringError = 'string error';
    const fn = vi.fn(async () => {
      throw stringError;
    });

    const promise = retry(fn, { retries: 0 });
    promise.catch(() => {}); // Prevent unhandled rejection

    await expect(async () => {
      await vi.runAllTimersAsync();
      await promise;
    }).rejects.toBe(stringError);
  });

  it('should work with one retry', async () => {
    let attempts = 0;
    const fn = vi.fn(async () => {
      attempts++;
      if (attempts === 1) {
        throw new Error('First fails');
      }
      return 'success';
    });

    const promise = retry(fn, { retries: 1, delay: 50 });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
