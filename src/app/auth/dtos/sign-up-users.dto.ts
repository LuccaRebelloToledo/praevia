import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLocale,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsTimeZone,
  MinLength,
} from 'class-validator';

export class SignUpUsersDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty()
  password: string;

  @IsLocale({
    message: 'Invalid locale format (e.g., en-US)',
  })
  @ApiProperty()
  locale: string;

  @IsTimeZone({
    message: 'Invalid time zone format (e.g., America/Sao_Paulo)',
  })
  @ApiProperty()
  timeZone: string;
}
