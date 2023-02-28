import { Environment } from '../types/environment';
import 'dotenv/config';
import { EnvironmentBuilder } from '@hexlabs/env-vars-ts';

export const environmentVariables = EnvironmentBuilder.create(
  'NODE_ENV',
  'API_PORT',
  'MAX_LOG_LEVEL',
  'LINE_ACCESS_TOKEN',
  'LINE_CHANNEL_SECRET',
  'GOOGLE_API_KEY',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALENDAR_ID',
)
  .transform((apiPort) => {
    if (!apiPort) {
      throw new Error('API_PORT is missing.');
    }
    return Number.parseInt(apiPort);
  }, 'API_PORT')
  .transform((environment) => {
    if (!environment || !Object.keys(Environment).includes(environment)) {
      throw new Error('NODE_ENV is missing or invalid NODE_ENV.');
    }
    return environment;
  }, 'NODE_ENV')
  .transform((lineAccessToken) => {
    if (!lineAccessToken) {
      throw new Error('LINE_ACCESS_TOKEN is missing.');
    }
    return lineAccessToken;
  }, 'LINE_ACCESS_TOKEN')
  .transform((lineChannelSecret) => {
    if (!lineChannelSecret) {
      throw new Error('LINE_CHANNEL_SECRET is missing.');
    }
    return lineChannelSecret;
  }, 'LINE_CHANNEL_SECRET')
  .defaults({ MAX_LOG_LEVEL: 'info' })
  .environment();
