import { Injectable } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { GenerateRefreshTokenDto } from '../dtos/generate-refresh-token.dto';

import { TokenRepositoryImpl } from '@infrastructure/repositories/token.repository.impl';

@Injectable()
export class GenerateRefreshTokenUseCase {
  constructor(private readonly tokenRepo: TokenRepositoryImpl) {}

  async execute({
    user,
    ipAddress,
    userAgent,
  }: GenerateRefreshTokenDto): Promise<string> {
    const refreshToken = randomUUID();

    await this.tokenRepo.create({
      user,
      token: refreshToken,
      ipAddress,
      userAgent,
    });

    return refreshToken;
  }
}
