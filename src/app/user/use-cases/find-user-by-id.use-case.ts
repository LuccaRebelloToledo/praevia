import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';

import type { User } from '@domain/user/user.entity';

import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

@Injectable()
export class FindUserByIdUseCase {
  constructor(private readonly userRepo: UserRepositoryImpl) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepo.findOneById(id);

    if (!user)
      throw new UnauthorizedException(
        buildHttpErrorResponse(ErrorCode.USER_NOT_FOUND),
      );

    return user;
  }
}
