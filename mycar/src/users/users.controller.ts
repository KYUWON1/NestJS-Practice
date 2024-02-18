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
  Session, // 쿠키를 위한 세션  
  UseGuards, //가드를 사용을 위해 임포트
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
//import { SerializeInterceptor } from '../interceptors/serialize.interceptor'; 커스텀 데코만 임포트
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard'; //가드 임포트 


@Controller('auth') // /auth/...
@Serialize(UserDto) // 모든 요청에 대해 거쳐감, Dto만 변경해주면됨
export class UsersController {
  //의존성 주입을 통해 컨트롤러와 서비스 연결
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session:any){
  //   return this.userService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard) // /whoami 경로에서 AuthGuard사용
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null; // 세션 초기화 로그아웃시
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    //console.log(body);
    //사용자 인증 및 계정 생성
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  //@UseInterceptors(ClassSerializerInterceptor) // password 가로채감
  //@UseInterceptors(new SerializeInterceptor(UserDto)) //커스텀 인터셉터로 변경
  //@Serialize(UserDto) // 커스텀 데코로 더 줄임
  @Get('/:id') //주소에서받는 숫자는 string으로 됨
  async findUser(@Param('id') id: string) {
    //컨트롤러 핸들러
    const user = await this.userService.findOne(parseInt(id)); // int로 전환해서 전달
    if (!user) {
      throw new NotFoundException('유저 발견 못함');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    // /auth?email= ~~~ 주소로 전달
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body); //Dto와 Id를 전달 body는 id pass ,id, pass 존재
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
