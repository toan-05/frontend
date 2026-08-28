import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChangePasswordPayload, CurrentUser, ForgotPasswordPayload, LoginPayload, ResetPasswordPayload } from '../models/auth.model';
import { ApiResponse } from '../models/api-response.model';
import { Account } from '../models/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/account`;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {}

  login(payload: LoginPayload): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(`${this.baseUrl}/login`, payload)
      .pipe(tap({
        next: (res) => {
          const token = btoa(`${payload.username}:${payload.password}`);
          this.tokenService.setToken(token);
          this.tokenService.setUser({ username: res.data.username, role: res.data.role } as CurrentUser);
        },
        error: () => this.tokenService.clear()
      }));
  }

  logout(): void {
    this.tokenService.clear();
  }

  // TODO 2: POST /api/v1/account/forgot-password {email} - public, không cần token
  forgotPassword(payload: ForgotPasswordPayload): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/forgot-password`, payload);
  }

  // TODO 3: POST /api/v1/account/reset-password {token, newPassword} - public
  resetPassword(payload: ResetPasswordPayload): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/reset-password`, payload);
  }

  // TODO 4: POST /api/v1/account/change-password {oldPassword, newPassword} - cần Basic Auth (interceptor tự gắn)
  changePassword(payload: ChangePasswordPayload): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/change-password`, payload);
  }

  getCurrentUser(): CurrentUser | null {
    return this.tokenService.getUser();
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }
}
