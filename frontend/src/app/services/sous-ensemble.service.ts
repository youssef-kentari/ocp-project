import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousEnsemble, SousEnsembleKPI } from '../models/sous-ensemble.model';

const BASE_URL = 'http://localhost:3000/api/sous-ensembles';

@Injectable({
  providedIn: 'root'
})
export class SousEnsembleService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<SousEnsemble[]> {
    return this.http.get<SousEnsemble[]>(BASE_URL);
  }

  getPlanning(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/planing/report`);
  }

  getSEByDesignAndEngin(designation:any,enginId:any): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/${designation}/${enginId}`);
  }

  getAllDesignations(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/designation/all`);
  }

  getById(id: number): Observable<SousEnsemble> {
    return this.http.get<SousEnsemble>(`${BASE_URL}/${id}`);
  }

  getByEnginId(enginId: string): Observable<SousEnsemble[]> {
    return this.http.get<SousEnsemble[]>(`${BASE_URL}/engin/${enginId}`);
  }

  create(sousEnsemble: SousEnsemble): Observable<SousEnsemble> {
    return this.http.post<SousEnsemble>(BASE_URL, sousEnsemble);
  }

  update(id: number, sousEnsemble: SousEnsemble): Observable<SousEnsemble> {
    return this.http.put<SousEnsemble>(`${BASE_URL}/${id}`, sousEnsemble);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  // KPI Methods
  getDisponibilityRate(id: number): Observable<{ disponibility_rate: number }> {
    return this.http.get<{ disponibility_rate: number }>(`${BASE_URL}/${id}/disponibility-rate`);
  }

  getRevisionOccupationRate(id: number): Observable<{ revision_occupation_rate: number }> {
    return this.http.get<{ revision_occupation_rate: number }>(`${BASE_URL}/${id}/revision-occupation-rate`);
  }

  getTotalMaintenanceCost(id: number): Observable<{ total_maintenance_cost: number }> {
    return this.http.get<{ total_maintenance_cost: number }>(`${BASE_URL}/${id}/total-maintenance-cost`);
  }

  getPerformanceRatio(id: number): Observable<{ performance_ratio: number }> {
    return this.http.get<{ performance_ratio: number }>(`${BASE_URL}/${id}/performance-ratio`);
  }

  getTimeToNextRevision(id: number): Observable<{ time_to_next_revision: number }> {
    return this.http.get<{ time_to_next_revision: number }>(`${BASE_URL}/${id}/time-to-next-revision`);
  }

  getSafetyStockNeed(id: number): Observable<{ safety_stock_need: number }> {
    return this.http.get<{ safety_stock_need: number }>(`${BASE_URL}/${id}/safety-stock-need`);
  }

  getROI(id: number): Observable<{ roi: number }> {
    return this.http.get<{ roi: number }>(`${BASE_URL}/${id}/roi`);
  }
}