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


  combinedColumns: {name: string, sources: string[], operation: 'concat' | 'sum'}[] = [];
  selectedColumnsForCombination: string[] = [];
  isSelectingForCombination: boolean = false;

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

  // Método para crear una nueva columna combinada
  createCombinedColumn(operation: 'concat' | 'sum'): void {
    if (this.selectedColumnsForCombination.length < 2) {
      console.error('Se necesitan al menos 2 columnas para combinar');
      return;
    }
    
    // Crear nombre para la nueva columna
    const newColumnName = this.selectedColumnsForCombination.join('+');
    
    // Añadir la nueva columna combinada
    const combinedColumn = {
      name: newColumnName,
      sources: [...this.selectedColumnsForCombination],
      operation: operation
    };
    
    this.combinedColumns.push(combinedColumn);
    
    // Calcular los valores para la nueva columna
    this.calculateCombinedColumnValues(combinedColumn);
    
    // Añadir la nueva columna a las columnas mostradas
    this.displayedColumns = [...this.displayedColumns, newColumnName];
    
    // Resetear el estado de selección
    this.isSelectingForCombination = false;
    this.selectedColumnsForCombination = [];
    
    // Forzar detección de cambios
    this.cdr.detectChanges();
  }
  
  // Método para calcular los valores de la columna combinada
  calculateCombinedColumnValues(combinedColumn: {name: string, sources: string[], operation: 'concat' | 'sum'}): void {
    // Iterar sobre cada fila de datos
    this.dataSource.data.forEach(row => {
      if (combinedColumn.operation === 'concat') {
        // Para concatenación de strings
        row[combinedColumn.name] = combinedColumn.sources
          .map(source => row[source])
          .join(' + ');
      } else if (combinedColumn.operation === 'sum') {
        // Para suma de valores numéricos
        row[combinedColumn.name] = combinedColumn.sources
          .reduce((acc, source) => {
            const val = parseFloat(row[source]);
            return acc + (isNaN(val) ? 0 : val);
          }, 0);
      }
    });
  }
  
  // Método para cancelar la selección de columnas
  cancelColumnCombination(): void {
    this.isSelectingForCombination = false;
    this.selectedColumnsForCombination = [];
  }


  // Método para iniciar el proceso de concatenación
  startColumnCombination(): void {
    this.isSelectingForCombination = true;
    this.selectedColumnsForCombination = [];
  }
  
  // Método para seleccionar/deseleccionar columnas para combinar
  toggleColumnSelection(column: string): void {
    if (!this.isSelectingForCombination) return;
    
    const index = this.selectedColumnsForCombination.indexOf(column);
    if (index > -1) {
      this.selectedColumnsForCombination.splice(index, 1);
    } else {
      this.selectedColumnsForCombination.push(column);
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