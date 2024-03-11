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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/authguard/auth.guard';
import { ApiResponseDto } from 'src/auth/Dtos/ApiResponseDto/api.response.dto';
import { createCommentDto } from './Dto/commentDto/comment.dto';
import { updateCommentDto } from './Dto/updateCommentDto/update.comment.dto';
import * as constants from './commentConstants/comment.constant';
import { MessagePattern } from '@nestjs/microservices';

@Controller(constants.COMMENT_API_ENDPOINT)
@ApiTags('Comment Module')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * This Route Will Be TO Get All The Comment
   */
  @Get(constants.GET_ALL_COMMENTS)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'All Comment Fetched Successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Get All The Comments From Here' })
  getAllComment() {
    return this.commentService.getAllComment();
  }

  /**
   * This Route Will Be For Creating Comment
   */
  @MessagePattern({ cmd: 'addComment' })
  @Post(constants.CREATE_COMMENTS)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'Comment Created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Create New Comment From Here' })
  createNewComment(
    @Body(ValidationPipe) createCommentDto: createCommentDto,
  ): Promise<any> {
    try {
      return this.commentService.createComment(createCommentDto);
    } catch (error) {
      return error;
    }
  }

  /**
   * This Route Will BE Use For update Comment
   */
  @Patch(constants.UPDATE_COMMENTS)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'Comment Updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Update Existing Comment From Here' })
  updateComment(
    @Param('id') id: string,
    @Body() UpdateComment: Partial<updateCommentDto>,
  ) {
    return this.commentService.updateComment(id, UpdateComment);
  }

  /**
   * This Router Will Be Use For Delete Comment
   */
  @Delete(constants.DELETE_COMMENTS)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ApiResponseDto })
  @ApiResponse({ status: 200, description: 'Comment Deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'internal server error' })
  @ApiOperation({ summary: 'Delete Comment From Here' })
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
