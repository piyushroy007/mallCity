import mongoose from 'mongoose';
import { config } from '../configs/env.config';
import { UserModel } from '../models/user.model';
import { USER_ROLES } from '@mallcity/shared';
import { logger } from '../configs/logger';

const seedAdmin = async () => {
  try {
    logger.info('Connecting to database for admin seeding...');
    await mongoose.connect(config.mongoUri);

    // Check if user already exists with configured email or username
    let adminUser = await UserModel.findOne({ email: config.adminSeed.email });
    if (!adminUser) {
      adminUser = await UserModel.findOne({ username: config.adminSeed.username });
    }

    if (adminUser) {
      adminUser.role = USER_ROLES.ADMIN;
      adminUser.email = config.adminSeed.email;
      adminUser.username = config.adminSeed.username;
      adminUser.password = config.adminSeed.password;
      await adminUser.save();

      logger.info(`Admin user updated and elevated to role: ${adminUser.role}`);
      logger.info(`Email: ${adminUser.email}`);
      logger.info(`Username: ${adminUser.username}`);
      logger.info(`Role: ${adminUser.role}`);
    } else {
      adminUser = await UserModel.create({
        name: config.adminSeed.name,
        username: config.adminSeed.username,
        email: config.adminSeed.email,
        password: config.adminSeed.password,
        role: USER_ROLES.ADMIN,
      });

      logger.info(`Initial admin created successfully!`);
      logger.info(`Email: ${adminUser.email}`);
      logger.info(`Username: ${adminUser.username}`);
      logger.info(`Role: ${adminUser.role}`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error('Error during admin seeding:', error);
    process.exit(1);
  }
};

seedAdmin();
