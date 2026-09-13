import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { API_BASEURL, APIS } from '../../constant/app.constant';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private apiUrl = `${API_BASEURL}${APIS.LOGS}`;
  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  log(level: string, message: string) {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };
    this.http.post(this.apiUrl, logEntry).subscribe({
      next: () => {},
      error: () => {},
    });
  }

  info(message: string, meta?: unknown) {
    const formatted = meta ? `${message} ${typeof meta === 'object' ? JSON.stringify(meta) : meta}` : message;
    console.log(`[INFO] ${message}`, meta || '');
    this.log('info', formatted);
  }

  warn(message: string, meta?: unknown) {
    const formatted = meta ? `${message} ${typeof meta === 'object' ? JSON.stringify(meta) : meta}` : message;
    console.warn(`[WARN] ${message}`, meta || '');
    this.log('warn', formatted);
  }

  error(message: string, meta?: unknown) {
    const formatted = meta ? `${message} ${typeof meta === 'object' ? JSON.stringify(meta) : meta}` : message;
    console.error(`[ERROR] ${message}`, meta || '');
    this.log('error', formatted);
  }
}
