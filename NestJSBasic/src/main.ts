//import {Controller , Module, Get} from '@nestjs/common'; //Nest에서 컨트롤러와 모듈 import
import { NestFactory } from '@nestjs/core'; //core에서 NestFactory 호출
import {AppModule} from './app.module'; //모듈 import



//app을 생성하고, Nest를 통해 객체를 생성한뒤 응답대기받음
async function bootstrap(){
    const app = await NestFactory.create(AppModule);

    await app.listen(3000);
}

bootstrap();