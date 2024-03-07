import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { PostClass } from 'src/post/Schema/post.Schema';

@Schema()
export class AuthClass extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  posts: PostClass[];

  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  //   posts: string[];
}

export const AuthScheam = SchemaFactory.createForClass(AuthClass);
