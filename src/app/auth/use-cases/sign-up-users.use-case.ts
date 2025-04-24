import { ConflictException, Injectable } from '@nestjs/common';

import type { User } from '@domain/user/user.entity';
import type { SignUpUsersDto } from '../dtos/sign-up-users.dto';

import { CheckUserExistsByEmailUseCase } from '@app/user/use-cases/check-user-exists-by-email.use-case';
import { CreateUserUseCase } from '@app/user/use-cases/create-user.use-case';

import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

@Injectable()
export class SignUpUsersUseCase {
  constructor(
    private readonly checkUserExistsByEmailUseCase: CheckUserExistsByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(userDto: SignUpUsersDto): Promise<User> {
    const userExists = await this.checkUserExistsByEmailUseCase.execute(
      userDto.email,
    );

    if (userExists)
      throw new ConflictException(
        buildHttpErrorResponse(ErrorCode.USER_INVALID_EMAIL_OR_ALREADY_EXISTS),
      );

    return await this.createUserUseCase.execute(userDto);
  }
}
