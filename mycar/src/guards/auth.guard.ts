import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common';

//가드 설정 cacActivate 함수 만들어야 사용가능, userId가 존재하면 true아니면 false반환
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}