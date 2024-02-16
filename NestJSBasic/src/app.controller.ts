import { Controller, Get } from "@nestjs/common"; //Nest에서 컨트롤러와 모듈 import

@Controller('/app') //Controller class라고 알려줌, 인자값은 가장 상위의 라우팅 주소 /app
export class AppController {
  @Get('/asdf') // HTTP 메소드중 GET을 시행할 함수 데코레이터, 인자는 Get요청을 받을 주소 /app/asdf
  getRootRoute() {
    return "hi there";
  }
  @Get('/bye')
  getByeThere(){
    return "Bye There";
  }
}
