import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  description: string;
}
