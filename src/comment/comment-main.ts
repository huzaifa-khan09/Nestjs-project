import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CommentModule } from './comment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CommentModule, {
    transport: Transport.TCP,
    options: { port: 3003 },
  });
  await app.listen();
}
bootstrap();