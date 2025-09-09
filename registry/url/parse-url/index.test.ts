import { describe, it, expect } from 'vitest';
import { parseUrl } from './index.js';

describe('parseUrl', () => {
  it('should parse a complete URL', () => {
    const result = parseUrl('https://example.com:8080/path?query=value#hash');
    expect(result).toEqual({
      protocol: 'https:',
      host: 'example.com:8080',
      hostname: 'example.com',
      port: '8080',
      pathname: '/path',
      search: '?query=value',
      hash: '#hash',
      origin: 'https://example.com:8080',
    });
  });

  it('should parse URL without port', () => {
    const result = parseUrl('https://example.com/path');
    expect(result).toEqual({
      protocol: 'https:',
      host: 'example.com',
      hostname: 'example.com',
      port: '',
      pathname: '/path',
      search: '',
      hash: '',
      origin: 'https://example.com',
    });
  });

  it('should parse URL with default ports', () => {
    const httpResult = parseUrl('http://example.com/path');
    expect(httpResult?.port).toBe('');
    expect(httpResult?.host).toBe('example.com');

    const httpsResult = parseUrl('https://example.com/path');
    expect(httpsResult?.port).toBe('');
    expect(httpsResult?.host).toBe('example.com');
  });

  it('should parse localhost URLs', () => {
    const result = parseUrl('http://localhost:3000/api/users');
    expect(result).toEqual({
      protocol: 'http:',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/users',
      search: '',
      hash: '',
      origin: 'http://localhost:3000',
    });
  });

  it('should parse URLs with query parameters', () => {
    const result = parseUrl(
      'https://api.example.com/search?q=test&limit=10&page=1'
    );
    expect(result?.search).toBe('?q=test&limit=10&page=1');
    expect(result?.pathname).toBe('/search');
  });

  it('should parse URLs with hash fragments', () => {
    const result = parseUrl('https://example.com/docs#section-1');
    expect(result?.hash).toBe('#section-1');
    expect(result?.pathname).toBe('/docs');
  });

  it('should parse URLs with both query and hash', () => {
    const result = parseUrl('https://example.com/page?tab=settings#account');
    expect(result?.search).toBe('?tab=settings');
    expect(result?.hash).toBe('#account');
  });

  it('should handle different protocols', () => {
    const ftpResult = parseUrl('ftp://files.example.com/download');
    expect(ftpResult?.protocol).toBe('ftp:');

    const fileResult = parseUrl('file:///Users/john/document.pdf');
    expect(fileResult?.protocol).toBe('file:');
  });

  it('should handle IP addresses', () => {
    const result = parseUrl('http://192.168.1.1:8080/admin');
    expect(result?.hostname).toBe('192.168.1.1');
    expect(result?.port).toBe('8080');
  });

  it('should return null for invalid URLs', () => {
    expect(parseUrl('invalid-url')).toBe(null);
    expect(parseUrl('not a url')).toBe(null);
    expect(parseUrl('http://')).toBe(null);
    expect(parseUrl('://example.com')).toBe(null);
  });

  it('should return null for empty or non-string inputs', () => {
    expect(parseUrl('')).toBe(null);
    expect(parseUrl(null as any)).toBe(null);
    expect(parseUrl(undefined as any)).toBe(null);
    expect(parseUrl(123 as any)).toBe(null);
  });

  it('should handle URLs with unusual but valid characters', () => {
    const result = parseUrl(
      'https://sub-domain.example-site.com/path_with-chars/file.html'
    );
    expect(result?.hostname).toBe('sub-domain.example-site.com');
    expect(result?.pathname).toBe('/path_with-chars/file.html');
  });

  it('should handle root path URLs', () => {
    const result = parseUrl('https://example.com/');
    expect(result?.pathname).toBe('/');

    const rootResult = parseUrl('https://example.com');
    expect(rootResult?.pathname).toBe('/');
  });
});
