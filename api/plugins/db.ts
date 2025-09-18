import { drizzle } from 'drizzle-orm/pglite';
import { migrate } from 'drizzle-orm/pglite/migrator';
import fp from 'fastify-plugin';

import * as schema from '@/api/db/schema';
import seed from '@/api/db/seed';

export default fp(
  async (app) => {
    const db = drizzle({ schema });

    app.decorate('db', db);

    try {
      app.log.info('Migrating database');
      await migrate(db, { migrationsFolder: './migrations' });
      app.log.info('Database migrated');
      app.log.info('Seeding database');
      await seed(db);
      app.log.info('Database seeded');
    } catch (error) {
      app.log.warn(error, 'Migration failed, continuing without migrations:');
    }
  },
  {
    name: 'db',
  },
);

export type DB = ReturnType<typeof drizzle<typeof schema>>;

declare module 'fastify' {
  interface FastifyInstance {
    db: DB;
  }
}
