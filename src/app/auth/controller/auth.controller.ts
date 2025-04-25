import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import type { User } from '@domain/user/user.entity';

import type { FastifyRequest } from 'fastify';

import { Public } from '@shared/decorators/public.decorator';

import { LocalAuthGuard } from '@shared/guards/local-auth.guard';

import { SignUpUsersDto } from '../dtos/sign-up-users.dto';
import { SignUpUsersUseCase } from '../use-cases/sign-up-users.use-case';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly signUpUsersUseCase: SignUpUsersUseCase) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'A new user has been successfully registered.',
  })
  @ApiConflictResponse({
    description:
      'The email provided is either invalid or already exists. Please use a different email address.',
  })
  async signUp(@Body() signUpDto: SignUpUsersDto): Promise<User> {
    const createdUser = await this.signUpUsersUseCase.execute(signUpDto);

    return createdUser;
  }

  @Post('sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() _request: FastifyRequest): Promise<void> {
    // Implement your logic here
  }
}
