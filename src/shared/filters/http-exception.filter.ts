import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorCode } from '@shared/errors/error-codes.enum';
import { ErrorMessages } from '@shared/errors/error-messages';

import dayjs from 'dayjs';

import type { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    Logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ErrorCode.INTERNAL_SERVER_ERROR;
    let message = ErrorMessages[code];
    let error = HttpStatus[status];

    if (exception instanceof HttpException) {
      const res = exception.getResponse() as
        | string
        | { message: string; code?: string };

      status = exception.getStatus();
      error = HttpStatus[status];

      if (typeof res === 'string') {
        message = res;
      } else {
        message = res.message ?? error;
        code = (res.code as ErrorCode) ?? error;
      }
    }

    return response.status(status).send({
      statusCode: status,
      error,
      code,
      message,
      timestamp: dayjs().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
