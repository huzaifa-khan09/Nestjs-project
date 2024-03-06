import { ApiProperty } from '@nestjs/swagger';

export class updatePostDto {
  @ApiProperty({ description: 'Change your title from here' })
  title?: string;
  @ApiProperty({ description: 'Change your content from here' })
  content?: string;
}
