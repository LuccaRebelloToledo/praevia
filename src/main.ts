import 'reflect-metadata';

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

import compression from '@fastify/compress';
import helmet from '@fastify/helmet';

import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';

import { GlobalHttpExceptionFilter } from '@shared/filters/http-exception.filter';

import swaggerConfig from '@config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      logger: true,
      ignoreTrailingSlash: true,
    }),
  );

  const configService = app.get(ConfigService);

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.register(helmet, {
    hidePoweredBy: true,
  });

  await app.register(compression);

  await app.register(fastifySecureSession, {
    key: Buffer.from(configService.get<string>('SESSION_KEY')!, 'utf-8'),
    secret: configService.get<string>('SESSION_SECRET')!,
    cookieName: 'refreshToken',
    cookie: {
      secure: configService.get<string>('NODE_ENV') === 'production',
      httpOnly: true,
      maxAge: 86400,
      sameSite: 'lax',
    },
  });

  await app.register(fastifyPassport.initialize());
  await app.register(fastifyPassport.secureSession());

  app.setGlobalPrefix('/api');

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, documentFactory);

  const PORT = configService.get<number>('PORT') || 3000;

  await app.listen(PORT, (err, address) => {
    if (err) Logger.error(err);

    Logger.log(`Server listening at ${address}`);
  });
}

bootstrap().catch((error) => {
  Logger.error('Error starting the application:', error);
  process.exit(1);
});
