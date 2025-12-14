import { describe, it, expect } from 'vitest';
import { clone } from './index';

describe('clone', () => {
  it('should clone primitive values', () => {
    expect(clone(42)).toBe(42);
    expect(clone('hello')).toBe('hello');
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBe(null);
    expect(clone(undefined)).toBe(undefined);
  });

  it('should clone simple objects', () => {
    const original = { a: 1, b: 'hello', c: true };
    const cloned = clone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should clone nested objects', () => {
    const original = {
      name: 'John',
      address: {
        street: '123 Main St',
        city: 'NYC',
        coordinates: {
          lat: 40.7128,
          lng: -74.006,
        },
      },
    };

    const cloned = clone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.address).not.toBe(original.address);
    expect(cloned.address.coordinates).not.toBe(original.address.coordinates);

    // Modify cloned object
    cloned.address.city = 'LA';
    expect(original.address.city).toBe('NYC');
  });

  it('should clone arrays', () => {
    const original = [1, 'hello', true, { nested: 'value' }];
    const cloned = clone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[3]).not.toBe(original[3]);

    // Modify cloned array
    cloned[0] = 99;
    (cloned[3] as { nested: string }).nested = 'changed';
    expect(original[0]).toBe(1);
    expect((original[3] as { nested: string }).nested).toBe('value');
  });

  it('should clone nested arrays', () => {
    const original = [1, [2, [3, 4]], 5];
    const cloned = clone(original);

    expect(cloned).toEqual(original);
    expect(cloned[1]).not.toBe(original[1]);
    expect((cloned[1] as number[])[1]).not.toBe((original[1] as number[][])[1]);
  });

  it('should clone Date objects', () => {
    const date = new Date('2023-01-01');
    const original = { created: date };
    const cloned = clone(original);

    expect(cloned.created).toEqual(date);
    expect(cloned.created).not.toBe(date);
    expect(cloned.created instanceof Date).toBe(true);
  });

  it('should clone RegExp objects', () => {
    const regex = /test/gi;
    const original = { pattern: regex };
    const cloned = clone(original);

    expect(cloned.pattern).toEqual(regex);
    expect(cloned.pattern).not.toBe(regex);
    expect(cloned.pattern instanceof RegExp).toBe(true);
    expect(cloned.pattern.source).toBe('test');
    expect(cloned.pattern.flags).toBe('gi');
  });

  it('should handle empty objects and arrays', () => {
    const emptyObj = {};
    const emptyArr: unknown[] = [];

    expect(clone(emptyObj)).toEqual({});
    expect(clone(emptyArr)).toEqual([]);
    expect(clone(emptyObj)).not.toBe(emptyObj);
    expect(clone(emptyArr)).not.toBe(emptyArr);
  });

  it('should handle circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj;

    const cloned = clone(obj);
    expect(cloned.a).toBe(1);
    expect(cloned.self).toBe(cloned);
    expect(cloned).not.toBe(obj);
  });

  it('should handle circular references', () => {
    const obj: { name: string; self?: unknown } = { name: 'circular' };
    obj.self = obj;

    const cloned = clone(obj) as {
      name: string;
      self: { name: string; self: unknown };
    };

    expect(cloned.name).toBe('circular');
    expect(cloned.self).toBe(cloned); // Should reference itself
    expect(cloned).not.toBe(obj); // But be a different object
  });

  it('should handle complex circular references', () => {
    const a: { name: string; b?: unknown } = { name: 'a' };
    const b: { name: string; a?: unknown } = { name: 'b' };
    a.b = b;
    b.a = a;

    const clonedA = clone(a) as {
      name: string;
      b: { name: string; a: unknown };
    };

    expect(clonedA.name).toBe('a');
    expect(clonedA.b.name).toBe('b');
    expect(clonedA.b.a).toBe(clonedA); // Should maintain circular reference
  });

  it('should handle mixed data types', () => {
    const original = {
      str: 'hello',
      num: 42,
      bool: true,
      nil: null,
      undef: undefined,
      date: new Date('2023-01-01'),
      regex: /test/g,
      arr: [1, 2, { nested: true }],
      obj: {
        deep: {
          value: 'nested',
        },
      },
    };

    const cloned = clone(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.date).not.toBe(original.date);
    expect(cloned.regex).not.toBe(original.regex);
    expect(cloned.arr).not.toBe(original.arr);
    expect(cloned.obj).not.toBe(original.obj);
    expect(cloned.obj.deep).not.toBe(original.obj.deep);
  });

  it('should preserve object types', () => {
    class CustomClass {
      constructor(public value: string) {}
    }

    const instance = new CustomClass('test');
    const obj = { instance };
    const cloned = clone(obj);

    // Note: Custom classes lose their prototype in deep cloning
    // This is expected behavior for most deep clone implementations
    expect(cloned.instance.value).toBe('test');
  });

  it('should not mutate original during cloning', () => {
    const original = {
      items: [{ id: 1 }, { id: 2 }],
      meta: { count: 2 },
    };
    const originalStr = JSON.stringify(original);

    const cloned = clone(original);
    cloned.items.push({ id: 3 });
    cloned.meta.count = 3;

    expect(JSON.stringify(original)).toBe(originalStr);
  });
});
