import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { USER_ROLES } from '@mallcity/shared';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const user = this.authService.currentUserValue;

    if (!user) {
      this.toastr.warning('Please login first', 'Unauthorized');
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    if (user.role !== USER_ROLES.ADMIN) {
      this.toastr.error('Access Denied: Only administrators can access this section.', 'Forbidden (403)');
      return this.router.createUrlTree(['/']);
    }

    return true;
  }
}
