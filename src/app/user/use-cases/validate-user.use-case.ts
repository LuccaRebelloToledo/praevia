import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';

import { BcryptService } from '@shared/crypto/bcrypt.service';

import type { ValidateUserDto } from '../dtos/validate-user.dto';

import type { User } from '@domain/user/user.entity';

import { AuditLogger } from '@app/audit-log/logger/audit.logger';

import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private readonly userRepo: UserRepositoryImpl,
    private readonly bcryptService: BcryptService,
    private readonly auditLogger: AuditLogger,
  ) {}

  async execute({
    email,
    password,
    ipAddress,
    userAgent,
  }: ValidateUserDto): Promise<User> {
    const user = await this.userRepo.findOneByEmail(email);

    if (!user) {
      this.handleFailedLogin(ErrorCode.AUTH_INVALID_CREDENTIALS, {
        email,
        ipAddress,
        userAgent,
      });
    }

    const isPasswordValid = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      this.handleFailedLogin(ErrorCode.AUTH_INVALID_CREDENTIALS, {
        email,
        ipAddress,
        userAgent,
      });
    }

    if (!user.isActive || user.deletedDateTime) {
      this.handleFailedLogin(ErrorCode.AUTH_USER_INACTIVE, {
        email,
        ipAddress,
        userAgent,
      });
    }

    if (!user.role?.permissions?.length) {
      this.handleFailedLogin(ErrorCode.USER_HAS_NO_ROLE_OR_PERMISSIONS, {
        email,
        ipAddress,
        userAgent,
      });
    }

    return user;
  }

  private handleFailedLogin(
    errorCode: ErrorCode,
    payload: Omit<ValidateUserDto, 'password'>,
  ): never {
    this.auditLogger.userLoginFailed({
      ipAddress: payload.ipAddress,
      userAgent: payload.userAgent,
      affectedResourceId: payload.email,
      metadata: {
        errorCode,
        attemptedEmail: payload.email,
      },
    });

    throw new UnauthorizedException(buildHttpErrorResponse(errorCode));
  }
}
