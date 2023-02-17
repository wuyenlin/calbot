import type { Client } from '@line/bot-sdk';
import type { Context, Next } from 'koa';
import { inject, singleton } from 'tsyringe';
import { ContainerType } from '../../../types';
import { response } from './response';

@singleton()
export default class RespondText {
  constructor(@inject(ContainerType.LINE_CLIENT) private readonly lineClient: Client) {}

  public async respond(context: Context, next: Next) {
    context.body = 'Responded';
    //TODO: get group ID
    this.lineClient.pushMessage('groupID', response);
    await next();
  }
}
