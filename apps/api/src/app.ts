import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { config } from './configs/env.config';
import { logger } from './configs/logger';
import apiRouter from './routers';
import { notFound, errorHandler } from './middlewares/error.middleware';

const app: Express = express();

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Request logging via Winston
app.use(
  morgan(config.isDev ? 'dev' : 'combined', {
    stream: { write: (message: string) => logger.info(message.trim()) },
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: [config.clientOrigin, 'http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  })
);

// Serve uploaded static assets
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

// Mount API routes
app.use('/api', apiRouter);

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'MallCity API',
    status: 'online',
    version: '1.0.0',
    environment: config.env,
  });
});

// Handle 404
app.use(notFound);

// Central error handler
app.use(errorHandler);

export default app;
