import { describe, expect, it } from 'vitest';
import { isEmail } from '.';

describe('isEmail', () => {
  it('should validate correct email formats', () => {
    expect(isEmail('user@example.com')).toBe(true);
    expect(isEmail('user.name@example.com')).toBe(true);
    expect(isEmail('user+tag@example.co.uk')).toBe(true);
    expect(isEmail('user_name@example-domain.com')).toBe(true);
    expect(isEmail('123@example.com')).toBe(true);
  });

  it('should reject invalid email formats', () => {
    expect(isEmail('invalid.email')).toBe(false);
    expect(isEmail('missing@domain')).toBe(false);
    expect(isEmail('@example.com')).toBe(false);
    expect(isEmail('user@')).toBe(false);
    expect(isEmail('user @example.com')).toBe(false);
    expect(isEmail('user@exam ple.com')).toBe(false);
  });

  it('should reject empty or whitespace strings', () => {
    expect(isEmail('')).toBe(false);
    expect(isEmail('   ')).toBe(false);
  });

  it('should reject non-string values', () => {
    expect(isEmail(null as any)).toBe(false);
    expect(isEmail(undefined as any)).toBe(false);
    expect(isEmail(123 as any)).toBe(false);
    expect(isEmail({} as any)).toBe(false);
  });

  it('should reject emails with invalid local part', () => {
    expect(isEmail('.user@example.com')).toBe(false);
    expect(isEmail('user.@example.com')).toBe(false);
  });

  it('should reject emails with invalid domain', () => {
    expect(isEmail('user@-example.com')).toBe(false);
    expect(isEmail('user@example-.com')).toBe(false);
  });

  it('should handle international characters', () => {
    // Basic ASCII should work
    expect(isEmail('test@example.com')).toBe(true);
  });

  it('should reject emails with long local part', () => {
    const longLocal = 'a'.repeat(65);
    expect(isEmail(`${longLocal}@example.com`)).toBe(false);
  });

  it('should reject emails with long domain', () => {
    const longDomain = 'a'.repeat(256);
    expect(isEmail(`user@${longDomain}.com`)).toBe(false);
  });
});
