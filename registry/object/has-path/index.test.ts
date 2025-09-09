import { describe, it, expect } from 'vitest';
import { hasPath } from './index';

describe('hasPath', () => {
  const testObj = {
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'NYC',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
        elevation: undefined,
      },
    },
    hobbies: ['reading', 'gaming'],
    settings: {
      theme: 'dark',
      notifications: {
        email: true,
        push: false,
      },
    },
    empty: null,
  };

  it('should return true for existing top-level properties', () => {
    expect(hasPath(testObj, 'name')).toBe(true);
    expect(hasPath(testObj, 'age')).toBe(true);
    expect(hasPath(testObj, 'address')).toBe(true);
    expect(hasPath(testObj, 'hobbies')).toBe(true);
  });

  it('should return false for non-existing top-level properties', () => {
    expect(hasPath(testObj, 'nonexistent')).toBe(false);
    expect(hasPath(testObj, 'missing')).toBe(false);
  });

  it('should return true for existing nested properties using dot notation', () => {
    expect(hasPath(testObj, 'address.street')).toBe(true);
    expect(hasPath(testObj, 'address.city')).toBe(true);
    expect(hasPath(testObj, 'address.coordinates.lat')).toBe(true);
    expect(hasPath(testObj, 'address.coordinates.lng')).toBe(true);
    expect(hasPath(testObj, 'settings.notifications.email')).toBe(true);
  });

  it('should return true for properties with undefined values', () => {
    expect(hasPath(testObj, 'address.coordinates.elevation')).toBe(true);
    expect(hasPath(testObj, 'empty')).toBe(true);
  });

  it('should return false for non-existing nested properties', () => {
    expect(hasPath(testObj, 'address.zipcode')).toBe(false);
    expect(hasPath(testObj, 'address.coordinates.altitude')).toBe(false);
    expect(hasPath(testObj, 'settings.theme.color')).toBe(false);
    expect(hasPath(testObj, 'nonexistent.property')).toBe(false);
  });

  it('should work with array notation using string path', () => {
    expect(hasPath(testObj, ['name'])).toBe(true);
    expect(hasPath(testObj, ['address', 'city'])).toBe(true);
    expect(hasPath(testObj, ['address', 'coordinates', 'lat'])).toBe(true);
    expect(hasPath(testObj, ['settings', 'notifications', 'push'])).toBe(true);
  });

  it('should return false with array notation for non-existing paths', () => {
    expect(hasPath(testObj, ['nonexistent'])).toBe(false);
    expect(hasPath(testObj, ['address', 'zipcode'])).toBe(false);
    expect(hasPath(testObj, ['address', 'coordinates', 'altitude'])).toBe(
      false
    );
  });

  it('should work with array indices', () => {
    expect(hasPath(testObj, 'hobbies.0')).toBe(true);
    expect(hasPath(testObj, 'hobbies.1')).toBe(true);
    expect(hasPath(testObj, 'hobbies.2')).toBe(false);
  });

  it('should work with array indices using array notation', () => {
    expect(hasPath(testObj, ['hobbies', 0])).toBe(true);
    expect(hasPath(testObj, ['hobbies', 1])).toBe(true);
    expect(hasPath(testObj, ['hobbies', 2])).toBe(false);
  });

  it('should handle null and undefined objects', () => {
    expect(hasPath(null, 'any.path')).toBe(false);
    expect(hasPath(undefined, 'any.path')).toBe(false);
    expect(hasPath(null, ['any', 'path'])).toBe(false);
  });

  it('should handle non-object inputs', () => {
    expect(hasPath('string' as any, 'length')).toBe(false);
    expect(hasPath(123 as any, 'toString')).toBe(false);
    expect(hasPath(true as any, 'valueOf')).toBe(false);
  });

  it('should handle empty paths', () => {
    expect(hasPath(testObj, '')).toBe(false);
    expect(hasPath(testObj, [])).toBe(false);
  });

  it('should handle invalid path types', () => {
    expect(hasPath(testObj, null as any)).toBe(false);
    expect(hasPath(testObj, undefined as any)).toBe(false);
  });

  it('should return false when traversing through primitives', () => {
    expect(hasPath(testObj, 'name.length')).toBe(false);
    expect(hasPath(testObj, 'age.toString')).toBe(false);
  });

  it('should work with complex nested structures', () => {
    const complex = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    };

    expect(hasPath(complex, 'level1.level2.level3.level4.value')).toBe(true);
    expect(hasPath(complex, 'level1.level2.level3.level4.missing')).toBe(false);
    expect(hasPath(complex, 'level1.level2.missing.level4.value')).toBe(false);
  });

  it('should handle arrays of objects', () => {
    const arrayObj = {
      users: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ],
    };

    expect(hasPath(arrayObj, 'users.0.id')).toBe(true);
    expect(hasPath(arrayObj, 'users.0.name')).toBe(true);
    expect(hasPath(arrayObj, 'users.1.id')).toBe(true);
    expect(hasPath(arrayObj, 'users.2.id')).toBe(false);
    expect(hasPath(arrayObj, 'users.0.age')).toBe(false);
  });

  it('should handle mixed array and object access', () => {
    const mixed = {
      data: {
        items: [
          {
            details: {
              info: 'nested',
            },
          },
        ],
      },
    };

    expect(hasPath(mixed, 'data.items.0.details.info')).toBe(true);
    expect(hasPath(mixed, ['data', 'items', 0, 'details', 'info'])).toBe(true);
    expect(hasPath(mixed, 'data.items.1.details.info')).toBe(false);
  });
});
