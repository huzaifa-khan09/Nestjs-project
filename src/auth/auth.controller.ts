import {
  Body,
  Controller,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './Dtos/createUserDTO/createUser.dto';
import { LoginDto } from './Dtos/LoginDto/Login.Dto';
import { createUserResult } from './Dtos/UserResultDto/userResult.Dto';
import { MessagePattern } from '@nestjs/microservices';

/**
 * This is our Auth Controller
 */
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * This is our signUp controller
   */
  @MessagePattern({ cmd: 'signup'})
  async createUserID(
    @Body(ValidationPipe) createUserDto: createUserDto,
  ): Promise<createUserResult> {
    try {
      const result = await this.authService.createUserID(createUserDto);
      return { message: 'user created successfully', data: result };
    } catch (error) {
      return { message: 'Error creating user', data: error.message };
    }
  }

  /**
   * This is our login controller
   */
  @MessagePattern({ cmd: 'login'})
  async login(@Body(ValidationPipe) LoginDto: LoginDto) {
    const user = await this.authService.loginUser(LoginDto);
    const token = this.authService.generateToken(user);
    return { user, token };
  }

  /**
   * This is Profile Router
   */
  @MessagePattern({ cmd: 'getProfiles' })
  getProfile() {
    return this.authService.findAll();
  }

  /**
   * This is ID Router
   */
  @MessagePattern({ cmd: 'deleteUser' })
  findAndDelete(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}