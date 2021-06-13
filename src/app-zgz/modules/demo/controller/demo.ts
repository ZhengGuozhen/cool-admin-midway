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
@Controller('/admin')
export class HomeController {
  @Get('/test1')
  async get1(@Query('id') id: number) {
    return id;
  }

  @Get('/test2')
  @Validate()
  async get2(@Query(ALL) p: demoDTO) {
    const sql = `
    SELECT 
      *
    FROM demo_app_goods
    WHERE id < ?
    LIMIT 10;
    `;
    const r = await DB.query(sql, [100]);
    return r;
  }

  @Post('/test')
  @Validate()
  async post(@Body(ALL) p: demoDTO) {
    return p;
  }
}
