import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentClass, commentScheam } from './Schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CommentClass.name,
        schema: commentScheam,
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
