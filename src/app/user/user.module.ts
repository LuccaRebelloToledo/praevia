import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { User } from '@domain/user/user.entity';

import { AuditModule } from '@app/audit-log/audit.module';
import { CryptoModule } from '@shared/crypto/crypto.module';

import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';

import { CheckUserExistsByEmailUseCase } from './use-cases/check-user-exists-by-email.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id.use-case';
import { ValidateUserUseCase } from './use-cases/validate-user.use-case';

@Module({
  imports: [MikroOrmModule.forFeature([User]), CryptoModule, AuditModule],
  controllers: [],
  providers: [
    FindUserByIdUseCase,
    ValidateUserUseCase,
    CheckUserExistsByEmailUseCase,
    CreateUserUseCase,
    UserRepositoryImpl,
  ],
  exports: [
    FindUserByIdUseCase,
    ValidateUserUseCase,
    CheckUserExistsByEmailUseCase,
    CreateUserUseCase,
  ],
})
export class UserModule {}
