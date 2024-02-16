import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; //typeorm으로 부터 필요한 데코 import

//데이터베이스설정 1단계 entity 설정하기
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
