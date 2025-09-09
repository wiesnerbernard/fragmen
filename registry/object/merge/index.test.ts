import { describe, it, expect } from 'vitest';
import { merge } from './index';

describe('merge', () => {
  it('should merge two simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('should override properties from later objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should deep merge nested objects', () => {
    const obj1 = { a: 1, b: { x: 1, y: 2 } };
    const obj2 = { b: { z: 3 }, c: 4 };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: { x: 1, y: 2, z: 3 }, c: 4 });
  });

  it('should merge multiple objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    const result = merge(obj1, obj2, obj3);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle empty objects', () => {
    const obj1 = {};
    const obj2 = { a: 1 };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1 });
  });

  it('should return empty object when no arguments', () => {
    const result = merge();
    expect(result).toEqual({});
  });

  it('should handle null and undefined inputs', () => {
    const obj1 = { a: 1 };
    const result = merge(obj1, null, undefined, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should replace arrays entirely', () => {
    const obj1 = { items: [1, 2] };
    const obj2 = { items: [3, 4] };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ items: [3, 4] });
  });

  it('should handle mixed data types', () => {
    const obj1 = {
      str: 'hello',
      num: 42,
      bool: true,
      arr: [1, 2],
      obj: { nested: 'value' },
    };
    const obj2 = {
      str: 'world',
      arr: [3, 4],
      obj: { added: 'new' },
      nil: null,
    };
    const result = merge(obj1, obj2);
    expect(result).toEqual({
      str: 'world',
      num: 42,
      bool: true,
      arr: [3, 4],
      obj: { nested: 'value', added: 'new' },
      nil: null,
    });
  });

  it('should handle deeply nested objects', () => {
    const obj1 = {
      level1: {
        level2: {
          level3: {
            value: 'original',
          },
        },
      },
    };
    const obj2 = {
      level1: {
        level2: {
          level3: {
            newValue: 'added',
          },
          newLevel3: 'new',
        },
      },
    };
    const result = merge(obj1, obj2);
    expect(result).toEqual({
      level1: {
        level2: {
          level3: {
            value: 'original',
            newValue: 'added',
          },
          newLevel3: 'new',
        },
      },
    });
  });

  it('should not mutate original objects', () => {
    const obj1 = { a: 1, b: { x: 1 } };
    const obj2 = { b: { y: 2 }, c: 3 };
    const obj1Copy = JSON.parse(JSON.stringify(obj1));
    const obj2Copy = JSON.parse(JSON.stringify(obj2));

    merge(obj1, obj2);

    expect(obj1).toEqual(obj1Copy);
    expect(obj2).toEqual(obj2Copy);
  });

  it('should handle overriding with null and undefined', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { b: null, c: undefined };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: null, c: undefined });
  });

  it('should ignore non-object inputs', () => {
    const obj = { a: 1 };
    const result = merge(
      obj,
      'string' as any,
      123 as any,
      true as any,
      [1, 2] as any
    );
    expect(result).toEqual({ a: 1 });
  });

  it('should handle complex merging scenario', () => {
    const base = {
      user: {
        name: 'John',
        settings: {
          theme: 'light',
          notifications: true,
        },
      },
      meta: {
        version: 1,
      },
    };

    const update1 = {
      user: {
        age: 30,
        settings: {
          theme: 'dark',
        },
      },
    };

    const update2 = {
      user: {
        settings: {
          language: 'en',
        },
      },
      meta: {
        updated: '2023-01-01',
      },
    };

    const result = merge(base, update1, update2);
    expect(result).toEqual({
      user: {
        name: 'John',
        age: 30,
        settings: {
          theme: 'dark',
          notifications: true,
          language: 'en',
        },
      },
      meta: {
        version: 1,
        updated: '2023-01-01',
      },
    });
  });

  it('should create deep copies to prevent shared references', () => {
    const obj1 = {
      data: {
        nested: {
          items: [1, 2, { deep: 'original', mutable: true }],
          settings: { theme: 'light' },
        },
      },
    };

    const obj2 = {
      other: 'property',
    };

    const result = merge(obj1, obj2);

    // Modify the original nested objects/arrays
    obj1.data.nested.items.push(3);
    (obj1.data.nested.items[2] as any).deep = 'modified';
    (obj1.data.nested.items[2] as any).mutable = false;
    obj1.data.nested.settings.theme = 'dark';

    // The merged result should not be affected by mutations to the original
    const resultData = result.data as typeof obj1.data;
    expect(resultData.nested.items).toHaveLength(3);
    expect(resultData.nested.items[2]).toEqual({
      deep: 'original',
      mutable: true,
    });
    expect(resultData.nested.settings.theme).toBe('light');
    expect(result.other).toBe('property');

    // Verify the original was actually modified (sanity check)
    expect(obj1.data.nested.items).toHaveLength(4);
    expect(obj1.data.nested.items[2]).toEqual({
      deep: 'modified',
      mutable: false,
    });
    expect(obj1.data.nested.settings.theme).toBe('dark');
  });

  it('should deep copy arrays with nested objects', () => {
    const obj1 = {
      users: [
        { id: 1, profile: { name: 'John', settings: { active: true } } },
        { id: 2, profile: { name: 'Jane', settings: { active: false } } },
      ],
    };

    const obj2 = {
      meta: 'data',
    };

    const result = merge(obj1, obj2);

    // Modify the original array and nested objects
    obj1.users[0].profile.name = 'Modified John';
    obj1.users[0].profile.settings.active = false;
    obj1.users.push({
      id: 3,
      profile: { name: 'Bob', settings: { active: true } },
    });

    // The merged result should not be affected
    const resultUsers = result.users as typeof obj1.users;
    expect(resultUsers).toHaveLength(2);
    expect(resultUsers[0].profile.name).toBe('John');
    expect(resultUsers[0].profile.settings.active).toBe(true);
    expect(result.meta).toBe('data');

    // Verify the original was actually modified (sanity check)
    expect(obj1.users).toHaveLength(3);
    expect(obj1.users[0].profile.name).toBe('Modified John');
    expect(obj1.users[0].profile.settings.active).toBe(false);
  });
});
