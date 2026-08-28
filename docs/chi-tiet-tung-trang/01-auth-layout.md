# 01 - AUTH LAYOUT (Khung nền đăng nhập)

## 1. Mục tiêu
Tạo khung `m-login` dùng chung cho `/login`, `/forgot-password`, `/reset-password`, nền `bg-4.jpg` y theme.

## 2. File nguồn theme
* `D:\demo\default\snippets\pages\user\login-1.html:55` `<div class="m-grid m-grid--hor m-grid--root m-page">`
* `login-1.html:56` `<div id="m_login" class="m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-grid--tablet-and-mobile m-login m-login--1 m-login--signin">`
* `login-1.html:57` `<div class="m-login__aside m-grid__item--order-tablet-and-mobile-2">`
* `login-1.html:60` `<div class="m-login__wrapper"><div class="m-login__logo"><img src="assets/app/media/img/logos/logo-2.png">`
* `login-1.html:92` `m-login__container`
* `login-1.html:153` `<div class="m-login__content m-grid__item--order-tablet-and-mobile-1" style="background-image:url(bg-4.jpg)">` `Join Our Community`

## 3. File đích FE
* `D:\demo\frontend\src\app\layout\auth-layout\auth-layout.component.html:1`
* `D:\demo\frontend\src\app\layout\auth-layout\auth-layout.component.ts:1` (rỗng)
* `D:\demo\frontend\src\app\app-routing.module.ts:19` `component:AuthLayoutComponent children: login/forgot/reset`

## 4. Giữ nguyên 100%
```html
<div class="m-grid m-grid--hor m-grid--root m-page">
  <div id="m_login" class="m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-grid--tablet-and-mobile m-login m-login--1 m-login--signin">
    <div class="m-grid__item m-grid__item--order-tablet-and-mobile-2 m-login__aside">
      <div class="m-stack m-stack--hor m-stack--desktop">
        <div class="m-stack__item m-stack__item--fluid">
          <div class="m-login__wrapper">
            <div class="m-login__logo"><a routerLink="/login"><img src="assets/app/media/img/logos/logo-2.png"></a></div>
```
* Toàn bộ class `m-login--1`, `m-login__aside`, `m-stack--hor`, `m-login__wrapper` giữ y theme.
* Nền `style="background-image:url(assets/app/media/img/bg/bg-4.jpg)"` giữ.

## 5. Lược bỏ
* Theme có 3 div cùng cấp `m-login__signin` `:66` + `m-login__signup` `:93` + `m-login__forget-password` `:126` trong cùng `m-login__wrapper` - **xóa 3 div**, thay bằng 1 `<router-outlet></router-outlet>` để tách route.
* Xóa `<script src="assets/snippets/custom/pages/user/login.js">` - thay bằng Angular.

## 6. Sửa / Thêm
| Theme | FE |
|---|---|
| `<a href="#"> <img src="../../../assets/.../logo-2.png">` | `<a routerLink="/login"><img src="assets/app/media/img/logos/logo-2.png">` đổi `../../../` thành `assets/` do `angular.json:28` `assets: ["src/assets"]` |
| `m-login__account` `Don't have an account ? Sign Up` `id="m_login_signup"` | Giữ block nhưng đổi text `Bạn chưa có tài khoản ? Liên hệ Admin` + bỏ `id` JS, giữ `m-link--focus` |

## 7. Code đích `auth-layout.component.html:1`
```html
<!-- THEME SOURCE login-1.html:55 y nguyên, chỉ thay 3 div bằng router-outlet -->
<div class="m-grid m-grid--hor m-grid--root m-page">
  <div id="m_login" class="m-grid__item--fluid ... m-login m-login--1 m-login--signin">
    <div class="m-login__aside">...<div class="m-login__wrapper"><div class="m-login__logo">...</div>
      <router-outlet></router-outlet>
      <div class="m-login__account"><span>Bạn chưa có tài khoản ?</span><a class="m-link">Liên hệ Admin</a></div>
    </div></div>
    <div class="m-login__content" style="background-image:url(assets/app/media/img/bg/bg-4.jpg)"><h3>Join Our Community</h3></div>
  </div>
</div>
```

## 8. Checklist
- [ ] `npm run build` ảnh `bg-4.jpg`/`logo-2.png` không 404
- [ ] `/login` hiển thị `m-login__wrapper` căn trái, `m-login__content` phải như theme
- [ ] `router-outlet` render `login` mặc định
