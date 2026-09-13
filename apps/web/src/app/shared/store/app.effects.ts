import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CityService } from '../../core/services/city.service';
import { MallService } from '../../core/services/mall.service';
import { ShopService } from '../../core/services/shop.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import {
  getCityList,
  getCityListSuccess,
  getCityListFailure,
  checkCityName,
  checkCityNameSuccess,
  checkCityNameFailure,
  addCityName,
  addCityNameSuccess,
  addCityNameFailure,
  updateCity,
  updateCitySuccess,
  updateCityFailure,
  getMallList,
  getMallListSuccess,
  getMallListFailure,
  addMall,
  addMallSuccess,
  addMallFailure,
  getShopList,
  getShopListSuccess,
  getShopListFailure,
  addShop,
  addShopSuccess,
  addShopFailure,
} from './app.action';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private cityService = inject(CityService);
  private mallService = inject(MallService);
  private shopService = inject(ShopService);
  private toastr = inject(ToastrService);

  // Load Cities
  getCityList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCityList),
      exhaustMap(() =>
        this.cityService.getAllCities().pipe(
          map((cities) => getCityListSuccess({ cities })),
          catchError((error) => {
            this.toastr.error('Failed to load cities list', 'Error');
            return of(getCityListFailure({ error: error.message || 'Unknown error' }));
          })
        )
      )
    )
  );

  // Check City Code
  checkCityCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkCityName),
      exhaustMap((action) =>
        this.cityService.checkCity(action.cityCode).pipe(
          switchMap((data) => {
            if (!data.value && data.msg.length > 0) {
              return of(addCityName({ cityObj: action.newCityName }));
            } else {
              this.toastr.error('City already exists with this code!', 'Validation Error');
              return of(checkCityNameSuccess({ checkCityResponse: data }));
            }
          }),
          catchError((err) => {
            this.toastr.error(err.error?.message || 'Error checking city code', 'Error');
            return of(checkCityNameFailure({ error: err.error?.message || 'Check failed' }));
          })
        )
      )
    )
  );

  // Add City
  addCityName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCityName),
      exhaustMap((action) =>
        this.cityService.createCity(action.cityObj).pipe(
          switchMap((data) => {
            this.toastr.success(`City "${data.name}" added successfully!`, 'Success');
            return of(addCityNameSuccess(), getCityList());
          }),
          catchError((err) => {
            this.toastr.error(err.error?.message || 'Error adding city', 'Error');
            return of(addCityNameFailure({ error: err.error?.message || 'Add city failed' }));
          })
        )
      )
    )
  );

  // Update City
  updateCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCity),
      exhaustMap((action) =>
        this.cityService.updateCity(action.id, action.cityObj).pipe(
          switchMap((data) => {
            this.toastr.success('City updated successfully!', 'Success');
            return of(updateCitySuccess({ city: data.data }), getCityList());
          }),
          catchError((err) => {
            this.toastr.error(err.error?.message || 'Error updating city', 'Error');
            return of(updateCityFailure({ error: err.error?.message || 'Update city failed' }));
          })
        )
      )
    )
  );

  // Load Malls
  getMallList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMallList),
      switchMap((action) =>
        this.mallService.getAllMalls(action.cityName).pipe(
          map((malls) => getMallListSuccess({ malls })),
          catchError((error) => {
            this.toastr.error('Failed to load malls list', 'Error');
            return of(getMallListFailure({ error: error.message || 'Error loading malls' }));
          })
        )
      )
    )
  );

  // Add Mall
  addMall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMall),
      exhaustMap((action) =>
        this.mallService.createMall(action.formData).pipe(
          switchMap((res) => {
            this.toastr.success(`Mall "${res.name}" added successfully!`, 'Success');
            return of(addMallSuccess(), getMallList({}));
          }),
          catchError((err) => {
            this.toastr.error(err.error?.message || 'Error adding mall', 'Error');
            return of(addMallFailure({ error: err.error?.message || 'Add mall failed' }));
          })
        )
      )
    )
  );

  // Load Shops
  getShopList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getShopList),
      switchMap((action) =>
        this.shopService.getShops(action.filters).pipe(
          map((shops) => getShopListSuccess({ shops })),
          catchError((error) => {
            this.toastr.error('Failed to load shops list', 'Error');
            return of(getShopListFailure({ error: error.message || 'Error loading shops' }));
          })
        )
      )
    )
  );

  // Add Shop
  addShop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addShop),
      exhaustMap((action) =>
        this.shopService.createShop(action.formData).pipe(
          switchMap((res) => {
            this.toastr.success(`Shop "${res.name}" added successfully!`, 'Success');
            return of(addShopSuccess(), getShopList({}));
          }),
          catchError((err) => {
            this.toastr.error(err.error?.message || 'Error adding shop', 'Error');
            return of(addShopFailure({ error: err.error?.message || 'Add shop failed' }));
          })
        )
      )
    )
  );
}
