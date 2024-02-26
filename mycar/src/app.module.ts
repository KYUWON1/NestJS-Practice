import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'; // 전역 미들웨어 설정
import { APP_PIPE } from '@nestjs/core'; //전역파이프 설정
import { ConfigModule,ConfigService } from '@nestjs/config';  // env를 위해 임포트
import { TypeOrmModule } from '@nestjs/typeorm'; //typeorm 임포트
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity'; // 엔티티 임포트
import { Report } from './reports/reports.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    //Env 파일 사용 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:`.env.${process.env.NODE_ENV}`,
    }),
    //의존성 주입을  통해, env파일에 접근설정
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'), // 경로로 설정한 .env파일에서 가져옴 
          synchronize: true,
          entities: [User,Report],
        }
      }
    }),
    //타입orm모듈을 모든곳에 연결해주는 부분, db의 종류, 저장소이름, 추가할 entity..등등
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   //환경변수를 통해 test용 DB와 Dev용 DB 분리하기 
    //   database: 'db.sqlite',
    //   entities: [User, Report], //app모듈에 마지막으로 엔티티 추가
    //   synchronize: true, //개발환경전용, 자동으로 DB구조 변경해줌, 원래는 Migration 파일을 작성해야함
    // }),

    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //전역 파이프 설정
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //dto에 설정하지않은 데이터에 대한것은 무시하고 저장되도록 설정해줌,약간의 보안장치
      }),
    },
  ],
})
export class AppModule {
  //해당 부분에서 들어오는 traffic을 처리할때 자동으로 호출됨
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['qwer1234'], //암호화부분
        }),
      )
      .forRoutes('*'); // * 을 통해 모든 라우트에 대해 처리한다고 설정
  }
}
