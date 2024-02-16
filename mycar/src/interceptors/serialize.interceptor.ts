//인터셉터 커스텀하기
import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
//import { UserDto } from '../users/dtos/user.dto'; // 변환할 UserDto가져옴

//모든 클래스의 타입을 받음 
interface ClassConstructor {
    new (...args: any[]) :{}
}

//커스텀 데코레이터
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

//Nest인터셉트의 메소드를 구체화
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //Request핸들러로 가기전에 요청이 처리되는 부분 -> 컨트롤러 핸들러에 도착

    return handler.handle().pipe(
      map((data: any) => {
        // data > UserEntity를 받음
        //컨트롤러핸들러 -> 응답이 보내지기 전에 실행되는 부분
        return plainToClass(this.dto, data, {
          //data엔티티가 UserDto로 변환
          excludeExtraneousValues: true, //엔티티의 expose나 exclude설정 true로 설정
        });
      }),
    );
  }
}