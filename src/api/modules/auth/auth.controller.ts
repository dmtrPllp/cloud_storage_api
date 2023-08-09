import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { swaggerType } from 'src/common/utils/swagger/utils';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginResponse } from './response/user-login.reponse';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse()
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  public registration(
    @Body() registrationDto: UserRegistrationDto,
  ): Promise<void> {
    return this.authService.registration(registrationDto);
  }

  @ApiOkResponse(swaggerType(UserLoginResponse))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public login(
    @Body() loginDto: UserLoginDto,
    @Req() req: Request,
  ): Promise<UserLoginResponse> {
    return this.authService.login(loginDto, req);
  }
}
