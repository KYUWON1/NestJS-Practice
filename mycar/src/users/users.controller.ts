import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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

  @Get('/:id') //주소에서받는 숫자는 string으로 됨
  async findUser(@Param('id') id:string ){
    const user = await this.userService.findOne(parseInt(id)); // int로 전환해서 전달 
    if(!user){
      throw new NotFoundException('유저 발견 못함');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email:string){ // /auth?email= ~~~ 주소로 전달
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body:UpdateUserDto){
    return this.userService.update(parseInt(id),body); //Dto와 Id를 전달 body는 id pass ,id, pass 존재
  }

  @Delete(':id')
  removeUser(@Param('id') id:string){
    return this.userService.remove(parseInt(id));
  }




}
