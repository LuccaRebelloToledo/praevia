import 'dotenv/config';

import path from 'node:path';
import { env } from 'node:process';

import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  driver: PostgreSqlDriver,
  host: env.PG_HOST,
  port: Number(env.PG_PORT),
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  dbName: env.PG_NAME,
  entities: ['dist/domain/**/*.js'],
  entitiesTs: ['src/domain/**/*.ts'],
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
  debug: env.NODE_ENV !== 'production',
  extensions: [Migrator, SeedManager],
});
