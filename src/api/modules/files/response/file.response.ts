import { ApiResponseProperty } from '@nestjs/swagger';

import { File } from '@prisma/client';

export class FileResponse implements File {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  path: string;
}
