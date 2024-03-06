import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostClass, PostSchema } from './Schema/post.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PostClass.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
