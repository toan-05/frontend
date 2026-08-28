# 05 - TRANG PROFILE `/profile`

## 1. File nguồn
* `D:\demo\default\header\profile.html:1221` `<div class="m-content"><div class="row"><div class="col-xl-3 col-lg-4"><div class="m-portlet m-portlet--full-height"><div class="m-portlet__body"><div class="m-card-profile">`
* `profile.html:1225` `m-card-profile__pic-wrapper user4.jpg` `m-card-profile__details name/email`
* `profile.html:1240` `ul.m-nav m-nav--hover-bg m-portlet-fit--sides` `My Profile/Activity/Messages/Sales/Events/Support`
* `profile.html:1327` `col-xl-9 m-portlet--tabs` `nav-tabs m-tabs--line m-tabs--line--left`
* `profile.html:1414` `tab-pane #m_user_profile_tab_1` `m-form__section Personal Details` `m-form__seperator--dashed`
* `profile.html:1513` `m-portlet__foot m-form__actions`

## 2. File đích
* `D:\demo\frontend\src\app\features\profile\profile.component.html:1`
* `profile.component.ts:12` `user:CurrentUser | null = authService.getCurrentUser()` + `activeTab='overview'`
* `profile.component.scss:1`
* Route `app-routing.module.ts:42` `path:'profile' component:ProfileComponent` (MainLayout)

## 3. Giữ nguyên
```html
<div class="row"><div class="col-xl-3 col-lg-4"><div class="m-portlet m-portlet--full-height"><div class="m-portlet__body"><div class="m-card-profile"><div class="m-card-profile__pic-wrapper"><img src="assets/app/media/img/users/user4.jpg"></div><div class="m-card-profile__details"><span class="m-card-profile__name">Mark Andre</span><a class="m-card-profile__email">`
`col-xl-9 <div class="m-portlet m-portlet--tabs"><div class="m-portlet__head"><ul class="nav nav-tabs m-tabs m-tabs-line"><li class="nav-item m-tabs__item"><a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_user_profile_tab_1">Update Profile</a>`
`tab-content <div class="tab-pane active" id="m_user_profile_tab_1"><form class="m-form m-form--fit m-form--label-align-right"><div class="m-portlet__body"><div class="form-group m-form__group row"><label class="col-2 col-form-label">Full Name</label><div class="col-7"><input class="form-control m-input">`
```

## 4. Lược bỏ
| Bỏ | Lý do |
|---|---|
| `m-widget1 Member Profit/Orders/Issue Reports` `profile.html:1288` | Data giả demo |
| `ul.m-nav Activity/Messages/Sales/Events/Support` `profile.html:1256` | Link dummy, giữ lại 1 `My Profile` |
| `m-subheader` `My Profile` + dropdown `Quick Actions` `:1160` | Đã có `breadcrumb` chung |
| `m-quick-sidebar` `:1589` `m-nav-sticky` | Demo |

## 5. Sửa / Thêm
| Theme | FE |
|---|---|
| `Mark Andre` `mark.andre@gmail.com` hardcode | `{{user?.username}}` `{{user?.username}}` từ `TokenService` |
| `href="../header/profile&amp;demo=default.html"` 5 link dummy | `href="javascript:;" (click)="activeTab='overview'"` + `routerLink="/change-password"` + `routerLink="/accounts"` |
| `tab-pane` static `data-toggle="tab"` | `[class.active]="activeTab==='overview'" (click)="activeTab='overview'"` Angular |
| Thêm tab `Account` `Settings` | `profile.html:1` 3 tab `Overview/Account/Settings` với link tới `change-password/reset-password` |
| `m-form__section 1. Personal Details` `Full Name/CTO/Company` | Đổi thành `Username` `readonly`, `Email` `readonly`, `Actions` 2 btn `Đổi mật khẩu` |

## 6. Checklist
- [ ] `user4.jpg` tròn 80px, `m-card-profile__name` hiện username đăng nhập
- [ ] Click tab đổi `active`
- [ ] Nút `Đổi mật khẩu` -> `/change-password`, `Đặt lại` -> `/reset-password`
