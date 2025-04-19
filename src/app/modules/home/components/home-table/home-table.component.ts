import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; 

@Component({
  selector: 'app-home-table',
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule, DragDropModule],
  templateUrl: './home-table.component.html',
  styleUrl: './home-table.component.scss'
})
export class HomeTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
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

  constructor(private active: NgbActiveModal, private cdr: ChangeDetectorRef){
    this.displayedColumns= ['PROVEEDORES', 'PIEZAS', 'MONTO'];
    this.displayedColumnsCliente= ['CLIENTES', 'PIEZAS', 'MONTO'];
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;

    this.cdr.detectChanges();
  }


  ngOnInit(): void {

    if(this.bundle.types === 'down'){
      this.displayedColumns = this.displayedColumnsCliente;
    }

    console.log("bundle received", this.bundle);

    this.data_list = this.bundle.data;
    this.filteredData = this.bundle.data;
    this.tableText = this.bundle.text;
    this.tableTitle = this.bundle.title;

    this.dataSource = new MatTableDataSource(this.data_list);

  }


  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      // Crea una copia de las columnas actuales
      const columns = [...this.displayedColumns];
      
      // Mueve el elemento en el array
      moveItemInArray(columns, event.previousIndex, event.currentIndex);
      
      // Actualiza las columnas mostradas
      this.displayedColumns = columns;
      
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
    }else {
      this.filteredData = [...this.data_list];
    }

    this.dataSource.data = this.filteredData;

  }

  close(){
    this.active.close();
  }

}
