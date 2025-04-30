import { Injectable } from '@nestjs/common';

import type { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { ITokenRepository } from '@domain/token/token.repository';

import { Token } from '@domain/token/token.entity';

@Injectable()
export class TokenRepositoryImpl implements ITokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: EntityRepository<Token>,
  ) {}

  async create(tokenData: Partial<Token>): Promise<Token> {
    const newToken = this.tokenRepo.create(tokenData, {
      partial: true,
    });

    await this.tokenRepo.insert(newToken);

    return newToken;
  }
}
