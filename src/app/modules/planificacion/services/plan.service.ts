import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { Count, PlanAllDetails, PlanDetail, PlanDetailsInput, PlanDetailss, PlanInput, PlanJust, PlanType } from '../models/plan.model';
import { GET_DETALLES_PLAN, GET_DETALLES_PLAN_ID, GET_HISTORIC_COUNTS, GET_PLANS_BY_CATEGORY, GET_PLANS_BY_TYPO } from '../data/graphql/queries';
import { CREATE_PLAN, CREATE_PLAN_DETAILS } from '../data/graphql';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:3000'; 


  private isPlanTellingActive = new BehaviorSubject<boolean>(false);

  isPlanTellingActive$ = this.isPlanTellingActive.asObservable();

  constructor(private http: HttpClient, private apollo: Apollo) { }

  getAllPlansCountGql(): Observable<Count>{
    return this.apollo.watchQuery<{ getCountPlans: Count}>({
      query: GET_HISTORIC_COUNTS,
    })
    .valueChanges.pipe(
      map((result) => result.data.getCountPlans),
      shareReplay(1)
    );
  }

  

  createPlanDetailsGql(plan_details: PlanDetailsInput[]): Observable<PlanDetailss>{
    return this.apollo.mutate<{ createPlanDetails: PlanDetailss}>({
      mutation: CREATE_PLAN_DETAILS,
      variables: {
        input: plan_details
      }
    }).pipe(
      map(result => result.data!.createPlanDetails)
    );
  }




  createPlanGql(planData: PlanInput): Observable<PlanJust>{
    return this.apollo.mutate<{ createPlan: PlanJust }>({
      mutation: CREATE_PLAN,
      variables: {
        input: planData
      }
    }).pipe(
      map(result => result.data!.createPlan)
    );
  }

  getPlansByTypoGql(tipo: number): Observable<PlanType[]>{
    return this.apollo.watchQuery<{getDetallesPlanType: PlanType[]}>({
      query: GET_PLANS_BY_TYPO,
      variables: {
        tipo: tipo
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map((result) => result.data.getDetallesPlanType),
      shareReplay(1)
    )
  }

  getJustPlanesByTypeGql(categoria: number): Observable<PlanJust[]>{
    return this.apollo.watchQuery<{ getJustPlans: PlanJust[ ]}>({
      query: GET_PLANS_BY_CATEGORY,
      variables: {
        categoria: categoria
      },
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map((result) => result.data.getJustPlans),
      shareReplay(1)
    );

  }


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