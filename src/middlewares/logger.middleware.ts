import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Response, NextFunction } from 'express';

import RequestWithUser from 'src/api/modules/auth/interfaces/request-with-user.interface';
import { getRequestInformation } from 'src/common/modules/logger/constants/logger-info';
import { APP_ENVIRONMENT } from 'src/common/modules/logger/constants/params';
import { WinstonLoggerService } from 'src/common/modules/logger/winston-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private loggerService: WinstonLoggerService,
    private configService: ConfigService,
  ) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    this.loggerService.log(
      getRequestInformation(
        String(this.configService.get(APP_ENVIRONMENT)),
        req,
      ),
    );

    next();
  }
}
