import 'dotenv/config';
import { env } from 'node:process';

import path from 'node:path';

import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';

const { NODE_ENV, PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_NAME } = env;

export default defineConfig({
  driver: PostgreSqlDriver,
  clientUrl: `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_NAME}`,
  host: PG_HOST,
  port: Number(PG_PORT),
  user: PG_USER,
  password: PG_PASSWORD,
  dbName: PG_NAME,
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
    defaultSeeder: 'DatabaseSeeder',
  },
  debug: NODE_ENV !== 'production',
  extensions: [Migrator, SeedManager],
});
