import 'server-only';
import pino from 'pino';
import { env } from '@/lib/env/server';

const logger = pino({
  level: env.LOG_LEVEL ?? 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

export function routeLog(method: string, path: string) {
  return logger.child({ route: `${method} ${path}` });
}

export default logger;
