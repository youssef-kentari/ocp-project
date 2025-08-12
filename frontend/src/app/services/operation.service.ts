import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api/operations';

@Injectable({
    providedIn: 'root'
})
export class OperationService {
    constructor(private http: HttpClient) { }

    // CRUD de base
    getAll(): Observable<any> {
        return this.http.get<any>(BASE_URL);
    }

    getById(id: number): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/${id}`);
    }

    create(operation: any): Observable<any> {
        return this.http.post<any>(BASE_URL, operation);
    }

    update(id: number, operation: any): Observable<any> {
        return this.http.put<any>(`${BASE_URL}/${id}`, operation);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${BASE_URL}/${id}`);
    }

    // Méthodes spécifiques
    getAllOperationsType(): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/type/all`);
    }

    getDescriptionById(id: number): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/${id}`);
    }

    getSEbyOperation(id: any): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/se-by-operation/${id}`);
    }

    getAllDescription(): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/descriptions/all`);
    }

    getIdByDescription(description: string): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/description/${description}`);
    }

    getBySousEnsembleId(sousEnsembleId: number): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/sous-ensemble/${sousEnsembleId}`);
    }
}