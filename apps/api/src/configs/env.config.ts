import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const env = process.env.NODE_ENV || 'development';

export const config = {
  env,
  isDev: env === 'development',
  isProd: env === 'production',
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:4200',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mallcity',
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecret_jwt_key_mallcity_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  adminSeed: {
    name: process.env.ADMIN_NAME || 'Super Admin',
    username: process.env.ADMIN_USERNAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@mallcity.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
  },
};
