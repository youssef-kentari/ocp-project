import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engin } from '../models/engin.model';

const BASE_URL = 'http://localhost:3000/api/engins';

@Injectable({
  providedIn: 'root'
})
export class EnginService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Engin[]> {
    return this.http.get<Engin[]>(BASE_URL);
  }

  getById(id: string): Observable<Engin> {
    return this.http.get<Engin>(`${BASE_URL}/${id}`);
  }

  create(engin: Engin): Observable<Engin> {
    return this.http.post<Engin>(BASE_URL, engin);
  }

  update(id: string, engin: Engin): Observable<Engin> {
    return this.http.put<Engin>(`${BASE_URL}/${id}`, engin);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}