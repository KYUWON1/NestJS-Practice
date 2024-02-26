//해당 인터셉터가 가장 우선적으로 실행되고, request로부터 사용자 정보를 받아와서 저장해놓음
import { 
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
 } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    //currentUser 데코레이터에선, 서비스 의존성주입이 불가능해서 인터셉터에서 수행함
    constructor(private userService:UsersService){};
    
    //context는 마찬가지로 request rapper, handler는 라우트핸들러
    async intercept(context: ExecutionContext, handler: CallHandler){
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {}; //request의 세션에서 userId 확인
        if(userId){
            const user = await this.userService.findOne(userId); //세션에 정보가 있다면
            request.currentUser = user; //데코레이터에 값 저장
        }

        return handler.handle()
    }
}