import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '@domain/base.entity';
import { Permission } from '@domain/permission/permission.entity';
import { RolePermission } from '@domain/role-permission/role-permission.entity';
import { User } from '@domain/user/user.entity';

@Entity({
  tableName: 'roles',
})
export class Role extends BaseEntity {
  @Property({
    length: 50,
    unique: true,
  })
  key: string;

  @Property({
    name: 'display_name',
    length: 255,
  })
  displayName: string;

  @ManyToMany(
    () => Permission,
    (permissions) => permissions.roles,
    {
      owner: true,
      cascade: [Cascade.PERSIST, Cascade.REMOVE],
      pivotEntity: () => RolePermission,
    },
  )
  permissions: Collection<Permission> = new Collection<Permission>(this);

  @OneToMany(
    () => User,
    (user) => user.role,
  )
  users: Collection<User> = new Collection<User>(this);
}
