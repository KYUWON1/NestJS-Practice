import { Body, Controller,Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth') // /auth/...
export class UsersController {
  //의존성 주입을 통해 컨트롤러와 서비스 연결
  constructor(private userService:UsersService){}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    //console.log(body);
    this.userService.create(body.email, body.password);
  }
}
