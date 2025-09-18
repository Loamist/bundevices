import { Type } from '@sinclair/typebox';

import type { App } from '@/api/app';

export const autoPrefix = '/';

export default async function (app: App) {
  // Health check endpoint
  app.get(
    '/health',
    {
      schema: {
        response: {
          200: Type.Object({
            status: Type.String(),
            timestamp: Type.String({ format: 'date-time' }),
            uptime: Type.Number(),
          }),
        },
      },
    },
    async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
    },
  );
}
