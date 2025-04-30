import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from '@domain/base.entity';
import { Role } from '@domain/role/role.entity';

@Entity({
  tableName: 'users',
})
export class User extends BaseEntity {
  @Property({
    name: 'is_active',
    default: true,
  })
  isActive = true;

  @Property({
    name: 'first_name',
    length: 50,
  })
  firstName: string;

  @Property({
    name: 'last_name',
    length: 50,
  })
  lastName: string;

  @Property({
    name: 'email',
    length: 100,
    unique: true,
  })
  email: string;

  @Property({
    name: 'is_email_verified',
    default: false,
  })
  isEmailVerified = false;

  @Property({
    name: 'password',
    length: 255,
    hidden: true,
  })
  password: string;

  @Property({
    length: 5,
  })
  locale: string;

  @Property({
    name: 'time_zone',
    length: 30,
  })
  timeZone: string;

  @ManyToOne(() => Role, {
    nullable: true,
    joinColumn: 'role_id',
  })
  role?: Role;

  @Property({
    name: 'last_login_date_time',
    nullable: true,
  })
  lastLoginDateTime?: Date;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
