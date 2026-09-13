import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const getHealth = (req: Request, res: Response): void => {
  res.status(httpStatus.OK).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'mallcity-api',
  });
};
