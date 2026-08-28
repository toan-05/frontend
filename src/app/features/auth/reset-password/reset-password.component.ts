import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  form = this.fb.group({
    token: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) this.form.patchValue({ token });
  }

  // TODO: tự code - check newPassword===confirmPassword rồi gọi authService.resetPassword({token,newPassword})
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { token, newPassword, confirmPassword } = this.form.value as any;
    if (newPassword !== confirmPassword) {
      this.notify.error('New password and confirm password do not match');
      return;
    }
    this.loading = true;
    this.authService.resetPassword({ token, newPassword })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.notify.success('Password reset successfully');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.notify.error(err?.error?.message || 'Failed to reset password');
        }
      });
  }
}
