import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { config } from '../configs/env.config';
import { ApiError } from '../utils/ApiError';
import { logger } from '../configs/logger';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  next(new ApiError(httpStatus.NOT_FOUND, `Resource not found at ${req.originalUrl}`));
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = err.statusCode || (err.name === 'ValidationError' ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR);
    message = err.message || httpStatus[statusCode as keyof typeof httpStatus] || 'Internal Server Error';
  }

  const response: any = {
    success: false,
    statusCode,
    message,
  };

  if (config.isDev) {
    response.stack = err.stack;
    logger.error(`[Error] ${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${err.stack}`);
  } else {
    logger.error(`[Error] ${statusCode} - ${message} - ${req.originalUrl} - ${req.method}`);
  }

  res.status(statusCode).json(response);
};
