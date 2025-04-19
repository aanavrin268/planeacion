import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PLANPUBLIC } from '../../../../shared/components/modals/modal-plan-view/modal-plan-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-full-table-view',
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule, DragDropModule, MatIconModule, MatSortModule],
  templateUrl: './full-table-view.component.html',
  styleUrl: './full-table-view.component.scss'
})
export class FullTableViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  protected dataSource = new MatTableDataSource<any>();

  protected sort: Sort = { active: '', direction: ''};

  protected displayedColumns: string[] = [];
  protected ogData: any[] = [];
  protected filteredData: any[] = [];

  protected searchText: string = '';
  data_list: any[] = [];


  


  protected dummyPublicData: PLANPUBLIC[] = [
    { clave: '100.00.100.23', nombre: 'Alprostadil', disponibles: 2300, enero: 100, fac_enero: 3000, febrero: 10000, fac_febrero: 4500, 
      marzo: 10000, fac_marzo: 45000, abril: 10000, fac_abril: 45000, mayo: 10000, junio: 10000, julio: 10000, agosto: 10000, septiembre: 10000,
      octubre: 10000, noviembre: 10000, diciembre: 10000
    },
    { clave: '100.00.100.23', nombre: 'Busulfan', disponibles: 2300, enero: 100000, fac_enero: 3000, febrero: 10000, fac_febrero: 4500, 
      marzo: 10000, fac_marzo: 45000, abril: 10000, fac_abril: 45000, mayo: 10000, junio: 10000, julio: 10000, agosto: 10000, septiembre: 10000,
      octubre: 10000, noviembre: 10000, diciembre: 10000
    },
    { clave: '100.00.100.23', nombre: 'Tacrolimus', disponibles: 2300, enero: 500, fac_enero: 3000, febrero: 10000, fac_febrero: 4500, 
      marzo: 10000, fac_marzo: 45000, abril: 10000, fac_abril: 45000, mayo: 10000, junio: 10000, julio: 10000, agosto: 10000, septiembre: 10000,
      octubre: 10000, noviembre: 10000, diciembre: 10000
    },
    { clave: '100.00.100.23', nombre: 'Satial F', disponibles: 2300, enero: 60000, fac_enero: 3000, febrero: 10000, fac_febrero: 4500, 
      marzo: 10000, fac_marzo: 45000, abril: 10000, fac_abril: 45000, mayo: 10000, junio: 10000, julio: 10000, agosto: 10000, septiembre: 10000,
      octubre: 10000, noviembre: 10000, diciembre: 10000
    },
    { clave: '100.00.100.23', nombre: 'Be-free', disponibles: 2300, enero: 9000, fac_enero: 3000, febrero: 10000, fac_febrero: 4500, 
      marzo: 10000, fac_marzo: 45000, abril: 10000, fac_abril: 45000, mayo: 10000, junio: 10000, julio: 10000, agosto: 10000, septiembre: 10000,
      octubre: 10000, noviembre: 10000, diciembre: 10000
    }
  ];

  constructor(private cdr: ChangeDetectorRef){
    this.displayedColumns=['clave', 'nombre', 'disponibles', 'enero', 'fac_enero', 'febrero', 'fac_febrero',
      'marzo', 'fac_marzo', 'abril', 'fac_abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
      'noviembre', 'diciembre'
     ];
  } 


  ngOnInit(): void {
    this.data_list = this.dummyPublicData;
    this.dataSource = new MatTableDataSource(this.data_list);

  }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;

      this.cdr.detectChanges();
    }

    filterData(){
      if (this.searchText.trim()){
        this.filteredData = this.data_list.filter(item => {
          return Object.values(item).some(val => 
            String(val).toLowerCase().includes(this.searchText.toLowerCase())
          );
        });
      } else {
        this.filteredData = [...this.data_list];
      }
  
      this.dataSource.data = this.filteredData;
      
      // Reaplica el ordenamiento si existe
      if (this.sort.active && this.sort.direction) {
        this.sortData(this.sort.active);
      }
    }

    private compareValues(a: any, b: any, isAsc: boolean): number {
      // Manejo de valores nulos o indefinidos
      if (a === null || a === undefined) return isAsc ? -1 : 1;
      if (b === null || b === undefined) return isAsc ? 1 : -1;
      
      // Comparar según el tipo de dato
      if (typeof a === 'string' && typeof b === 'string') {
        return isAsc ? a.localeCompare(b) : b.localeCompare(a);
      } else {
        return isAsc ? (a < b ? -1 : a > b ? 1 : 0) : (a < b ? 1 : a > b ? -1 : 0);
      }
    }

  sortData(column: string): void {
    // Determinar la dirección del ordenamiento
    const isAsc = this.sort.active === column && this.sort.direction === 'asc';
    const direction = isAsc ? 'desc' : 'asc';
    
    // Actualizar el estado del ordenamiento
    this.sort = { active: column, direction: direction };
    
    // Ordenar los datos actuales filtrados, no los originales
    const dataToSort = [...this.dataSource.data];
    
    // Ordenar los datos según la columna y dirección
    this.dataSource.data = dataToSort.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      return this.compareValues(a[column], b[column], isAsc);
    });
    
    // Log para depuración
    console.log(`Ordenando por ${column} en dirección ${direction}`, this.dataSource.data);
    
    // Forzar detección de cambios
    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<string[]>){
    if(event.previousIndex !== event.currentIndex){
      const columns = [...this.displayedColumns];

      moveItemInArray(columns, event.previousIndex, event.currentIndex);

      this.displayedColumns = columns;

      if(this.sort.active && this.sort.direction){
        this.sortData(this.sort.active);
      }

      this.cdr.detectChanges();
    }

  }
   



}
