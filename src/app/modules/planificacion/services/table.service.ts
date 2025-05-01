import { Injectable } from '@angular/core';
import { Column, Group, RowData } from '../models/plan.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {


  
    
    columns: Column[] = [
      { key: 'name', header: 'Nombre', width: 200 , visible: true },
      { key: 'january', header: 'Enero', width: 100 , visible: true},
      { key: 'february', header: 'Febrero', width: 100, visible: true },
      { key: 'march', header: 'Marzo', width: 100 , visible: true},
      { key: 'april', header: 'Abril', width: 100, visible: true },
      { key: 'may', header: 'Mayo', width: 100 , visible: true},
      { key: 'june', header: 'Junio', width: 100 , visible: true},
      { key: 'july', header: 'Julio', width: 100 , visible: true},
      { key: 'augost', header: 'Agosto', width: 100, visible: true },
      { key: 'september', header: 'Septiembre', width: 100 , visible: true},
  
    ];


    
      
      data: RowData[] = [
        { name: 'Tacrolimus', january: 100, february: 200, march: 300, april: 300, may: 500, june: 100,
          july: 100, augost: 200, september: 1000
         },
        { name: 'Busulfan', january: 150, february: 250, march: 350, april: 300, may: 500, june: 100,
          july: 100, augost: 200, september: 1000
         }
      ];
    


      groups: Group[] = [
        { label: 'Primer Trimestre', colspan: 3, startColumn: 'january', endColumn: 'march' },
        { label: 'Segundo Trimestre', colspan: 3, startColumn: 'april', endColumn: 'june' },
        { label: 'Tercer Trimestre', colspan: 3, startColumn: 'july', endColumn: 'september' },
    
      ];
      
    
    
  
  dataTableSource = new  BehaviorSubject<any>([]);

  dataTableSource$ = this.dataTableSource.asObservable();
  

  constructor() { }


    
  setTableData(data: any): Observable<any[]>{
    return this.dataTableSource.next(data);

  }

    getTableData():Observable<any>{
      
      return this.dataTableSource.getValue();
    }




}
