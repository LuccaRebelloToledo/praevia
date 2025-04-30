import { Injectable } from '@nestjs/common';

import { SignInUsersResponseDto } from '../dtos/sign-in-users-response.dto';
import { SignInUsersDto } from '../dtos/sign-in-users.dto';

import { AuditLogger } from '@app/audit-log/logger/audit.logger';
import { GenerateAccessTokenUseCase } from '@app/token/use-cases/generate-access-token.use-case';
import { GenerateRefreshTokenUseCase } from '@app/token/use-cases/generate-refresh-token.use-case';

@Injectable()
export class SignInUsersUseCase {
  constructor(
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
    private readonly auditLogger: AuditLogger,
  ) {}

  async execute({
    user,
    ipAddress,
    userAgent,
  }: SignInUsersDto): Promise<SignInUsersResponseDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessTokenUseCase.execute(user),
      this.generateRefreshTokenUseCase.execute({
        user,
        ipAddress,
        userAgent,
      }),
    ]);

    this.auditLogger.userLoginSuccess({
      affectedResourceId: user.id,
      ipAddress,
      userAgent,
    });

    return { accessToken, refreshToken };
  }
}
