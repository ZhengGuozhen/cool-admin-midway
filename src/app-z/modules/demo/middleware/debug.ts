import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

/**
 * 描述
 */
@Provide()
export class DebugMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      // 调试中间件

      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      await next();
      // 控制器之后执行的逻辑
      const timecost = Date.now() - startTime;

      console.group(ctx.request.method, ctx.url.split('?')[0]);
      console.log('url:      ', ctx.request.url);
      console.log('query:    ', ctx.request.query);
      console.log('body:     ', ctx.request.body);
      console.log('userId:   ', ctx.admin ? ctx.admin.userId : null);
      console.log('timeCost: ', timecost);
      console.groupEnd();
    };
  }
}
