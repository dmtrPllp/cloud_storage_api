import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from '../../users/response/user.response';

export class UserLoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: UserResponse;
}
