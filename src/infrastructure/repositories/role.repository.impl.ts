import { Injectable } from '@nestjs/common';

import type { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

import { IRoleRepository } from '@domain/role/role.repository';

import { Role } from '@domain/role/role.entity';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: EntityRepository<Role>,
  ) {}

  async findOneById(id: string): Promise<Role | null> {
    return await this.roleRepo.findOne({
      id,
    });
  }
}
