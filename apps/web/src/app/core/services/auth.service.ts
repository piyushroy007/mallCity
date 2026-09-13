import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_BASEURL, APIS } from '../../constant/app.constant';
import { LoggerService } from './logger.service';
import { AuthResponseDTO, LoginRequestDTO, RegisterRequestDTO, UserDTO, USER_ROLES } from '@mallcity/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private userKey = 'currentUser';
  private currentUserSubject: BehaviorSubject<UserDTO | null>;
  public currentUser$: Observable<UserDTO | null>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private logs: LoggerService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserDTO | null>(this.getStoredUser());
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Automatically sync latest user profile & role from server if token exists
    if (this.getToken()) {
      this.refreshCurrentUser().subscribe();
    }
  }

  public get currentUserValue(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequestDTO): Observable<AuthResponseDTO> {
    this.logs.info(`AuthService: Login initiated for ${credentials.email}`);
    return this.http
      .post<AuthResponseDTO>(`${API_BASEURL}${APIS.AUTH}${APIS.LOGIN}`, credentials)
      .pipe(
        map((response) => {
          this.setToken(response.token);
          this.setUser(response.user);
          this.currentUserSubject.next(response.user);
          this.logs.info(`AuthService: Logged in successfully as ${response.user.email} (${response.user.role})`);
          return response;
        })
      );
  }

  signUp(registrationData: RegisterRequestDTO): Observable<AuthResponseDTO> {
    this.logs.info(`AuthService: Registration initiated for ${registrationData.email}`);
    return this.http
      .post<AuthResponseDTO>(`${API_BASEURL}${APIS.AUTH}`, registrationData)
      .pipe(
        map((response) => {
          this.setToken(response.token);
          this.setUser(response.user);
          this.currentUserSubject.next(response.user);
          this.logs.info(`AuthService: Registered and logged in as ${response.user.email}`);
          return response;
        })
      );
  }

  logout(): void {
    this.logs.info('AuthService: User logged out');
    this.removeToken();
    this.removeUser();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  isAdmin(): boolean {
    if (!this.isAuthenticated()) return false;
    const user = this.currentUserValue;
    const role = user?.role?.toLowerCase();
    return role === 'admin' || (typeof USER_ROLES !== 'undefined' && role === USER_ROLES?.ADMIN);
  }

  refreshCurrentUser(): Observable<UserDTO | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }

    return this.http.get<UserDTO>(`${API_BASEURL}${APIS.AUTH}/me`).pipe(
      map((freshUser) => {
        this.setUser(freshUser);
        this.currentUserSubject.next(freshUser);
        this.logs.info(`AuthService: Session refreshed from server for ${freshUser.email} (Role: ${freshUser.role})`);
        return freshUser;
      }),
      catchError((err) => {
        this.logs.warn(`AuthService: Failed to refresh user profile`, err);
        return of(null);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUser(user: UserDTO): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getStoredUser(): UserDTO | null {
    const raw = localStorage.getItem(this.userKey);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }
}
