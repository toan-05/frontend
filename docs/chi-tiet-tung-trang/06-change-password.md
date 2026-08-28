# 06 - TRANG ĐỔI MẬT KHẨU `/change-password`

## 1. File nguồn
* `D:\demo\default\header\profile.html:525` `<div class="m-card-user m-card-user--skin-dark" style="background:url(user_profile_bg.jpg)">`
* `D:\demo\default\crud\forms\validation\form-controls.html` (tham khảo) `m-form--fit m-form--label-align-right m-form--group-seperator-dashed` `form-group row has-danger` `col-lg-3/col-xl-2` `form-control-feedback` `m-form__seperator--dashed` `m-alert--outline` `m-portlet__foot--fit`
* `D:\demo\default\crud\forms\controls\base.html` `input type=password m-input`
* DTO: `backend/dto/request/ChangePasswordRequest.java:9` `@NotBlank oldPassword` `@Size(min=6) newPassword`

## 2. File đích
* `D:\demo\frontend\src\app\features\auth\change-password\change-password.component.html:2`
* `change-password.component.ts:16` `FormGroup oldPassword/newPassword/confirmPassword` + `passwordMatchValidator`
* `change-password.component.scss:1` `.m-card-profile gradient`

## 3. Giữ nguyên
```html
<div class="m-portlet m-portlet--full-height m-portlet--tabs"><div class="m-portlet__head"><h3 class="m-portlet__head-text">My Profile <small>Change Password</small>
<div class="m-card-user m-card-user--skin-dark" style="background:url(assets/app/media/img/misc/user_profile_bg.jpg)">
  <img src="assets/app/media/img/users/user4.jpg" 80px border-radius 50%>
  <span class="m-card-user__name">Đổi mật khẩu</span>
<form class="m-form m-form--fit m-form--label-align-right m-form--group-seperator-dashed">
  <div class="form-group m-form__group row" [class.has-danger]="..."><label class="col-lg-3 col-sm-12">Mật khẩu hiện tại <span class="m--font-danger">*</span></label><div class="col-lg-7 col-xl-6"><input type="password" class="form-control m-input"><div class="form-control-feedback">...<span class="m-form__help"></span>
  <div class="m-form__seperator--dashed">
  <div class="m-alert m-alert--outline alert-info">Để bảo mật...</div>
  <div class="m-portlet__foot--fit"><button class="btn btn-success m-btn--air">Cập nhật</button><button class="btn btn-secondary">Hủy</button>
```

## 4. Lược bỏ
* `m-portlet__nav` search thừa trong `profile.html` header.

## 5. Sửa / Thêm
| Theme | FE |
|---|---|
| `input value="Mark Andre"` hardcode | `formControlName="oldPassword"` + `class.has-danger` + `*ngIf hasError('required')` |
| `m-card-user` 1 card | Thêm 2 card: top `m-portlet--tabs` + bottom `m-portlet` form |
| Không có validation | `Validators.required, minLength(6)` + `passwordMismatch` validator `c.get('newPassword')===c.get('confirmPassword')` |

```typescript
form = fb.group({oldPassword:['',Validators.required], newPassword:['',[Validators.required,minLength(6)]], confirmPassword:['',Validators.required]}, {validators: this.passwordMatchValidator});
submit(){ authService.changePassword({oldPassword,newPassword}).subscribe({next:()=>{form.reset(); notify.success()}}) }
```

## 6. Checklist
- [ ] `oldPassword` rỗng -> `has-danger`
- [ ] `confirm` khác `new` -> `passwordMismatch` hiện đỏ
- [ ] Thành công -> `notify.success` toast + reset form
