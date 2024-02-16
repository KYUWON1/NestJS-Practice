import { Controller,Get,Post ,Body,Param,NotFoundException} from '@nestjs/common';
//Nest내부에 다양한 예외처리 클래스들이 존재함
//Body와 Param은 인수 데코레이터라고 부름
import {CreateMessageDto} from './dtos/create-messages.dto';
//서비스 임포트
import {MessagesService} from './messages.service';

//컨트롤러는 소비만하기 때문에 DI에 등록할필요없음
@Controller('/messages') //경로명 /message 로 설정
export class MessagesController {
  //better한 방식
  constructor(public messagesService: MessagesService) {
    //실제앱에선 이렇게하지않음 , 의존성주입을 사용함
    //this.messagesService = new MessagesService();
  }

  @Get() // /messages
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post() // /messages
  createMessage(@Body() body: CreateMessageDto) {
    //body의 타입을 Dto로 변경, String의 데이터형태만 받음
    return this.messagesService.create(body.content); //content가 있기때문에 content로 설정
  }

  @Get('/:id') // /messages/id
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found'); //nest내부에 포함된 에러핸들러 import해야함
    }
    return message;
  }
}   
