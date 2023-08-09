import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import appConfig from 'src/configuration/app.config';
import { PrismaModule } from 'src/common/modules/db/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonLoggerModule } from 'src/common/modules/logger/winston-logger.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { FilesModule } from './modules/files/files.module';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_HOST: Joi.string().required(),
        APP_PORT: Joi.number().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    WinstonLoggerModule,
    SessionsModule,
    FilesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
