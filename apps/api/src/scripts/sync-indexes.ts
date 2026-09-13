import mongoose from 'mongoose';
import { config } from '../configs/env.config';
import { UserModel } from '../models/user.model';
import { CityModel } from '../models/city.model';
import { MallModel } from '../models/mall.model';
import { ShopModel } from '../models/shop.model';
import { logger } from '../configs/logger';

const syncIndexes = async () => {
  try {
    logger.info('Connecting to database to sync indexes...');
    await mongoose.connect(config.mongoUri);

    logger.info('Synchronizing User indexes...');
    await UserModel.syncIndexes();

    logger.info('Synchronizing City indexes...');
    await CityModel.syncIndexes();

    logger.info('Synchronizing Mall indexes...');
    await MallModel.syncIndexes();

    logger.info('Synchronizing Shop indexes...');
    await ShopModel.syncIndexes();

    logger.info('All Mongoose indexes synchronized successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error('Error synchronizing indexes:', error);
    process.exit(1);
  }
};

syncIndexes();
