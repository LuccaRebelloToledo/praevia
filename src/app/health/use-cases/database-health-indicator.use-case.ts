import { Injectable } from '@nestjs/common';

import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';

import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class DatabaseHealthIndicatorUseCase {
  constructor(
    private readonly em: EntityManager,
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  async execute(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check(key);

    try {
      await this.em.getConnection().execute('SELECT 1');

      return indicator.up();
    } catch (error) {
      return indicator.down(
        `Failed to connect to the database ${error.message}`,
      );
    }
  }
}
