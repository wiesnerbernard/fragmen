import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle } from './index';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should execute function immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should throttle subsequent calls within wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should allow execution after wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should pass arguments to throttled function', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('arg1', 'arg2');

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should use latest arguments when throttled call executes', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('first');
    throttled('second');
    throttled('third');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('first');

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('third');
  });

  it('should handle multiple throttle periods', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);

    throttled(); // t=0, executes
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(25);
    throttled(); // t=25, ignored but scheduled

    vi.advanceTimersByTime(25);
    // t=50, scheduled call executes
    expect(fn).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(50);
    throttled(); // t=100, executes
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should handle rapid calls correctly', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    // Rapid calls
    for (let i = 0; i < 10; i++) {
      throttled();
    }

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should work with different wait times', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 200);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1); // Still throttled

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2); // Now executes
  });

  it('should handle zero wait time', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 0);

    throttled();
    throttled();
    throttled();

    // With 0 wait, first call executes, subsequent calls execute immediately
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should work with functions that have return values', () => {
    const fn = vi.fn(() => 'result');
    const throttled = throttle(fn, 100);

    // Note: throttle doesn't return the value, it's fire-and-forget
    throttled();
    expect(fn).toHaveBeenCalled();
  });

  it('should handle complex argument types', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    const obj = { key: 'value' };
    const arr = [1, 2, 3];

    throttled(obj, arr, 42, 'string');

    expect(fn).toHaveBeenCalledWith(obj, arr, 42, 'string');
  });

  it('should clear pending timeout on new call within wait period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('first');
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(50);
    throttled('second'); // Reschedules for 50ms more

    vi.advanceTimersByTime(40); // Total 90ms
    expect(fn).toHaveBeenCalledTimes(1); // Still waiting

    vi.advanceTimersByTime(10); // Total 100ms from second call
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
