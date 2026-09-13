import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASEURL, APIS } from '../../constant/app.constant';
import { MallDTO } from '@mallcity/shared';

@Injectable({
  providedIn: 'root',
})
export class MallService {
  private baseUrl = `${API_BASEURL}${APIS.MALL}`;

  constructor(private http: HttpClient) {}

  getAllMalls(cityName?: string): Observable<MallDTO[]> {
    let params = new HttpParams();
    if (cityName) {
      params = params.set('city', cityName);
    }
    return this.http.get<MallDTO[]>(this.baseUrl, { params });
  }

  createMall(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, formData);
  }
}
