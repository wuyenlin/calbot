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
    this.router.post('/api/v1/webhook', async (context, next) => {
      // TODO: use a validator instead
      const rawBody: WebhookRequestBody = JSON.parse(context.request.rawBody) as WebhookRequestBody;
      const events: WebhookEvent[] = rawBody.events;

      for (const event of events) {
        try {
          const replyToken = this.lineHandler.getReplyTokenFromEvent(event);
          if (!replyToken) {
            return;
          }
          const calendarEvents = await this.googleHandler.listEvents();
          if (!calendarEvents) {
            this.logger.error('Error fetching Google Calendar events.');
            return;
          }
          await this.lineHandler.sendCalendarEntries(replyToken, calendarEvents);
        } catch (e) {
          context.status = 500;
          this.logger.error('Something went wrong.');
        }
      }
      await next();
    });
  }
}
