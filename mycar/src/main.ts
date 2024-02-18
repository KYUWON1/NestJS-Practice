import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); //Nest와 호환성 문제때문에 require사용

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //세선 설정
  app.use(
    cookieSession({
      keys: ['qwer1234'], //암호화부분
    }),
  );

  app.useGlobalPipes(
    // 유효성검사설정
    new ValidationPipe({
      whitelist: true, //dto에 설정하지않은 데이터에 대한것은 무시하고 저장되도록 설정해줌,약간의 보안장치
    }),
  );
  await app.listen(3000);
}
bootstrap();
