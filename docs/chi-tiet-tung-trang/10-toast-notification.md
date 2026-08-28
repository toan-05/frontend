# 10 - TOAST THÔNG BÁO

## 1. File nguồn
* `D:\demo\default\components\base\toastr.html:20` `Toastr` `assets/demo/default/custom/components/base/toastr.js:1` `toastr.options={closeButton:true,progressBar:true,positionClass:'toast-top-right',timeOut:'3000'}`
* `default/components/base/bootstrap-notify.html:20` `$.notify`
* `default/components/base/sweetalert2.html:20` `assets/vendors/custom/sweetalert2/sweetalert2.bundle.js` `Swal.fire` `swal2-toast`
* `D:\demo\frontend\src\assets\vendors\base\vendors.bundle.js` (đã chứa `toastr` + `Swal`) + `style.bundle.css` `.toast/.swal2-popup`

## 2. File đích
* `D:\demo\frontend\src\app\core\services\notification.service.ts:7` `success(message)` `error(message)`
* Sử dụng tại: `login.component.ts:32` `forgot.component.ts:19` `reset.component.ts:33` `change-password.component.ts:24` `account-list.component.ts:32` `account-form.component.ts:35`

## 3. Giữ nguyên
* `vendors.bundle.css/js` load tại `angular.json:32` `styles` + `scripts` - giữ nguyên `toastr` + `Swal` global.

## 4. Lược bỏ
* `toastr.html` demo form `showtoast` `#toastTypeGroup` - không copy UI demo, chỉ lấy `toastr.options`.

## 5. Sửa / Thêm
```typescript
// notification.service.ts:7
declare var toastr:any; declare var Swal:any;
ensureToastrDefaults(){ toastr.options={closeButton:true,progressBar:true,positionClass:'toast-top-right',timeOut:'3000',...}; }
success(msg){ ensure(); if(toastr.success) toastr.success(msg); else if(Swal) Swal.fire({toast:true,position:'top-end',icon:'success',title:msg,timer:3000}); else alert(msg); }
error(msg){ similar toastr.error / Swal icon:'error' }
```

## 6. Checklist
- [ ] `login` sai -> `toastr.error` góc phải trên
- [ ] `createAccount` thành công -> `toastr.success` + `Swal` fallback
