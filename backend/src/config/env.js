const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const env = process.env.NODE_ENV || 'development';

const config = {
  env,
  isDev: env === 'development',
  isProd: env === 'production',
  port: Number(process.env.PORT) || 4000,
  appName: process.env.APP_NAME || 'mallcity-backend',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'mallcity',
    user: process.env.DB_USER || 'mallcity_user',
    password: process.env.DB_PASSWORD || 'changeme',
  },
};

module.exports = config;

