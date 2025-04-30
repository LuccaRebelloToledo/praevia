import { Injectable } from '@nestjs/common';

import { AuditLog } from '@domain/audit-log/audit.entity';
import { AuditRepositoryImpl } from '@infrastructure/repositories/audit.repository.impl';

@Injectable()
export class AuditService {
  constructor(private readonly auditLogRepo: AuditRepositoryImpl) {}

  async execute(auditLogData: Partial<AuditLog>): Promise<AuditLog> {
    return await this.auditLogRepo.create(auditLogData);
  }
}
