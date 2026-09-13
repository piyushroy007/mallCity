import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserDTO, USER_ROLES } from '@mallcity/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  headerTitle = 'MallCity';
  user: UserDTO | null = null;
  isAdmin = false;
  private authSub?: Subscription;

  ngOnInit(): void {
    this.authSub = this.authService.currentUser$.subscribe((currentUser) => {
      this.user = currentUser;
      this.isAdmin = currentUser?.role === USER_ROLES.ADMIN;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
