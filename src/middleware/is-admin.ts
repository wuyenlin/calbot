import { HttpResponseStatusCode } from '../types';

export async function isAdmin(context, next) {
  if (!context.state.user.isAdmin) {
    context.status = HttpResponseStatusCode.UNAUTHORIZED;
    throw new Error('You are not an admin.');
  }
  await next();
}
