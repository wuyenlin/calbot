import { singleton } from 'tsyringe';
import Koa from 'koa';
import json from 'koa-json';
import Routes from './routes';

@singleton()
export default class App {
  constructor(private readonly koa: Koa, private readonly routes: Routes) {}

  public async start() {
    const route = await this.routes.start();
    return this.koa.use(json()).use(route.routes());
  }
}
