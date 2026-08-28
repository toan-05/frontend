import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  title = 'Quản lý tài khoản';
  crumbs: { label: string; url: string }[] = [];

  private readonly map: Record<string, string> = {
    accounts: 'Quản lý tài khoản',
    create: 'Tạo mới',
    edit: 'Cập nhật',
    'change-password': 'Đổi mật khẩu',
    'reset-password': 'Đặt lại mật khẩu',
    'forgot-password': 'Quên mật khẩu',
    profile: 'My Profile'
  };

  constructor(router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      const url = (event as NavigationEnd).urlAfterRedirects;
      this.build(url);
    });
    this.build(router.url);
  }

  private build(url: string): void {
    const segments = url.split('?')[0].split('/').filter(Boolean);
    if (!segments.length) {
      this.title = 'Quản lý tài khoản';
      this.crumbs = [{ label: 'Quản lý tài khoản', url: '/accounts' }];
      return;
    }
    const clean = segments.filter((s) => isNaN(Number(s)));
    this.title = this.map[clean[clean.length - 1]] || this.map[clean[0]] || clean[clean.length - 1];
    this.crumbs = clean.map((seg, idx) => ({
      label: this.map[seg] || seg,
      url: '/' + clean.slice(0, idx + 1).join('/')
    }));
  }
}
