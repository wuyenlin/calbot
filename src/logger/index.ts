import { Environment } from '../types';
import { environmentVariables } from '../config/environment-variables';
import { createLogger, transports, format, LoggerOptions } from 'winston';

const transportStream =
  environmentVariables['NODE_ENV'] === Environment.DEVELOPMENT
    ? new transports.Console()
    : new transports.File({ filename: 'error.log', level: 'error' });
const loggerConfig: LoggerOptions = {
  level: environmentVariables['MAX_LOG_LEVEL'],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, level, message, service }) => {
      return `[${timestamp}] ${service} ${level}: ${message}`;
    }),
  ),
  defaultMeta: { service: 'triple-ls-service' },
  transports: [transportStream],
};

export const logger = createLogger(loggerConfig);
