import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; 
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-table',
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, DragDropModule, MatIconModule],
  templateUrl: './home-table.component.html',
  styleUrl: './home-table.component.scss'
})
export class HomeTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  bundle: any;
  data_list: any[] = [];

  protected tableTitle: any;
  protected tableText: any;

  protected searchText: string = '';

  dataSource = new MatTableDataSource<any>();
  displayedColumns: any[] = [];
  displayedColumnsCliente: any[] = [];

  protected ogData: any[] = [];
  protected filteredData: any[] = [];

  sort: Sort = {active: '', direction: ''};

  constructor(private active: NgbActiveModal, private cdr: ChangeDetectorRef){
    this.displayedColumns= ['PROVEEDORES', 'PIEZAS', 'MONTO'];
    //this.displayedColmnsCliente= ['CLIENTES', 'PIEZAS', 'MONTO'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    if(this.bundle && this.bundle.types === 'down'){
      this.displayedColumns = this.displayedColumnsCliente;
    }

    console.log("bundle received", this.bundle);

    if (this.bundle && this.bundle.data) {
      this.data_list = this.bundle.data;
      this.filteredData = this.bundle.data;
      this.ogData = [...this.bundle.data]; // Guardamos una copia de los datos originales
      
      if (this.bundle.text) this.tableText = this.bundle.text;
      if (this.bundle.title) this.tableTitle = this.bundle.title;

      this.dataSource = new MatTableDataSource(this.data_list);
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

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      // Crea una copia de las columnas actuales
      const columns = [...this.displayedColumns];
      
      // Mueve el elemento en el array
      moveItemInArray(columns, event.previousIndex, event.currentIndex);
      
      // Actualiza las columnas mostradas
      this.displayedColumns = columns;
      
      // Si hay ordenamiento activo, vuelve a aplicarlo con las columnas reordenadas
      if (this.sort.active && this.sort.direction) {
        this.sortData(this.sort.active);
      }
      
      // Forzar detección de cambios
      this.cdr.detectChanges();
      
      console.log('Columnas reordenadas:', this.displayedColumns);
    }
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

  close(){
    this.active.close();
  }
}