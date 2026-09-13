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

  info(message: string) {
    console.log(`[INFO] ${message}`);
    this.log('info', message);
  }

  warn(message: string) {
    console.warn(`[WARN] ${message}`);
    this.log('warn', message);
  }

  error(message: string) {
    console.error(`[ERROR] ${message}`);
    this.log('error', message);
  }
}
