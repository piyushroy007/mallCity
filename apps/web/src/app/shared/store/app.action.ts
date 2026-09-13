import { createAction, props } from '@ngrx/store';
import { CheckCityResponseDTO, CityDTO, CreateCityDTO, MallDTO, ShopDTO, UpdateCityDTO } from '@mallcity/shared';

// City Actions
export const getCityList = createAction('[City API] Get City List');
export const getCityListSuccess = createAction(
  '[City API] Get City List Success',
  props<{ cities: CityDTO[] }>()
);
export const getCityListFailure = createAction(
  '[City API] Get City List Failure',
  props<{ error: string }>()
);

export const checkCityName = createAction(
  '[Admin Component] Check City Name',
  props<{ cityCode: number; newCityName: CreateCityDTO }>()
);
export const checkCityNameSuccess = createAction(
  '[Admin Component] Check City Name Success',
  props<{ checkCityResponse: CheckCityResponseDTO }>()
);
export const checkCityNameFailure = createAction(
  '[Admin Component] Check City Name Failure',
  props<{ error: string }>()
);

export const addCityName = createAction(
  '[Admin Component] Add City Name',
  props<{ cityObj: CreateCityDTO }>()
);
export const addCityNameSuccess = createAction('[Admin Component] Add City Name Success');
export const addCityNameFailure = createAction(
  '[Admin Component] Add City Name Failure',
  props<{ error: string }>()
);

export const updateCity = createAction(
  '[Admin Component] Update City',
  props<{ id: string; cityObj: UpdateCityDTO }>()
);
export const updateCitySuccess = createAction(
  '[Admin Component] Update City Success',
  props<{ city: CityDTO }>()
);
export const updateCityFailure = createAction(
  '[Admin Component] Update City Failure',
  props<{ error: string }>()
);

// Mall Actions
export const getMallList = createAction(
  '[Mall API] Get Mall List',
  props<{ cityName?: string }>()
);
export const getMallListSuccess = createAction(
  '[Mall API] Get Mall List Success',
  props<{ malls: MallDTO[] }>()
);
export const getMallListFailure = createAction(
  '[Mall API] Get Mall List Failure',
  props<{ error: string }>()
);

export const addMall = createAction(
  '[Admin Component] Add Mall',
  props<{ formData: FormData }>()
);
export const addMallSuccess = createAction('[Admin Component] Add Mall Success');
export const addMallFailure = createAction(
  '[Admin Component] Add Mall Failure',
  props<{ error: string }>()
);

// Shop Actions
export const getShopList = createAction(
  '[Shop API] Get Shop List',
  props<{ filters?: { mallId?: string; mallName?: string; floorNo?: string; shopType?: string } }>()
);
export const getShopListSuccess = createAction(
  '[Shop API] Get Shop List Success',
  props<{ shops: ShopDTO[] }>()
);
export const getShopListFailure = createAction(
  '[Shop API] Get Shop List Failure',
  props<{ error: string }>()
);

export const addShop = createAction(
  '[Admin Component] Add Shop',
  props<{ formData: FormData }>()
);
export const addShopSuccess = createAction('[Admin Component] Add Shop Success');
export const addShopFailure = createAction(
  '[Admin Component] Add Shop Failure',
  props<{ error: string }>()
);
