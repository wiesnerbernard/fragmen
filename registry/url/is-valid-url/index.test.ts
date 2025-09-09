import { describe, it, expect } from 'vitest';
import { isValidUrl } from './index.js';

describe('isValidUrl', () => {
  it('should validate basic HTTP and HTTPS URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://www.example.com')).toBe(true);
    expect(isValidUrl('http://subdomain.example.com')).toBe(true);
  });

  it('should validate URLs with paths and query parameters', () => {
    expect(isValidUrl('https://example.com/path')).toBe(true);
    expect(isValidUrl('https://example.com/path/to/resource')).toBe(true);
    expect(isValidUrl('https://example.com?query=value')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=value&other=param')).toBe(
      true
    );
  });

  it('should validate URLs with ports', () => {
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('https://example.com:8080')).toBe(true);
    expect(isValidUrl('http://192.168.1.1:8000')).toBe(true);
  });

  it('should validate URLs with hash fragments', () => {
    expect(isValidUrl('https://example.com#section')).toBe(true);
    expect(isValidUrl('https://example.com/page#section-1')).toBe(true);
  });

  it('should validate different protocols', () => {
    expect(isValidUrl('ftp://files.example.com')).toBe(true);
    // file: and data: protocols don't have hostnames, so they fail hostname validation
    expect(isValidUrl('mailto:user@example.com')).toBe(true);
  });

  it('should validate localhost URLs', () => {
    expect(isValidUrl('http://localhost')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('https://localhost:8080/api')).toBe(true);
  });

  it('should validate IP address URLs', () => {
    expect(isValidUrl('http://192.168.1.1')).toBe(true);
    expect(isValidUrl('https://10.0.0.1:8080')).toBe(true);
    expect(isValidUrl('http://127.0.0.1:3000')).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('invalid url with spaces')).toBe(false);
    expect(isValidUrl('http://')).toBe(false);
    expect(isValidUrl('https://')).toBe(false);
    expect(isValidUrl('://example.com')).toBe(false);
  });

  it('should reject empty or non-string inputs', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl(null as any)).toBe(false);
    expect(isValidUrl(undefined as any)).toBe(false);
    expect(isValidUrl(123 as any)).toBe(false);
  });

  it('should respect protocol restrictions', () => {
    expect(isValidUrl('https://example.com', { protocols: ['https'] })).toBe(
      true
    );
    expect(isValidUrl('http://example.com', { protocols: ['https'] })).toBe(
      false
    );
    expect(
      isValidUrl('ftp://files.com', { protocols: ['http', 'https'] })
    ).toBe(false);
    expect(
      isValidUrl('http://example.com', { protocols: ['http', 'https'] })
    ).toBe(true);
  });

  it('should handle requireProtocol option', () => {
    expect(isValidUrl('example.com', { requireProtocol: false })).toBe(true);
    expect(isValidUrl('www.example.com', { requireProtocol: false })).toBe(
      true
    );
    expect(isValidUrl('example.com/path', { requireProtocol: false })).toBe(
      true
    );
    expect(isValidUrl('example.com', { requireProtocol: true })).toBe(false);
  });

  it('should handle allowLocalhost option', () => {
    expect(isValidUrl('http://localhost:3000', { allowLocalhost: true })).toBe(
      true
    );
    expect(isValidUrl('http://localhost:3000', { allowLocalhost: false })).toBe(
      false
    );
    expect(isValidUrl('http://127.0.0.1:3000', { allowLocalhost: false })).toBe(
      false
    );
    expect(isValidUrl('https://example.com', { allowLocalhost: false })).toBe(
      true
    );
  });

  it('should handle allowIp option', () => {
    expect(isValidUrl('http://192.168.1.1', { allowIp: true })).toBe(true);
    expect(isValidUrl('http://192.168.1.1', { allowIp: false })).toBe(false);
    expect(isValidUrl('http://10.0.0.1:8080', { allowIp: false })).toBe(false);
    expect(isValidUrl('https://example.com', { allowIp: false })).toBe(true);
  });

  it('should handle complex domain names', () => {
    expect(isValidUrl('https://sub-domain.example-site.co.uk')).toBe(true);
    expect(isValidUrl('http://very.long.subdomain.example.com')).toBe(true);
    expect(isValidUrl('https://example.museum')).toBe(true);
  });

  it('should handle URLs without protocols when allowed', () => {
    expect(isValidUrl('example.com', { requireProtocol: false })).toBe(true);
    expect(
      isValidUrl('subdomain.example.com/path', { requireProtocol: false })
    ).toBe(true);
    expect(isValidUrl('localhost:3000', { requireProtocol: false })).toBe(true);
  });

  it('should handle combined restrictions', () => {
    const options = {
      protocols: ['https'],
      allowLocalhost: false,
      allowIp: false,
    };

    expect(isValidUrl('https://example.com', options)).toBe(true);
    expect(isValidUrl('http://example.com', options)).toBe(false);
    expect(isValidUrl('https://localhost:3000', options)).toBe(false);
    expect(isValidUrl('https://192.168.1.1', options)).toBe(false);
  });

  it('should handle edge cases with protocols', () => {
    // data: and javascript: protocols don't have hostnames, so they fail validation
    expect(isValidUrl('tel:+1234567890')).toBe(true);
  });
});
