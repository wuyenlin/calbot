import { environmentVariables } from '../../config/environment-variables';

export const requestHeader = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + environmentVariables.LINE_ACCESS_TOKEN,
};
