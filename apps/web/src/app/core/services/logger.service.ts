import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASEURL, APIS } from '../../constant/app.constant';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private apiUrl = `${API_BASEURL}${APIS.LOGS}`;

  constructor(private http: HttpClient) {}

  log(level: string, message: string) {
    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };
    this.http.post(this.apiUrl, logEntry).subscribe({
      next: () => {},
      error: (err) => console.error('Failed to ship log to server:', err),
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
