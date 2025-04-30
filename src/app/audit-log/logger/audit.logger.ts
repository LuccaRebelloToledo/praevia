import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AuditEvent } from '@domain/audit-log/audit-events.enum';
import { IAuditLogger } from '@domain/audit-log/audit.logger';

import {
  UserLoginFailedEvent,
  UserLoginSuccessEvent,
} from '../events/user.events';

@Injectable()
export class AuditLogger implements IAuditLogger {
  constructor(private readonly emitEmitter: EventEmitter2) {}

  userLoginSuccess(eventData: UserLoginSuccessEvent): void {
    this.emitEmitter.emit(AuditEvent.USER_LOGIN_SUCCESS, eventData);
  }

  userLoginFailed(eventData: UserLoginFailedEvent): void {
    this.emitEmitter.emit(AuditEvent.USER_LOGIN_FAILED, eventData);
  }
}
