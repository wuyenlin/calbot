import { HttpResponseStatusCode } from '../types';
import { ValidationError } from '../error';
import type { Context, Next } from 'koa';

export async function catchValidationErrors(context: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      context.status = HttpResponseStatusCode.BAD_REQUEST;
      context.body = { message: error.message };
      return;
    }
    throw error;
  }
}
