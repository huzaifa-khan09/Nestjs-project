import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createPostDto } from './Dto/createPostDto/CreatePostDto';
import { AuthGuard } from 'src/auth/authguard/auth.guard';
import { ApiResponseDto } from './Dto/ApiResponseDto/api.response.dto';
import * as Constants from './ConstantsPost/constants.post';

@Controller(Constants.POST_API_ENDPOINT)
@ApiTags('Post Module')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Here we will fetch all our posts
   */
  @Get(Constants.GET_ALL_POSTS)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'To Get All The Post' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'All Post Fetched Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getPost() {
    return this.postService.findAll();
  }

  /**
   * Here we will create a new post
   */
  @Post(Constants.CREATE_POST)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create your Post' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'All Post Fetched Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createPost(
    @Body(ValidationPipe) createPostDto: createPostDto,
  ): Promise<any> {
    try {
      const result = await this.postService.createPost(createPostDto);
      return { message: 'Post created successfully', data: result };
    } catch (error) {
      return { message: 'Error', data: error.message };
    }
  }

  /**
   * Here we update our post
   */
  @Patch(Constants.UPDATE_POST)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit your post' })
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'All Post Fetched Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updatePost(
    @Param('id') id: string,
    @Body() updatePost: Partial<createPostDto>,
  ) {
    return this.postService.updatePost(id, updatePost);
  }

  /**
   * Here we delete our post
   */
  @Delete(Constants.DELETE_POST)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'Post Deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Delete post by their id' })
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
