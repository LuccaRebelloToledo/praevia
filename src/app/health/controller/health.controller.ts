import { Controller, Get } from '@nestjs/common';

import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

import { ApiTags } from '@nestjs/swagger';

import { Public } from '@shared/decorators/public.decorator';

import { DatabaseHealthIndicatorUseCase } from '../use-cases/database-health-indicator.use-case';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly databaseHealthIndicatorUseCase: DatabaseHealthIndicatorUseCase,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => await this.databaseHealthIndicatorUseCase.execute('database'),
    ]);
  }
}
