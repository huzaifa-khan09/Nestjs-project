// import { Module } from '@nestjs/common';
// import { GatewayController } from './gateway.controller';
// import { GatewayService } from './gateway.service';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthModule } from 'src/auth/auth.module';
// import { PostModule } from 'src/post/post.module';
// import { CommentModule } from 'src/comment/comment.module';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'AUTH_SERVICE',
//         transport: Transport.TCP,
//         options: { port: 3001 },
//       },
//       {
//         name: 'POST_SERVICE',
//         transport: Transport.TCP,
//         options: { port: 3002 },
//       },
//       {
//         name: 'COMMENT_SERVICE',
//         transport: Transport.TCP,
//         options: { port: 3003 },
//       },
//     ]),
//     AuthModule,
//     PostModule,
//     CommentModule,
//   ],
//   controllers: [GatewayController],
//   providers: [GatewayService],
// })
// export class GatewayModule {}
