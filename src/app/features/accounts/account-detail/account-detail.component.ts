import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Account } from 'src/app/core/models/user.model';
import { AccountService } from 'src/app/core/services/account.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
    loading = false; account :Account | null = null; id: number | null = null;
    constructor(private route:ActivatedRoute, private router: Router, private accountService:AccountService, private notify:NotificationService) {}
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id || isNaN(Number(id))) {
          this.notify.error('Invalid account id');
          this.router.navigate(['/accounts']);
          return;
        }
        this.id = Number(id);
        this.loading = true;
        this.accountService.getAccountById(this.id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
            next: res => {this.account = res.data;},
            error: err => {this.notify.error(err?.error?.message || 'Failed to load account'); this.router.navigate(['/accounts']);}
        });
    }
};