import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class createPostDto {
  @ApiProperty({ description: 'Write your title about the post' })
  title: string;

  @ApiProperty({ description: 'Write your description here' })
  content: string;

  @ApiProperty({ description: 'Write your description here' })
  user: string;

  // @ApiProperty({ description: 'Write your description here' })
  // comment: string;
}
