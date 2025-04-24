import { Module } from '@nestjs/common';

import { UserModule } from '@app/user/user.module';
import { CryptoModule } from '@shared/crypto/crypto.module';

import { AuthController } from './controller/auth.controller';

import { SignUpUsersUseCase } from './use-cases/sign-up-users.use-case';

import JwtStrategy from '@infrastructure/strategies/jwt.strategy';
import LocalStrategy from '@infrastructure/strategies/local.strategy';

@Module({
  imports: [UserModule, CryptoModule],
  controllers: [AuthController],
  providers: [SignUpUsersUseCase, JwtStrategy, LocalStrategy],
  exports: [],
})
export class AuthModule {}
