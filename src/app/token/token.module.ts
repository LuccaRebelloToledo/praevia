import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ConfigModule } from '@config/config.module';

import jwtConfig from './jwt.config';

import { Token } from '@domain/token/token.entity';

import { TokenRepositoryImpl } from '@infrastructure/repositories/token.repository.impl';

import { GenerateAccessTokenUseCase } from './use-cases/generate-access-token.use-case';
import { GenerateRefreshTokenUseCase } from './use-cases/generate-refresh-token.use-case';

@Module({
  imports: [
    MikroOrmModule.forFeature([Token]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        jwtConfig(configService),
    }),
  ],
  providers: [
    TokenRepositoryImpl,
    GenerateAccessTokenUseCase,
    GenerateRefreshTokenUseCase,
  ],
  exports: [GenerateAccessTokenUseCase, GenerateRefreshTokenUseCase],
})
export class TokenModule {}
