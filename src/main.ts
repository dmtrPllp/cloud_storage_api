import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './api/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppEnvInterface } from './configuration/interfaces/app-env.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ credentials: true, origin: true });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  const configService: ConfigService = app.get(ConfigService);
  const appConfig = configService.get<AppEnvInterface>('app');

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('CloudStorage')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(appConfig.port || 3000, () => {
    console.log(`Server launched on host: ${appConfig.host}:${appConfig.port}`);
  });
}
bootstrap();
