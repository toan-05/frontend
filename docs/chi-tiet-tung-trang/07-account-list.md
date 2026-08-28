# 07 - TRANG DANH SÁCH TÀI KHOẢN `/accounts`

## 1. File nguồn
* `D:\demo\default\crud\metronic-datatable\base\data-ajax.html` (tham khảo)
* `D:\demo\default\crud\datatables\basic\basic.html` `m-portlet m-portlet--mobile table-striped table-bordered table-hover table-checkable`
* `D:\demo\default\crud\datatables\search-options\advanced-search.html` `m-form m--margin-bottom-30 m-input-icon--left la-search`
* `D:\demo\default\crud\datatables\data-sources\ajax-server-side.html` + `ajax-server-side.js` `m-datatable__pager`
* `D:\demo\default\components\base\sweetalert2.html` `m-alert` confirm
* `D:\demo\default\assets\vendors\custom\datatables\datatables.bundle.css` + `js`

## 2. File đích
* `D:\demo\frontend\src\app\features\accounts\account-list\account-list.component.html:2`
* `account-list.component.ts:12` `page/size/totalPages/totalElements/keyword` + `loadAccounts()` `getAccounts(page,size,keyword)` + `changePage()` + `confirmDelete()`
* `core/services/account.service.ts:25` `GET /api/v1/account?page&size&keyword`

## 3. Giữ nguyên
```html
<div class="m-portlet m-portlet--mobile"><div class="m-portlet__head"><h3 class="m-portlet__head-text">Basic Datatables <small>server-side</small></h3><ul class="m-portlet__nav"><a class="btn btn-accent la-plus">New Record</a><a class="btn la-search" (click)="showAdvancedSearch=!showAdvancedSearch">
<div class="m-form m--margin-bottom-30" *ngIf="showAdvancedSearch"><div class="m-input-icon m-input-icon--left"><input class="form-control m-input" placeholder="Search..."><span class="m-input-icon__icon la-search"><div class="m-separator--dashed">
<div class="m-datatable m-datatable--default"><table class="table table-striped table-bordered table-hover table-checkable" id="m_table_1"><thead><tr><th class="sorting">Username</th><th>Full name</th><th>Email</th><th>Status</th><th>Actions</th><tbody><tr *ngFor="let account"><span class="m--font-bold">{{username}}<a class="m-link">{{email}}<span class="m-badge m-badge--wide" [class.m-badge--success]="ACTIVE">{{status}}<a class="btn btn-outline-primary la-edit"><button class="btn btn-outline-danger la-trash">
<div class="m-datatable__pager"><ul class="m-datatable__pager-nav"><a class="m-datatable__pager-link--first la-angle-double-left"><a class="m-datatable__pager-link--prev la-angle-left"><span class="m-datatable__pager-detail">Showing {{page*size+1}} - {{min()}} of {{total}}<a class="m-datatable__pager-link--active">{{item+1}}<a class="m-datatable__pager-link--next la-angle-right"><a class="m-datatable__pager-link--last la-angle-double-right">
<app-confirm-dialog title="Bạn có chắc?" [message]="'xóa ' + username">
```

## 4. Lược bỏ
* `DataTables.net` `$('#m_table_1').DataTable({...})` - thay bằng Angular `*ngFor` + `PageResponse`.

## 5. Sửa
| Theme | FE |
|---|---|
| `New Record` `href="crud/datatables/basic/basic.html"` | `routerLink="/accounts/create"` `btn-accent m-btn--air` |
| `Search` `input name="keyword"` jQuery | `[(ngModel)]="keyword" (keyup.enter)="search()" (click)="search()" resetSearch()` |
| `table td` hardcode `Tiger Nixon` | `{{account.username}} {{account.fullName}} {{account.email}}` `m-badge--success/metal` |
| `pager` `ajax-server-side.js` | `pages:number[]` `changePage(page)` `min((page+1)*size,total)` |
| `sweetalert2` `swal("Bạn có chắc?")` | `<app-confirm-dialog [visible]="deleteDialogVisible" (confirmed)="confirmDelete()">` `deleteAccount(id)` |

## 6. Checklist
- [ ] `Search` -> `getAccounts(0,10,keyword)` filter `username/email`
- [ ] Pager click đổi `page` load lại
- [ ] Trash -> confirm -> `DELETE /api/v1/account/{id}` -> toast
