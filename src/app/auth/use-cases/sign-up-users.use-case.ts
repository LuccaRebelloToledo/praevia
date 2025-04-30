import { ConflictException, Injectable } from '@nestjs/common';

import type { User } from '@domain/user/user.entity';
import type { SignUpUsersDto } from '../dtos/sign-up-users.dto';

import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

import { RoleIDs } from '@shared/constants/roles.constants';

import { FindRoleByIdUseCase } from '@app/role/use-cases/find-role-by-id.use-case';
import { CheckUserExistsByEmailUseCase } from '@app/user/use-cases/check-user-exists-by-email.use-case';
import { CreateUserUseCase } from '@app/user/use-cases/create-user.use-case';

@Injectable()
export class SignUpUsersUseCase {
  constructor(
    private readonly checkUserExistsByEmailUseCase: CheckUserExistsByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findRoleByIdUseCase: FindRoleByIdUseCase,
  ) {}

  async execute(userDto: SignUpUsersDto): Promise<User> {
    const userExists = await this.checkUserExistsByEmailUseCase.execute(
      userDto.email,
    );

    if (userExists)
      throw new ConflictException(
        buildHttpErrorResponse(ErrorCode.USER_INVALID_EMAIL_OR_ALREADY_EXISTS),
      );

    const memberRole = await this.findRoleByIdUseCase.execute(RoleIDs.MEMBER);

    return await this.createUserUseCase.execute({
      ...userDto,
      role: memberRole,
    });
  }
}
