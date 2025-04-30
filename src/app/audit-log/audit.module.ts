import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AuditLog } from '@domain/audit-log/audit.entity';

import { AuditRepositoryImpl } from '@infrastructure/repositories/audit.repository.impl';

import { AuditListener } from './listeners/audit.listener';
import { AuditLogger } from './logger/audit.logger';
import { AuditService } from './services/audit.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([AuditLog]),
    EventEmitterModule.forRoot({
      global: true,
      ignoreErrors: true,
      wildcard: true,
      delimiter: '.',
      maxListeners: 20,
    }),
  ],
  providers: [AuditRepositoryImpl, AuditListener, AuditService, AuditLogger],
  exports: [AuditLogger],
})
export class AuditModule {}
