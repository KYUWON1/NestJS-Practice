import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; //typeorm 임포트
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity'; // 엔티티 임포트
import { Report } from './reports/reports.entity';

@Module({
  imports: [
    //타입orm모듈을 모든곳에 연결해주는 부분, db의 종류, 저장소이름, 추가할 entity..등등
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report], //app모듈에 마지막으로 엔티티 추가
      synchronize: true, //개발환경전용, 자동으로 DB구조 변경해줌, 원래는 Migration 파일을 작성해야함
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
