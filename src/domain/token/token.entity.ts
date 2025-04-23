import { Entity, Index, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from '@domain/base.entity';
import { User } from '@domain/user/user.entity';

@Entity({
  tableName: 'tokens',
})
export class Token extends BaseEntity {
  @Property({
    length: 255,
  })
  @Index()
  token: string;

  @Property({
    name: 'ip_address',
    length: 100,
  })
  ipAddress: string;

  @Property({
    name: 'user_agent',
    length: 255,
  })
  userAgent: string;

  @Property({
    name: 'revoked_date_time',
    nullable: true,
  })
  revokedDateTime?: Date;

  @ManyToOne(() => User, {
    nullable: true,
    joinColumn: 'user_id',
  })
  user?: User;
}
