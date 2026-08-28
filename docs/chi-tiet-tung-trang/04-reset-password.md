# 04 - TRANG ĐẶT LẠI MẬT KHẨU `/reset-password` (MỚI)

## 1. File nguồn
* Không có sẵn trong theme - **clone** `D:\demo\default\snippets\pages\user\login-1.html:126` `m-login__forget-password` làm khung.
* DTO gốc: `D:\demo\backend\src\main\java\com\example\demo\dto\request\ResetPasswordRequest.java:9` `@NotBlank token` `@Size(min=6) newPassword`
* Service: `frontend/src/app/core/services/auth.service.ts:56` `resetPassword(payload:ResetPasswordPayload): POST /api/v1/account/reset-password`

## 2. File đích
* `D:\demo\frontend\src\app\features\auth\reset-password\reset-password.component.html:1`
* `reset-password.component.ts:16`
* `reset-password.component.scss:1`
* Route `src/app/app-routing.module.ts:24` `AuthLayout: reset-password` + `:47` `MainLayout: reset-password` (cả public + auth)

## 3. Giữ nguyên (clone từ forget)
```html
<div class="m-login__forget-password">
  <div class="m-login__head"><h3 class="m-login__title">Đặt lại mật khẩu</h3><div class="m-login__desc">Nhập token và mật khẩu mới</div></div>
  <form class="m-login__form m-form">
    <div class="form-group m-form__group"><input class="form-control m-input" placeholder="Token"></div>
    <div class="form-group"><input class="form-control m-input" type="password" placeholder="Mật khẩu mới"></div>
    <div class="form-group"><input class="form-control m-input m-login__form-input--last" type="password" placeholder="Nhập lại"></div>
    <div class="m-login__form-action"><button class="btn btn-focus m-btn--pill m-btn--air"></button><button class="btn btn-outline-focus m-btn--pill">Cancel</button></div>
  </form>
</div>
```

## 4. Thêm mới (không có trong theme)
| Thêm | Chi tiết |
|---|---|
| Field `token` | `formControlName="token" Validators.required` + `m-form__help "Token được gửi qua email ... /reset-password?token=xxx"` |
| `newPassword` | `Validators.minLength(6)` + `form-control-feedback` |
| `confirmPassword` | `Validators.required` + check `newPassword !== confirmPassword` -> `notify.error` |
| `ngOnInit` | `route.snapshot.queryParamMap.get('token')` auto `patchValue({token})` |
| `Cancel` | `routerLink="/login"` |
| Link phụ | `routerLink="/forgot-password" "Quay lại quên mật khẩu"` |

```typescript
form = fb.group({token:['',Validators.required], newPassword:['',[Validators.required,minLength(6)]], confirmPassword:['',Validators.required]});
ngOnInit(){ const t=route.snapshot.queryParamMap.get('token'); if(t) patchValue({token:t}) }
submit(){ if(newPassword!==confirm) return; authService.resetPassword({token,newPassword}).subscribe({next:()=>router.navigate(['/login'])}) }
```

## 5. Checklist
- [ ] `/reset-password?token=xxx` auto điền token
- [ ] Thiếu token -> `has-danger`
- [ ] Thành công -> toast + về `/login`
