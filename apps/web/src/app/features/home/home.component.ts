import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCityList } from '../../shared/store/app.action';
import { selectCities } from '../../shared/store/app.selector';
import { Observable, Subscription } from 'rxjs';
import { CityDTO, USER_ROLES } from '@mallcity/shared';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private store = inject(Store);
  private authService = inject(AuthService);

  cities$: Observable<CityDTO[]> = this.store.select(selectCities);
  selectedCity: string = '';
  isAdmin = false;
  adminName = '';
  private userSub?: Subscription;

  ngOnInit(): void {
    this.store.dispatch(getCityList());
    this.userSub = this.authService.currentUser$.subscribe((u) => {
      const role = u?.role?.toLowerCase();
      this.isAdmin = role === 'admin' || (typeof USER_ROLES !== 'undefined' && role === USER_ROLES?.ADMIN);
      this.adminName = u?.name || 'Administrator';
    });
  }

  onCitySelected(cityName: string): void {
    this.router.navigate(['/malls'], {
      queryParams: { city: cityName },
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
