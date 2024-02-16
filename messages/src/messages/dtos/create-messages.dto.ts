import { IsString } from 'class-validator';

//transformer를 통해 JSON형태의 데이터를 클래스의 형태로 데이터가 반환됨
//데코레이터를 통한 인증절차를 거침
//에러가 발생시 응답 전달
export class CreateMessageDto {
    @IsString() //문자열인지 검증해주는 데코레이터
    content: string;
}