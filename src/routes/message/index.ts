import Router from 'koa-router';
import { inject, singleton } from 'tsyringe';
import { LineHandler } from '../../handler';
import { ContainerType, State } from '../../types';
import type { Logger } from 'winston';
import type { WebhookEvent } from '@line/bot-sdk';

@singleton()
export default class MessageRouter {
  constructor(
    private readonly router: Router<State>,
    private readonly lineHandler: LineHandler,
    @inject(ContainerType.LOGGER) private readonly logger: Logger,
  ) {}

  public initialize() {
    this.router.get('/api/v1', async (context, next) => {
      context.body = 'message router';
      this.logger.info('Message router');
      await next();
    });

    this.router.post('/api/v1/webhook', async (context, next) => {
      context.body = 'message router webhook';
      this.logger.info('Message router webhook');
      const rawBody = JSON.parse(context.request.rawBody);

      for (const event of rawBody.events) {
        try {
          await this.lineHandler.handleTextEvent(event as unknown as WebhookEvent);
        } catch (e) {
          //TODO: revisit
          context.status = 500;
        }
      }
      await next();
    });
  }
}
