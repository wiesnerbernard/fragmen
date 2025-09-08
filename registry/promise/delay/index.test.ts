import { describe, it, expect } from 'vitest';
import { delay } from './index';

describe('delay', () => {
  it('resolves after given ms', async () => {
    const start = Date.now();
    await delay(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(50);
  });
});
