//전역 beforeEach 코드를 작성해 test.db가 테스트마다 삭제되고 재생성되도록 설정

import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async() => {
    try{
        await rm(join(__dirname,'..','test.sqlite'));
    }catch(err){

    }
});