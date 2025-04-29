import { Injectable } from '@angular/core';
import { PlanAllDetails } from '../models/plan.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {



  private currentPlan = new BehaviorSubject<PlanAllDetails>({
    id_plan: 0,
    nombre: '',
    tipo: 0,
    categoria: 0,
    estado: 0,
    updatedAt: '',
    info: [{
      clave: '',
      disponibles: 0,
      enero: 0,
      fac_enero: 0,
      febrero: '',
      fac_febrero: '',
      marzo: '',
      fac_marzo: '',
      abril: '',
      fac_abril: '',
      mayo: '',
      fac_mayo: '',
      junio: '',
      fac_junio: '',
      julio: '',
      fac_julio: '',
      agosto: '',
      fac_agosto: '',
      septiembre: '',
      fac_septiembre: '',
      octubre: '',
      fac_octubre: '',
      noviembre: '',
      fac_noviembre: '',
      diciembre: '',
      fac_diciembre: ''
    }]
  });

  public currentPlan$: Observable<PlanAllDetails> = this.currentPlan.asObservable();

  constructor() { 

  }

  

 
  setCurrentPlan(dataBundle: PlanAllDetails){
      this.currentPlan.next(dataBundle);
  } 


}
