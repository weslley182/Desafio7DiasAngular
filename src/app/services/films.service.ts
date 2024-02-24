import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Films } from '../models/Films.model';

@Injectable({
  providedIn: 'root'
})

export class FilmsService {

  private apiUrl = 'https://swapi.dev/api/films';
  private cacheKey = 'filmsCache';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Films> {
    const cachedData = localStorage.getItem(this.cacheKey);
    const cacheTime = localStorage.getItem(`${this.cacheKey}_time`);
    let minutes = 0; // 5 minutos de cache
    let expireMinutes = minutes * 60 * 1000; 
  
    const isCacheValid = cacheTime && (Date.now() - parseInt(cacheTime, 10) < expireMinutes);
  
    if (cachedData && isCacheValid) {
      return of(JSON.parse(cachedData));
    } 
    else {
      return this.http.get<Films>(this.apiUrl).pipe(
        tap(data => {
          localStorage.setItem(this.cacheKey, JSON.stringify(data));
          localStorage.setItem(`${this.cacheKey}_time`, Date.now().toString());
        })
      );
    }
  }
}