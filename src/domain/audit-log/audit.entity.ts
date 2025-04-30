import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from '@domain/base.entity';

import { AuditAction } from './audit-action.enum';
import { AuditResource } from './audit-resource.enum';

@Entity({
  tableName: 'audit_logs',
})
export class AuditLog extends BaseEntity {
  @Property({
    name: 'performed_by_id',
    nullable: true,
    length: 50,
  })
  performedById?: string;

  @Property()
  action: AuditAction;

  @Property({
    name: 'affected_resource_id',
    nullable: true,
    length: 50,
  })
  affectedResourceId?: string;

  @Property()
  resource: AuditResource;

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
    type: 'json',
    nullable: true,
  })
  metadata?: Record<string, unknown>;
}
