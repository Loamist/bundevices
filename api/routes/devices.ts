import { Type } from '@sinclair/typebox';

import type { App } from '@/api/app';
import { devicesTable } from '@/api/db/schema';

export const autoPrefix = '/devices';

export default async function devicesRoutes(app: App) {
  app.get(
    '/',
    {
      schema: {
        response: {
          200: Type.Array(
            Type.Object({
              id: Type.String(),
              name: Type.String(),
              created_at: Type.String(),
              updated_at: Type.String(),
            }),
          ),
        },
      },
    },
    async () => {
      const devices = await app.db.select().from(devicesTable);
      return devices;
    },
  );
}
