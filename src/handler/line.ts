import type { Client, MessageAPIResponseBase, WebhookEvent } from '@line/bot-sdk';
import { inject, singleton } from 'tsyringe';
import { ContainerType } from '../types';
import { response } from '../types/response';

@singleton()
export class LineHandler {
  constructor(@inject(ContainerType.LINE_CLIENT) private readonly lineClient: Client) {}

  public async handleTextEvent(webhookEvent: WebhookEvent): Promise<MessageAPIResponseBase | undefined> {
    if (webhookEvent.type !== 'message' || webhookEvent.message.type !== 'text') {
      return;
    }
    if (webhookEvent.message.text !== 'report') {
      return;
    }
    return await this.lineClient.replyMessage(webhookEvent.replyToken, response);
  }
}
