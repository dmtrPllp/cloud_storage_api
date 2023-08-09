import { ApiResponseProperty } from '@nestjs/swagger';

import { File } from '@prisma/client';

export class FileResponse implements File {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  fileName: string;

  @ApiResponseProperty()
  originalName: string;

  @ApiResponseProperty()
  size: number;

  @ApiResponseProperty()
  mimeType: string;

  @ApiResponseProperty()
  userId: number;
}
