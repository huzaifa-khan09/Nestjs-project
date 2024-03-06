// post.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date } from 'mongoose';
import { Document } from 'mongoose';
import { AuthClass } from 'src/auth/Schema/auth.schema';
import { CommentClass } from 'src/comment/Schema/comment.schema';

@Schema()
export class PostClass extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CommentClass' })
  comments: CommentClass[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: AuthClass;

  createdAt: Date;
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostClass);
