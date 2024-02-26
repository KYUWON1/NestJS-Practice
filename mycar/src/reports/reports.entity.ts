import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'; //typeorm으로 부터 필요한 데코 import
import { User } from '../users/user.entity';

//데이터베이스설정 1단계 entity 설정하기
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
