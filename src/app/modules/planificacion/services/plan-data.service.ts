import { Injectable } from '@angular/core';
import { Column, PlanAllDetails, ViewTable } from '../models/plan.model';
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
      nombre: '',
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
  private showActionColumn = new BehaviorSubject<Boolean>(false);

  private currentView = new BehaviorSubject<ViewTable>({ 
    id: 0,
    name: '', 
    excludedKeys: [] 
  });

  public currentView$: Observable<ViewTable> = this.currentView.asObservable();

  public currentPlan$: Observable<PlanAllDetails> = this.currentPlan.asObservable();
  public currentColumns$ = this.currentColumns.asObservable();
  public showActionColumn$ = this.showActionColumn.asObservable();


  public views_array: ViewTable[]= [
    {id: 1, name: 'initialView', excludedKeys : [ '__typename']},
    {id: 2, name: 'planificada', excludedKeys:['fac_enero', 'fac_febrero', 'fac_marzo', 'fac_abril', 'fac_mayo', 'fac_junio', 'clave', 'disponibles', '__typename',
      'fac_julio', 'fac_agosto', 'fac_septiembre' , 'fac_octubre' ,'fac_noviembre', 'fac_diciembre'
    ]},
    {id: 3, name:'facturadas', excludedKeys: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre', 'noviembre',
      'diciembre'
    ]},
    {id: 4, name: 'Q1', excludedKeys: ['abril', 'mayo', 'junio', 'julio','agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', 'fac_abril', 'fac_mayo', 'fac_junio', 'clave', 'disponibles', '__typename',
      'fac_julio', 'fac_agosto', 'fac_septiembre' , 'fac_octubre' ,'fac_noviembre', 'fac_diciembre']}


  ];



  constructor() { 


    this.currentView.next(this.views_array[0]);

  }

  setCurrentView(sampleData: ViewTable){
    this.currentView.next(sampleData);
    this.regenerateColumns();
  }

  toggleActionsColumn(show: boolean){
    this.showActionColumn.next(show);
    this.regenerateColumns();
  }

  private regenerateColumns(){
    const currentPlan = this.currentPlan.value;

    if(currentPlan?.info?.length > 0){
      this.generateColumns(currentPlan.info[0]);
    }
  }
 
  setCurrentPlan(dataBundle: PlanAllDetails){
      this.currentPlan.next(dataBundle);
      this.generateColumns(dataBundle.info[0]);

  } 


  updateCurrentPlan(updatedValue: { nombre: string; value: number }, editableColumns: any) {
    const currentValue = this.currentPlan.getValue();

    const editibleColumnsKeys = editableColumns.map((cols: { key: any; }) => cols.key);

    console.log("EDITABLE KEYS ARRAY: ", editibleColumnsKeys);

    const updatedPlan = {
      ...currentValue,
      info: currentValue.info.map(item => {
        if(item.nombre === updatedValue.nombre){
          const updatedItem = {...item};

          editibleColumnsKeys.forEach((key: PropertyKey) => {
            if(updatedItem.hasOwnProperty(key)){
              updatedItem[key as string] = key === 'enero'
              ? updatedValue.value
              : updatedValue.value.toString();
            }
          });

          return updatedItem;
        }

        return item;
      })
    };
    
    /*
    const updatedPlan = {
      ...currentValue,
      info: currentValue.info.map(item => {
        if (item.nombre === updatedValue.nombre) { 
          return {
            ...item,
            enero: updatedValue.value,
            febrero: updatedValue.value.toString(),
            marzo: updatedValue.value.toString()
          };
        }
        return item;
      })
    };
    */
  
    this.currentPlan.next(updatedPlan);
  }

private isAgregateColumn(columnKey: string): boolean {
  const agregateColumns = ['cos_origin', 'cos_importacion', 'cos_logistica'
  ];

  return agregateColumns.includes(columnKey);
}


private isEditableColumn(columnKey: string): boolean {
  const editableColumns = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'
  ];
  return editableColumns.includes(columnKey);
}


private generateColumns(sampleData: any) {
  const actualView = this.currentView.getValue();
  const excludedKeys = actualView.excludedKeys;

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
    'fac_abril': 'Fac. Abril',
    'cos_origin': 'Cos. origin',
    'divisa': 'Divisa',
    'cos_importacion': 'Cos. Importacion',
    'cos_logistica': 'Cos. Logistica'
  };  

  const columns = Object.keys(sampleData)
    .filter(key => !excludedKeys.includes(key))
    .map(key => ({
      key: key,
      header: specialHeaders[key] || this.formatHeader(key),
      width: this.calculateWidth(key),
      visible: true,
      editable: this.isEditableColumn(key),
      agregate: this.isAgregateColumn(key) 
    }));

  let finalColumns = [...columns];

  /*
  if(this.showActionColumn.value) {
    finalColumns = [
      {
        key: 'acciones',
        header: 'Acciones',
        visible: true,
        width: 100,
        editable: false 
      },
      ...finalColumns
    ];
  }

  */

  finalColumns = [
    {
      key: 'acciones',
      header: 'Acciones',
      visible: true,
      width: 100,
      editable: false,
      agregate: false,
    },
    ...finalColumns
  ];

  this.currentColumns.next(finalColumns);
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
