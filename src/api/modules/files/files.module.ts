import { Module } from '@nestjs/common';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaModule } from 'src/common/modules/db/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
