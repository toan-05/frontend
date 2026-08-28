# 02 - TRANG LOGIN `/login`

## 1. File nguồn
* `D:\demo\default\snippets\pages\user\login-1.html:66` `<div class="m-login__signin">`
* `login-1.html:67` `<div class="m-login__head"><h3 class="m-login__title">Sign In To Admin</h3>`
* `login-1.html:70` `<form class="m-login__form m-form" action="">`
* `login-1.html:72` `<input class="form-control m-input" type="text" placeholder="Email" name="email">`
* `login-1.html:75` `<input class="form-control m-input m-login__form-input--last" type="password" placeholder="Password" name="password">`
* `login-1.html:77` `<div class="row m-login__form-sub"><label class="m-checkbox m-checkbox--focus"><input type="checkbox" name="remember">`
* `login-1.html:85` `<a href="javascript:;" id="m_login_forget_password" class="m-link">Forget Password ?</a>`
* `login-1.html:88` `<button id="m_login_signin_submit" class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air">Sign In</button>`
* `D:\demo\default\assets\snippets\custom\pages\user\login.js:70` `handleSignInFormSubmit` `rules:{email:{required:true,email:true},password:{required:true}}` + `login.js:1` `mUtil.animateClass`

## 2. File đích
* `D:\demo\frontend\src\app\features\auth\login\login.component.html:2`
* `D:\demo\frontend\src\app\features\auth\login\login.component.ts:16`
* `D:\demo\frontend\src\app\features\auth\login\login.component.scss:1` (rỗng, dùng style.bundle)
* `D:\demo\frontend\src\app\core\services\auth.service.ts:20` `login(payload:LoginPayload)`

## 3. Giữ nguyên
```html
<div class="m-login__signin">
  <div class="m-login__head"><h3 class="m-login__title">Sign In To Admin</h3></div>
  <form class="m-login__form m-form">
    <div class="form-group m-form__group"><input class="form-control m-input"></div>
    <div class="form-group m-form__group"><input class="form-control m-input m-login__form-input--last"></div>
    <div class="row m-login__form-sub"><div class="col m--align-left"><label class="m-checkbox m-checkbox--focus"><input type="checkbox"><span></span></label></div><div class="col m--align-right"><a class="m-link"></a></div></div>
    <div class="m-login__form-action"><button class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air"></button></div>
  </form>
</div>
```
Giữ toàn bộ class `m-login__signin`, `m-input`, `m-login__form-input--last`, `m-checkbox--focus`, `btn-focus m-btn--pill`.

## 4. Lược bỏ
* Xóa `jquery.validate` `login.js:70` - thay bằng Angular `Validators`.
* Xóa `mUtil.animateClass(flipInX)` - không cần animation JS.

## 5. Sửa / Thêm chi tiết
| Theme | FE |
|---|---|
| `<input placeholder="Email" name="email" autocomplete="off">` | `<input placeholder="Email" formControlName="username" [class.is-invalid]="form.controls.username.touched && invalid">` đổi `name` -> `formControlName`, thêm `is-invalid` |
| `<div class="form-control-feedback">` (tạo động bởi jquery) | `<div *ngIf="form.controls.username.touched && invalid" class="form-control-feedback">Username là bắt buộc</div>` |
| `<a href="javascript:;" id="m_login_forget_password">` | `<a routerLink="/forgot-password" id="m_login_forget_password">` |
| `<button id="m_login_signin_submit" class="btn">Sign In</button>` | `<button type="submit" [disabled]="loading"><span *ngIf="!loading">Sign In</span><span *ngIf="loading"><i class="fa fa-spinner fa-spin"></i></span></button>` |

```typescript
// login.component.ts:16
form = this.fb.group({username:['',Validators.required], password:['',Validators.required]});
submit(){ if(invalid) markAllAsTouched(); this.authService.login(value).subscribe({next:()=>router.navigate(['/accounts']), error: e=>notify.error(e.message)}) }
```

## 6. Checklist
- [ ] `has-danger` hiện khi `touched && invalid`
- [ ] Click `Forget Password ?` -> `/forgot-password`
- [ ] `admin/123456` (mock `environment.ts:4 useMock:true`) -> toast success + chuyển `/accounts`
