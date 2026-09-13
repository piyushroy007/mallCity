import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCityList } from '../../shared/store/app.action';
import { selectCities } from '../../shared/store/app.selector';
import { Observable } from 'rxjs';
import { CityDTO } from '@mallcity/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);

  cities$: Observable<CityDTO[]> = this.store.select(selectCities);
  selectedCity: string = '';

  ngOnInit(): void {
    this.store.dispatch(getCityList());
  }

  onCitySelected(cityName: string): void {
    this.router.navigate(['/malls'], {
      queryParams: { city: cityName },
    });
  }
}
