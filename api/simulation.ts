/** biome-ignore-all lint/suspicious/noConsole: console.log */
import type { App } from '@/api/app';

function rand(min: number, max: number) {
  max = max + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

export default async function run(app: App) {
  app.log.info(`Running simulation for http://0.0.0.0:${app.env.PORT}/api/devices/updates`);

  const devices = await fetch(`http://0.0.0.0:${app.env.PORT}/api/devices`);
  const devicesData = (await devices.json()) as { id: number }[];

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, rand(1_000, 5_000)));

    const deviceId = devicesData[rand(0, devicesData.length - 1)]?.id;

    const data = {
      uptime: rand(0, 20),
      load: rand(0, 100),
      freeMem: rand(0, 2048),
    };

    if (!deviceId) {
      app.log.error('No device ID found');
      continue;
    }

    try {
      const res = await fetch(`http://0.0.0.0:${app.env.PORT}/api/devices/${deviceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      app.log.info(await res.json());
    } catch (err) {
      app.log.error(err, 'Simulation failed');
    }
  }
}
