import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { PlanAllDetails, PlanDetail } from '../models/plan.model';
import { PlanService } from '../services/plan.service';


@Injectable({
    providedIn: 'root'
})
export class PlanState {
    private _plans = new BehaviorSubject<any[]>([]);
    private _loading = new BehaviorSubject<boolean>(false);
    private _error = new BehaviorSubject<string | null> (null);

    public plans$: Observable<PlanAllDetails[]> = this._plans.asObservable();
    public loading$: Observable<boolean> = this._loading.asObservable();
    public error$: Observable<string | null > = this._error.asObservable();

    constructor(private planService: PlanService){
    }

  loadPlans(): Observable<PlanAllDetails[]> {
    this._loading.next(true);
    this._error.next(null);

    return this.planService.getDetallesPlanByIdGql(1).pipe(
      tap({
        next: (plans) => {
          let name = plans[0].nombre;
          let data_list = plans[0].info;


          console.log("el nombre del plan es", name);

               this._plans.next(data_list);
               this._loading.next(false);
          

       
        },
        error: (err) => {
          this._error.next(err.message || 'Error al cargar planes');
          this._loading.next(false);
        }
      }),
      catchError(err => {
        this._error.next(err.message || 'Error al cargar planes');
        this._loading.next(false);
        return [];
      })
    );
  }

  updatePlans(nueva_data: PlanAllDetails[]){
    this._plans.next(nueva_data);
  }


  getPlansValue(): PlanAllDetails[]{
    return this._plans.getValue();
  }

  resetState(){
    this._plans.next([]);
    this._loading.next(false);
    this._error.next(null);
  }


  getPlanByName(nombre:string): Observable<PlanAllDetails | undefined>{
    return this.plans$.pipe(
        map(plans => plans.find(plan => plan.nombre === nombre)),
        distinctUntilChanged()
    );
  }



}


