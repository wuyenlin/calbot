import { inject, singleton } from 'tsyringe';
import { ContainerType } from '../types';
import type { Logger } from 'winston';
import { calendar_v3 } from 'googleapis';
import type { JWT } from 'google-auth-library';
import { environmentVariables } from '../config/environment-variables';

const TIME_ZONE = 'Asia/Taipei';
const TIME_MIN = new Date(new Date().setHours(24, 0, 0, 0)).toISOString();
const TIME_MAX = new Date(new Date().setHours(48, 0, 0, 0)).toISOString();

@singleton()
export class GoogleHandler {
  constructor(
    @inject(ContainerType.GOOGLE_CALENDAR) private readonly calendar: calendar_v3.Calendar,
    @inject(ContainerType.LOGGER) private readonly logger: Logger,
    @inject(ContainerType.GOOGLE_JWT) private readonly googleJwt: JWT,
  ) {}

  public async listEvents(): Promise<calendar_v3.Schema$Event[] | undefined> {
    try {
      this.logger.info('Now listing calendar.');
      const response = await this.calendar.events.list({
        auth: this.googleJwt,
        calendarId: environmentVariables.GOOGLE_CALENDAR_ID,
        timeMin: TIME_MIN,
        timeMax: TIME_MAX,
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: TIME_ZONE,
      });
      return response.data.items;
    } catch (error) {
      this.logger.error(error);
      return;
    }
  }
}
