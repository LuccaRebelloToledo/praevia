import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import type { User } from '@domain/user/user.entity';

import type { FastifyReply, FastifyRequest } from 'fastify';

import { Public } from '@shared/decorators/public.decorator';

import { LocalAuthGuard } from '@shared/guards/local-auth.guard';

import { SignInUsersResponseDto } from '../dtos/sign-in-users-response.dto';
import { SignUpUsersDto } from '../dtos/sign-up-users.dto';

import { SignInUsersUseCase } from '../use-cases/sign-in-users.use-case';
import { SignUpUsersUseCase } from '../use-cases/sign-up-users.use-case';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly signUpUsersUseCase: SignUpUsersUseCase,
    private readonly signInUsersUseCase: SignInUsersUseCase,
  ) {}

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
  @ApiOkResponse({
    description: 'User successfully signed in.',
  })
  async signIn(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<Partial<SignInUsersResponseDto>> {
    const user = request.user as User;

    const { accessToken, refreshToken } = await this.signInUsersUseCase.execute(
      {
        user,
        ipAddress: request.ip,
        userAgent: request.headers['user-agent'] || 'unknown',
      },
    );

    response.setCookie('refreshToken', refreshToken);

    return { accessToken };
  }
}
