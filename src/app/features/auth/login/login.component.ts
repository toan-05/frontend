import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoginPayload } from '../../../core/models/auth.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading = false;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notify: NotificationService
  ) {}

  // TODO: tự code - gọi authService.login(payload) -> navigate /accounts, xử lý loading + error
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.authService.login(this.form.getRawValue() as LoginPayload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.router.navigate(['/accounts']),
        error: err => this.notify.error(err?.error?.message || 'Login failed')
      });
  }
}
