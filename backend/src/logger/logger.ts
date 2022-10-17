import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

export const logOnRequest = (request: Request, logger: Logger) => {
  const { method, path, headers, body } = request;
  const headersMod = { ...headers };
  delete headersMod.authorization;
  delete headersMod.cookie;
  logger.log('info', {
    message: `${method} ${path}\nrequest-headers: ${JSON.stringify(
      headersMod,
      null,
      4,
    )}\nrequest-body: ${JSON.stringify(body, null, 4)}`,
  });
};

export const logOnResponse = (
  response: Response,
  logger: Logger,
  body: any,
) => {
  const { statusCode } = response;
  const headersMod = { ...response.getHeaders() };
  delete headersMod.authorization;
  delete headersMod.cookie;

  const logContent = `${statusCode} \nresponse-headers: ${JSON.stringify(
    headersMod,
    null,
    4,
  )}\nresponse-body: ${body}`;

  if (statusCode >= 500) {
    logger.error({
      message: logContent,
    });
  } else if (statusCode >= 400) {
    logger.warn({
      message: logContent,
    });
  } else {
    logger.log('info', {
      message: logContent,
    });
  }
};
