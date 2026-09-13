export interface MallDTO {
  id?: string;
  _id?: string;
  name: string;
  city: string;
  cityCode: number;
  description: string;
  noOffloor: number;
  address: string;
  mallImg: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateMallDTO {
  name: string;
  city: string;
  cityCode: number;
  description: string;
  noOffloor: number;
  address: string;
  mallImg?: string;
}
