import { createReducer, on } from '@ngrx/store';
import {
  getCityList,
  getCityListSuccess,
  getCityListFailure,
  checkCityNameSuccess,
  addCityNameSuccess,
  updateCitySuccess,
  getMallList,
  getMallListSuccess,
  getMallListFailure,
  getShopList,
  getShopListSuccess,
  getShopListFailure,
} from './app.action';
import { initialState } from './app.state';
import { AppStateModel } from './app.model';

export const appReducer = createReducer(
  initialState,

  // Cities
  on(getCityList, (state): AppStateModel => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getCityListSuccess, (state, { cities }): AppStateModel => ({
    ...state,
    cities,
    loading: false,
  })),
  on(getCityListFailure, (state, { error }): AppStateModel => ({
    ...state,
    loading: false,
    error,
  })),
  on(checkCityNameSuccess, (state, { checkCityResponse }): AppStateModel => ({
    ...state,
    checkCityResponse,
  })),
  on(addCityNameSuccess, (state): AppStateModel => ({
    ...state,
    checkCityResponse: {
      cityCode: 0,
      msg: '',
      name: '',
      state: '',
      value: false,
    },
  })),
  on(updateCitySuccess, (state, { city }): AppStateModel => ({
    ...state,
    cities: state.cities.map((c) => (c.id === city.id || c._id === city._id ? city : c)),
  })),

  // Malls
  on(getMallList, (state): AppStateModel => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getMallListSuccess, (state, { malls }): AppStateModel => ({
    ...state,
    malls,
    loading: false,
  })),
  on(getMallListFailure, (state, { error }): AppStateModel => ({
    ...state,
    loading: false,
    error,
  })),

  // Shops
  on(getShopList, (state): AppStateModel => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(getShopListSuccess, (state, { shops }): AppStateModel => ({
    ...state,
    shops,
    loading: false,
  })),
  on(getShopListFailure, (state, { error }): AppStateModel => ({
    ...state,
    loading: false,
    error,
  }))
);

export function AppReducer(state: any, action: any) {
  return appReducer(state, action);
}
