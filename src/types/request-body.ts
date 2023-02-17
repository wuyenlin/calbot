import type { Message } from '@line/bot-sdk';

export type requestBody = {
  replyToken: string;
  messages: Message[];
  notificationDisabled?: boolean;
};
