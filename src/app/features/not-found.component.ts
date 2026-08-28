import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="m-portlet">
      <div class="m-portlet__body text-center">
        <h1>404</h1>
        <p>Không tìm thấy trang.</p>
        <a routerLink="/accounts" class="btn btn-primary mt-3">Về trang quản lý tài khoản</a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
