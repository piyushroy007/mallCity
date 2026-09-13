import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { config } from '../configs/env.config';
import { ApiError } from '../utils/ApiError';
import { JwtPayload, UserRole } from '@mallcity/shared';
import { logger } from '../configs/logger';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication token required'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error: any) {
    logger.warn(`Failed token verification: ${error.message}`);
    return next(new ApiError(httpStatus.FORBIDDEN, 'Invalid or expired token'));
  }
};

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'User authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(`Access denied for user ${req.user.email} with role '${req.user.role}'. Required: [${allowedRoles.join(', ')}]`);
      return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden: Insufficient privileges to perform this action'));
    }

    next();
  };
};
