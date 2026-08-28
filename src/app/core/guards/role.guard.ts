import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
  const roles = route.data['roles'] as UserRole[] | undefined;
  const user = this.authService.getCurrentUser();
  if (!user) return this.router.createUrlTree(['/login']);
  if (!roles || roles.includes(user.role)) return true;
  return this.router.createUrlTree(['/404']);
}
}
