import { Module } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from '@shared/guards/app.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';

import { CryptoModule } from '@shared/crypto/crypto.module';

import { User } from '@domain/user/user.entity';
import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';

import { CheckUserExistsByEmailUseCase } from './use-cases/check-user-exists-by-email.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.use-case';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';

@Module({
  imports: [MikroOrmModule.forFeature([User]), CryptoModule],
  controllers: [],
  providers: [
    FindUserByIdUseCase,
    ValidateUserUseCase,
    CheckUserExistsByEmailUseCase,
    CreateUserUseCase,
    UserRepositoryImpl,
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [
    FindUserByIdUseCase,
    ValidateUserUseCase,
    CheckUserExistsByEmailUseCase,
    CreateUserUseCase,
  ],
})
export class UserModule {}
