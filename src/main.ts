import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import compression from '@fastify/compress';
import helmet from '@fastify/helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      logger: true,
      ignoreTrailingSlash: true,
    }),
  );

  await app.register(helmet, {
    hidePoweredBy: true,
  });
  await app.register(compression);

  app.setGlobalPrefix('/api', {
    exclude: ['/', '/health'],
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
