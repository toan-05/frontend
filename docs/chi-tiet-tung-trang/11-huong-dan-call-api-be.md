# 11 - HƯỚNG DẪN CALL API BE (`api/v1/account`)

## 1. Tổng quan kiến trúc

```
FE Angular (http://localhost:4200)  --HTTP Basic-->  BE Spring Boot (http://localhost:8080/api/v1/account)
  | AuthInterceptor (Basic token)        | SecurityConfig.java:25 httpBasic
  | TokenService (localStorage)          | CustomUserDetailService
  | useMock:true -> không cần BE         | AccountController + AccountServiceImpl
```

* **BE:** `D:\demo\backend\src\main\java\com\example\demo\controller\AccountController.java:19` `@RequestMapping("api/v1/account")` + `SecurityConfig.java:25` `httpBasic(Customizer.withDefaults())` + `csrf.disable()`.
* **FE:** `src/environments/environment.ts:3` `apiUrl:'http://localhost:8080/api/v1'` `useMock:true` + `src/app/core/interceptors/auth.interceptor.ts:17` auto thêm `Authorization: Basic <base64>` cho mọi request (trừ khi `token==null`).

## 2. Cấu hình

### 2.1 Environment
```typescript
// src/environments/environment.ts:3
export const environment = { production:false, apiUrl:'http://localhost:8080/api/v1', useMock:true };
// environment.prod.ts:3 useMock không có -> mặc định false
```
* `useMock:true` -> `AuthService`/`AccountService` dùng `of(mock)` không gọi BE, dùng `admin/123456` để test giao diện.
* `useMock:false` -> gọi BE thật, cần BE chạy `mvn spring-boot:run` port 8080.

### 2.2 TokenService
```typescript
// src/app/core/services/token.service.ts:1
TOKEN_KEY='basic_auth' // base64(username:password)
USER_KEY='current_user' // {username}
setToken(btoa('admin:123456')) -> localStorage
getToken() -> AuthInterceptor đọc
```

## 3. Cơ chế xác thực HTTP Basic

### 3.1 Login (FE giả lập GET list để verify)
```typescript
// auth.service.ts:34
const token = btoa(`${username}:${password}`); // "YWRtaW46MTIzNDU2"
setToken(token);
GET http://localhost:8080/api/v1/account?page=0&size=1
Header: Authorization: Basic YWRtaW46MTIzNDU2
```
* BE `SecurityConfig:22` `"/api/v1/account/**".authenticated()` -> yêu cầu Basic. `GET /account` trả `Page<AccountResponse>` nếu đúng, `401` nếu sai -> `auth.service.ts:41` `tap(next=>setUser, error=>clear)`.
* FE `AuthGuard:12` `isLoggedIn()==!!getToken()` -> cho vào `MainLayout`, `ErrorInterceptor:17` `401 -> logout() navigate('/login')`.

### 3.2 Các API khác đều qua AuthInterceptor
```typescript
// auth.interceptor.ts:17
if(token) request.clone({setHeaders:{Authorization:`Basic ${token}`}})
```
Mọi `POST/PUT/DELETE /account/...` đều kèm header.

## 4. Danh sách endpoint chi tiết

| # | FE gọi tại | Method | URL BE | Auth | Request Body | Response `ApiResponse<T>` | Ghi chú BE |
|---|---|---|---|---|---|---|---|
| 1 | `auth.service.ts:34 login()` | `GET` | `/api/v1/account?page=0&size=1` | Basic | - | `Page<AccountResponse>` | Dùng để verify password, `AccountServiceImpl:93` filter `status=ACTIVE` |
| 2 | `account.service.ts:29 getAccounts()` | `GET` | `/api/v1/account?page={page}&size={size}&keyword?` | Basic | - | `Page<AccountResponse>` | `AccountController:52` `getAccounts(Pageable, keyword)` `AccountServiceImpl:93` search `ACTIVE` |
| 3 | `getAccountById()` `:31` | `GET` | `/api/v1/account/{id}` | Basic | - | `AccountResponse` | `Controller:44` `getDetail` |
| 4 | `createAccount()` `:37` | `POST` | `/api/v1/account` | Basic | `CreateAccountRequest{username,email,password,fullName,status}` `backend/dto/request/CreateAccountRequest.java` | `AccountResponse` | `AccountServiceImpl:42` check `existsByUsername/Email` `passwordEncoder.encode` |
| 5 | `updateAccount()` `:39` | `PUT` | `/api/v1/account/{id}` | Basic | `UpdateAccountRequest{email,fullName,status}` (không cho đổi username) | `AccountResponse` | `Impl:63` `existsByEmail` |
| 6 | `deleteAccount()` `:43` | `DELETE` | `/api/v1/account/{id}` | Basic | - | `Void` | `Impl:105` `deleteById` |
| 7 | `softDelete()` `:47` | `POST` | `/api/v1/account/{id}/soft-delete` | Basic | `{}` | `AccountResponse` `status=INACTIVE` | `Impl:114` set `INACTIVE` |
| 8 | `forgotPassword()` `auth.service:52` | `POST` | `/api/v1/account/forgot-password` | **permitAll** `SecurityConfig:20` | `ForgotPasswordRequest{email}` `email:@Email` | `Void` "Đã gửi yêu cầu" | `Impl:138` tạo `token 6 số` `+15 phút` `EmailService.sendResetToken` |
| 9 | `resetPassword()` `:56` | `POST` | `/api/v1/account/reset-password` | permitAll | `ResetPasswordRequest{token,newPassword}` `@NotBlank @Size(min=6)` | `Void` | `Impl:155` check `expiryDate` `encode` + xóa token |
| 10 | `changePassword()` `:60` | `POST` | `/api/v1/account/change-password` | Basic | `ChangePasswordRequest{oldPassword,newPassword}` | `Void` | `Impl:123` lấy `SecurityContextHolder.getName()` check `matches(old)` `!equals(old,new)` |

### 4.1 Model chung
```typescript
// core/models/api-response.model.ts
interface ApiResponse<T>{ status:number; errorCode:string|null; message:string; data:T; timestamp:string }
// core/models/page-response.model.ts
interface PageResponse<T>{ content:T[]; totalElements:number; totalPages:number; size:number; number:number }
// core/models/user.model.ts:4
interface Account{id:number; username:string; email:string; fullName:string|null; status:'ACTIVE'|'INACTIVE'; createdAt:string; updatedAt:string}
```

## 5. Luồng từng trang

### 5.1 Login `login.component.ts:28`
```typescript
if(invalid) markAllAsTouched();
authService.login({username,password}).pipe(finalize).subscribe({
  next:()=> router.navigate(['/accounts']), // đã đổi từ /dashboard
  error: err=> notify.error(err.error?.message) // ErrorInterceptor sẽ logout nếu 401
});
```

### 5.2 Forgot `forgot-password.component.ts:16`
```typescript
authService.forgotPassword({email}).subscribe({next: res=>notify.success(res.message)});
// BE gửi email chứa token -> user copy token sang /reset-password?token=xxx
```

### 5.3 Reset `reset-password.component.ts:33`
```typescript
ngOnInit(){ token = queryParamMap.get('token'); patchValue({token}) }
submit(){ if(newPassword!==confirm) error; authService.resetPassword({token,newPassword}).subscribe({next:()=>navigate(['/login'])}) }
```

### 5.4 Change `change-password.component.ts:20`
```typescript
authService.changePassword({oldPassword,newPassword}).subscribe({next:()=>{form.reset(); notify.success()}});
// Header 401 -> interceptor logout
```

### 5.5 CRUD List `account-list.component.ts:28`
```typescript
accountService.getAccounts(page,size,keyword).subscribe({next: res=>{accounts=res.data.content; totalPages=res.data.totalPages}});
// paging: changePage(page) + advancedSearch toggle
```

### 5.6 CRUD Form `account-form.component.ts:24`
```typescript
isEdit ? getAccountById(id).subscribe(patchValue) : addValidators(password)
submit(){ const req = isEdit ? updateAccount(id,{email,fullName,status}) : createAccount({username,email,password,fullName,status}); req.subscribe({next:()=>navigate(['/accounts'])}) }
```

## 6. Mock vs Real

| Chế độ | Cách bật | Hành vi |
|---|---|---|
| **Mock** | `environment.ts:4 useMock:true` | `auth.service:22` check `admin/123456` `user1/123456` -> tự tạo `btoa` + `MOCK_ACCOUNTS` `core/mock/mock-data.ts` 10 record, `account.service:26` `of(mockPage)` không gọi HTTP |
| **Real** | `useMock:false` hoặc `environment.prod.ts` | Gọi `http.get/post/put/delete` với `HttpParams` `HttpHeaders Basic`, cần BE chạy + DB có `account` `password_reset_token` |

**Đổi nhanh:** `src/environments/environment.ts` `useMock:false` + `ng serve` + `cd backend && mvn spring-boot:run`.

## 7. Chạy BE + FE

```bash
# BE
cd D:\demo\backend
mvn spring-boot:run # http://localhost:8080/api/v1/account - H2/MySQL theo application.properties
# FE mock
cd D:\demo\frontend
npm start # http://localhost:4200 - useMock:true
# FE real
# sửa environment.ts useMock:false
npm run build # check main ~80KB
```

**CORS:** BE `SecurityConfig` chưa `cors()`, nếu FE port khác cần thêm `http.cors(Customizer.withDefaults())` + `@CrossOrigin` hoặc proxy `proxy.conf.json`.

## 8. Xử lý lỗi

* `ErrorInterceptor:17` `HttpErrorResponse 401 -> authService.logout() + router.navigate(['/login'])`
* `AccountServiceImpl` throw `RuntimeException("username đã tồn tại")` -> BE `GlobalExceptionHandler` trả `ApiResponse status:400 errorCode message` -> FE `error.error?.message` hiện `toastr.error`.
* `NotificationService` hiện `toastr/Swal` đã map theme `toastr.html:20`.

## 9. Ví dụ curl

```bash
# login verify
curl -i -H "Authorization: Basic YWRtaW46MTIzNDU2" "http://localhost:8080/api/v1/account?page=0&size=1"
# create
curl -X POST -H "Authorization: Basic ..." -H "Content-Type: application/json" -d '{"username":"test","email":"test@a.com","password":"123456","fullName":"Test","status":"ACTIVE"}' http://localhost:8080/api/v1/account
# forgot
curl -X POST -H "Content-Type: application/json" -d '{"email":"test@a.com"}' http://localhost:8080/api/v1/account/forgot-password
# reset (token lấy từ log EmailService hoặc DB)
curl -X POST -H "Content-Type: application/json" -d '{"token":"123456","newPassword":"new123456"}' http://localhost:8080/api/v1/account/reset-password
```

## 10. Checklist call API
- [ ] `useMock:true` test giao diện không cần BE
- [ ] `useMock:false` login `admin/123456` thật -> header kèm `Basic`
- [ ] `401` tự logout về `/login`
- [ ] `keyword` search `GET /account?keyword=admin`
- [ ] `create/update/delete` hiện `toastr` từ `ApiResponse.message`
