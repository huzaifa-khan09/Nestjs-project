import { ApiProperty } from '@nestjs/swagger';

export class createCommentDto {
  @ApiProperty({
    description: 'Enter Your Review About The Post',
  })
  comment: string;

  @ApiProperty({
    description: 'Enter Your Post ID',
  })
  post: string;

  @ApiProperty({
    description: 'Enter Your USer ID',
  })
  user: string;
}
