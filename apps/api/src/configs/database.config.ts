import mongoose from 'mongoose';
import { config } from './env.config';
import { logger } from './logger';

export const dbConnect = async (): Promise<void> => {
  try {
    if (!config.mongoUri) {
      logger.error('FATAL ERROR: MONGO_URI is not defined.');
      process.exit(1);
    }

    await mongoose.connect(config.mongoUri);
    logger.info(`Database connection established successfully to ${config.mongoUri}`);
  } catch (error) {
    logger.error('Database connection error:', error);
    process.exit(1);
  }
};
