import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

type OmitUserPasswordType = Omit<User, 'password'>;

export class UserResponse implements OmitUserPasswordType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;
}
