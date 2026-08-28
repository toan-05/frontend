# 08 - TRANG TẠO/SỬA TÀI KHOẢN `/accounts/create` + `/accounts/:id/edit`

## 1. File nguồn
* `D:\demo\default\crud\forms\layouts\default-forms.html` `m-portlet m-form--fit m-form__section--first m-form__heading`
* `D:\demo\default\crud\forms\validation\form-controls.html` `form-group row has-danger col-lg-2 col-form-label col-lg-6 form-control-feedback m-form__help m-form__seperator m-portlet__foot--fit`
* `D:\demo\default\crud\forms\controls\base.html` `input type=text/password/email m-input m-input-icon--left la-envelope`
* DTO BE: `backend/dto/request/CreateAccountRequest.java` `username/email/password/fullName/status` + `UpdateAccountRequest.java` `email/fullName/status` (không cho đổi username)
* Enum: `backend/entity/enums/Status.java:3` `ACTIVE/INACTIVE`

## 2. File đích
* `D:\demo\frontend\src\app\features\accounts\account-form\account-form.component.html:1`
* `account-form.component.ts:16` `form username/password/email/fullName/status` + `isEdit` `getAccountById` `createAccount/updateAccount`
* `account-form.component.scss:1`

## 3. Giữ nguyên
```html
<div class="m-portlet"><div class="m-portlet__head"><h3 class="m-portlet__head-text">{{isEdit?'Cập nhật':'Tạo'}} <small>default-forms</small></h3><a routerLink="/accounts" class="btn btn-secondary la-arrow-left">Quay lại</a>
<app-loading [loading]="loading">
<form class="m-form m-form--fit m-form--label-align-right m-form--group-seperator-dashed" [formGroup]="form">
  <div class="m-portlet__body"><div class="m-form__section m-form__section--first"><h3 class="m-form__heading-title">Thông tin tài khoản</h3>
    <div class="form-group m-form__group row" [class.has-danger]="..."><label class="col-lg-2 col-form-label">Username <span class="m--font-danger">*</span></label><div class="col-lg-6"><input class="form-control m-input" placeholder="username"><div class="form-control-feedback">...<span class="m-form__help">
    <div class="form-group row"><label class="col-lg-2">Password *</label><div class="col-lg-6"><input type="password" class="form-control m-input">
    <div class="form-group row"><label class="col-lg-2">Full name</label><div class="col-lg-6"><input type="text">
    <div class="form-group row"><label class="col-lg-2">Email *</label><div class="col-lg-6"><div class="m-input-icon m-input-icon--left"><input type="email" class="form-control m-input"><span class="m-input-icon__icon la-envelope"></span></div>
    <div class="form-group row"><label class="col-lg-2">Status *</label><div class="col-lg-6"><select class="form-control m-input"><option>ACTIVE</option><option>INACTIVE</option></select>
  <div class="m-portlet__foot--fit"><div class="m-form__actions--solid row col-lg-2/col-lg-6"><button class="btn btn-success la-save">Save</button><a routerLink="/accounts" class="btn btn-secondary">Cancel</a>
```

## 4. Lược bỏ
| Bỏ | Lý do |
|---|---|
| `confirmPassword` input | Không có trong `CreateAccountRequest` |
| `role` `m-select2` `USER/ADMIN/EDITOR` | BE không có role, chỉ `status` |
| `enabled` `m-bootstrap-select` checkbox | Gộp vào `status` |

## 5. Sửa
| Theme | FE |
|---|---|
| `input name="username"` | `formControlName="username" [class.is-invalid]="touched && hasError('required'/'minlength')" ` + `m-form__help "Username không thể đổi khi cập nhật"` |
| `Password` luôn hiện | `*ngIf="!isEdit"` + `addValidators(required,minLength(6))` khi create, `disable()` khi edit |
| `role select2` | `status` `select` 2 option `ACTIVE/INACTIVE` `m--font-danger` |
| `Save` `type="submit"` | `[disabled]="saving"` spinner `fa-spin` + `router.navigate(['/accounts'])` sau `notify.success` |

```typescript
form = fb.group({username:['',[required,minLength(3)]], password:[''], email:['',[required,email]], fullName:[''], status:['ACTIVE',required]});
ngOnInit(){ if(!isEdit) password.addValidators([required,minLength(6)]); else {username.disable(); password.disable(); loadAccount()}}
submit(){ const req = isEdit ? updateAccount(id,{email,fullName,status}) : createAccount({username,email,password,fullName,status}) }
```

## 6. Checklist
- [ ] Create: `username/password/email` bắt buộc, `minLength` hiện đỏ
- [ ] Edit: `username/password` disable, chỉ sửa `email/fullName/status`
- [ ] Save -> `POST /api/v1/account` hoặc `PUT /{id}` -> toast + về `/accounts`
