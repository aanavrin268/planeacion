import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { pp_data_details } from '../../core/helpers/readables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableInventariosModalComponent } from '../../shared/modals/table-inventarios-modal/table-inventarios-modal.component';
import { StackedViewModalComponent } from '../../shared/modals/stacked-view-modal/stacked-view-modal.component';

@Component({
  selector: 'app-proveedor-products',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './proveedor-products.component.html',
  styleUrl: './proveedor-products.component.scss'
})
export class ProveedorProductsComponent implements OnInit {

  protected dataSource = new MatTableDataSource<any>();
  protected dataSourcePlan = new MatTableDataSource<any>();

  protected displayedColumns: string[] = [];
  protected monthsColumns: string[] = [];

  protected displayedColumnsPlan: string[] = [];
  protected monthsColumnsPlan: string[] = [];

  protected sendSource: any[] = [];
  protected sendSourcePlan: any[] = [];

  protected editingCell: { row: any, column: string } | null = null; // Rastrea la celda en edición



  constructor(private modal: NgbModal){
    this.displayedColumns = ['nombre', 'inventario'];
    this.displayedColumnsPlan = ['nombre', 'inventario']

  }

  ngOnInit(): void {
    const processedData = pp_data_details.map(item => {
      const meses = item.arribos[0].months.reduce((acc: any, month: any) => {
        const key = Object.keys(month)[0]; // Obtener el nombre del mes (ej. "enero")
        const value = month[key]; // Obtener el valor del mes (ej. "58936")
        acc[key] = value; // Agregar el mes al objeto
        if (!this.monthsColumns.includes(key)) {
          this.monthsColumns.push(key); // Agregar el mes a las columnas dinámicas
        }
        return acc;
      }, {});

      return {
        ...item, // Mantener las propiedades originales
        ...meses // Agregar los meses al objeto
      };
    });


    const processedDataPlan = pp_data_details.map(item => {
      const meses = item.plan[0].months.reduce((acc: any, month: any) => {
        const key = Object.keys(month)[0]; // Obtener el nombre del mes (ej. "enero")
        const value = month[key]; // Obtener el valor del mes (ej. "58936")
        acc[key] = value; // Agregar el mes al objeto
        if (!this.monthsColumnsPlan.includes(key)) {
          this.monthsColumnsPlan.push(key); // Agregar el mes a las columnas dinámicas
        }
        return acc;
      }, {});

      return {
        ...item, // Mantener las propiedades originales
        ...meses // Agregar los meses al objeto
      };
    });

    this.sendSource = processedData;
    this.sendSourcePlan = processedDataPlan;

    // Actualizar las columnas mostradas
    this.displayedColumns = [...this.displayedColumns, ...this.monthsColumns];
    this.displayedColumnsPlan = [...this.displayedColumnsPlan, ...this.monthsColumnsPlan];

    // Asignar los datos procesados al dataSource
    this.dataSourcePlan = new MatTableDataSource(processedDataPlan);
    this.dataSource = new MatTableDataSource(processedData);
  }


  startEditing(row: any, column: string) {
    this.editingCell = { row, column };
  }

  // Método para detener la edición y guardar el valor
  stopEditing(event: any, row: any, column: string) {
    const newValue = event.target.value;
    row[column] = newValue; // Actualizar el valor en el dataSource
    this.editingCell = null; // Salir del modo de edición
  }


  openStacked(tipo: number) {
    const modalRef = this.modal.open(StackedViewModalComponent, {
      centered: true,
      size: 'xl', // Puedes mantener esto o eliminarlo si no es necesario
      windowClass: 'custom-modal-width redondo' // Aplica la clase personalizada
    });
  
    modalRef.componentInstance.data = tipo;
  }

  openZoom(tipo: number){
    let attachedData = {};

    switch(tipo){
        case 1:
          attachedData = {
            title:'Arribos',
            desc: 'Cantidad de piezas arribadas.',
            displayedColumns: this.displayedColumns,
            dataSource: this.sendSource
          };
        break;

        case 2:
          attachedData = {
            title:'Planeación',
            desc: 'Cantidad de piezas planificadas.',
            displayedColumns: this.displayedColumnsPlan,
            dataSource: this.sendSourcePlan
          };
        break;
    }

    const modalRef = this.modal.open(TableInventariosModalComponent, {
      centered:true,
      size:'xl',
      windowClass:'redondo'
    });

   

    modalRef.componentInstance.data = attachedData;

  }

}
