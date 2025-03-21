import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private isPlanTellingActive = new BehaviorSubject<boolean>(false);

  // Observable para que otros componentes puedan suscribirse
  isPlanTellingActive$ = this.isPlanTellingActive.asObservable();

  constructor() { }




  // Método para cambiar el estado
  setPlanTellingActive(isActive: boolean): void {
    this.isPlanTellingActive.next(isActive);
  }
}
