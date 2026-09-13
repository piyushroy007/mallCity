import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASEURL, APIS } from '../../constant/app.constant';
import { ShopDTO } from '@mallcity/shared';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = `${API_BASEURL}${APIS.SHOP}`;

  constructor(private http: HttpClient) {}

  getShops(filters: { mallId?: string; mallName?: string; floorNo?: string; shopType?: string } = {}): Observable<ShopDTO[]> {
    let params = new HttpParams();
    if (filters.mallId) params = params.set('mallId', filters.mallId);
    if (filters.mallName) params = params.set('mallName', filters.mallName);
    if (filters.floorNo && filters.floorNo !== 'ALL') params = params.set('floorNo', filters.floorNo);
    if (filters.shopType && filters.shopType !== 'ALL') params = params.set('shopType', filters.shopType);

    return this.http.get<ShopDTO[]>(this.baseUrl, { params });
  }

  createShop(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, formData);
  }
}
