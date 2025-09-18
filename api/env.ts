import { Type } from '@sinclair/typebox';
import { SplitArray } from 'typebox-env';

export default Type.Object({
  // Fastify
  DEV_MODE: Type.Boolean({ default: false }),
  PORT: Type.Number({ default: 3000 }),
  HOST: Type.String({ default: '127.0.0.1' }),
  LOG_LEVEL: Type.String({ default: 'info' }),

  // CORS
  CORS_ORIGIN: SplitArray(Type.String(), { separator: ',', default: [] }),
});
