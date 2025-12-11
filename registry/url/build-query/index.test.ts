import { describe, expect, it } from 'vitest';
import { buildQuery } from './index.js';

describe('buildQuery', () => {
  it('should build basic query string', () => {
    const params = { name: 'John Doe', age: 30 };
    expect(buildQuery(params)).toBe('name=John%20Doe&age=30');
  });

  it('should handle boolean values', () => {
    const params = { active: true, verified: false };
    expect(buildQuery(params)).toBe('active=true&verified=false');
  });

  it('should handle number values', () => {
    const params = { count: 42, price: 19.99, zero: 0 };
    expect(buildQuery(params)).toBe('count=42&price=19.99&zero=0');
  });

  it('should add prefix when requested', () => {
    const params = { search: 'hello world', page: 1 };
    expect(buildQuery(params, { prefix: true })).toBe(
      '?search=hello%20world&page=1'
    );
  });

  it('should handle empty objects', () => {
    expect(buildQuery({})).toBe('');
    expect(buildQuery({}, { prefix: true })).toBe('?');
  });

  it('should filter out null and undefined values', () => {
    const params = { name: 'John', age: null, city: undefined, country: 'USA' };
    expect(buildQuery(params)).toBe('name=John&country=USA');
  });

  it('should handle arrays with repeat format (default)', () => {
    const params = { tags: ['red', 'blue', 'green'] };
    expect(buildQuery(params)).toBe('tags=red&tags=blue&tags=green');
  });

  it('should handle arrays with brackets format', () => {
    const params = { colors: ['red', 'blue'] };
    expect(buildQuery(params, { arrayFormat: 'brackets' })).toBe(
      'colors%5B%5D=red&colors%5B%5D=blue'
    );
  });

  it('should handle arrays with comma format', () => {
    const params = { tags: ['javascript', 'typescript', 'react'] };
    expect(buildQuery(params, { arrayFormat: 'comma' })).toBe(
      'tags=javascript%2Ctypescript%2Creact'
    );
  });

  it('should handle arrays with null/undefined values', () => {
    const params = { items: ['a', null, 'b', undefined, 'c'] };
    expect(buildQuery(params)).toBe('items=a&items=b&items=c');
  });

  it('should handle nested objects', () => {
    const params = { user: { name: 'John', age: 30 } };
    expect(buildQuery(params)).toBe('user%5Bname%5D=John&user%5Bage%5D=30');
  });

  it('should handle deeply nested objects', () => {
    const params = {
      user: { profile: { name: 'John', settings: { theme: 'dark' } } },
    };
    expect(buildQuery(params)).toBe(
      'user%5Bprofile%5D%5Bname%5D=John&user%5Bprofile%5D%5Bsettings%5D%5Btheme%5D=dark'
    );
  });

  it('should handle special characters', () => {
    const params = { message: 'Hello & goodbye!', symbols: '@#$%^&*()' };
    expect(buildQuery(params)).toBe(
      'message=Hello%20%26%20goodbye!&symbols=%40%23%24%25%5E%26*()'
    );
  });

  it('should handle unicode characters', () => {
    const params = { emoji: '🚀', chinese: '你好' };
    expect(buildQuery(params)).toBe(
      'emoji=%F0%9F%9A%80&chinese=%E4%BD%A0%E5%A5%BD'
    );
  });

  it('should handle empty arrays', () => {
    const params = { tags: [], name: 'John' };
    expect(buildQuery(params)).toBe('name=John');
  });

  it('should handle mixed data types', () => {
    const params = {
      string: 'hello',
      number: 42,
      boolean: true,
      array: ['a', 'b'],
      object: { key: 'value' },
    };
    expect(buildQuery(params)).toBe(
      'string=hello&number=42&boolean=true&array=a&array=b&object%5Bkey%5D=value'
    );
  });

  it('should handle empty string values', () => {
    const params = { empty: '', name: 'John' };
    expect(buildQuery(params)).toBe('empty=&name=John');
  });

  it('should return empty string for null params', () => {
    expect(buildQuery(null as any)).toBe('');
    expect(buildQuery(null as any, { prefix: true })).toBe('?');
  });

  it('should handle objects with null nested values', () => {
    const params = { user: { name: 'John', age: null, city: undefined } };
    expect(buildQuery(params)).toBe('user%5Bname%5D=John');
  });

  it('should maintain parameter order', () => {
    const params = { z: 'last', a: 'first', m: 'middle' };
    const result = buildQuery(params);
    expect(result).toBe('z=last&a=first&m=middle');
  });

  it('should handle edge case where params result in empty query string with prefix', () => {
    // This covers the uncovered branch in line 122 where queryString is empty but prefix is true
    const params = { nullValue: null, undefinedValue: undefined };
    expect(buildQuery(params, { prefix: true })).toBe('?');
  });

  it('should handle arrays with all null/undefined values', () => {
    // This ensures we hit the empty array case after filtering
    const params = { items: [null, undefined, null] };
    expect(buildQuery(params)).toBe('');
  });

  it('should handle nested objects without prefix', () => {
    // This should cover the case where prefix is empty in flattenObject
    const params = { level1: { level2: 'value' } };
    expect(buildQuery(params)).toBe('level1%5Blevel2%5D=value');
  });

  it('should handle deeply nested objects', () => {
    // This ensures the recursive flattenObject branch is fully covered
    const params = {
      level1: {
        level2: {
          level3: {
            level4: 'deep value',
          },
        },
      },
    };
    expect(buildQuery(params)).toBe(
      'level1%5Blevel2%5D%5Blevel3%5D%5Blevel4%5D=deep%20value'
    );
  });
});
