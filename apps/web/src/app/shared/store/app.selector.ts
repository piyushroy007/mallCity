import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateModel } from './app.model';

export const selectGlobalState = createFeatureSelector<AppStateModel>('globalState');

export const selectCities = createSelector(selectGlobalState, (state) => state.cities);
export const selectMalls = createSelector(selectGlobalState, (state) => state.malls);
export const selectShops = createSelector(selectGlobalState, (state) => state.shops);
export const selectCheckCityResponse = createSelector(selectGlobalState, (state) => state.checkCityResponse);
export const selectLoading = createSelector(selectGlobalState, (state) => state.loading);
export const selectError = createSelector(selectGlobalState, (state) => state.error);
