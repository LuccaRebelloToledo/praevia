import {
  UserLoginFailedEvent,
  UserLoginSuccessEvent,
} from '@app/audit-log/events/user.events';

export interface IAuditLogger {
  userLoginSuccess(eventData: UserLoginSuccessEvent): void;
  userLoginFailed(eventData: UserLoginFailedEvent): void;
}
