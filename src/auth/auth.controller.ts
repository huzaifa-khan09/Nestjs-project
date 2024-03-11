import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './Dtos/createUserDTO/createUser.dto';
import { LoginDto } from './Dtos/LoginDto/Login.Dto';
import { AuthGuard } from './authguard/auth.guard';
import { createUserResult } from './Dtos/UserResultDto/userResult.Dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDto } from './Dtos/ApiResponseDto/api.response.dto';
import * as Constants from './ConstantsAuth/constants.auth';
import { MessagePattern } from '@nestjs/microservices';

/**
 * This is our Auth Controller
 */
@Controller(Constants.AUTH_API_ENDPOINT)
@ApiTags('Authentication Module')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * This is our signUp controller
   */
  @Post(Constants.SIGN_UP_USER)
  @ApiBody({ type: createUserDto })
  @ApiOperation({ summary: 'New User can     from here' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'User SignUp Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
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
  @HttpCode(HttpStatus.OK)
  @Post(Constants.LOG_IN_USER)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'User can Login if he have a existing account' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 201, description: 'Saved' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async login(@Body(ValidationPipe) LoginDto: LoginDto) {
    const user = await this.authService.loginUser(LoginDto);
    const token = this.authService.generateToken(user);
    return { user, token };
  }

  /**
   * This is Profile Router
   */
  @Get(Constants.GET_ALL_USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'All Users profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Login to see all the user Profile' })
  getProfile() {
    return this.authService.findAll();
  }

  /**
   * This is ID Router
   */
  @Delete(Constants.DELETE_EXISTING_USER)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'User Deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Delete user by their id' })
  findAndDelete(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}