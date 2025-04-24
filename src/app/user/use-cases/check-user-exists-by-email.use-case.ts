import { Injectable } from '@nestjs/common';

import { UserRepositoryImpl } from '@infrastructure/repositories/user.repository.impl';

@Injectable()
export class CheckUserExistsByEmailUseCase {
  constructor(private readonly userRepo: UserRepositoryImpl) {}

  async execute(email: string): Promise<boolean> {
    return await this.userRepo.existsByEmail(email);
  }
}
