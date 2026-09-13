import { environment } from '../../environments/environment';

export const API_BASEURL = environment.apiBaseUrl;

export const APIS = {
  CITY: '/v1/city',
  MALL: '/v1/mall',
  SHOP: '/v1/shop',
  AUTH: '/v1/auth',
  ADMIN: '/v1/auth',
  LOGIN: '/login',
  LOGS: '/v1/logs',
  HEALTH: '/v1/health',
};
