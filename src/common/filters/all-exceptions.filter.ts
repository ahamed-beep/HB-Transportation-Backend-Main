import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const errorResponse = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === 'string'
          ? message
          : (message as { message?: string }).message,
      error:
        !isProduction && exception instanceof Error
          ? exception.stack
          : undefined,
    };

    if (isProduction) {
      this.logger.error(
        `${request.method} ${request.url} ${status} - ${
          typeof message === 'string'
            ? message
            : (message as { message?: string }).message ?? 'Internal server error'
        }`,
      );
    } else {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error
          ? exception.stack
          : JSON.stringify(exception),
      );
    }

    response.status(status).json(errorResponse);
  }
}