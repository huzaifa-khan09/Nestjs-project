import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Put the valid email',
  })
  email: string;

  @ApiProperty({
    description: 'Put the valid password',
  })
  password: string;
}
