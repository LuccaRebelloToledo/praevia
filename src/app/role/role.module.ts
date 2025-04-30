import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Role } from '@domain/role/role.entity';

import { RoleRepositoryImpl } from '@infrastructure/repositories/role.repository.impl';

import { FindRoleByIdUseCase } from './use-cases/find-role-by-id.use-case';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RoleRepositoryImpl, FindRoleByIdUseCase],
  exports: [FindRoleByIdUseCase],
})
export class RoleModule {}
