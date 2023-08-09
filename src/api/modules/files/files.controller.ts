import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { diskStorage } from 'multer';
import { Express, Response } from 'express';

import { FileUploadDto } from './dto/file-upload.dto';
import { destination } from './constant/constants';
import { FilesService } from './files.service';
import { GetFileDto } from './dto/get-file.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileService } from 'src/common/modules/files';
import RequestWithUser from '../auth/interfaces/request-with-user.interface';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination,
        filename: FileService.editFileName,
      }),
      fileFilter: FileService.imageFileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload one file',
    type: FileUploadDto,
  })
  @UseGuards(JwtAuthGuard)
  public uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ): Promise<GetFileDto> {
    const newFile = this.filesService.createFile(file, req.user.id);
    return newFile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/id/:id')
  public async getFileById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.filesService.getFileById(+id);
    return res.sendFile(file.fileName, { root: destination });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/path/:imgpath')
  public seeUploadedFiles(
    @Param('imgpath') image: string,
    @Res() res: Response,
  ): void {
    return res.sendFile(image, { root: destination });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public deleteFileById(@Param('id') id: string): Promise<void> {
    return this.filesService.unlinkAndDeleteFileById(+id);
  }
}
