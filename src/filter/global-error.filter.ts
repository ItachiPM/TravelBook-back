import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { JsonResponseStatus } from '../types/jsonResponse/jsonResponse';
import { jsonResponse } from '../utils/jsonResponse';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Somethig went wrong. Please try after few minutes.';

    response.status(code).json(
      jsonResponse({
        code,
        status: JsonResponseStatus.failed,
        message,
      }),
    );
  }
}
