import type { calendar_v3 } from 'googleapis';
import type { Message } from '@line/bot-sdk';

export function makeMessageFromCalendarEvents(events: calendar_v3.Schema$Events[]): Message {
  events.map((event: calendar_v3.Schema$Events) => {});
  return {
    type: 'text',
    text: 'May I help you?',
  };
}
