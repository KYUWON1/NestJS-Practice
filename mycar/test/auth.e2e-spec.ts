import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

//main.ts에서 쿠키와 pipe를 설정하면 test에서 실행되지않음, Module에서 생성되고 실행되기때문에
//app Module에서 전역으로 설정함으로 해결가능
describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('signup 요청 handler', () => {
    const email = 'testtest2@test.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'test123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('새로운 유저로 가입하고, whoamI 실행',async() => {
    const email = 'asdf@asdf.com';

    const res = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email,password:'asdf'})
    .expect(201)

    const cookie = res.get('Set-Cookie'); //쿠키가 있는 위치의 헤더에서 쿠키가져옴
    const { body } = await request(app.getHttpServer())
    .get('/auth/whoami')
    .set('Cookie',cookie) //발신하는 요청 쿠키헤드 설정
    .expect(200)

    expect(body.email).toEqual(email);
  });
});
