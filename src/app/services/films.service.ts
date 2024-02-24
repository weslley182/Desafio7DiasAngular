import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Films } from '../models/Films.model';

@Injectable({
  providedIn: 'root'
})

export class FilmsService {

  private jsonUrl = 'assets/data/films.json';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Films> {
    return this.http.get<Films>(this.jsonUrl);
  }
}
