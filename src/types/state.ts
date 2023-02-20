import type { WebhookEvent } from '@line/bot-sdk';

export interface State {
  events: WebhookEvent[];
}
