import { Injectable,NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable() 
export class UsersService {
    //의존성주입을 통해 repo와 연동
    //repo에 존재하는 API : create,save,find,findOne,remove.. 다른것도 있음 문서참조
    constructor(@InjectRepository(User) private repo: Repository<User>){
    }

    create(email:string, password:string) {
        //엔티티 instance를 생성
        //instance를생성하고 데이터베이스에 저장해야 오류가 덜 발생하고, hooks 사용가능함
        const user = this.repo.create({email, password});
        //save메소드를 통해 데이터베이스에 저장함 
        return this.repo.save(user);
    }

    findOne(id: number){
        if(!id){
            throw new NotFoundException('사용자 없음');
        }
        return this.repo.findOneBy({id});
    }

    find(email:string){
        //배열로 리턴
        return this.repo.find({where:{email}});
    }

    //Partial은 User클래스의 일부, 아무것도 없는 객체가 될수있다고알려줌
    async update(id:number, attrs:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            //throw new Error('유저없음'); Nest에선 해당 형태의 에러 받지못함
            throw new NotFoundException('발견못함');
        }
        Object.assign(user,attrs); //attrs에서 모든 값을 가져와 user에 복사하는 메소드
        return this.repo.save(user);
    }

    async remove(id:number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('발견못함');
        } 
        //엔티티를 통한 remove 후크 동작함
        return this.repo.remove(user);
    }
}
