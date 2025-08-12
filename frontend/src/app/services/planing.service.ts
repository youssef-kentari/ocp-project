import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlanningService {
  private plannedItemsSubject = new BehaviorSubject<Set<number>>(new Set());
  plannedItems$ = this.plannedItemsSubject.asObservable();

  markAsPlanned(id: number): Observable<void> {
    const currentSet = this.plannedItemsSubject.value;
    currentSet.add(id);
    this.plannedItemsSubject.next(currentSet);
    return of(undefined).pipe(tap(() => {
      console.log(`Item ${id} marked as planned`);
    }));
  }

  isPlanned(id: number): boolean {
    return this.plannedItemsSubject.value.has(id);
  }
}