import { User } from '@domain/user/user.entity';

export interface GenerateRefreshTokenDto {
  user: User;
  ipAddress: string;
  userAgent: string;
}
