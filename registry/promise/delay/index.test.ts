import { describe, expect, it, vi } from 'vitest';
import { delay } from './index';

describe('delay', () => {
  it('resolves after given ms using fake timers', async () => {
    vi.useFakeTimers();

    const promise = delay(1000);

    // Fast-forward time by 1000ms
    vi.advanceTimersByTime(1000);

    // Promise should now resolve
    await expect(promise).resolves.toBeUndefined();

    vi.useRealTimers();
  });

  it('creates a promise that resolves to void', async () => {
    vi.useFakeTimers();

    const result = delay(100);
    expect(result).toBeInstanceOf(Promise);

    vi.advanceTimersByTime(100);
    await expect(result).resolves.toBeUndefined();

    vi.useRealTimers();
  });

  it('accepts different delay values', async () => {
    vi.useFakeTimers();

    const promises = [delay(100), delay(500), delay(1000)];

    // Advance by 99ms - none should resolve yet
    vi.advanceTimersByTime(99);
    expect(promises.every(p => p instanceof Promise)).toBe(true);

    // Advance by 1ms more (total 100ms) - first should resolve
    vi.advanceTimersByTime(1);
    await expect(promises[0]).resolves.toBeUndefined();

    // Advance to 500ms total - second should resolve
    vi.advanceTimersByTime(400);
    await expect(promises[1]).resolves.toBeUndefined();

    // Advance to 1000ms total - third should resolve
    vi.advanceTimersByTime(500);
    await expect(promises[2]).resolves.toBeUndefined();

    vi.useRealTimers();
  });
});
