import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { PlanAllDetails, PlanDetail } from '../models/plan.model';
import { GET_DETALLES_PLAN, GET_DETALLES_PLAN_ID } from '../data/graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:3000'; 


  private isPlanTellingActive = new BehaviorSubject<boolean>(false);

  isPlanTellingActive$ = this.isPlanTellingActive.asObservable();

  constructor(private http: HttpClient, private apollo: Apollo) { }


  getDetallesPlanByIdGql(id_plan: number): Observable<PlanAllDetails[]> {
    return this.apollo.watchQuery<{ getPlanAllDetailsById: PlanAllDetails[] }>({
      query: GET_DETALLES_PLAN_ID,
      variables: {
        idPlan: id_plan 
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map((result) => result.data.getPlanAllDetailsById),
      shareReplay(1)
    );
  }



  getDetallesPlanGql(): Observable<PlanDetail[]>{
    return this.apollo
      .watchQuery<{ geteDetallesPlanGql: PlanDetail[]}>({
        query: GET_DETALLES_PLAN,
      })
      .valueChanges.pipe(
        map((result) => result.data.geteDetallesPlanGql),
        shareReplay(1)
      );
  }


    getDetallesPlan(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/detallesPlan`); 
    }




  setPlanTellingActive(isActive: boolean): void {
    this.isPlanTellingActive.next(isActive);
  }
}



/*
  tengo mi proyecto en angualr,
  estoy usando grpahql como arquitecrua de apis
  en mi front tengo la arqutiecrua domain-driven-design
  donde tengo 'modulos' para mi logica de negocio escalable,
  cada modulo tiene:
  modules/
    plan/
      components/
      models/
      data/
        graphql/
          queries.ts
      pages/
      resolvers/
      services/
        plan.service.ts
      store/
      utils/
        plan-state.ts
      plan-routing.module.ts
      plan.module.ts


*/