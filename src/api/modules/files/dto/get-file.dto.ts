import { ApiProperty } from '@nestjs/swagger';

export class GetFileDto {
  @ApiProperty()
  id: number;
}
