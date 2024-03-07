import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentClass } from './Schema/comment.schema';
import { Model } from 'mongoose';
import { createCommentDto } from './Dto/commentDto/comment.dto';
import { updateCommentDto } from './Dto/updateCommentDto/update.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentClass.name)
    private readonly commentModel: Model<CommentClass & Document>,
  ) {}

  /**
   * Get all comments
   */
  async getAllComment(): Promise<CommentClass[]> {
    return this.commentModel.find();
  }

  /**
   * @param createCommentDto
   */
  async createComment(
    createCommentDto: createCommentDto,
  ): Promise<CommentClass> {
    return await this.commentModel.create(createCommentDto);
  }

  /**
   * Delete Existing Comment
   */
  async deleteComment(id: string): Promise<CommentClass> {
    return this.commentModel.findByIdAndDelete(id);
  }

  /**
   * Update Existing Comment
   */
  async updateComment(
    id: string,
    updateComment: Partial<updateCommentDto>,
  ): Promise<CommentClass> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(id, updateComment, { new: true })
      .exec();
    if (!updatedComment) {
      throw new NotFoundException('Comment with this id is unavailable');
    } else {
      return updatedComment;
    }
  }
}
