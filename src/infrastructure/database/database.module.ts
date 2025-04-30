import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => mikroOrmConfig,
      driver: PostgreSqlDriver,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
