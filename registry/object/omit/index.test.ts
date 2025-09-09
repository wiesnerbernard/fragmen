import { describe, it, expect } from 'vitest';
import { omit } from './index';

describe('omit', () => {
  it('should omit specified keys from object', () => {
    const user = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'secret123',
    };
    const result = omit(user, ['password', 'email']);
    expect(result).toEqual({ id: 1, name: 'John' });
  });

  it('should handle omitting single key', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should handle omitting non-existent keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['d', 'e'] as any);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should return copy when omitting empty keys array', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).not.toBe(obj); // Should be a different object
  });

  it('should return empty object when omitting all keys', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ['a', 'b']);
    expect(result).toEqual({});
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = omit(obj, ['a'] as any);
    expect(result).toEqual({});
  });

  it('should handle null input', () => {
    const result = omit(null, ['a'] as any);
    expect(result).toEqual({});
  });

  it('should handle undefined input', () => {
    const result = omit(undefined, ['a'] as any);
    expect(result).toEqual({});
  });

  it('should handle array input', () => {
    const arr = [1, 2, 3];
    const result = omit(arr as any, ['0'] as any);
    expect(result).toEqual({});
  });

  it('should handle mixed data types', () => {
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2, 3],
      obj: { nested: 'value' },
      nil: null,
      undef: undefined,
    };
    const result = omit(obj, ['bool', 'nil', 'undef']);
    expect(result).toEqual({
      str: 'hello',
      num: 42,
      arr: [1, 2, 3],
      obj: { nested: 'value' },
    });
  });

  it('should preserve object properties', () => {
    const obj = {
      prop: 'value',
      method: () => 'test',
      number: 42,
    };
    const result = omit(obj, ['number']);
    expect(result.method()).toBe('test');
    expect(result.prop).toBe('value');
  });

  it('should not mutate original object', () => {
    const original = { a: 1, b: 2, c: 3 };
    const originalCopy = { ...original };
    omit(original, ['b']);
    expect(original).toEqual(originalCopy);
  });

  it('should handle string keys only', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a', 'c']);
    expect(result).toEqual({ b: 2 });
  });

  it('should work with complex objects', () => {
    const complex = {
      id: 1,
      user: {
        name: 'John',
        details: {
          age: 30,
          city: 'NYC',
        },
      },
      settings: {
        theme: 'dark',
        notifications: true,
      },
      metadata: {
        created: '2023-01-01',
        updated: '2023-06-01',
      },
    };

    const result = omit(complex, ['metadata', 'settings']);
    expect(result).toEqual({
      id: 1,
      user: {
        name: 'John',
        details: {
          age: 30,
          city: 'NYC',
        },
      },
    });
  });
});
