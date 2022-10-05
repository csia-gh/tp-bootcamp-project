import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path, headers, body } = request;

    const headersMod = { ...headers };
    delete headersMod.authorization;
    delete headersMod.cookie;
    logger.info(`${method} ${path}\nrequest-headers: ${JSON.stringify(headersMod, null, 4)}\nrequest-body: ${JSON.stringify(body, null, 4)}`);

    response.on('finish', () => {
      const { statusCode } = response;
      const headersMod = { ...response.getHeaders() };
      delete headersMod.authorization;
      delete headersMod.cookie;

      const logContent = `${statusCode} \nresponse-headers: ${JSON.stringify(headersMod, null, 4)}`;
      if (statusCode >= 500) {
        logger.error(logContent);
      } else if (statusCode >= 400) {
        logger.warn(logContent);
      } else {
        logger.info(logContent);
      }
    });

    next();
  }
}