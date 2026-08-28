# HƯỚNG DẪN BÓC TÁCH CHI TIẾT TỪNG TRANG - METRONIC DEFAULT -> FE ANGULAR

> Nguyên tắc: **Copy 1:1 class `m-*` HTML/CSS**, chỉ lược bỏ phần thừa demo và link lại `routerLink/formControlName`. Không tự viết lại CSS layout - dùng `style.bundle.css` + `vendors.bundle.css`.

---

## 0. CHUẨN BỊ CORE (Áp dụng cho mọi trang)

| File FE đích | Nguồn theme | Nội dung giữ | Lược bỏ | Sửa/thêm |
|---|---|---|---|---|
| `src/index.html:23` | `default/index.html:59` `<body class="m-page--fluid m-header--fixed m-aside-left--enabled ...">` | Y nguyên 9 class `m-page--fluid/m-header--fixed/m-aside-left--skin-dark` | - | Giữ để `style.bundle` tự fixed header/sidebar |
| `src/assets/vendors/base/vendors.bundle.css` | `default/assets/vendors/base/vendors.bundle.css` | `bootstrap, font-awesome, line-awesome, flaticon` | - | Copy nguyên qua `angular.json:32` `styles` |
| `src/assets/demo/default/base/style.bundle.css` | `default/assets/demo/default/base/style.bundle.css` | `.m-header/.m-brand/.m-aside-left/.m-portlet/.m-form/.m-datatable/.m-login` | - | `angular.json:32` load sau vendors |
| `src/styles.scss:21` | - | - | Xóa `m-body{display:flex}` ghi đè | Thêm `app-root,app-header,app-sidebar,app-footer,app-breadcrumb,app-main-layout{display:contents}` để DOM phẳng |
| `src/assets/app/media/img/*` | `default/assets/app/media/img/logos/logo-2.png`, `bg/bg-4.jpg`, `users/user4.jpg`, `misc/user_profile_bg.jpg` | Đường dẫn y nguyên | Ảnh demo thay bằng PNG 1x1 valid giữ `url()` không 404 |

---

## 1. TRANG LOGIN - `/login`

**Nguồn:** `default/snippets/pages/user/login-1.html:55` (khung) + `:66` (form signin) + `assets/snippets/custom/pages/user/login.js:70`

**Đích:** `src/app/layout/auth-layout/auth-layout.component.html:2` + `src/app/features/auth/login/login.component.html:2` + `login.component.ts:16`

| Giữ nguyên | Lược bỏ | Sửa/Thêm |
|---|---|---|
| `auth-layout: <div class="m-grid--hor m-page"><div id="m_login" class="m-login m-login--1 m-login--signin" style="background-image:url(bg-4.jpg)">` `m-login__aside` `m-login__content` `m-login__wrapper/logo-2.png` | `login-1.html` 3 tab `m-login__signin/signup/forget-password` gộp - xóa `signup` `login-1.html:93` | Thay 3 div bằng `<router-outlet>` tách route `app-routing.module.ts:21` |
| `login.html: <div class="m-login__signin"><div class="m-login__head"><h3 class="m-login__title">Sign In To Admin</h3>` `form.m-login__form m-form` `input.m-input` `m-login__form-sub` `m-checkbox--focus` `btn m-btn--pill m-btn--air` | `login.js` `jquery.validate` + `ajaxSubmit` | `name="email"` -> `formControlName="username"` `[class.is-invalid]` + `*ngIf hasError('required')` `m--font-danger`, `Forget Password` `href="javascript:;"` -> `routerLink="/forgot-password"` |

**Checklist:** `/login` hiện `m-login__wrapper` căn giữa, submit `admin/123456` -> `NotificationService` toast + `navigate(['/accounts'])`.

---

## 2. TRANG QUÊN MẬT KHẨU - `/forgot-password`

**Nguồn:** `default/snippets/pages/user/login-1.html:126` `m-login__forget-password`

**Đích:** `src/app/features/auth/forgot-password/forgot-password.component.html:2` + `forgot-password.component.ts:14`

| Giữ | Lược bỏ | Sửa |
|---|---|---|
| `m-login__forget-password` `m-login__head` `Forgotten Password ?` `m-login__desc Enter your email` `form.m-form` `input#m_email m-input` `m-login__form-action btn--pill` | - | `form [formGroup]="form"` `Validators.email`, `Cancel` `routerLink="/login"` + thêm link `routerLink="/reset-password"` |

---

## 3. TRANG ĐẶT LẠI MẬT KHẨU - `/reset-password` (MỚI, không có sẵn trong theme)

**Nguồn:** Clone `login-1.html:126` `m-login__forget-password` + `backend/dto/request/ResetPasswordRequest.java:9`

**Đích:** `src/app/features/auth/reset-password/reset-password.component.html:1` + `reset-password.component.ts:16`

| Giữ | Thêm |
|---|---|
| `m-login__head`, `m-input`, `m-login__form-action` y `forgot` | 3 field `token` (lấy `?token=` `ActivatedRoute.queryParamMap`), `newPassword` `Validators.minLength(6)`, `confirmPassword` check `mismatch` -> `AuthService.resetPassword({token,newPassword})` |

**Route:** Cả `AuthLayout` (public) và `MainLayout` (auth) `app-routing.module.ts:24,47`.

---

## 4. TRANG PROFILE - `/profile`

**Nguồn:** `default/header/profile.html:1221` `m-content row` + `:1224 m-card-profile` + `:1327 m-portlet--tabs`

**Đích:** `src/app/features/profile/profile.component.html:1` + `profile.component.ts:12`

| Giữ | Lược bỏ | Sửa |
|---|---|---|
| `row col-xl-3 m-portlet m-card-profile__pic-wrapper user4.jpg` `m-card-profile__name/email` `col-xl-9 m-portlet--tabs nav-tabs m-tabs--line` `tab-pane #m_user_profile_tab_1` `m--hide` | `m-widget1 Member Profit/Orders` `:1288`, `Activity/Messages/Sales/Events` `:1240`, `quick_sidebar` `:1589`, `m-subheader` | `Mark Andre` -> `{{user?.username}}` `AuthService.getCurrentUser()`, `href="../header/profile.html"` -> `routerLink="/change-password"` `+ activeTab` logic |

---

## 5. TRANG ĐỔI MẬT KHẨU - `/change-password`

**Nguồn:** `default/header/profile.html:525` `m-card-user` + `default/crud/forms/validation/form-controls.html` + `controls/base.html`

**Đích:** `src/app/features/auth/change-password/change-password.component.html:2` + `change-password.component.ts:16`

| Giữ | Lược bỏ | Sửa |
|---|---|---|
| `m-portlet m-portlet--full-height m-portlet--tabs m-card-user--skin-dark user_profile_bg.jpg` `m-form--fit m-form--label-align-right m-form--group-seperator-dashed` `form-group row has-danger` `col-lg-3/col-xl-6` `form-control m-input` `form-control-feedback` `m-form__help` `m-alert--outline` `m-portlet__foot--fit` | `m-portlet__nav` search thừa | 3 input `oldPassword/newPassword/confirmPassword` `formControlName` + `passwordMatchValidator` `Validators.minLength(6)` |

---

## 6. TRANG QUẢN LÝ TÀI KHOẢN - `/accounts` (CRUD)

### 6a. LIST `account-list`

**Nguồn:** `default/crud/datatables/basic/basic.html` + `data-sources/ajax-server-side.html` + `search-options/advanced-search.html`

**Đích:** `src/app/features/accounts/account-list/account-list.component.html:2` + `account-list.component.ts:12`

| Giữ | Lược bỏ | Sửa |
|---|---|---|
| `m-portlet--mobile m-portlet__head-tools` `m-datatable--default table-striped table-bordered table-hover table-checkable` `thead sorting` `m-badge--success/metal` `m-datatable__pager` | Demo data | `New Record` -> `routerLink="/accounts/create"`, `advanced-search` `m-input-icon la-search` -> `[(ngModel)]="keyword" (keyup.enter)="search()"`, `*ngFor="account"` `m-badge--wide` `la-edit/la-trash` `(click)="openDeleteDialog"` + `app-confirm-dialog` `sweetalert2.html`, `changePage()` pager |

### 6b. FORM `accounts/create` + `accounts/:id/edit`

**Nguồn:** `default/crud/forms/layouts/default-forms.html` + `validation/form-controls.html` + `controls/base.html`

**Đích:** `src/app/features/accounts/account-form/account-form.component.html:1` + `account-form.component.ts:16`

| Giữ | Lược bỏ | Sửa |
|---|---|---|
| `m-portlet m-form--fit m-form__section--first m-form__heading` `col-lg-2/col-lg-6` `has-danger` `m-input-icon--left la-envelope` `m-form__help` `m-portlet__foot--fit` `btn--air` | `confirmPassword`, `role m-select2`, `enabled m-bootstrap-select` (không khớp BE) | `username` `disable` khi edit (BE không cho đổi), `password` chỉ khi `!isEdit` `Validators.required`, `status ACTIVE/INACTIVE` `Status.java`, `submit()` -> `createAccount/updateAccount` |

---

## 7. LAYOUT CHUNG

| Component | Nguồn | Giữ | Lược bỏ |
|---|---|---|---|
| `header` `header.component.html:6` | `index.html:65` `m-header m-brand--skin-dark` + `profile.html:507` `m-topbar__user-profile` | `m-container--fluid` `m-stack--ver` `m-brand__logo-wrapper` `m-card-user` | `m-header-menu` Actions/Reports/Apps, `m-list-search`, `notifications` |
| `sidebar` `sidebar.component.html:2` | `index.html:619` `m-aside-left m-aside-menu--skin-dark` | `m-menu__nav--dropdown-submenu-arrow` `flaticon-*` | Toàn bộ submenu `Base/Icons/Buttons` |
| `main-layout` `main-layout.html:2` | `index.html:62` `m-page m-body m-wrapper m-content` | `m-grid__item--fluid` `m-scroll-top` | `m-quick-sidebar` |
| `breadcrumb` `breadcrumb.html:2` | `crud/datatables/basic` `m-subheader` | `m-subheader__title--separator la-home` | daterange |
| `footer` `footer.html:2` | `index.html` `m-footer` | `m-footer__copyright` | - |
| `toast` `notification.service.ts:7` | `components/base/toastr.html:20` `toastr.js:1` + `sweetalert2.html:20` | `toastr.options closeButton/progressBar toast-top-right` | `alert()` cũ -> `toastr.success/error` fallback `Swal.fire` |

---

## 8. THỨ TỰ TRIỂN KHAI
1. Core (assets + index.html) -> `ng build` không 404
2. AuthLayout + Login/Forgot/Reset
3. MainLayout Header/Sidebar/Footer/Breadcrumb
4. Profile + ChangePassword
5. Accounts List/Form + ConfirmDialog/Loading
6. Notification Toast
7. Xóa Dashboard, đổi `redirectTo:'accounts'` `login.ts navigate(['/accounts'])`

**Verify:** `ng build` `main ~80KB` + so pixel `default/index.html` tại `/accounts`, `/profile` - sidebar cố định `255px` `top:70px`, content `padding-left:255px`.
