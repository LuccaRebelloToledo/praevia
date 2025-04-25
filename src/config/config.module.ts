import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';

import environmentVariablesSchema from './environments.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: environmentVariablesSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
  ],
})
export class ConfigModule {}
