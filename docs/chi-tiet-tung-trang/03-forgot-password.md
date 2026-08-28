# 03 - TRANG QUÊN MẬT KHẨU `/forgot-password`

## 1. File nguồn
* `D:\demo\default\snippets\pages\user\login-1.html:126` `<div class="m-login__forget-password">`
* `login-1.html:127` `<h3 class="m-login__title">Forgotten Password ?</h3><div class="m-login__desc">Enter your email to reset</div>`
* `login-1.html:131` `<form class="m-login__form m-form"><div class="form-group"><input placeholder="Email" name="email" id="m_email">`
* `login-1.html:135` `<button id="m_login_forget_password_submit" class="btn btn-focus">Request</button><button id="m_login_forget_password_cancel" class="btn btn-outline-focus">Cancel</button>`
* `D:\demo\default\assets\snippets\custom\pages\user\login.js:163` `handleForgetPasswordFormSubmit` `rules:{email:{required:true,email:true}}`

## 2. File đích
* `D:\demo\frontend\src\app\features\auth\forgot-password\forgot-password.component.html:2`
* `forgot-password.component.ts:14` `FormControl email [required,email]`
* `core/services/auth.service.ts:52` `forgotPassword(payload:ForgotPasswordPayload): Observable<ApiResponse<void>>` `POST /api/v1/account/forgot-password`

## 3. Giữ nguyên
```html
<div class="m-login__forget-password">
  <div class="m-login__head"><h3 class="m-login__title">Forgotten Password ?</h3><div class="m-login__desc">Enter your email...</div></div>
  <form class="m-login__form m-form">
    <div class="form-group m-form__group"><input class="form-control m-input" id="m_email"></div>
    <div class="m-login__form-action"><button id="m_login_forget_password_submit" class="btn btn-focus m-btn--pill m-btn--air">Request</button><button id="m_login_forget_password_cancel" class="btn btn-outline-focus m-btn--pill">Cancel</button></div>
  </form>
</div>
```

## 4. Lược bỏ
* Xóa `login.js:163` `ajaxSubmit` - thay bằng `HttpClient.post`.

## 5. Sửa
| Theme | FE |
|---|---|
| `<input name="email" id="m_email">` | `formControlName="email" [class.is-invalid]="form.controls.email.touched && invalid"` + `form-control-feedback` |
| `Cancel` `href="javascript:;"` | `routerLink="/login"` `type="button"` |
| - | Thêm link phụ `routerLink="/reset-password" "Đã có token? Đặt lại mật khẩu"` `forgot-password.html:13` |

```typescript
form = fb.group({email:['',[Validators.required,Validators.email]]});
submit(){ authService.forgotPassword(value).subscribe({next: res=>notify.success(res.message)}) }
```

## 6. Checklist
- [ ] `Email không hợp lệ` hiện `has-danger`
- [ ] `Request` -> toast `Đã gửi email mock` (mock) hoặc gọi BE
- [ ] `Cancel` về `/login`, link phụ tới `/reset-password`
