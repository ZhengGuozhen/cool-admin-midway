/* eslint-disable @typescript-eslint/ban-types */
import {
  ALL,
  Body,
  Controller,
  Get,
  Post,
  Provide,
  Query,
  Validate,
} from '@midwayjs/decorator';
import { demoDTO } from '../dto/demo';
import { DB } from '../../../comm/db';

@Provide()
@Controller('/api')
export class DemoController {
  /*
   * 参考故障码
   * SUCCESS = 1000,
   * COMMFAIL = 1001,
   * VALIDATEFAIL = 1002,
   * COREFAIL = 1003
   */
  ok(data?: any) {
    return {
      code: 1000,
      data,
      message: 'success',
    };
  }
  fail(code: number, message: string) {
    return {
      code,
      message,
    };
  }

  @Get('/test/1')
  async get1(@Query(ALL) p: object) {
    return this.ok(p);
  }

  @Get('/test/open/1')
  @Get('/open/test/1')
  @Get('/test/1/open/')
  async get1_(@Query(ALL) p: object) {
    return this.ok(p);
  }

  @Get('/test/2')
  async get2(@Query('id') id: number) {
    return this.ok(id);
  }

  @Get('/test/3')
  @Validate()
  async get3(@Query(ALL) p: demoDTO) {
    const sql = `
    SELECT 
      *
    FROM demo_app_goods
    WHERE id < ?
    LIMIT 10;
    `;
    const r = await DB.query(sql, [100]);
    return this.ok(r);
  }

  @Post('/test/4')
  @Validate()
  async test4(@Body(ALL) p: demoDTO) {
    return this.ok(p);
  }
}