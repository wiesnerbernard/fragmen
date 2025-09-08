import { describe, it, expect } from 'vitest';
import { pick } from './index';

describe('pick', () => {
  it('picks specified keys from object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('ignores keys not in object', () => {
    const obj = { a: 1 };
    // @ts-expect-error: 'b' is not a key of obj, but we want to test the runtime behavior
    expect(pick(obj, ['a', 'b'])).toEqual({ a: 1 });
  });
});
