import { Cascade, Entity, ManyToOne } from '@mikro-orm/core';

import { Permission } from '@domain/permission/permission.entity';
import { Role } from '@domain/role/role.entity';

@Entity({
  tableName: 'role_permissions',
})
export class RolePermission {
  @ManyToOne(() => Role, {
    primary: true,
    cascade: [Cascade.ALL],
    joinColumn: 'role_id',
  })
  role: Role;

  @ManyToOne(() => Permission, {
    primary: true,
    cascade: [Cascade.ALL],
    joinColumn: 'permission_id',
  })
  permission: Permission;
}
