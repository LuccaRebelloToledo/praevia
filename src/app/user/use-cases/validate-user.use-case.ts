import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';
import { BcryptService } from '@shared/crypto/bcrypt.service';

import type { ValidateUserDto } from '../dtos/validate-user.dto';

import type { User } from '@domain/user/user.entity';

import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    private readonly userRepo: UserRepositoryImpl,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute({ email, password }: ValidateUserDto): Promise<User> {
    const user = await this.userRepo.findOneByEmail(email);

    if (!user)
      throw new UnauthorizedException(
        buildHttpErrorResponse(ErrorCode.AUTH_INVALID_CREDENTIALS),
      );

    if (!user.isActive || user.deletedDateTime)
      throw new UnauthorizedException(
        buildHttpErrorResponse(ErrorCode.AUTH_USER_INACTIVE),
      );

    if (!user.role?.permissions?.length)
      throw new UnauthorizedException(
        buildHttpErrorResponse(ErrorCode.USER_HAS_NO_ROLE_OR_PERMISSIONS),
      );

    const isPasswordValid = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException(
        buildHttpErrorResponse(ErrorCode.AUTH_INVALID_CREDENTIALS),
      );

    return user;
  }
}
