import type { Message } from '@line/bot-sdk';

export const response: Message[] = [
  {
    type: 'text',
    text: 'Hello, family',
  },
  {
    type: 'text',
    text: 'May I help you?',
  },
];
