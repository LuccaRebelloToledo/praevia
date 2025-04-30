import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AuditAction } from '@domain/audit-log/audit-action.enum';
import { AuditEvent } from '@domain/audit-log/audit-events.enum';
import { AuditResource } from '@domain/audit-log/audit-resource.enum';

import { AuditService } from '../services/audit.service';

import {
  UserLoginFailedEvent,
  UserLoginSuccessEvent,
} from '../events/user.events';

@Injectable()
export class AuditListener {
  constructor(private readonly auditService: AuditService) {}

  @OnEvent(AuditEvent.USER_LOGIN_SUCCESS, { async: true, suppressErrors: true })
  async handleUserLoginSuccess(
    eventData: UserLoginSuccessEvent,
  ): Promise<void> {
    await this.auditService.execute({
      ...eventData,
      action: AuditAction.LOGIN_SUCCESS,
      resource: AuditResource.USER,
    });
  }

  @OnEvent(AuditEvent.USER_LOGIN_FAILED, { async: true, suppressErrors: true })
  async handleUserLoginFailed(eventData: UserLoginFailedEvent): Promise<void> {
    await this.auditService.execute({
      ...eventData,
      action: AuditAction.LOGIN_FAILURE,
      resource: AuditResource.USER,
    });
  }
}
