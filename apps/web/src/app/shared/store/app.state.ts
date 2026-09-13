import { AppStateModel } from './app.model';

export const initialState: AppStateModel = {
  cities: [],
  malls: [],
  shops: [],
  selectedCity: '',
  selectedMall: null,
  checkCityResponse: {
    cityCode: 0,
    msg: '',
    name: '',
    state: '',
    value: false,
  },
  loading: false,
  error: null,
};
