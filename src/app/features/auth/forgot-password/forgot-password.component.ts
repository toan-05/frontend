import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  loading = false;
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  constructor(private fb: FormBuilder, private authService: AuthService, private notify: NotificationService, private router: Router) {}

  // TODO: tự code - gọi authService.forgotPassword({email})
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const { email } = this.form.value as any;
    this.authService.forgotPassword({ email })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.notify.success('Password reset link sent to your email');
          this.router.navigate(['/reset-password']);
        },
        error: err => {
          this.notify.error(err?.error?.message || 'Failed to send password reset link');
        }
      });
  }
}
