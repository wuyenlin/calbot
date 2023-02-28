import { container } from 'tsyringe';
import Koa from 'koa';
import { logger } from '../logger';
import Router from 'koa-router';
import { ContainerType, State, Credentials } from '../types';
import type { Logger } from 'winston';
import { Client, ClientConfig } from '@line/bot-sdk';
import { environmentVariables } from './environment-variables';
import { calendar_v3, google } from 'googleapis';
import type { JWT } from 'google-auth-library';
import { readFileSync } from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

const koa = new Koa();
const router = new Router<State>();
const lineClientConfig: ClientConfig = {
  channelAccessToken: environmentVariables.LINE_ACCESS_TOKEN,
  channelSecret: environmentVariables.LINE_CHANNEL_SECRET,
};
const lineClient = new Client(lineClientConfig);
const googleCalendar = google.calendar({ version: 'v3' });

const rawData = readFileSync('./credentials.json', 'utf-8');
const credentials: Credentials = JSON.parse(rawData);
const jwt: JWT = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, SCOPES);

container.registerInstance<Koa>(Koa, koa);
container.registerInstance<Router>(Router, router);
container.register<Logger>(ContainerType.LOGGER, { useValue: logger });
container.register<Client>(ContainerType.LINE_CLIENT, { useValue: lineClient });
container.register<calendar_v3.Calendar>(ContainerType.GOOGLE_CALENDAR, { useValue: googleCalendar });
container.register<JWT>(ContainerType.GOOGLE_JWT, { useValue: jwt });

export { container as default } from 'tsyringe';
