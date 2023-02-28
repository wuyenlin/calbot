import Router from 'koa-router';
import { inject, singleton } from 'tsyringe';
import { GoogleHandler, LineHandler } from '../../handler';
import { ContainerType, State } from '../../types';
import type { Logger } from 'winston';
import type { WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';

@singleton()
export default class MessageRouter {
  constructor(
    private readonly router: Router<State>,
    private readonly lineHandler: LineHandler,
    @inject(ContainerType.LOGGER) private readonly logger: Logger,
    private readonly googleHandler: GoogleHandler,
  ) {}

  public initialize() {
    this.router.get('/api/v1', async (context, next) => {
      context.body = 'message router';
      this.logger.info('Message router');
      await next();
    });

    this.router.post('/api/v1/webhook', async (context, next) => {
      this.logger.info('Message router webhook');
      // TODO: use a validator instead
      const rawBody: WebhookRequestBody = JSON.parse(context.request.rawBody) as WebhookRequestBody;
      const events: WebhookEvent[] = rawBody.events;

      for (const event of events) {
        try {
          const replyToken = this.lineHandler.handleTextEvent(event);
          if (!replyToken) {
            this.logger.error('Error fetching reply token from webhook event.');
            return;
          }
          const calendarEvents = await this.googleHandler.listEvents();
          if (!calendarEvents) {
            this.logger.error('Error fetching Google Calendar events.');
            return;
          }
          await this.lineHandler.messageCalendarEntries(replyToken, calendarEvents);
        } catch (e) {
          context.status = 500;
          this.logger.error('Something went wrong.');
        }
      }
      await next();
    });
  }
}
