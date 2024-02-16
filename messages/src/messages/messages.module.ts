import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
//module의 추가해주어야함
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repo';

//provider로 명시해줌
@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
