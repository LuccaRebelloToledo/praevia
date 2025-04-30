import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { Role } from '@domain/role/role.entity';

import { RoleIDs } from '@shared/constants/roles.constants';

import { getCurrentDate } from '@shared/utils/date.helper';
import { upsertEntities } from '../utils/upsert-entities.helper';

export class RolesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const currentDate = getCurrentDate();

    const roles = [
      {
        id: RoleIDs.ADMIN,
        key: 'admin',
        displayName: 'Administrator',
      },
      {
        id: RoleIDs.MEMBER,
        key: 'member',
        displayName: 'Member',
      },
    ];

    await upsertEntities(em, Role, roles, ['id'], {
      createdDateTime: currentDate,
      lastModifiedDateTime: currentDate,
    });
  }
}
