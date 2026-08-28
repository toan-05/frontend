import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AccountService } from '../../../core/services/account.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  loading = false; saving = false; accountId: number | null = null; isEdit = false;
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    email: ['', [Validators.required, Validators.email]],
    fullName: [''],
    status: ['ACTIVE' as 'ACTIVE' | 'INACTIVE', Validators.required],
    role: ['USER' as 'USER' | 'ADMIN', Validators.required]
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private accountService: AccountService, private notify: NotificationService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id; this.accountId = id ? Number(id) : null;
    if (!this.isEdit) {
      this.form.controls.password.addValidators([Validators.required, Validators.minLength(6)]);
      this.form.controls.password.updateValueAndValidity();
    } else {
      this.form.controls.username.disable();
      this.form.controls.password.disable();
      if (this.accountId === null || isNaN(this.accountId)) {
        this.notify.error('Invalid account id');
        this.router.navigate(['/accounts']);
        return;
      }
      this.loading = true;
      this.accountService.getAccountById(this.accountId!)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: res => {this.form.patchValue(res.data);},
          error: err => {this.notify.error(err?.error?.message || 'Failed to load account'); this.router.navigate(['/accounts']);}
        });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;
    const raw : any = this.form.getRawValue();
    if (this.isEdit) {
      const { username, password, ...payload } = raw;
      this.accountService.updateAccount(this.accountId!, payload)
        .pipe(finalize(() => this.saving = false))
        .subscribe({
          next: () => {this.notify.success('Account updated successfully'); this.router.navigate(['/accounts']);},
          error: err => {this.notify.error(err?.error?.message || 'Failed to update account');}
        });
    } else {
      this.accountService.createAccount(raw)
        .pipe(finalize(() => this.saving = false))
        .subscribe({
          next: () => {this.notify.success('Account created successfully'); this.router.navigate(['/accounts']);},
          error: err => {this.notify.error(err?.error?.message || 'Failed to create account');}
        });
    }
  }
}
