import Router from 'koa-router';
import { singleton } from 'tsyringe';
import { catchValidationErrors } from '../middleware';
import MessageRouter from './message';

@singleton()
export default class Routes {
  constructor(private readonly router: Router, private readonly messageRouter: MessageRouter) {}

  public async start(): Promise<Router> {
    // this.router.use('/api/v1', authenticateBearerToken, catchValidationErrors);
    this.router.use('/api/v1', catchValidationErrors);
    this.messageRouter.initialize();

    return this.router;
  }
}
