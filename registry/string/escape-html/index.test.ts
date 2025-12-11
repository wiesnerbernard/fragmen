import { describe, it, expect } from 'vitest';
import { escapeHtml } from './index';

describe('escapeHtml', () => {
  it('should escape less-than and greater-than symbols', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
    expect(escapeHtml('5 < 10')).toBe('5 &lt; 10');
    expect(escapeHtml('10 > 5')).toBe('10 &gt; 5');
  });

  it('should escape ampersands', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    expect(escapeHtml('A & B & C')).toBe('A &amp; B &amp; C');
  });

  it('should escape double quotes', () => {
    expect(escapeHtml('Say "Hello"')).toBe('Say &quot;Hello&quot;');
    expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
  });

  it('should escape single quotes', () => {
    expect(escapeHtml("It's working")).toBe('It&#x27;s working');
    expect(escapeHtml("'single'")).toBe('&#x27;single&#x27;');
  });

  it('should escape forward slashes', () => {
    expect(escapeHtml('path/to/file')).toBe('path&#x2F;to&#x2F;file');
    expect(escapeHtml('</script>')).toBe('&lt;&#x2F;script&gt;');
  });

  it('should escape script tags', () => {
    expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;'
    );
  });

  it('should escape complex HTML', () => {
    const html = '<div class="test">Hello</div>';
    expect(escapeHtml(html)).toBe(
      '&lt;div class=&quot;test&quot;&gt;Hello&lt;&#x2F;div&gt;'
    );
  });

  it('should escape XSS attempts', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe(
      '&lt;img src=x onerror=alert(1)&gt;'
    );
    expect(escapeHtml('<a href="javascript:alert(1)">Click</a>')).toBe(
      '&lt;a href=&quot;javascript:alert(1)&quot;&gt;Click&lt;&#x2F;a&gt;'
    );
  });

  it('should escape all special characters together', () => {
    expect(escapeHtml('<tag attr="value" & more=\'test\'>')).toBe(
      '&lt;tag attr=&quot;value&quot; &amp; more=&#x27;test&#x27;&gt;'
    );
  });

  it('should return empty string for empty input', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('should handle strings with no special characters', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
    expect(escapeHtml('abc123')).toBe('abc123');
  });

  it('should return empty string for non-string input', () => {
    expect(escapeHtml(null as never)).toBe('');
    expect(escapeHtml(undefined as never)).toBe('');
    expect(escapeHtml(123 as never)).toBe('');
    expect(escapeHtml({} as never)).toBe('');
  });

  it('should handle strings with multiple consecutive special chars', () => {
    expect(escapeHtml('<<<')).toBe('&lt;&lt;&lt;');
    expect(escapeHtml('&&&')).toBe('&amp;&amp;&amp;');
  });

  it('should handle mixed text and HTML', () => {
    expect(escapeHtml('Hello <b>World</b>!')).toBe(
      'Hello &lt;b&gt;World&lt;&#x2F;b&gt;!'
    );
  });

  it('should escape HTML entities that are already escaped', () => {
    expect(escapeHtml('&lt;')).toBe('&amp;lt;');
    expect(escapeHtml('&amp;')).toBe('&amp;amp;');
  });

  it('should handle long strings', () => {
    const long = '<div>'.repeat(100);
    const escaped = escapeHtml(long);
    expect(escaped).toContain('&lt;div&gt;');
    expect(escaped.match(/&lt;div&gt;/g)).toHaveLength(100);
  });

  it('should escape comparison operators in expressions', () => {
    expect(escapeHtml('if (x < 10 && y > 5)')).toBe(
      'if (x &lt; 10 &amp;&amp; y &gt; 5)'
    );
  });

  it('should handle malformed HTML', () => {
    expect(escapeHtml('<div<div>')).toBe('&lt;div&lt;div&gt;');
    expect(escapeHtml('<<>>')).toBe('&lt;&lt;&gt;&gt;');
  });

  it('should preserve whitespace', () => {
    expect(escapeHtml('  <div>  ')).toBe('  &lt;div&gt;  ');
    expect(escapeHtml('\n<p>\n')).toBe('\n&lt;p&gt;\n');
  });

  it('should escape attributes with quotes', () => {
    expect(escapeHtml('onclick="alert(\'XSS\')"')).toBe(
      'onclick=&quot;alert(&#x27;XSS&#x27;)&quot;'
    );
  });

  it('should handle Unicode characters without escaping them', () => {
    expect(escapeHtml('Hello 世界')).toBe('Hello 世界');
    expect(escapeHtml('<emoji>😀</emoji>')).toBe(
      '&lt;emoji&gt;😀&lt;&#x2F;emoji&gt;'
    );
  });

  it('should escape data URIs', () => {
    expect(escapeHtml('data:text/html,<script>alert(1)</script>')).toBe(
      'data:text&#x2F;html,&lt;script&gt;alert(1)&lt;&#x2F;script&gt;'
    );
  });
});
