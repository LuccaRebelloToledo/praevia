import { Module } from '@nestjs/common';

import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller/health.controller';

import { DatabaseHealthIndicatorUseCase } from './use-cases/database-health-indicator.use-case';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicatorUseCase],
  exports: [DatabaseHealthIndicatorUseCase],
})
export class HealthModule {}
