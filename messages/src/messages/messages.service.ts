import {Injectable} from '@nestjs/common';
import { MessagesRepository } from "./messages.repo";


@Injectable() // class를 DI컨테이너에 등록하기위한 데코레이터
export class MessagesService {
    //better한 방식
    //인수가 자동으로 클래스에 할당됨 굳이초기화해주지않아도됨
    constructor(public messagesRepo:MessagesRepository){ 
        //생성자에서 Repo를 초기화, Repo에 대한 의존성생성
        //실제 Nest에선 이렇게하지않음
        //this.messagesRepo = new MessagesRepository();
    }

    findOne(id:string){
        return this.messagesRepo.findOne(id);
    }

    findAll(){
        return this.messagesRepo.findAll();
    }

    create(content:string){
        return this.messagesRepo.create(content);
    }
}