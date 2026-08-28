# 09 - LAYOUT CHUNG HEADER + SIDEBAR + MAINLAYOUT + FOOTER + BREADCRUMB

## 1. File nguồn
* `D:\demo\default\index.html:59` `<div class="m-grid m-grid--hor m-grid--root m-page">`
* `index.html:65` `<header id="m_header" class="m-grid__item m-header" m-minimize-offset="200">` `m-container--fluid m-stack--ver m-stack--desktop`
* `index.html:619` `<div id="m_aside_left" class="m-grid__item m-aside-left m-aside-left--skin-dark">` `m-aside-menu m-menu__nav`
* `header/profile.html:58` `m-topbar m-topbar__user-profile m-dropdown m-card-user` `user_profile_bg.jpg`
* `index.html` `m-footer` `m-subheader`

## 2. File đích
* `src/app/layout/main-layout/main-layout.component.html:2` + `.scss:1` `:host{display:contents}`
* `src/app/layout/header/header.component.html:6` + `.scss:1`
* `src/app/layout/sidebar/sidebar.component.html:2` + `.scss:1`
* `src/app/layout/footer/footer.component.html:2`
* `src/app/layout/breadcrumb/breadcrumb.component.html:2` + `.ts:12`
* `src/styles.scss:21` `app-root,app-header,app-sidebar,app-footer,app-breadcrumb{display:contents}`

## 3. Giữ nguyên
```html
<!-- main-layout -->
<div class="m-grid m-grid--hor m-grid--root m-page">
  <app-header><!-- header.html:6 header#m_header m-grid__item m-header m-container m-stack m-brand--skin-dark logo_default_dark.png + 4 toggler span + m-header-head#m_header_nav m-topbar m-stack--fluid m-topbar__nav m-nav--inline m-dropdown m-card-user --></app-header>
  <div class="m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
    <button id="m_aside_left_close_btn" class="m-aside-left-close--skin-dark la-close"></button>
    <app-sidebar><!-- #m_aside_left m-grid__item m-aside-left--skin-dark #m_ver_menu m-aside-menu--submenu-skin-dark m-menu__nav --></app-sidebar>
    <div class="m-grid__item--fluid m-wrapper"><app-breadcrumb><!-- m-subheader m-subheader__title--separator la-home --></app-breadcrumb><div class="m-content"><router-outlet></div></div>
  </div>
  <app-footer><!-- footer m-grid__item m-footer m-container m-stack m-footer__copyright --></app-footer>
</div>
<div id="m_scroll_top" class="m-scroll-top la-arrow-up">
```

## 4. Lược bỏ
| Bỏ | Lý do |
|---|---|
| `m-header-menu` `Actions/Reports/Apps` `index.html:115` | Menu dummy demo |
| `m-list-search`, `m-topbar__notifications`, `quick_actions`, `languages` | Thừa, giữ lại 1 `user-profile` |
| `m-aside` submenu `Components/Base/...` `index.html:628` | Chỉ giữ 5 item `Quản trị` |
| `m-quick-sidebar` `m-nav-sticky` | Demo |

## 5. Sửa
| Theme | FE |
|---|---|
| `m-brand__logo-wrapper href="index.html"` | `routerLink="/accounts"` |
| `m-aside-left ul li Dashboard href="index.html"` | Xóa, chỉ giữ `Quản lý tài khoản` `routerLink="/accounts"` + `My Profile` + `Đổi MK` `routerLinkActive="m-menu__item--active"` |
| `m-topbar__user-profile href="../../header/profile.html"` | `routerLink="/profile"` |
| `body.m-page--fluid` | Giữ `src/index.html:23` y nguyên 9 class để `style.bundle` tự `position:fixed top:70px padding-left:255px` |

## 6. SCSS
Tất cả `:host{display:contents}` - không ghi đè `m-header height:70px`, `m-brand width:255px`, `m-aside-left width:255px` của `style.bundle.css`, tránh sidebar lệch giữa.

## 7. Checklist
- [ ] Header trắng `70px` + brand tối `255px` cố định
- [ ] Sidebar đen cố định trái `255px` `top:70px`
- [ ] Content `padding-left:255px` không lệch
