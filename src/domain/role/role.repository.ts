import { Role } from './role.entity';

export interface IRoleRepository {
  findOneById(id: string): Promise<Role | null>;
}
