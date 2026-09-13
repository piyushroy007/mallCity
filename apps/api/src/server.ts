import http from 'http';
import app from './app';
import { config } from './configs/env.config';
import { logger } from './configs/logger';
import { dbConnect } from './configs/database.config';

const server = http.createServer(app);

const startServer = async () => {
  // Connect to MongoDB
  await dbConnect();

  // Listen on configured port
  server.listen(config.port, () => {
    logger.info(`🚀 MallCity API server running in ${config.env} mode on port ${config.port}`);
    logger.info(`Client origin allowed: ${config.clientOrigin}`);
  });
};

process.on('unhandledRejection', (err: any) => {
  logger.error('Unhandled Rejection encountered:', err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err: any) => {
  logger.error('Uncaught Exception encountered:', err);
  process.exit(1);
});

startServer();
