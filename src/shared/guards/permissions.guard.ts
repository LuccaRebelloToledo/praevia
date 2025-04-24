import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { FindUserByIdUseCase } from '@app/user/use-cases/find-user-by-id.use-case';
import { Reflector } from '@nestjs/core';

import { Permissions } from '@shared/decorators/permissions.decorator';

import type { Permission } from '@domain/permission/permission.entity';
import { ErrorCode } from '@shared/errors/error-codes.enum';
import { buildHttpErrorResponse } from '@shared/utils/http.helper';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  private userHasRequiredPermissions(
    routePermissions: string[],
    currentUserPermissions: Permission[],
  ): boolean {
    return currentUserPermissions.some((permission) =>
      routePermissions.includes(permission.key),
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      Permissions,
      context.getHandler(),
    );

    if (!routePermissions) return true;

    const request = context.switchToHttp().getRequest();
    const { id } = request.user;

    const user = await this.findUserByIdUseCase.execute(id);

    if (!user?.role?.permissions?.length)
      throw new ForbiddenException(
        buildHttpErrorResponse(ErrorCode.USER_HAS_NO_ROLE_OR_PERMISSIONS),
      );

    const currentUserPermissions = user.role.permissions.getItems();

    return this.userHasRequiredPermissions(
      routePermissions,
      currentUserPermissions,
    );
  }
}
