import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //세선 설정 >> module에서 전역설정으로 변경 test를 위해 
  // app.use(
  //   cookieSession({
  //     keys: ['qwer1234'], //암호화부분
  //   }),
  // );

  // 유효성검사설정  >> module에서 전역설정으로 변경
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, //dto에 설정하지않은 데이터에 대한것은 무시하고 저장되도록 설정해줌,약간의 보안장치
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
