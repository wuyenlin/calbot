import type { Context, Next } from 'koa';

export interface RequestHandler {
  handle(context: Context, next: Next);
}
