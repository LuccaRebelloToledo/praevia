import { ConfigService } from '@nestjs/config';

import path from 'node:path';

import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';

const configService = new ConfigService();

export default defineConfig({
  driver: PostgreSqlDriver,
  host: configService.get<string>('PG_HOST'),
  port: configService.get<number>('PG_PORT'),
  user: configService.get<string>('PG_USER'),
  password: configService.get<string>('PG_PASSWORD'),
  dbName: configService.get<string>('PG_NAME'),
  entities: ['dist/domain/**/*.entity.js'],
  entitiesTs: ['src/domain/**/*.entity.ts'],
  migrations: {
    path: path.join(__dirname, './migrations'),
    pathTs: 'src/infrastructure/database/migrations',
    emit: 'ts',
    transactional: true,
  },
  seeder: {
    path: path.join(__dirname, './seeders'),
    pathTs: 'src/infrastructure/database/seeders',
    emit: 'ts',
  },
  debug: configService.get<string>('NODE_ENV') !== 'production',
  extensions: [Migrator, SeedManager],
});
