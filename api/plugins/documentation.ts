import fp from 'fastify-plugin';

import type { App } from '@/api/app';

export default fp(
  async function documentationPlugin(app: App) {
    app.get('/openapi.json', async () => app.swagger());

    await app.register(import('@fastify/swagger'), {
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'API',
          description: 'API for the application',
          version: '0.1.0',
        },
        servers: [{ url: '/api' }],
      },
    });

    await app.register(import('@scalar/fastify-api-reference'), {
      routePrefix: '/documentation',
      configuration: {
        title: 'API',
        url: '/openapi.json',
      },
    });
  },
  {
    name: 'documentation',
  },
);
