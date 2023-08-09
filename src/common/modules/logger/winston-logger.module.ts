import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WinstonLoggerService } from './winston-logger.service';

@Module({
  controllers: [],
  providers: [WinstonLoggerService, ConfigModule],
  imports: [ConfigModule],
  exports: [WinstonLoggerService],
})
export class WinstonLoggerModule {}
