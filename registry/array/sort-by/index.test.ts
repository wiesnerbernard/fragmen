import { describe, it, expect } from 'vitest';
import { sortBy } from './index';

describe('sortBy', () => {
  it('should sort objects by property name ascending', () => {
    const users = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const result = sortBy(users, 'name');
    expect(result[0].name).toBe('Alice');
    expect(result[1].name).toBe('Bob');
    expect(result[2].name).toBe('Charlie');
  });

  it('should sort objects by property name descending', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'Charlie', age: 30 },
    ];
    const result = sortBy(users, 'age', 'desc');
    expect(result[0].age).toBe(35);
    expect(result[1].age).toBe(30);
    expect(result[2].age).toBe(25);
  });

  it('should sort using iteratee function', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2];
    const result = sortBy(numbers, n => n);
    expect(result).toEqual([1, 1, 2, 3, 4, 5, 9]);
  });

  it('should sort by computed value', () => {
    const words = ['apple', 'pie', 'zoo', 'be'];
    const result = sortBy(words, w => w.length);
    expect(result).toEqual(['be', 'pie', 'zoo', 'apple']);
  });

  it('should sort by computed value descending', () => {
    const words = ['apple', 'pie', 'zoo', 'be'];
    const result = sortBy(words, w => w.length, 'desc');
    expect(result).toEqual(['apple', 'pie', 'zoo', 'be']);
  });

  it('should handle empty array', () => {
    expect(sortBy([], 'prop')).toEqual([]);
    expect(sortBy([], x => x)).toEqual([]);
  });

  it('should not mutate original array', () => {
    const original = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const copy = [...original];
    sortBy(original, 'id');
    expect(original).toEqual(copy);
  });

  it('should handle single element array', () => {
    const arr = [{ name: 'Alice' }];
    expect(sortBy(arr, 'name')).toEqual([{ name: 'Alice' }]);
  });

  it('should handle null and undefined values', () => {
    const items = [
      { value: 3 },
      { value: null },
      { value: 1 },
      { value: undefined },
      { value: 2 },
    ];
    const result = sortBy(items, 'value');
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(2);
    expect(result[2].value).toBe(3);
    // null/undefined should be at the end
    expect(result[3].value === null || result[3].value === undefined).toBe(
      true
    );
    expect(result[4].value === null || result[4].value === undefined).toBe(
      true
    );
  });

  it('should handle mixed number and string sorting', () => {
    const items = [{ id: '10' }, { id: '2' }, { id: '1' }, { id: '20' }];
    const result = sortBy(items, 'id');
    // String sorting: '1', '10', '2', '20'
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('10');
    expect(result[2].id).toBe('2');
    expect(result[3].id).toBe('20');
  });

  it('should sort strings case-insensitively', () => {
    const words = ['banana', 'Apple', 'cherry', 'Apricot'];
    const result = sortBy(words, w => w);
    expect(result[0].toLowerCase()).toBe('apple');
    expect(result[1].toLowerCase()).toBe('apricot');
  });

  it('should handle non-array input', () => {
    expect(sortBy(null as any, 'prop')).toEqual([]);
    expect(sortBy(undefined as any, x => x)).toEqual([]);
  });

  it('should handle objects without the specified property', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'Bob' }, // no age property
      { name: 'Charlie', age: 30 },
    ];
    const result = sortBy(items, 'age');
    // Items without age should be at the end
    expect(result[0].age).toBe(25);
    expect(result[1].age).toBe(30);
    expect(result[2].age).toBeUndefined();
  });

  it('should handle identical values', () => {
    const items = [{ value: 2 }, { value: 1 }, { value: 2 }, { value: 1 }];
    const result = sortBy(items, 'value');
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(1);
    expect(result[2].value).toBe(2);
    expect(result[3].value).toBe(2);
  });

  it('should sort primitive arrays', () => {
    const numbers = [5, 2, 8, 1, 9];
    const result = sortBy(numbers, n => n);
    expect(result).toEqual([1, 2, 5, 8, 9]);
  });

  it('should handle negative numbers', () => {
    const numbers = [3, -1, -5, 2, 0];
    const result = sortBy(numbers, n => n);
    expect(result).toEqual([-5, -1, 0, 2, 3]);
  });
});
