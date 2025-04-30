import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

import { RolesSeeder } from './roles.seeder';
import { UserPermissionsSeeder } from './user-permissions.seeder';

import { AdminRolePermissionsSeeder } from './admin-role-permissions.seeder';
import { MemberRolePermissionsSeeder } from './member-role-permissions.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [RolesSeeder, UserPermissionsSeeder]);

    await this.call(em, [
      AdminRolePermissionsSeeder,
      MemberRolePermissionsSeeder,
    ]);
  }
}
