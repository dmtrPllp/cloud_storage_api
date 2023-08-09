import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { IsEmail, IsString } from 'class-validator';

type CreateUserType = Pick<User, 'fullName' | 'email' | 'password'>;

export class CreateUserDto implements CreateUserType {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
