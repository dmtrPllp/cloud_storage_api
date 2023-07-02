import { registerAs } from '@nestjs/config';

import { AppEnvInterface } from './interfaces/app-env.interface';

export default registerAs(
  'app',
  (): AppEnvInterface => ({
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT, 10),
  }),
);
