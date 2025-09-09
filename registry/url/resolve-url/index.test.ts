import { describe, it, expect } from 'vitest';
import { resolveUrl } from './index.js';

describe('resolveUrl', () => {
  it('should resolve simple relative paths', () => {
    expect(resolveUrl('page.html', 'https://example.com/base/')).toBe(
      'https://example.com/base/page.html'
    );
    expect(resolveUrl('path/page.html', 'https://example.com/base/')).toBe(
      'https://example.com/base/path/page.html'
    );
  });

  it('should resolve relative paths with ..', () => {
    expect(
      resolveUrl('../other.html', 'https://example.com/base/page.html')
    ).toBe('https://example.com/other.html');
    expect(
      resolveUrl('../../other.html', 'https://example.com/base/sub/page.html')
    ).toBe('https://example.com/other.html');
  });

  it('should resolve absolute paths on the same domain', () => {
    expect(
      resolveUrl('/absolute/path', 'https://example.com/base/page.html')
    ).toBe('https://example.com/absolute/path');
    expect(resolveUrl('/path', 'https://example.com/base/sub/page.html')).toBe(
      'https://example.com/path'
    );
  });

  it('should return absolute URLs unchanged', () => {
    const absoluteUrl = 'https://other.com/page.html';
    expect(resolveUrl(absoluteUrl, 'https://example.com/base/')).toBe(
      absoluteUrl
    );
  });

  it('should handle protocol-relative URLs', () => {
    expect(
      resolveUrl('//cdn.example.com/script.js', 'https://example.com/')
    ).toBe('https://cdn.example.com/script.js');
    expect(
      resolveUrl('//cdn.example.com/script.js', 'http://example.com/')
    ).toBe('http://cdn.example.com/script.js');
  });

  it('should handle URLs with query parameters', () => {
    expect(
      resolveUrl('page.html?query=value', 'https://example.com/base/')
    ).toBe('https://example.com/base/page.html?query=value');
    expect(
      resolveUrl(
        '../other.html?param=test',
        'https://example.com/base/page.html'
      )
    ).toBe('https://example.com/other.html?param=test');
  });

  it('should handle URLs with hash fragments', () => {
    expect(resolveUrl('page.html#section', 'https://example.com/base/')).toBe(
      'https://example.com/base/page.html#section'
    );
    expect(
      resolveUrl('../other.html#anchor', 'https://example.com/base/page.html')
    ).toBe('https://example.com/other.html#anchor');
  });

  it('should handle URLs with both query and hash', () => {
    expect(
      resolveUrl('page.html?query=value#section', 'https://example.com/base/')
    ).toBe('https://example.com/base/page.html?query=value#section');
  });

  it('should handle base URLs without trailing slash', () => {
    expect(resolveUrl('page.html', 'https://example.com/base')).toBe(
      'https://example.com/page.html'
    );
  });

  it('should handle base URLs with ports', () => {
    expect(resolveUrl('page.html', 'https://example.com:8080/base/')).toBe(
      'https://example.com:8080/base/page.html'
    );
  });

  it('should handle complex relative paths', () => {
    expect(
      resolveUrl('./current/../other.html', 'https://example.com/base/')
    ).toBe('https://example.com/base/other.html');
    expect(resolveUrl('sub/./page.html', 'https://example.com/base/')).toBe(
      'https://example.com/base/sub/page.html'
    );
  });

  it('should handle empty relative URLs', () => {
    expect(resolveUrl('', 'https://example.com/base/')).toBe(
      'https://example.com/base/'
    );
  });

  it('should handle current directory references', () => {
    expect(resolveUrl('./page.html', 'https://example.com/base/')).toBe(
      'https://example.com/base/page.html'
    );
    expect(resolveUrl('./', 'https://example.com/base/page.html')).toBe(
      'https://example.com/base/'
    );
  });

  it('should throw error for invalid relative URLs', () => {
    expect(() => resolveUrl('', '')).toThrow('Invalid relative URL');
    expect(() => resolveUrl(null as any, 'https://example.com/')).toThrow(
      'Invalid relative URL'
    );
    expect(() => resolveUrl(undefined as any, 'https://example.com/')).toThrow(
      'Invalid relative URL'
    );
    expect(() => resolveUrl(123 as any, 'https://example.com/')).toThrow(
      'Invalid relative URL'
    );
  });

  it('should throw error for invalid base URLs', () => {
    expect(() => resolveUrl('page.html', '')).toThrow('Invalid base URL');
    expect(() => resolveUrl('page.html', null as any)).toThrow(
      'Invalid base URL'
    );
    expect(() => resolveUrl('page.html', undefined as any)).toThrow(
      'Invalid base URL'
    );
    expect(() => resolveUrl('page.html', 123 as any)).toThrow(
      'Invalid base URL'
    );
  });

  it('should throw error for malformed URLs', () => {
    expect(() => resolveUrl('page.html', 'not-a-url')).toThrow(
      'Failed to resolve URL'
    );
    expect(() => resolveUrl('page.html', 'http://')).toThrow(
      'Failed to resolve URL'
    );
  });

  it('should handle international domain names', () => {
    expect(resolveUrl('page.html', 'https://例え.テスト/base/')).toBe(
      'https://xn--r8jz45g.xn--zckzah/base/page.html'
    );
  });

  it('should handle different protocols in base URL', () => {
    expect(resolveUrl('page.html', 'http://example.com/base/')).toBe(
      'http://example.com/base/page.html'
    );
    expect(resolveUrl('page.html', 'ftp://example.com/base/')).toBe(
      'ftp://example.com/base/page.html'
    );
  });
});
