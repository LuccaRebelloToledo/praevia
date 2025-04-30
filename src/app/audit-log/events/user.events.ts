import { AuditLog } from '@domain/audit-log/audit.entity';

export type UserLoginFailedEvent = Omit<
  AuditLog,
  | 'id'
  | 'createdDateTime'
  | 'lastModifiedDateTime'
  | 'deletedDateTime'
  | 'action'
  | 'resource'
>;

export type UserLoginSuccessEvent = UserLoginFailedEvent;
