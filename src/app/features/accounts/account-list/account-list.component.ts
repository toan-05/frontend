import { Component, OnInit } from '@angular/core';
import { Account } from '../../../core/models/user.model';
import { AccountService } from '../../../core/services/account.service';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;
  keyword = '';
  showAdvancedSearch = false;
  loading = false;
  deleteDialogVisible = false;
  selectedAccount: Account | null = null;

  constructor(private accountService: AccountService, private notify: NotificationService, public authService: AuthService) {}

  ngOnInit(): void { this.loadAccounts(); }

  // TODO 5: tự code - gọi accountService.getAccounts(page,size,keyword), gán accounts, totalPages, totalElements, xử lý loading
  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAccounts(this.page, this.size, this.keyword)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.accounts = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
        },
        error: (err) => {
          this.notify.error(err?.error?.message || 'Failed to load accounts');
        },
      });
  }

  search(): void { this.page = 0; this.loadAccounts(); }
  resetSearch(): void { this.keyword = ''; this.page = 0; this.loadAccounts(); }
  changePage(page: number): void { if (page < 0 || page >= this.totalPages) return; this.page = page; this.loadAccounts(); }
  openDeleteDialog(account: Account): void { this.selectedAccount = account; this.deleteDialogVisible = true; }
  closeDeleteDialog(): void { this.selectedAccount = null; this.deleteDialogVisible = false; }

  // Xóa mềm - gọi softDelete -> set INACTIVE, BE: POST /{id}/soft-delete
  confirmDelete(): void {
    if (!this.selectedAccount) return;
    this.accountService.softDelete(this.selectedAccount.id)
      .subscribe({
        next: () => {
          this.notify.success('Account deleted successfully');
          this.loadAccounts();
        },
        error: (err) => {
          this.notify.error(err?.error?.message || 'Failed to delete account');
        },
        complete: () => {
          this.closeDeleteDialog();
        }
      });
  }

  min(a: number, b: number): number { return Math.min(a, b); }
  get pages(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i); }
}
