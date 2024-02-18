import { 
    createParamDecorator,
    ExecutionContext,
 } from '@nestjs/common';

 //사용자 커스텀 Param데코레이터
 export const CurrentUser = createParamDecorator(
    //data에는 데코레이터에 넘겨진 ('인자값') 을 받음
    //context는 들어온 request를 받은 rapper
    //never는 인자값을 받지 않겟다는 설정
    (data: never, context: ExecutionContext) => {
        //요청에 접근할수있게해줌 
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }, 
 );