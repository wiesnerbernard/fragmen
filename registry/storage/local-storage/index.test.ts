import { describe, expect, it, beforeEach } from 'vitest';
import { storage } from '.';

describe('storage', () => {
  beforeEach(() => {
    // Mock localStorage if not available (CI/SSR environment)
    if (typeof window === 'undefined') {
      const store: Record<string, string> = {};
      global.window = {
        localStorage: {
          getItem: (key: string) => store[key] || null,
          setItem: (key: string, value: string) => {
            store[key] = value;
          },
          removeItem: (key: string) => {
            delete store[key];
          },
          clear: () => {
            Object.keys(store).forEach(key => delete store[key]);
          },
        },
      } as any;
    }
    // Clear localStorage before each test
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('should store and retrieve string values', () => {
    const store = storage<string>('test-string');
    store.set('hello');
    expect(store.get('default')).toBe('hello');
  });

  it('should store and retrieve number values', () => {
    const store = storage<number>('test-number');
    store.set(42);
    expect(store.get(0)).toBe(42);
  });

  it('should store and retrieve boolean values', () => {
    const store = storage<boolean>('test-boolean');
    store.set(true);
    expect(store.get(false)).toBe(true);
  });

  it('should store and retrieve object values', () => {
    const store = storage<{ name: string; age: number }>('test-object');
    const user = { name: 'Alice', age: 30 };
    store.set(user);
    expect(store.get({ name: 'Guest', age: 0 })).toEqual(user);
  });

  it('should store and retrieve array values', () => {
    const store = storage<number[]>('test-array');
    const numbers = [1, 2, 3, 4, 5];
    store.set(numbers);
    expect(store.get([])).toEqual(numbers);
  });

  it('should return default value when key does not exist', () => {
    const store = storage<string>('nonexistent');
    expect(store.get('default')).toBe('default');
  });

  it('should remove values', () => {
    const store = storage<string>('test-remove');
    store.set('value');
    expect(store.get('default')).toBe('value');
    store.remove();
    expect(store.get('default')).toBe('default');
  });

  it('should handle null values', () => {
    const store = storage<string | null>('test-null');
    store.set(null);
    expect(store.get('default')).toBe(null);
  });

  it('should handle undefined in default value', () => {
    const store = storage<string | undefined>('test-undefined');
    expect(store.get(undefined)).toBe(undefined);
  });

  it('should handle complex nested objects', () => {
    const store = storage<{ users: Array<{ name: string; roles: string[] }> }>(
      'test-complex'
    );
    const data = {
      users: [
        { name: 'Alice', roles: ['admin', 'user'] },
        { name: 'Bob', roles: ['user'] },
      ],
    };
    store.set(data);
    expect(store.get({ users: [] })).toEqual(data);
  });

  it('should overwrite existing values', () => {
    const store = storage<number>('test-overwrite');
    store.set(1);
    store.set(2);
    expect(store.get(0)).toBe(2);
  });

  it('should work with different keys independently', () => {
    const store1 = storage<string>('key1');
    const store2 = storage<string>('key2');

    store1.set('value1');
    store2.set('value2');

    expect(store1.get('')).toBe('value1');
    expect(store2.get('')).toBe('value2');
  });
});
