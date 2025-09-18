import type { DB } from '@/api/plugins/db';
import { devicesTable } from './schema';

export default async function seed(db: DB) {
  await db
    .insert(devicesTable)
    .values([
      { name: 'Google Home Voice Controller' },
      { name: 'Mr. Coffee Smart Coffeemaker' },
      { name: 'Philips Hue Hue Go' },
      { name: 'Amazon Dash Button' },
      { name: 'August Doorbell Cam' },
      { name: 'Footbot Air Quality Monitor' },
      { name: 'August Smart Lock' },
      { name: 'Flow by Plume Labs Air Pollution Monitor' },
      { name: 'Nest Smoke Alarm' },
    ]);
}
