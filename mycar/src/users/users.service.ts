import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './user.entity';

@Injectable()
export class UsersService {
    //의존성주입을 통해 repo와 연동
    constructor(@InjectRepository(User) private repo: Repository<User>){
    }

    create(email:string, password:string) {
        //엔티티 instance를 생성
        const user = this.repo.create({email, password});
        //save메소드를 통해 데이터베이스에 저장함 
        return this.repo.save(user);
    }
}
