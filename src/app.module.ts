import { Inject, Module, type OnModuleInit } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { GlobalAuthGuard } from '@shared/guards/app.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';

import JwtStrategy from '@infrastructure/strategies/jwt.strategy';
import LocalStrategy from '@infrastructure/strategies/local.strategy';

import { MikroORM } from '@mikro-orm/core';

import { DatabaseSeeder } from '@infrastructure/database/seeders/database.seeder';

import { AuditModule } from '@app/audit-log/audit.module';
import { AuthModule } from '@app/auth/auth.module';
import { HealthModule } from '@app/health/health.module';
import { RoleModule } from '@app/role/role.module';
import { TokenModule } from '@app/token/token.module';
import { UserModule } from '@app/user/user.module';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { CryptoModule } from '@shared/crypto/crypto.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CryptoModule,
    UserModule,
    AuthModule,
    HealthModule,
    TokenModule,
    RoleModule,
    AuditModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@Inject(MikroORM) private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();

    await this.orm.getSeeder().seed(DatabaseSeeder);
  }
}
