// import { Controller, Inject } from '@nestjs/common';
// import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
// import { AuthController } from 'src/auth/auth.controller';
// import { CommentController } from 'src/comment/comment.controller';
// import { PostController } from 'src/post/post.controller';

// @Controller('gateway')
// export class GatewayController {
//     constructor(
//         @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
//         @Inject('Post_SERVICE') private readonly postService: ClientProxy
//     ){}
//     @MessagePattern({ cmd: 'login' })
//     login(@Payload() data: any): string {
//       // Forward login request to Auth Microservice using TCP
//       const authService = this.authService.getService<AuthController>('AUTH_SERVICE');
//       return authService.login(data);
//     }
  
//     @MessagePattern({ cmd: 'getPosts' })
//     getPosts(@Payload() data: any): string {
//       // Forward getPosts request to Post Microservice using TCP
//       const postService = this.client.getService<PostController>('POST_SERVICE');
//       return postService.getPosts(data);
//     }
  
//     @MessagePattern({ cmd: 'addComment' })
//     addComment(@Payload() data: any): string {
//       // Forward addComment request to Comment Microservice using TCP
//       const commentService = this.client.getService<CommentController>('COMMENT_SERVICE');
//       return commentService.addComment(data);
//     }
// }
