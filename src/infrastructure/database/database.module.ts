import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { ConfigModule } from '@config/config.module';
import { ConfigService } from '@nestjs/config';

import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => mikroOrmConfig,
      driver: PostgreSqlDriver,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
