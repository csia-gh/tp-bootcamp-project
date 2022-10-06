import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { logOnRequest, logOnResponse } from '../logger/logger';





  // console.log({
  //   time: new Date().toUTCString(),
  //   fromIP: req.headers['x-forwarded-for'] ||
  //     req.connection.remoteAddress,
  //   method: req.method,
  //   originalUri: req.originalUrl,
  //   uri: req.url,
  //   requestData: req.body,
  //   responseData: body,
  //   referer: req.headers.referer || '',
  //   ua: req.headers['user-agent']
  // });




@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  use(request: Request, response: Response, next: NextFunction): void {
    // logOnRequest(request, this.logger);

    const oldWrite = response.write;
    const oldEnd = response.end;

    const chunks = [];

    // @ts-ignore
    response.write = (...restArgs) => {
      chunks.push(Buffer.from(restArgs[0]));
      oldWrite.apply(response, restArgs);
    };

    // @ts-ignore
    response.end = (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }

      const body = Buffer.concat(chunks).toString('utf8');

      logOnResponse(response, this.logger, body);

      oldEnd.apply(response, restArgs);
    };

    next();
  };
}