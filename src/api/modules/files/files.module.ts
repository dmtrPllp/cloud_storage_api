import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/modules/db/module';
import { ErrorLogger } from 'src/modules/logger/classes/loggers';
import GetterUtils from 'src/utils/getter.utils.class';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [PrismaModule],
  controllers: [FilesController],
  providers: [FilesService, GetterUtils, ErrorLogger],
  exports: [FilesService],
})
export class FilesModule {}
