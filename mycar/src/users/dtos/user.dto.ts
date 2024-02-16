import { Expose } from 'class-transformer'; //Exclude와 달리 Expose는 해당 속성을 공유하는 데코


export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

}