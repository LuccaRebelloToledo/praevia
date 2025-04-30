import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import type { User } from '@domain/user/user.entity';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: User): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    });

    return accessToken;
  }
}
