import { CanActivate, ExecutionContext} from "@nestjs/common";

//Nest의 동작순서는 미들웨어 > 가드 > 인터셉터순으로 동작하기때문에
//현재 currentUser 인터셉터가 동작 전이라 오류가 발생함 미들웨어로 변경해주어야함
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if(!request.currentUser) {
            return false;
        }
        //권환확인
        return request.currentUser.admin;
    }
}