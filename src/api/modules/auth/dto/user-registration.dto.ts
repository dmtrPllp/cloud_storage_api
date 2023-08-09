import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserRegistrationDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 2,
    minNumbers: 2,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
