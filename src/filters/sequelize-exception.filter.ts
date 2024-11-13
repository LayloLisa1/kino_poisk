// src/filters/sequelize-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { DatabaseError } from 'sequelize';
  
  @Catch()
  export class SequelizeExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(SequelizeExceptionFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      if (exception instanceof DatabaseError) {
        this.logger.error(`Database error: ${exception.message}`, exception.stack);
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Database Error',
          error: exception.message,
        });
      } else if (exception instanceof HttpException) {
        this.logger.warn(`HTTP error: ${exception.message}`);
        response.status(status).json({
          statusCode: status,
          message: exception.message,
        });
      } else {
        this.logger.error('Unknown error', exception as string);
        response.status(status).json({
          statusCode: status,
          message: 'Internal server error',
        });
      }
    }
  }
  