import { ApiProperty } from '@nestjs/swagger';

export class updateCommentDto {
  @ApiProperty({
    description: 'Enter The Changes You Want To Do',
  })
  comment: string;
}
