import { Injectable } from '@nestjs/common';

import type { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import type { IUserRepository } from '@domain/user/user.repository';

import { User } from '@domain/user/user.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepo.findOne(
      {
        id,
        isActive: true,
        deletedDateTime: null,
      },
      {
        populate: ['role', 'role.permissions'],
      },
    );
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne(
      {
        email,
      },
      {
        populate: ['role', 'role.permissions'],
      },
    );
  }

  async existsByEmail(email: string): Promise<boolean> {
    const exists = await this.userRepo.findOne({ email }, { fields: ['id'] });

    return !!exists?.id;
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(userData, {
      partial: true,
    });

    await this.userRepo.insert(newUser);

    return newUser;
  }
}
