import { container } from 'tsyringe';
import Koa from 'koa';
import { logger } from '../logger';
import Router from 'koa-router';
import { ContainerType } from '../types';
import type { Logger } from 'winston';
import { Client, ClientConfig } from '@line/bot-sdk';
import { environmentVariables } from './environment-variables';

const koa = new Koa();
const router = new Router();
const lineClientConfig: ClientConfig = {
  channelAccessToken: environmentVariables.LINE_ACCESS_TOKEN,
  channelSecret: environmentVariables.LINE_CHANNEL_SECRET,
};
const lineClient = new Client(lineClientConfig);

container.registerInstance<Koa>(Koa, koa);
container.registerInstance<Router>(Router, router);
container.register<Logger>(ContainerType.LOGGER, { useValue: logger });
container.register<Client>(ContainerType.LINE_CLIENT, { useValue: lineClient });

export { container as default } from 'tsyringe';
