import { Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { LoginDto } from 'src/auth/Dtos/LoginDto/Login.Dto';
import { createUserDto } from 'src/auth/Dtos/createUserDTO/createUser.dto';
import * as Constants from '../../auth/ConstantsAuth/constants.auth'
import { HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/authguard/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiResponseDto } from 'src/auth/Dtos/ApiResponseDto/api.response.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
@Controller(Constants.AUTH_API_ENDPOINT)
export class AuthGatewayController {
    constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {}

  @ApiBody({ type: createUserDto })
  @ApiOperation({ summary: 'New User can register from here' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'User SignUp Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post(Constants.SIGN_UP_USER)
  signup(createUserDto: createUserDto) {
    return this.authServiceClient.send('signup', createUserDto);
  }

  @Post(Constants.LOG_IN_USER)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'User can Login if he have a existing account' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 201, description: 'Saved' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  login(loginDto: LoginDto) {
    return this.authServiceClient.send('login', loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(Constants.GET_ALL_USER)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'All Users profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Login to see all the user Profile' })
  getProfiles() {
    return this.authServiceClient.send('getProfiles', {});
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(Constants.DELETE_EXISTING_USER)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'User Deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Delete user by their id' })
  deleteUser(id: string) {
    return this.authServiceClient.send('deleteUser', { id });
  }
}
