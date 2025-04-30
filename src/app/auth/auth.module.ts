import { Module } from '@nestjs/common';

import { AuthController } from './controller/auth.controller';

import { AuditModule } from '@app/audit-log/audit.module';
import { RoleModule } from '@app/role/role.module';
import { TokenModule } from '@app/token/token.module';
import { UserModule } from '@app/user/user.module';

import { SignInUsersUseCase } from './use-cases/sign-in-users.use-case';
import { SignUpUsersUseCase } from './use-cases/sign-up-users.use-case';

@Module({
  imports: [UserModule, RoleModule, TokenModule, AuditModule],
  controllers: [AuthController],
  providers: [SignUpUsersUseCase, SignInUsersUseCase],
  exports: [],
})
export class AuthModule {}
