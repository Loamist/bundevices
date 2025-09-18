import { join } from 'node:path';

import autoload from '@fastify/autoload';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { Static } from '@sinclair/typebox';
import Fastify from 'fastify';
import { parseEnv } from 'typebox-env';

import envSchema from './env';
import runSimulation from './simulation';

interface AppOptions {
  env: Partial<Static<typeof envSchema>>;
}

export function createApp(options?: AppOptions) {
  const env = parseEnv(envSchema, {
    ...process.env,
    ...(options?.env ?? {}),
  });

  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
      transport: env.DEV_MODE
        ? {
            target: '@fastify/one-line-logger',
            options: {
              colorize: true,
              hideObject: false,
            },
          }
        : undefined,
    },
    ignoreTrailingSlash: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  app.decorate('env', env);

  app.register(import('@fastify/cors'), {
    origin: env.CORS_ORIGIN,
    methods: ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  });

  app.register(autoload, {
    dir: join(import.meta.dirname, 'plugins'),
    encapsulate: false,
  });

  app.register(autoload, {
    dir: join(import.meta.dirname, 'routes'),
    dirNameRoutePrefix: false,
    options: {
      prefix: '/api',
    },
  });

  app.addHook('onReady', () => {
    runSimulation(app).catch((err) => {
      app.log.error(err, 'Simulation failed, continuing without simulation');
    });
  });

  return app;
}

export type App = ReturnType<typeof createApp>;

declare module 'fastify' {
  interface FastifyInstance {
    env: Static<typeof envSchema>;
  }
}
