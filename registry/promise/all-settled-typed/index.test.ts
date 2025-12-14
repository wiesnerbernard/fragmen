import { describe, expect, it } from 'vitest';
import { allSettledTyped } from './index';

describe('allSettledTyped', () => {
  it('should separate fulfilled and rejected promises', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(new Error('failed')),
    ]);

    expect(fulfilled).toEqual([1, 2]);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]).toBeInstanceOf(Error);
    expect(rejected[0].message).toBe('failed');
  });

  it('should handle all promises succeeding', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.resolve('a'),
      Promise.resolve('b'),
      Promise.resolve('c'),
    ]);

    expect(fulfilled).toEqual(['a', 'b', 'c']);
    expect(rejected).toEqual([]);
  });

  it('should handle all promises failing', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.reject(new Error('error1')),
      Promise.reject(new Error('error2')),
      Promise.reject(new Error('error3')),
    ]);

    expect(fulfilled).toEqual([]);
    expect(rejected).toHaveLength(3);
    expect(rejected[0].message).toBe('error1');
    expect(rejected[1].message).toBe('error2');
    expect(rejected[2].message).toBe('error3');
  });

  it('should handle empty array', async () => {
    const { fulfilled, rejected } = await allSettledTyped([]);

    expect(fulfilled).toEqual([]);
    expect(rejected).toEqual([]);
  });

  it('should preserve order of results', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.resolve(1),
      Promise.reject(new Error('e1')),
      Promise.resolve(2),
      Promise.reject(new Error('e2')),
      Promise.resolve(3),
    ]);

    expect(fulfilled).toEqual([1, 2, 3]);
    expect(rejected).toHaveLength(2);
    expect(rejected[0].message).toBe('e1');
    expect(rejected[1].message).toBe('e2');
  });

  it('should work with different value types', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.resolve({ id: 1 }),
      Promise.resolve({ id: 2 }),
      Promise.reject(new Error('failed')),
    ]);

    expect(fulfilled).toEqual([{ id: 1 }, { id: 2 }]);
    expect(rejected).toHaveLength(1);
  });

  it('should handle promises that resolve with undefined', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.resolve(undefined),
      Promise.resolve(null),
      Promise.resolve(''),
    ]);

    expect(fulfilled).toEqual([undefined, null, '']);
    expect(rejected).toEqual([]);
  });

  it('should handle promises that reject with different error types', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.reject(new Error('error')),
      Promise.reject(new TypeError('type error')),
      Promise.reject(new Error('string error')),
      Promise.reject(new Error('ERR')),
    ]);

    expect(fulfilled).toEqual([]);
    expect(rejected).toHaveLength(4);
    expect(rejected[0]).toBeInstanceOf(Error);
    expect(rejected[1]).toBeInstanceOf(TypeError);
    expect(rejected[2]).toBeInstanceOf(Error);
    expect(rejected[3]).toBeInstanceOf(Error);
  });

  it('should work with async/await syntax', async () => {
    const asyncFunc = async (value: number, shouldFail: boolean) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      if (shouldFail) {
        throw new Error(`Failed: ${value}`);
      }
      return value * 2;
    };

    const { fulfilled, rejected } = await allSettledTyped([
      asyncFunc(1, false),
      asyncFunc(2, true),
      asyncFunc(3, false),
    ]);

    expect(fulfilled).toEqual([2, 6]);
    expect(rejected).toHaveLength(1);
    expect(rejected[0].message).toBe('Failed: 2');
  });

  it('should handle mixed promise timing', async () => {
    const fastPromise = Promise.resolve('fast');
    const slowPromise = new Promise<string>(resolve =>
      setTimeout(() => resolve('slow'), 50)
    );
    const failedPromise = Promise.reject(new Error('failed'));

    const { fulfilled, rejected } = await allSettledTyped([
      fastPromise,
      slowPromise,
      failedPromise,
    ]);

    expect(fulfilled).toEqual(['fast', 'slow']);
    expect(rejected).toHaveLength(1);
  });

  it('should handle promises with array values', async () => {
    const { fulfilled, rejected } = await allSettledTyped([
      Promise.resolve([1, 2, 3]),
      Promise.resolve([4, 5, 6]),
      Promise.reject(new Error('failed')),
    ]);

    expect(fulfilled).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(rejected).toHaveLength(1);
  });

  it('should be type-safe with specific types', async () => {
    interface User {
      id: number;
      name: string;
    }

    const { fulfilled, rejected } = await allSettledTyped<User>([
      Promise.resolve({ id: 1, name: 'John' }),
      Promise.resolve({ id: 2, name: 'Jane' }),
    ]);

    expect(fulfilled).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
    expect(rejected).toEqual([]);

    // TypeScript should know fulfilled is User[]
    fulfilled.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
    });
  });
});
