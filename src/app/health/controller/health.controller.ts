import { Controller, Get } from '@nestjs/common';

import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

import { Public } from '@shared/decorators/public.decorator';

import { DatabaseHealthIndicatorUseCase } from '../use-cases/database-health-indicator.use-case';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly databaseHealthIndicatorUseCase: DatabaseHealthIndicatorUseCase,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => await this.databaseHealthIndicatorUseCase.execute('database'),
    ]);
  }
}
