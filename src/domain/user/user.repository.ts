import type { User } from './user.entity';

export interface IUserRepository {
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  existsByEmail(email: string): Promise<boolean>;
  create(userData: Partial<User>): Promise<User>;
}
