import { Injectable } from '@angular/core';
import { Column, PlanAllDetails } from '../models/plan.model';
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
    descripcion: '',
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

  private currentColumns = new BehaviorSubject<Column[]>([]);

  public currentPlan$: Observable<PlanAllDetails> = this.currentPlan.asObservable();
  public currentColumns$ = this.currentColumns.asObservable();

  constructor() { 

  }
 
  setCurrentPlan(dataBundle: PlanAllDetails){
      this.currentPlan.next(dataBundle);
      this.generateColumns(dataBundle.info[0]);

  } 

  private generateColumns(sampleData: any){
    const excludedKeys = ['clave', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 
      'diciembre', 'fac_abril', 'proveedor', 'fac_mayo', 'fac_junio', 'fac_julio', 'fac_agosto', 'fac_septiembre',
      'fac_octubre', 'fac_noviembre', 'fac_diciembre', '__typename'
  ];

  const specialHeaders: { [key: string]: string} = {
    'nombre': 'Nombre',
    'proveedor': 'Proveedor',
    'inventario': 'Inventario',
    'enero': 'Enero',
    'febrero': 'Febrero',
    'marzo': 'Marzo',
    'abril': 'Abril',
    'mayo': 'Mayo',
    'junio': 'Junio',
    'julio': 'Julio',
    'agosto': 'Agosto',
    'septiembre': 'Septiembre',
    'octubre': 'Octubre',
    'noviembre': 'Noviembre',
    'diciembre': 'Diciembre',
    'fac_enero': 'Fac. Enero',
    'fac_febrero': 'Fac. Febrero',
    'fac_marzo': 'Fac. Marzo',
    'fac_abril': 'Fac. Abril'
  }  

  const columns = Object.keys(sampleData)
    .filter(key => !excludedKeys.includes(key))
    .map(key => ({
      key: key,
      header: specialHeaders[key] || this.formatHeader(key),
      width: this.calculateWidth(key),
      visible:true
    }))

    this.currentColumns.next(columns);

  }

  private calculateWidth(key: string): number {
    if(key === 'nombre') return 200;
    if(key === 'proveedor') return 100;
    if(key.startsWith('fac_')) return 80;
    return 100;
  }

  toggleColumnVisibilityx(columnKey: string) {


    const currentColumns = this.currentColumns.value;
    const updatedColumns = currentColumns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    
    console.log('Toggling column:', columnKey, 'New state:', updatedColumns);
    this.currentColumns.next(updatedColumns);
  }




  private formatHeader(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }



}
