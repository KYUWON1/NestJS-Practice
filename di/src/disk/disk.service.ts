import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    console.log('20파워가져옴');
    this.powerService.supplyPower(30);
    return 'Data!';
  }
}
