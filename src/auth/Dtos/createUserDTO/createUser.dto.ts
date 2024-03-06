import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class createUserDto {
  @ApiProperty({
    description: 'User Full Name',
  })
  username: string;

  @ApiProperty({
    description: 'Should be a valid email and should not be already existed',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Should be the strong password',
  })
  password: string;

  @ApiProperty({
    description: 'Users personal Phone Number',
  })
  phoneNumber: number;
}
