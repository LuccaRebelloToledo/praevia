import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { Permission } from '@domain/permission/permission.entity';
import { RolePermission } from '@domain/role-permission/role-permission.entity';
import { Role } from '@domain/role/role.entity';

import { PermissionIDs } from '@shared/constants/permissions.constants';
import { RoleIDs } from '@shared/constants/roles.constants';

import { upsertEntities } from '../utils/upsert-entities.helper';

export class AdminRolePermissionsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const adminPermissions = [
      {
        role: em.getReference(Role, RoleIDs.ADMIN),
        permission: em.getReference(Permission, PermissionIDs.USERS.FULL),
      },
    ];

    await upsertEntities(em, RolePermission, adminPermissions, [
      'role',
      'permission',
    ]);
  }
}
