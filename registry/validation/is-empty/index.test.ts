import { describe, expect, it } from 'vitest';
import { isEmpty } from '.';

describe('isEmpty', () => {
  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return true for whitespace-only strings', () => {
    expect(isEmpty('   ')).toBe(true);
    expect(isEmpty('\t')).toBe(true);
    expect(isEmpty('\n')).toBe(true);
    expect(isEmpty('  \t\n  ')).toBe(true);
  });

  it('should return false for non-empty strings', () => {
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty(' hello ')).toBe(false);
    expect(isEmpty('0')).toBe(false);
  });

  it('should return true for empty arrays', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return false for non-empty arrays', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty([null])).toBe(false);
    expect(isEmpty([undefined])).toBe(false);
    expect(isEmpty([''])).toBe(false);
  });

  it('should return true for empty objects', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for non-empty objects', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty({ key: undefined })).toBe(false);
    expect(isEmpty({ key: null })).toBe(false);
  });

  it('should return true for empty Map', () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  it('should return false for non-empty Map', () => {
    const map = new Map();
    map.set('key', 'value');
    expect(isEmpty(map)).toBe(false);
  });

  it('should return true for empty Set', () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for non-empty Set', () => {
    const set = new Set();
    set.add('value');
    expect(isEmpty(set)).toBe(false);
  });

  it('should return false for numbers', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(42)).toBe(false);
    expect(isEmpty(-1)).toBe(false);
    expect(isEmpty(NaN)).toBe(false);
  });

  it('should return false for booleans', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isEmpty(() => {})).toBe(false);
    const fn = function () {};
    expect(isEmpty(fn)).toBe(false);
  });

  it('should return false for Date objects', () => {
    expect(isEmpty(new Date())).toBe(false);
  });

  it('should return false for RegExp objects', () => {
    expect(isEmpty(/test/)).toBe(false);
  });
});
