import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CurrentUser } from '../../core/models/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: CurrentUser | null = null;
  activeTab = 'overview';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}
