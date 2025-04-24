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
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsString()
  @IsLocale({
    message: 'Invalid locale format (e.g., en-US)',
  })
  locale: string;

  @IsTimeZone({
    message: 'Invalid time zone format (e.g., America/Sao_Paulo)',
  })
  timeZone: string;
}
