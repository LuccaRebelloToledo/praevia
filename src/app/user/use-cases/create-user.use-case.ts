import { Injectable } from '@nestjs/common';

import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';
import { BcryptService } from '@shared/crypto/bcrypt.service';

import type { User } from '@domain/user/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly userRepo: UserRepositoryImpl,
  ) {}

  async execute(user: Partial<User>): Promise<User> {
    const hashedPassword = await this.bcryptService.hash(user.password!);

    return await this.userRepo.create({
      ...user,
      password: hashedPassword,
    });
  }
}
