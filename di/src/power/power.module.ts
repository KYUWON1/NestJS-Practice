import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService], //다른 모듈도 해당 클래스 사용할수있도록해줌
})
export class PowerModule {}
