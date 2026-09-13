import { CheckCityResponseDTO, CityDTO, MallDTO, ShopDTO } from '@mallcity/shared';

export interface AppStateModel {
  cities: CityDTO[];
  malls: MallDTO[];
  shops: ShopDTO[];
  selectedCity: string;
  selectedMall: MallDTO | null;
  checkCityResponse: CheckCityResponseDTO;
  loading: boolean;
  error: string | null;
}
