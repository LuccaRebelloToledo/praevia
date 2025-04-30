import { Injectable } from '@nestjs/common';

import type { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { IAuditRepository } from '@domain/audit-log/audit.repository';

import { AuditLog } from '@domain/audit-log/audit.entity';

@Injectable()
export class AuditRepositoryImpl implements IAuditRepository {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: EntityRepository<AuditLog>,
  ) {}

  async create(auditData: Partial<AuditLog>): Promise<AuditLog> {
    const newAuditLog = this.auditLogRepo.create(auditData, {
      partial: true,
    });

    await this.auditLogRepo.insert(newAuditLog);

    return newAuditLog;
  }
}
