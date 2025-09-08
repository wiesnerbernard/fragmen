import { describe, it, expect } from 'vitest';
import { isFalsy } from './index';

describe('isFalsy', () => {
  it('returns true for falsy values', () => {
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy('')).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy(NaN)).toBe(true);
  });

  it('returns false for truthy values', () => {
    expect(isFalsy(true)).toBe(false);
    expect(isFalsy(1)).toBe(false);
    expect(isFalsy('hello')).toBe(false);
    expect(isFalsy([])).toBe(false);
    expect(isFalsy({})).toBe(false);
  });
});
