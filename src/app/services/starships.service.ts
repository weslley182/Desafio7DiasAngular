import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { Starship } from '../models/starships.model';
import { ReturnAPI } from '../models/ReturnAPI.model';

@Injectable({
  providedIn: 'root'
})

export class StarshipsService {
  private apiUrl = 'https://swapi.dev/api';
  private cacheKey = 'starshipsCache';
  
  constructor(private http: HttpClient) { }

  getStarships2(searchTerm?: string, page: number = 1): Observable<ReturnAPI<Starship>> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.append('search', searchTerm);
    }
    if (page) {
      params = params.append('page', page.toString());
    }

    const cachedData = localStorage.getItem(this.cacheKey);
    const cacheTime = localStorage.getItem(`${this.cacheKey}_time`);
    let minutes = 0; // minutos de cache
    let expireMinutes = minutes * 60 * 1000; 
  
    const isCacheValid = cacheTime && (Date.now() - parseInt(cacheTime, 10) < expireMinutes);
  
    if (cachedData && isCacheValid) {
      return of(JSON.parse(cachedData));
    } 
    else {
      return this.http.get<ReturnAPI<Starship>>(this.apiUrl, {params: params}).pipe(
        tap(data => {
          localStorage.setItem(this.cacheKey, JSON.stringify(data));
          localStorage.setItem(`${this.cacheKey}_time`, Date.now().toString());
        })
      );
    }
  }

  getStarShips(page: number){
    const url = `${this.apiUrl}/starships/?page=${page}`;
    return this.http.get<ReturnAPI<Starship>>(url);
  }
}
