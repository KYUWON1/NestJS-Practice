import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import  { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto"; //비밀번호 해쉬용,scrypt는 비동기함수, callback 사용해야함
import { promisify } from "util"; //callback함수를 사용하는것을 promise로 반환해줌

const scrypt = promisify(_scrypt); //scrypt 생성

@Injectable()
export class AuthService { 
    //의존성 주입으로 userService 생성
    constructor(private usersService:UsersService){}

    async signup(email:string, password:string) {
        //기존 사용자 확인, 배열로 값 들어옴 
        const users = await this.usersService.find(email);
        if(users.length) {
            throw new BadRequestException('이미 가입된 이메일입니다.');
        }

        //비밀번호 해싱 단계
        const salt = randomBytes(8).toString('hex'); //랜덤함 16자리 문자열
        const hash = (await scrypt(password, salt, 32)) as Buffer; // 해시단계, ts가 타입알도록 Buffer선언
        const result = salt + '.' + hash.toString('hex');

        //시용자 생성
        const user = await this.usersService.create(email,result);

        return user;
    }

    //사용자 로그인
    async signin(email:string, password:string) {
        //사용자 찾기, 배열로 들어옴
        const [user] = await this.usersService.find(email);
        if(!user){
             throw new NotFoundException('유저 존재하지않음!');
        }
        //비밀번호 해쉬와 솔트 분리작업
        const[salt,storedHash] = user.password.split('.');
        const hash = (await scrypt(password,salt,32)) as Buffer;

        //사용자가 입력한 비밀번호와 해쉬한비밀번호가 같다면
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('잘못된 비밀번호');
        }

        return user;
    }
}