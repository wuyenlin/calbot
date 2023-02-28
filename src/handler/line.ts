import type { Client, MessageAPIResponseBase, WebhookEvent } from '@line/bot-sdk';
import { inject, singleton } from 'tsyringe';
import { ContainerType } from '../types';
import type { Logger } from 'winston';
import { makeMessageFromCalendarEvents } from './make-message';
import type { calendar_v3 } from 'googleapis';

@singleton()
export class LineHandler {
  constructor(
    @inject(ContainerType.LINE_CLIENT) private readonly lineClient: Client,
    @inject(ContainerType.LOGGER) private readonly logger: Logger,
  ) {}

  public handleTextEvent(webhookEvent: WebhookEvent): string | undefined {
    if (webhookEvent.type !== 'message' || webhookEvent.message.type !== 'text') {
      this.logger.warn('Not TextMessageEvent.');
      return;
    }
    if (webhookEvent.message.text !== 'report') {
      this.logger.warn('Message does not match the response keyword.');
      return;
    }
    this.logger.info('Handling incoming text message.');
    return webhookEvent.replyToken;
  }

  public async messageCalendarEntries(
    replyToken: string,
    calendarEvents: calendar_v3.Schema$Event[],
  ): Promise<MessageAPIResponseBase> {
    return await this.lineClient.replyMessage(replyToken, makeMessageFromCalendarEvents(calendarEvents));
  }
}
