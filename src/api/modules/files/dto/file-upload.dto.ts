import { ApiProperty } from '@nestjs/swagger';

import { fileUpload } from '../interface/api-property-types';

export class FileUploadDto {
  @ApiProperty(fileUpload)
  file: any;
}
