import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import appConfig from 'src/configuration/app.config';

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
  ],
})
export class AppModule {}
