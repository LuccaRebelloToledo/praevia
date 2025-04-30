import { Injectable } from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { User } from '@domain/user/user.entity';

import { ValidateUserUseCase } from '@app/user/use-cases/validate-user.use-case';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(
    request: FastifyRequest,
    email: string,
    password: string,
  ): Promise<User> {
    const ipAddress = request.ip;
    const userAgent = request.headers['user-agent'] || 'unknown';

    return await this.validateUserUseCase.execute({
      email,
      password,
      ipAddress,
      userAgent,
    });
  }
}
