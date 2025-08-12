import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/responsables';

@Injectable({
    providedIn: 'root'
})
export class ResponsableService {
    constructor(private http: HttpClient) { }

    create(respo:any): Observable<any> {
        return this.http.post<any>(BASE_URL,respo);
    }

    getAllRespo(): Observable<any> {
        return this.http.get<any>(BASE_URL);
    }

    getEmailByName(nom: any): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/${nom}`);
    }

    update(nom: any, respo: any): Observable<any> {
        return this.http.put<any>(`${BASE_URL}/${nom}`, respo);
    }

    delete(nom: any): Observable<any> {
        return this.http.delete<any>(`${BASE_URL}/${nom}`);
    }

}