import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { gatewayModule } from './gateway/gatewayModule';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://huzaifakhan:khanlog33039969@cluster0.hrwrpys.mongodb.net/authen',
    ),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
      },
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
      },
      {
        name: 'COMMENT_SERVICE',
        transport: Transport.TCP,
      },
    ]),
    AuthModule,
    PostModule,
    CommentModule,
    gatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
