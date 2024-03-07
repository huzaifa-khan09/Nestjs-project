import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AuthClass } from 'src/auth/Schema/auth.schema';
import { PostClass } from 'src/post/Schema/post.Schema';

@Schema({timestamps: true})
export class CommentClass extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: PostClass;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  // user: AuthClass;

  @Prop({ required: true })
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: AuthClass;
}

export const commentScheam = SchemaFactory.createForClass(CommentClass);
