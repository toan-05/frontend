import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  loading = false;
  form = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });
  constructor(private fb: FormBuilder, private authService: AuthService, private notify: NotificationService) {}

  // TODO: tự code - gọi authService.changePassword({oldPassword,newPassword})
  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    const { oldPassword, newPassword } = this.form.value as any;
    this.authService.changePassword({ oldPassword, newPassword })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.notify.success('Password changed successfully');
          this.form.reset();
        },
        error: err => {
          this.notify.error(err?.error?.message || 'Failed to change password');
        }
      });
  }

  private passwordMatchValidator(c: AbstractControl): ValidationErrors | null { return c.get('newPassword')?.value === c.get('confirmPassword')?.value ? null : { passwordMismatch: true }; }
}
