import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsUUID } from 'class-validator';

export class SignInUsersResponseDto {
  @ApiProperty()
  @IsJWT()
  accessToken: string;

  @ApiProperty()
  @IsUUID()
  refreshToken: string;
}
