import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  //경로로 들어오는 모든 요청에 대해 Pipe 가 검증함 
  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(3000);
}
bootstrap();
