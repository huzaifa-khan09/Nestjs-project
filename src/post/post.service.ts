import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostClass } from './Schema/post.Schema';
import { Model } from 'mongoose';
import { createPostDto } from './Dto/createPostDto/CreatePostDto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostClass.name)
    private readonly postModel: Model<PostClass & Document>,
  ) {}

  async findAll(): Promise<PostClass[]> {
    return this.postModel.aggregate([
      {
        $lookup: {
          from: 'commentclasses',
          localField: '_id',
          foreignField: 'post',
          as: 'comments',
        },
      },
    ]);
  }


  /**
   * Create A New Post
   */
  async createPost(createPostDto: createPostDto): Promise<PostClass> {
    return await this.postModel.create(createPostDto);
  }

  /**
   * Delete A Existing Post
   */
  async deletePost(id): Promise<PostClass> {
    return await this.postModel.findByIdAndDelete(id).exec();
  }

  /**
   * Update The Existing Post
   */
  async updatePost(
    id: string,
    updatePost: Partial<createPostDto>,
  ): Promise<PostClass> {
    const post = await this.postModel
      .findByIdAndUpdate(id, updatePost, { new: true })
      .exec();
    if (!post) {
      throw new NotFoundException(`Post with this ${id} not found `);
    } else {
      return post;
    }
  }
}
