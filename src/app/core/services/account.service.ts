import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PageResponse } from '../models/page-response.model';
import { Account, CreateAccountPayload, UpdateAccountPayload } from '../models/user.model';
import { HttpParams } from '@angular/common/http';

// TODO: Bạn tự code - baseUrl = /api/v1/account - mọi request cần Basic Auth (AuthInterceptor tự gắn)
@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly baseUrl = `${environment.apiUrl}/account`;

  constructor(private readonly http: HttpClient) {}

  // TODO 5: GET /api/v1/account?page=&size=&keyword= -> ApiResponse<PageResponse<Account>>
  // Gợi ý: dùng HttpParams().set('page', page).set('size', size) + nếu keyword thì set thêm
  getAccounts(page: number, size: number, keyword = ''): Observable<ApiResponse<PageResponse<Account>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    return this.http.get<ApiResponse<PageResponse<Account>>>(this.baseUrl, { params });
  }

  // TODO 6: GET /api/v1/account/{id}
  getAccountById(id: number): Observable<ApiResponse<Account>> {
    return this.http.get<ApiResponse<Account>>(`${this.baseUrl}/${id}`);
  }

  // TODO 7: POST /api/v1/account {username,email,password,fullName?,status?}
  createAccount(payload: CreateAccountPayload): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(this.baseUrl, payload);
  }

  // TODO 8: PUT /api/v1/account/{id} {email?,fullName?,status?}
  updateAccount(id: number, payload: UpdateAccountPayload): Observable<ApiResponse<Account>> {
    return this.http.put<ApiResponse<Account>>(`${this.baseUrl}/${id}`, payload);
  }

  // Xóa mềm: POST /api/v1/account/{id}/soft-delete -> set status=INACTIVE
  softDelete(id: number): Observable<ApiResponse<Account>> {
    return this.http.post<ApiResponse<Account>>(`${this.baseUrl}/${id}/soft-delete`, {});
  }
}
