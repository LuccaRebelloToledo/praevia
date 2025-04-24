import { Inject, Module, type OnModuleInit } from '@nestjs/common';

import { MikroORM } from '@mikro-orm/core';

import { AuthModule } from '@app/auth/auth.module';
import { HealthModule } from '@app/health/health.module';
import { UserModule } from '@app/user/user.module';
import { CryptoModule } from '@shared/crypto/crypto.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CryptoModule,
    UserModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(@Inject(MikroORM) private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
    await this.orm.getSeeder().seed();
  }
}
