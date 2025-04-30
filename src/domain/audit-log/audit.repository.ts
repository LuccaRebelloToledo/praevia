import { AuditLog } from './audit.entity';

export interface IAuditRepository {
  create(auditLogData: Partial<AuditLog>): Promise<AuditLog>;
}
