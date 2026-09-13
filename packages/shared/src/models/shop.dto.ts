export interface ShopDTO {
  id?: string;
  _id?: string;
  name: string;
  city: string;
  mallName: string;
  mallId?: string;
  description: string;
  shopType: string;
  floorNo: string;
  shopImg: string;
  address?: string;
  contactNumber?: string;
  rating?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateShopDTO {
  name: string;
  city: string;
  mallName: string;
  mallId?: string;
  description: string;
  shopType: string;
  floorNo: string;
  shopImg?: string;
  address?: string;
  contactNumber?: string;
  rating?: number;
}
