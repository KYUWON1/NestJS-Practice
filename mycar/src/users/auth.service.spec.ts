import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

//describe로 테스트의 종류 설명해줌
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    //user service의 카피본 생성, 가짜버전의 find와 create, UserService에서 함수를 실행하지만
    //실제로 수행되는건 fake의 함수가 실행됨
    fakeUsersService = {
      //2개의 function은 프로미스를 반환하기때문에, 해당 형태로 코드작성
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      }, //빈배열 반환

      //User 객체반환
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        //provider는 DI 컨테이너에 주입하려는 클래스의 리스트임
        AuthService, //AuthService DI에 주입
        {
          provide: UsersService, // 누군가 UserService를 사용하려고할때
          useValue: fakeUsersService, // 내가 만든 fake 객체를 사용하도록 설정
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('asf@asd.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('사용자가 이미 사용중인 이메일을 제출하면 에러 발생시킴', async () => {
    await service.signup('asdf@asdf.com','asdf');
    //Bad Exception을 발생시키면 테스트 성공
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('없는 이메일로 로그인시 에러 발생시킴', async () => {
    //fake의 빈 배열이 return되기 때문에 에러 발생함
    await expect(service.signin('asdf@asdf.com', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('비밀번호가 틀렸을시 에러 발생시킴', async () => {
    //비밀먼호가 다르기 때문에 오류발생
    await service.signup('test@test.com','password');
    await expect(service.signin('test@test.com', 'incorrectpass')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('비밀번호가 바르게 입력되었을시 테스트', async () => {
    await service.signup('asdf@asdf.com', 'mypassword'); //signup은 평소대로 동작함

    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
