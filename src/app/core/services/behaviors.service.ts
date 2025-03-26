import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class BehaviorsService {
  private planHistoricSubject = new BehaviorSubject<any[]>([]);
  private planPrivateSubject = new BehaviorSubject<any[]>([]);

  private itemsPublicPlanSubject = new BehaviorSubject<any[]>([]);


  public planHistoric$: Observable<any[]> = this.planHistoricSubject.asObservable();
  public planPrivateHistoric$: Observable<any[]> = this.planPrivateSubject.asObservable();
  public itemsPublicPlan$: Observable<any[]> = this.itemsPublicPlanSubject.asObservable();


  constructor(private apiService: ApiService) { }



  loadPublicPlanItemsByProvider(provider_name:string):void{
    this.apiService.getPlanPublicItemsByProvider(provider_name).pipe(
      tap((response) => {
        this.itemsPublicPlanSubject.next(response.result);
      })
    ).subscribe();
  }


  getCurrentItemsPlanPublic():any[]{
    return this.itemsPublicPlanSubject.getValue();
  }


  getCurrentPlanPrivateUnion():any[]{
    return this.planPrivateSubject.getValue();
  }

  loadAllPlanPrivateUnion(): void{
    this.apiService.getAllPlanPrivadoHistoric().pipe(
      tap((response) => {
        this.planPrivateSubject.next(response.result);
      })
    ).subscribe();


  }

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
