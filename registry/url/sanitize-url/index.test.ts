import { describe, it, expect } from 'vitest';
import { sanitizeUrl } from './index.js';

describe('sanitizeUrl', () => {
  it('should return valid URLs unchanged', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
    expect(sanitizeUrl('http://example.com/path')).toBe(
      'http://example.com/path'
    );
    expect(sanitizeUrl('https://example.com/path?query=value')).toBe(
      'https://example.com/path?query=value'
    );
  });

  it('should add default protocol to URLs without protocol', () => {
    expect(sanitizeUrl('example.com')).toBe('https://example.com/');
    expect(sanitizeUrl('www.example.com/path')).toBe(
      'https://www.example.com/path'
    );
  });

  it('should handle protocol-relative URLs', () => {
    expect(sanitizeUrl('//example.com/path')).toBe('https://example.com/path');
    expect(sanitizeUrl('//cdn.example.com/assets/style.css')).toBe(
      'https://cdn.example.com/assets/style.css'
    );
  });

  it('should use custom default protocol', () => {
    expect(sanitizeUrl('example.com', { defaultProtocol: 'http' })).toBe(
      'http://example.com/'
    );
    expect(sanitizeUrl('//example.com', { defaultProtocol: 'http' })).toBe(
      'http://example.com/'
    );
  });

  it('should reject dangerous protocols', () => {
    expect(sanitizeUrl('javascript:alert("xss")')).toBe(null);
    expect(sanitizeUrl('vbscript:msgbox("xss")')).toBe(null);
    expect(sanitizeUrl('data:text/html,<script>alert("xss")</script>')).toBe(
      null
    );
    expect(sanitizeUrl('file:///etc/passwd')).toBe(null);
  });

  it('should allow safe protocols', () => {
    expect(sanitizeUrl('mailto:user@example.com')).toBe(
      'mailto:user@example.com'
    );
    expect(sanitizeUrl('tel:+1234567890')).toBe('tel:+1234567890');
    expect(sanitizeUrl('sms:+1234567890')).toBe('sms:+1234567890');
    expect(sanitizeUrl('ftp://files.example.com')).toBe(
      'ftp://files.example.com/'
    );
  });

  it('should handle custom allowed protocols', () => {
    const options = { allowedProtocols: ['https', 'custom'] };
    expect(sanitizeUrl('https://example.com', options)).toBe(
      'https://example.com/'
    );
    expect(sanitizeUrl('http://example.com', options)).toBe(null);
    // The custom protocol doesn't get trailing slash automatically
    expect(sanitizeUrl('custom://app.example.com', options)).toBe(
      'custom://app.example.com'
    );
  });

  it('should remove query parameters when requested', () => {
    expect(
      sanitizeUrl('https://example.com?query=value', { removeQuery: true })
    ).toBe('https://example.com/');
    expect(
      sanitizeUrl('https://example.com/path?a=1&b=2', { removeQuery: true })
    ).toBe('https://example.com/path');
  });

  it('should remove hash fragments when requested', () => {
    expect(
      sanitizeUrl('https://example.com#section', { removeHash: true })
    ).toBe('https://example.com/');
    expect(
      sanitizeUrl('https://example.com/path#anchor', { removeHash: true })
    ).toBe('https://example.com/path');
  });

  it('should remove both query and hash when requested', () => {
    const options = { removeQuery: true, removeHash: true };
    expect(
      sanitizeUrl('https://example.com/path?query=value#section', options)
    ).toBe('https://example.com/path');
  });

  it('should handle URLs with encoded characters', () => {
    expect(sanitizeUrl('https://example.com/path%20with%20spaces')).toBe(
      'https://example.com/path%20with%20spaces'
    );
    expect(sanitizeUrl('https://example.com/search?q=hello%20world')).toBe(
      'https://example.com/search?q=hello%20world'
    );
  });

  it('should reject URLs with suspicious patterns', () => {
    // The URL constructor automatically encodes < and > characters, making them safe
    // So we'll test for patterns that remain dangerous
    expect(sanitizeUrl('https://example.com/path?onclick=alert("xss")')).toBe(
      null
    );
    expect(sanitizeUrl('https://example.com/path?onload=malicious()')).toBe(
      null
    );
    expect(sanitizeUrl('javascript:alert("xss")')).toBe(null);
  });

  it('should handle localhost URLs', () => {
    expect(sanitizeUrl('http://localhost:3000')).toBe('http://localhost:3000/');
    expect(sanitizeUrl('localhost:3000')).toBe('https://localhost:3000/');
  });

  it('should handle IP addresses', () => {
    expect(sanitizeUrl('http://192.168.1.1:8080')).toBe(
      'http://192.168.1.1:8080/'
    );
    expect(sanitizeUrl('192.168.1.1')).toBe('https://192.168.1.1/');
  });

  it('should return null for invalid inputs', () => {
    expect(sanitizeUrl('')).toBe(null);
    expect(sanitizeUrl(null as any)).toBe(null);
    expect(sanitizeUrl(undefined as any)).toBe(null);
    expect(sanitizeUrl(123 as any)).toBe(null);
  });

  it('should return null for malformed URLs', () => {
    expect(sanitizeUrl('not a url')).toBe(null);
    expect(sanitizeUrl('http://')).toBe(null);
    expect(sanitizeUrl('https://')).toBe(null);
  });

  it('should handle complex valid URLs', () => {
    const complexUrl =
      'https://sub.example.com:8080/api/v1/users?limit=10&offset=20#results';
    expect(sanitizeUrl(complexUrl)).toBe(complexUrl);
  });

  it('should handle international domain names', () => {
    // International domain names get converted to punycode by the URL constructor
    expect(sanitizeUrl('https://例え.テスト')).toBe(
      'https://xn--r8jz45g.xn--zckzah/'
    );
    expect(sanitizeUrl('https://xn--r8jz45g.xn--zckzah')).toBe(
      'https://xn--r8jz45g.xn--zckzah/'
    );
  });

  it('should trim whitespace', () => {
    expect(sanitizeUrl('  https://example.com  ')).toBe('https://example.com/');
    expect(sanitizeUrl('\n\thttps://example.com\t\n')).toBe(
      'https://example.com/'
    );
  });

  it('should handle edge cases with paths', () => {
    expect(sanitizeUrl('https://example.com/')).toBe('https://example.com/');
    expect(sanitizeUrl('https://example.com/path/')).toBe(
      'https://example.com/path/'
    );
    expect(sanitizeUrl('https://example.com/path/to/resource.html')).toBe(
      'https://example.com/path/to/resource.html'
    );
  });
});
