import {Injectable} from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises'; //node의 표준라이브러리에서 임포트

@Injectable() //DI에 주입
export class MessagesRepository {
    async findOne(id:string) {
        const contents = await readFile('messages.json','utf8'); 
        const messages = JSON.parse(contents);

        return messages[id];
    }

    async findAll() {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        return messages;
    }

    async create(content:string) {
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);

        const id = Math.floor(Math.random() * 999); //0~999의 랜덤 정수 획득

        messages[id] = { id, content};  

        await writeFile('messages.json',JSON.stringify(messages));
    }
}