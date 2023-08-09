import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { File } from '@prisma/client';

import { destination } from './constant/constants';
import { PrismaService } from 'src/common/modules/db/prisma.service';
import { GetFileDto } from './dto/get-file.dto';

@Injectable({ scope: Scope.DEFAULT })
export class FilesService {
  private readonly root: string = destination;

  constructor(private readonly db: PrismaService) {}

  public async createFile(
    file: Express.Multer.File,
    userId: number,
  ): Promise<GetFileDto> {
    const { id } = await this.db.file.create({
      data: {
        fileName: file.filename,
        size: file.size,
        originalName: file.originalname,
        mimeType: file.mimetype,
        userId,
      },
    });

    return { id };
  }

  private getPath(fileName: string): string {
    return path.join(this.root, fileName);
  }

  public async unlinkAndDeleteFileById(id: number): Promise<void> {
    try {
      const { fileName } = await this.db.file.findUnique({
        where: { id },
      });

      fs.unlinkSync(this.getPath(fileName));

      await this.db.file.delete({
        where: { id },
      });
    } catch (error) {
      console.log({
        message: `Error during delete file with id ${id}`,
      });
    }
  }

  public async getFileById(id: number): Promise<File> {
    const file = await this.db.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new HttpException('File does not exist', HttpStatus.NOT_FOUND);
    }

    return file;
  }
}
