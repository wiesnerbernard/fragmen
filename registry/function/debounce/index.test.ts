import { describe, it, expect, vi } from 'vitest';
import { debounce } from './index';

describe('debounce', () => {
  vi.useFakeTimers();

  it('delays function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    expect(fn).not.toBeCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toBeCalledWith('a');
  });

  it('resets timer if called again before wait', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    vi.advanceTimersByTime(50);
    debounced('b');
    vi.advanceTimersByTime(100);
    expect(fn).toBeCalledWith('b');
    expect(fn).not.toBeCalledWith('a');
  });
});
