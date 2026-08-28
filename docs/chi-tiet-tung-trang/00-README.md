# BỘ TÀI LIỆU BÓC TÁCH CHI TIẾT TỪNG TRANG - METRONIC DEFAULT -> FE ANGULAR

> **Mục tiêu:** Dựng FE hoàn chỉnh 1:1 từ theme, copy nguyên class `m-*`, chỉ lược bỏ demo thừa và link lại `routerLink/formControlName`.
> **Theme nguồn:** `D:\demo\default` (Metronic 5.5.5 Classic)
> **FE đích:** `D:\demo\frontend\src`
> **Bundle gốc:** `src/assets/vendors/base/vendors.bundle.css` + `src/assets/demo/default/base/style.bundle.css` load tại `angular.json:32` + `src/index.html:16`

## Danh mục tài liệu chi tiết
| # | File | Trang | Nguồn theme chính |
|---|---|---|---|
| 01 | `01-auth-layout.md` | Khung Auth (nền bg-4.jpg) | `default/snippets/pages/user/login-1.html:55` |
| 02 | `02-login.md` | Đăng nhập | `login-1.html:66` + `login.js:70` |
| 03 | `03-forgot-password.md` | Quên mật khẩu | `login-1.html:126` |
| 04 | `04-reset-password.md` | Đặt lại mật khẩu (mới) | Clone `login-1.html:126` + `backend/ResetPasswordRequest.java:9` |
| 05 | `05-profile.md` | Hồ sơ cá nhân | `default/header/profile.html:1221` |
| 06 | `06-change-password.md` | Đổi mật khẩu | `profile.html:525` + `crud/forms/validation/form-controls.html` |
| 07 | `07-account-list.md` | Danh sách tài khoản (bảng) | `crud/datatables/basic/basic.html` + `search-options/advanced-search.html` |
| 08 | `08-account-form.md` | Tạo/Sửa tài khoản | `crud/forms/layouts/default-forms.html` |
| 09 | `09-layout-header-sidebar.md` | Header + Sidebar + MainLayout + Footer + Breadcrumb | `default/index.html:59` + `header/profile.html:58` |
| 10 | `10-toast-notification.md` | Toast thông báo | `default/components/base/toastr.html:20` + `toastr.js:1` + `sweetalert2.html:20` |

## Nguyên tắc chung cho mọi trang
* **Giữ:** Toàn bộ class `m-portlet`, `m-form`, `m-input`, `m-badge`, `m-btn--pill`, `flaticon-*`, `la-*`.
* **Lược bỏ:** `m-quick-sidebar`, `m-widget1`, `m-nav-sticky`, menu demo `Components/Base/...`, `vendors/jquery` JS.
* **Sửa:** `href="javascript:;"` -> `routerLink`, `name="email"` -> `formControlName`, `button` -> `(ngSubmit)` + `Validators`, `alert()` -> `toastr/Swal`.
* **Flatten DOM:** `src/styles.scss:21` `app-root,app-header,app-sidebar,app-footer,app-breadcrumb,app-main-layout{display:contents}` để `m-header` là con trực tiếp của `m-page` như theme.

## Thứ tự triển khai
1. Core (00) -> `ng build` không 404 ảnh
2. 01 AuthLayout -> 02 Login -> 03 Forgot -> 04 Reset
3. 09 Layout Header/Sidebar
4. 05 Profile -> 06 ChangePassword
5. 07 List -> 08 Form
6. 10 Toast
7. Xóa Dashboard `redirectTo:'accounts'` (đã làm `app-routing.module.ts:17`)
