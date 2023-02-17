import type { Middleware } from 'koa';
import passport from 'koa-passport';

export const authenticateBearerToken: Middleware = passport.authenticate('oauth-bearer', { session: false });
