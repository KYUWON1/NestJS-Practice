import { Module,MiddlewareConsumer } from '@nestjs/common';
//import { APP_INTERCEPTOR } from '@nestjs/core'; //인터셉터를 전역에서 사용하기 위해 사용함
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './user.entity'; //엔티티 import
//import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'; //User 인터셉터
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([User])], // 리포지토리 자동으로 생성됨
  providers: [
    UsersService,
    AuthService,
    // { //인터셉터를 전역으로 설정해줌, usermodule에 정의된 컨트롤러는 다 사용가능
    //   //but 필요없는 컨트롤러는 시간낭비임
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
  controllers: [UsersController],
})
//쿠키세션 다음에 적용될것임
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
