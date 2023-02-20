import Router from 'koa-router';
import { singleton } from 'tsyringe';
import { LineHandler } from '../../handler';
import type { State } from '../../types';

@singleton()
export default class MessageRouter {
  constructor(private readonly router: Router<State>, private readonly lineHandler: LineHandler) {}

  public initialize() {
    this.router.get('/api/v1', async (context, next) => {
      context.body = 'message router';
      await next();
    });

    this.router.post('/api/v1/webhook', async (context, next) => {
      context.body = 'message router webhook';
      const events = context.state.events;
      console.log(events);

      for (const event of events) {
        try {
          await this.lineHandler.handleTextEvent(event);
        } catch (e) {
          //TODO: revisit
          context.status = 500;
        }
      }
      await next();
    });
  }
}
