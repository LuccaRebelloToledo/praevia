import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { Permission } from '@domain/permission/permission.entity';

import { PermissionIDs } from '@shared/constants/permissions.constants';

import { getCurrentDate } from '@shared/utils/date.helper';
import { upsertEntities } from '../utils/upsert-entities.helper';

export class UserPermissionsSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const currentDate = getCurrentDate();

    const userPermissions = [
      {
        id: PermissionIDs.USERS.FULL,
        key: 'full:users',
        displayName: 'Full access to users',
      },
      {
        id: PermissionIDs.USERS.READ,
        key: 'read:users',
        displayName: 'Read access to users',
      },
      {
        id: PermissionIDs.USERS.CREATE,
        key: 'create:users',
        displayName: 'Create access to users',
      },
      {
        id: PermissionIDs.USERS.UPDATE,
        key: 'update:users',
        displayName: 'Update access to users',
      },
      {
        id: PermissionIDs.USERS.DELETE,
        key: 'delete:users',
        displayName: 'Delete access to users',
      },
    ];

    await upsertEntities(em, Permission, userPermissions, ['id'], {
      createdDateTime: currentDate,
      lastModifiedDateTime: currentDate,
    });
  }
}
