import { inject, singleton } from 'tsyringe';
import { Logger } from 'winston';
import App from './app';
import { environmentVariables } from './config/environment-variables';
import { ContainerType } from './types';

@singleton()
export default class Server {
  constructor(private readonly app: App, @inject(ContainerType.LOGGER) private readonly logger: Logger) {}

  public async start() {
    const app = await this.app.start();
    app.listen(environmentVariables['API_PORT'], () => {
      this.logger.info(`Server up and running at port ${environmentVariables['API_PORT']}`);
    });
  }
}
