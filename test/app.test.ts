import { describe, expect, it } from 'bun:test';

import { createApp } from '@/api/app';

describe('Server', () => {
  it('should create a Fastify instance', () => {
    const fastify = createApp({
      env: {
        LOG_LEVEL: 'silent',
      },
    });
    expect(fastify).toBeDefined();
  });

  it('should have environment variables', () => {
    const fastify = createApp({
      env: {
        LOG_LEVEL: 'silent',
      },
    });
    expect(fastify.env.PORT).toBeDefined();
    expect(fastify.env.HOST).toBeDefined();
  });
});
