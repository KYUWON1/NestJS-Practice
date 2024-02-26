import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { UsersService } from "../users.service"; 
import { User } from '../user.entity';


//기존인터페이스에 속성을 업데이트 또는 추가 
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private usersService: UsersService,
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if(userId) {
            const user = await this.usersService.findOne(userId);
            // 해당부분 오류 삭제위해 declare
            req.currentUser = user;
        }

        next();
    }
}