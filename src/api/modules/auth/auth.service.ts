import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from '@prisma/client';

import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

import { UserRegistrationDto } from './dto/user-registration.dto';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../users/response/user.response';
import { UserLoginDto } from './dto/user-login.dto';
import { UserLoginResponse } from './response/user-login.reponse';
import { SessionsService } from '../sessions/sessions.service';
import TokenPayload from './interfaces/token-payload.interface';
import CookieWithRefreshToken from './interfaces/cookie-with-refresh-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
    private readonly configService: ConfigService,
  ) {}

  public async registration(
    registrationDto: UserRegistrationDto,
  ): Promise<void> {
    await this.usersService.create(registrationDto);
  }

  public async login(
    loginDto: UserLoginDto,
    req: Request,
  ): Promise<UserLoginResponse> {
    const user = await this.getAuthenticatedUser(
      loginDto.email,
      loginDto.password,
    );

    const accessToken = this.getAccessJwtToken(user.id);

    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(user.id);

    await this.sessionsService.createOrUpdateSessionByUserId(
      user.id,
      refreshToken,
    );

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private async verifyPassword(
    plainTextPassword: string,
    user: User,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserResponse> {
    try {
      const user: User = await this.usersService.getUserByEmailWithPassword(
        email,
      );

      await this.verifyPassword(plainTextPassword, user);

      user.password = undefined;

      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  private getAccessJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }

  private getCookieWithJwtRefreshToken(userId: number): CookieWithRefreshToken {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const refreshTokenCookie = cookie.serialize('refreshToken', token, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    return {
      refreshTokenCookie,
      token,
    };
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<UserResponse> {
    const refreshTokenFromDb = await this.sessionsService.getRefreshToken(
      userId,
    );

    if (refreshToken !== refreshTokenFromDb) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.getUserById(userId);

    return user;
  }
}
