import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserResponse } from '../../users/response/user.response';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  public handleRequest(error: Error, user: UserResponse): any {
    if (!user) {
      throw new HttpException(
        'Authentication token is missing.',
        HttpStatus.FORBIDDEN,
      );
    }

    return user;
  }
}
