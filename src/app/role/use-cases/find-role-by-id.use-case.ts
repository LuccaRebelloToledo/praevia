import { Injectable, NotFoundException } from '@nestjs/common';

import { RoleRepositoryImpl } from '@infrastructure/repositories/role.repository.impl';

import { Role } from '@domain/role/role.entity';

import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

@Injectable()
export class FindRoleByIdUseCase {
  constructor(private readonly roleRepo: RoleRepositoryImpl) {}

  async execute(id: string): Promise<Role> {
    const role = await this.roleRepo.findOneById(id);

    if (!role)
      throw new NotFoundException(
        buildHttpErrorResponse(ErrorCode.ROLE_NOT_FOUND),
      );

    return role;
  }
}
