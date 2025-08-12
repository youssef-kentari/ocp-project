import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    Intervention,
    StatusStats,
    TimelineStats,
    ResponsibleWorkload,
    TypeDistribution
} from '../models/intervention.model';

const BASE_URL = 'http://localhost:3000/api/interventions';

@Injectable({
    providedIn: 'root'
})
export class InterventionService {
    constructor(private http: HttpClient) { }

    // CRUD Operations
    create(intervention: Intervention): Observable<Intervention> {
        return this.http.post<Intervention>(BASE_URL, intervention);
    }

    getAll(): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(BASE_URL);
    }

    getById(id: number): Observable<Intervention> {
        return this.http.get<Intervention>(`${BASE_URL}/${id}`);
    }

    update(id: number, intervention: Intervention): Observable<Intervention> {
        return this.http.put<Intervention>(`${BASE_URL}/${id}`, intervention);
    }

    sendEmail(emailDetails:any){
        return this.http.post(`${BASE_URL}/email/send`,emailDetails);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${BASE_URL}/${id}`);
    }

    getAllStatus(): Observable<any> {
        return this.http.get(`${BASE_URL}/statut/all`);
    }

    getAllResponsable(): Observable<any> {
        return this.http.get<any>(`${BASE_URL}/responsable/all`);
    }

    //by status
    getInterventionByStatus(statut: string): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(`${BASE_URL}/statut/${statut}`);
    }

    //by responsable
    getInterventionByResponsable(respo: string): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(`${BASE_URL}/responsable/${respo}`);
    }

    //by operation
    getInterventionByOperationType(operation: string): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(`${BASE_URL}/operation/${operation}`);
    }

    //by se
    getInterventionBySE(designation: string): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(`${BASE_URL}/se/${designation}`);
    }

    // Specific Routes
    getByOperationId(operationId: number): Observable<Intervention[]> {
        return this.http.get<Intervention[]>(`${BASE_URL}/operation/${operationId}`);
    }

    updateStatus(id: number, statut: string): Observable<Intervention> {
        return this.http.patch<Intervention>(`${BASE_URL}/${id}/statut`, { statut });
    }

    // Statistics and KPIs
    getStatusStats(): Observable<StatusStats[]> {
        return this.http.get<StatusStats[]>(`${BASE_URL}/stats/statut`);
    }

    getTimelineStats(period: string = 'month'): Observable<TimelineStats[]> {
        return this.http.get<TimelineStats[]>(`${BASE_URL}/stats/timeline?period=${period}`);
    }

    getAverageCompletionTime(): Observable<{ average_completion_days: number }> {
        return this.http.get<{ average_completion_days: number }>(`${BASE_URL}/stats/temps-moyen`);
    }

    getResponsibleWorkload(): Observable<ResponsibleWorkload[]> {
        return this.http.get<ResponsibleWorkload[]>(`${BASE_URL}/stats/charge-responsables`);
    }

    getTypesDistribution(): Observable<TypeDistribution[]> {
        return this.http.get<TypeDistribution[]>(`${BASE_URL}/stats/repartition-types`);
    }

}