import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity'; //엔티티 import


@Module({
  imports: [TypeOrmModule.forFeature([User])], // 리포지토리 자동으로 생성됨
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
