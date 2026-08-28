import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AccountListComponent } from './features/accounts/account-list/account-list.component';
import { AccountFormComponent } from './features/accounts/account-form/account-form.component';
import { NotFoundComponent } from './features/not-found.component';
import { AccountDetailComponent } from './features/accounts/account-detail/account-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'accounts' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  },
  { path: '404', component: NotFoundComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'accounts',
        children: [
          { path: '', component: AccountListComponent },
          { path: 'create', component: AccountFormComponent },
          { path: ':id', component: AccountDetailComponent },
          { path: ':id/edit', component: AccountFormComponent }
        ]
      },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
