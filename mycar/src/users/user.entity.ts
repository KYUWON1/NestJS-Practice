import { AfterInsert,AfterRemove,AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; //typeorm으로 부터 필요한 데코 import

//데이터베이스설정 1단계 entity 설정하기
@Entity() // User라는 테이블 찾거나 만들기 
export class User {
  @PrimaryGeneratedColumn() //자동으로생성되는 컬럼 중복 x 
  id: number;

  @Column()  //테이블의 컬럼  이름과 데이터 타입
  email: string;

  @Column()
  password: string;

  //사용자 알림 데코레이터들
  @AfterInsert() //아이디 생성시
  logInsert(){
    console.log('새 ID 추가',this.id);
  }

  @AfterUpdate() //업데이트시
  logUpdate(){
    console.log('ID 업데이트',this.id);
  }

  @AfterRemove() //제거시 
  logRemove(){
    console.log('Id 제거',this.id);
  }
  //
}
