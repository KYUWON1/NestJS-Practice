import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  //의존성주입으로 repo생성
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  //쿼리빌더 생성
  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)','price')
      .where('make =:make', { make }) // :make에 dto의 쿼리문make값이 들어감,SQL인젝션 방지를위해 : 사용
      .andWhere('model = :model', { model }) //where와 중복되는 andWhere
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC') //orderBy는 파라메터값을 받지않음 
      .setParameters({ mileage }) // 따로 설정해주어야함
      .limit(3)
      .getRawOne();
  }

  create(reportDto: CreateReportDto, user: User) {
    //데이터를 받아 객체 생성후 DB에 저장
    const report = this.repo.create(reportDto);
    report.user = user; // User와 관계형 DB 생성
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
