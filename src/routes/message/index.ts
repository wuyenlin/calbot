import Router from 'koa-router';
import { singleton } from 'tsyringe';

@singleton()
export default class MessageRouter {
  constructor(private readonly router: Router) {}

  public initialize() {
    this.router.get('/api/v1', async (context, next) => {
      context.body = 'message router';
      await next();
    });

    this.router.post('/api/v1/webhook', async (context, next) => {
      //TODO: make request headers config
      // https://developers.line.biz/en/docs/messaging-api/nodejs-sample/#routing-config
      context.body = 'message router webhook';
      await next();
    });
  }
}
