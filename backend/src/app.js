const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config/env');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Security headers
app.use(helmet());

// HTTP request logging
if (config.isDev) {
  app.use(morgan('dev'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
);

// Mount API routes
app.use('/api', routes);

// Health root
app.get('/', (req, res) => {
  res.json({
    name: config.appName,
    env: config.env,
    status: 'running',
  });
});

// 404 handler
app.use(notFound);

// Central error handler
app.use(errorHandler);

module.exports = app;

