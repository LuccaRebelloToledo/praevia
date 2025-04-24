import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import type { User } from '@domain/user/user.entity';

import type { FastifyRequest } from 'fastify';

import { Public } from '@shared/decorators/public.decorator';

import { LocalAuthGuard } from '@shared/guards/local-auth.guard';

import { SignUpUsersDto } from '../dtos/sign-up-users.dto';
import { SignUpUsersUseCase } from '../use-cases/sign-up-users.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly signUpUsersUseCase: SignUpUsersUseCase) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpUsersDto): Promise<User> {
    const createdUser = await this.signUpUsersUseCase.execute(signUpDto);

    return createdUser;
  }

  @Post('sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: FastifyRequest): Promise<void> {
    // Implement your logic here
  }
}
