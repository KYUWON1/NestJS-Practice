import { Module} from "@nestjs/common"; //Nest에서 컨트롤러와 모듈 import
import {AppController} from "./app.controller"; //controller import

@Module({
  controllers: [AppController], //컨트롤러들을 나열함
})
export class AppModule {}
