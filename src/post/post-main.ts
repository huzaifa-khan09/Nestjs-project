import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PostModule } from './post.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PostModule, {
    transport: Transport.TCP,
    options: { port: 3002 },
  });
  await app.listen();
}
bootstrap();