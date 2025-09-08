import { describe, it, expect } from 'vitest';
import { groupBy } from './index';

describe('groupBy', () => {
  it('groups numbers by even/odd', () => {
    const arr = [1, 2, 3, 4];
    const result = groupBy(arr, n => (n % 2 === 0 ? 'even' : 'odd'));
    expect(result).toEqual({ odd: [1, 3], even: [2, 4] });
  });

  it('groups objects by property', () => {
    const arr = [{ type: 'a' }, { type: 'b' }, { type: 'a' }];
    const result = groupBy(arr, obj => obj.type);
    expect(result).toEqual({ a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] });
  });
});
