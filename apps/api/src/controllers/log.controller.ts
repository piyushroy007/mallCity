import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { logger } from '../configs/logger';

export const ingestLog = (req: Request, res: Response): void => {
  const { level, message, timestamp } = req.body;
  const logLevel = ['info', 'warn', 'error'].includes(level) ? level : 'info';

  logger.log(logLevel, `[Frontend Client] ${message} (at ${timestamp || new Date().toISOString()})`);
  res.status(httpStatus.OK).json({ message: 'Log ingested successfully' });
};
