import type { calendar_v3 } from 'googleapis';
import type { FlexBubble, FlexMessage } from '@line/bot-sdk';
import { environmentVariables } from '../../config/environment-variables';

export function makeMessageFromCalendarEvents(events: calendar_v3.Schema$Event[]): FlexMessage {
  return {
    type: 'flex',
    altText: 'Flex Message',
    contents: {
      type: 'carousel',
      contents: makeBubbles(events),
    },
  };
}

function makeBubbles(events: calendar_v3.Schema$Event[]): FlexBubble[] {
  const bubbles: FlexBubble[] = [];
  events.forEach((event: calendar_v3.Schema$Event) => {
    switch (event.creator?.email) {
      case environmentVariables.MEMBER_1_EMAIL: {
        bubbles.push(makeSingleFlexBubble('Dad', '#27ACB2', event.summary, event.start?.dateTime));
        break;
      }
      case environmentVariables.MEMBER_2_EMAIL: {
        bubbles.push(makeSingleFlexBubble('Mom', '#FF6B6E', event.summary, event.start?.dateTime));
        break;
      }
      case environmentVariables.MEMBER_3_EMAIL: {
        bubbles.push(makeSingleFlexBubble('Yen-Lin', '#99ccff', event.summary, event.start?.dateTime));
        break;
      }
    }
  });
  return bubbles;
}

function makeLocaleString(dateTime: string): string {
  const date = new Date(dateTime);
  return date.toLocaleString();
}

function makeSingleFlexBubble(
  role: string,
  color: string,
  eventName?: string | null,
  time?: string | null,
): FlexBubble {
  return {
    type: 'bubble',
    size: 'nano',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: role,
          color: '#ffffff',
          align: 'start',
          size: 'md',
          gravity: 'center',
        },
      ],
      backgroundColor: color,
      paddingTop: '19px',
      paddingAll: '12px',
      paddingBottom: '16px',
    },
    hero: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: time ? makeLocaleString(time) : '',
          size: 'sm',
          color: '#000066',
          wrap: true,
        },
      ],
      spacing: 'md',
      paddingAll: '12px',
      backgroundColor: '#fff4cc',
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'text',
              text: eventName ?? '',
              color: '#8C8C8C',
              size: 'sm',
              wrap: true,
            },
          ],
          flex: 1,
        },
      ],
      spacing: 'md',
      paddingAll: '12px',
    },
    styles: {
      footer: {
        separator: false,
      },
    },
  };
}
