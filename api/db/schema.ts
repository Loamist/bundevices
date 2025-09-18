import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const devicesTable = pgTable('devices', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text().notNull(),
  created_at: timestamp('created_at', { mode: 'string' }).notNull().default(sql`now()`),
  updated_at: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .default(sql`now()`)
    .$onUpdate(() => sql`NOW()`),
});
