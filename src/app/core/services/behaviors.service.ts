import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class BehaviorsService {
  private planHistoricSubject = new BehaviorSubject<any[]>([]);

  public planHistoric$: Observable<any[]> = this.planHistoricSubject.asObservable();


  constructor(private apiService: ApiService) { }

  loadAllPlanhistoricUnion(): void{
    this.apiService.getAllPlanHistoricUnion().pipe(
      tap((response) => {
          this.planHistoricSubject.next(response.result);
      })
    ).subscribe();

  }

  getCurrentPlanHistoricData(): any[]{
    return this.planHistoricSubject.getValue();
  }
}
