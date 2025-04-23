import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';

import { BaseEntity } from '@domain/base.entity';
import { Role } from '@domain/role/role.entity';

@Entity({
  tableName: 'permissions',
})
export class Permission extends BaseEntity {
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
    () => Role,
    (roles) => roles.permissions,
  )
  roles: Collection<Role> = new Collection<Role>(this);
}
