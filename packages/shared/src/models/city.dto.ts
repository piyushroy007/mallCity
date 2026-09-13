export interface CityDTO {
  id?: string;
  _id?: string;
  name: string;
  cityCode: number;
  state: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateCityDTO {
  name: string;
  cityCode: number;
  state: string;
}

export interface UpdateCityDTO {
  name?: string;
  cityCode?: number;
  state?: string;
}

export interface CheckCityResponseDTO {
  value: boolean;
  msg: string;
  name: string;
  state: string;
  cityCode: number;
  id?: string;
}
