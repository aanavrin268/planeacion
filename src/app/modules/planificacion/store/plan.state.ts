import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { PlanAllDetails, PlanDetail } from '../models/plan.model';
import { PlanService } from '../services/plan.service';


@Injectable({
    providedIn: 'root'
})
export class PlanState {
    private _plans = new BehaviorSubject<PlanAllDetails[]>([]);
    private _loading = new BehaviorSubject<boolean>(false);
    private _error = new BehaviorSubject<string | null> (null);
    private _isEditing = new BehaviorSubject<boolean>(false);

    public plans$: Observable<PlanAllDetails[]> = this._plans.asObservable();
    public loading$: Observable<boolean> = this._loading.asObservable();
    public error$: Observable<string | null > = this._error.asObservable();
    public isEditing$: Observable<boolean> = this._isEditing.asObservable();

    
  protected dummy_list: PlanAllDetails[] = [{
    id_plan: 1,
    descripcion:'',

    info: [
      {
        nombre: 'Busulfan', inventario: 3000, enero: 100, fac_enero: 1000, febrero: "200", fac_febrero: "1000",
        marzo: "100", fac_marzo: "3000",
        clave: '',
        disponibles: 0,
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
      },
      
    ],
    nombre: '',
    tipo: 0,
    categoria: 0,
    estado: 0,
    updatedAt: ''
  }
];

    constructor(private planService: PlanService){
    }

  loadPlans(id_plan: number): Observable<PlanAllDetails[]> {
    //this._loading.next(true);
    //this._error.next(null);

    //this._plans.next(this.dummy_list);

    //return  this._plans.next(this.dummy_list);


    /*
    return this.planService.getDetallesPlanByIdGql(id_plan).pipe(
      tap({
        next: (plans) => {
          let name = plans[0].nombre;
          let data_list = plans[0].info;


          console.log("el nombre del plan desde el state service es", name);

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
*/


this._loading.next(true);
this._error.next(null);

this._plans.next(this.dummy_list);
this._loading.next(false);

return this._plans.asObservable();
    
  }

  changeEditValue(value: boolean){
    this._isEditing.next(value);
    console.log("new edit value: ", this._isEditing.getValue());
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


