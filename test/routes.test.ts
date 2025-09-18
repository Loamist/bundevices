import { describe, expect, it } from 'bun:test';

import { createApp } from '@/api/app';

describe('API Routes', () => {
  it('should respond to health check', async () => {
    const app = createApp({
      env: {
        LOG_LEVEL: 'silent',
      },
    });
    await app.ready();

    const response = await app.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
    expect(body.uptime).toBeDefined();
  });

  it('should respond to devices', async () => {
    const app = createApp({
      env: {
        LOG_LEVEL: 'silent',
      },
    });
    await app.ready();

    const response = await app.inject({
      method: 'GET',
      url: '/api/devices',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThan(0);
  });
});
