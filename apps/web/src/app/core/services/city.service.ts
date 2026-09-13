import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASEURL, APIS } from '../../constant/app.constant';
import { CheckCityResponseDTO, CityDTO, CreateCityDTO, UpdateCityDTO } from '@mallcity/shared';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private baseUrl = `${API_BASEURL}${APIS.CITY}`;

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(this.baseUrl);
  }

  checkCity(cityCodeOrId: number | string): Observable<CheckCityResponseDTO> {
    return this.http.get<CheckCityResponseDTO>(`${this.baseUrl}/${cityCodeOrId}`);
  }

  createCity(cityData: CreateCityDTO): Observable<any> {
    return this.http.post<any>(this.baseUrl, cityData);
  }

  updateCity(id: string, cityData: UpdateCityDTO): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, cityData);
  }

  getIndianCities(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/indianCities`);
  }
}
