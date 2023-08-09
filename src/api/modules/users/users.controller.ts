import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { swaggerType } from 'src/common/utils/swagger/utils';
import { UsersService } from './users.service';
import { UserResponse } from './response/user.response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import RequestWithUser from '../auth/interfaces/request-with-user.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse(swaggerType(UserResponse))
  @UseGuards(JwtAuthGuard)
  @Get('/get-me')
  public getMe(@Req() req: RequestWithUser): Promise<UserResponse> {
    return this.usersService.getUserById(req.user.id);
  }
}
