import type { Client, MessageAPIResponseBase, WebhookEvent } from '@line/bot-sdk';
import { inject, singleton } from 'tsyringe';
import { ContainerType } from '../types';
import { response } from '../types';
import type { Logger } from 'winston';

@singleton()
export class LineHandler {
  constructor(
    @inject(ContainerType.LINE_CLIENT) private readonly lineClient: Client,
    @inject(ContainerType.LOGGER) private readonly logger: Logger,
  ) {}

  public async handleTextEvent(webhookEvent: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
    if (webhookEvent.type !== 'message' || webhookEvent.message.type !== 'text') {
      this.logger.warn('Not TextMessageEvent.');
      return;
    }
    if (webhookEvent.message.text !== 'report') {
      this.logger.warn('Message does not match the response keyword.');
      return;
    }
    this.logger.info('Handling incoming text message.');
    return await this.lineClient.replyMessage(webhookEvent.replyToken, response);
  }
}
