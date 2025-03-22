import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { pp_data_details } from '../../core/helpers/readables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableInventariosModalComponent } from '../../shared/modals/table-inventarios-modal/table-inventarios-modal.component';
import { StackedViewModalComponent } from '../../shared/modals/stacked-view-modal/stacked-view-modal.component';
import { gsap } from 'gsap';


@Component({
  selector: 'app-proveedor-products',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './proveedor-products.component.html',
  styleUrl: './proveedor-products.component.scss'
})
export class ProveedorProductsComponent implements OnInit {
  @ViewChild('cardLefts', { static: true}) cardL!: ElementRef;

  protected dataSource = new MatTableDataSource<any>();
  protected dataSourcePlan = new MatTableDataSource<any>();
  protected dataSourcethird = new MatTableDataSource<any>();

  protected displayedColumns: string[] = [];
  protected monthsColumns: string[] = [];

  protected displayedColumnsPlan: string[] = [];
  protected monthsColumnsPlan: string[] = [];

  protected thirdJson: any[] = [];
  protected displayedColumnsThird: string[] = [];


  protected sendSource: any[] = [];
  protected sendSourcePlan: any[] = [];

  protected editingCell: { row: any, column: string } | null = null; 

  protected isArribosExpanded: boolean;



  constructor(private modal: NgbModal){
    this.displayedColumns = ['nombre', 'inventario'];
    this.displayedColumnsPlan = ['nombre', 'inventario']
    this.displayedColumnsThird= ['nombre', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    this.isArribosExpanded = false;

  }

  ngOnInit(): void {


    this.thirdJson = this.generateNewJson(pp_data_details);

    console.log('terer', this.thirdJson);

    this.dataSourcethird = new MatTableDataSource(this.thirdJson);

  
    pp_data_details.forEach(item => {
      item.arribos[0].months.forEach(month => {
        const key = Object.keys(month)[0]; // Obtener el nombre del mes (ej. "enero")
        if (!this.monthsColumns.includes(key)) {
          this.monthsColumns.push(key); // Agregar el mes a las columnas dinámicas
        }
      });
    
      // Agregar 'total' a las columnas si no está presente
      if (!this.monthsColumns.includes('total')) {
        this.monthsColumns.push('total');
      }
    });
    
    // Actualizar displayedColumns sin duplicados
    this.displayedColumns = [
      ...this.displayedColumns, // Columnas fijas ('nombre', 'inventario')
      ...this.monthsColumns,    // Columnas dinámicas (meses y 'total')
    ];
    
    // Procesar los datos
    const processedData = pp_data_details.map(item => {
      const meses = item.arribos[0].months.reduce((acc: any, month: any) => {
        const key = Object.keys(month)[0]; // Obtener el nombre del mes (ej. "enero")
        const value = parseInt(month[key], 10); // Convertir el valor a número
        acc[key] = value; // Agregar el mes al objeto
        return acc;
      }, {});
    
      // Calcular el total sumando los valores de los meses
      const total = (Object.values(meses) as number[]).reduce((sum, value) => sum + value, 0);
    
      return {
        ...item, // Mantener las propiedades originales
        ...meses, // Agregar los meses al objeto
        total: total, // Agregar el total al objeto
      };
    });
    
    console.log('Columnas mostradas:', this.displayedColumns);
    console.log('Datos procesados:', processedData);










    pp_data_details.forEach(item => {
      item.plan[0].months.forEach(month => {
        const key = Object.keys(month)[0]; // Obtener el nombre del mes (ej. "enero")
        if (!this.monthsColumnsPlan.includes(key)) {
          this.monthsColumnsPlan.push(key); // Agregar el mes a las columnas dinámicas
        }
      });
    
      // Agregar 'total' a las columnas si no está presente
      if (!this.monthsColumnsPlan.includes('total')) {
        this.monthsColumnsPlan.push('total');
      }
    });
    
    // Actualizar displayedColumns sin duplicados
    this.displayedColumnsPlan = [
      ...this.displayedColumnsPlan, // Columnas fijas ('nombre', 'inventario')
      ...this.monthsColumnsPlan,    // Columnas dinámicas (meses y 'total')
    ];
    
    // Procesar los datos
    const processedDataPlan = pp_data_details.map(item => {
      const meses = item.plan[0].months.reduce((acc: any, month: any) => {
        const key = Object.keys(month)[0]; // Obtener el nombre del mes (ej. "enero")
        const value = parseInt(month[key], 10); // Convertir el valor a número
        acc[key] = value; // Agregar el mes al objeto
        return acc;
      }, {});
    
      // Calcular el total sumando los valores de los meses
      const total = (Object.values(meses) as number[]).reduce((sum, value) => sum + value, 0);
    
      return {
        ...item, // Mantener las propiedades originales
        ...meses, // Agregar los meses al objeto
        total: total, // Agregar el total al objeto
      };
    });
    
    console.log('Columnas mostradas:', this.displayedColumnsPlan);
    console.log('Datos procesados:', processedDataPlan);





/*
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
*/



    this.sendSource = processedData;
    this.sendSourcePlan = processedDataPlan;

    // Actualizar las columnas mostradas
    //this.displayedColumns = [...this.displayedColumns, ...this.monthsColumns];

    //console.log(this.displayedColumns);
    //console.log(processedData)



    //this.displayedColumnsPlan = [...this.displayedColumnsPlan, ...this.monthsColumnsPlan];

    // Asignar los datos procesados al dataSource
    this.dataSourcePlan = new MatTableDataSource(processedDataPlan);
    this.dataSource = new MatTableDataSource(processedData);
  }


   getMonthValue(months: any[], month: string): number {
    const monthData = months.find((m: any) => Object.keys(m)[0] === month);
    return parseFloat(monthData?.[month] || 0);
  }

// Función para generar el nuevo JSON
 generateNewJson(data: any[]) {
  return data.map(item => {
    const nombre = item.nombre;

    // Obtener los valores de "arribos" y "plan"
    const arribosMonths = item.arribos[0].months;
    const planMonths = item.plan[0].months;

    // Inicializar el valor de junio (mes anterior a julio)
    let valorNuevoJsonMesAnterior = 0; // Por defecto, es 0
    const arribosJunio = this.getMonthValue(arribosMonths, 'junio');

    // Crear el objeto con cada mes como propiedad independiente
    const newItem: any = {
      nombre,
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0
    };

    // Calcular los valores desde julio hasta diciembre
    const meses = ['julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    meses.forEach((mes, index) => {
      const mesAnterior = index === 0 ? 'junio' : meses[index - 1]; // Mes anterior
      const arribosMesAnterior = this.getMonthValue(arribosMonths, mesAnterior);
      const planMesActual = this.getMonthValue(planMonths, mes);

      // Aplicar la fórmula
      newItem[mes] = (valorNuevoJsonMesAnterior + arribosMesAnterior) - planMesActual;

      // Actualizar el valor del mes anterior para la siguiente iteración
      valorNuevoJsonMesAnterior = newItem[mes];
    });

    return newItem;
  });
}


  animateCard() {
    const cardElement = this.cardL.nativeElement;

    if (this.isArribosExpanded) {
      // Animación para expandir
      gsap.to(cardElement, {
        width: '104%', // Ancho expandido
        duration: 0.5, // Duración de la animación (en segundos)
        ease: 'power2.out', // Efecto de easing (suave)
      });
    } else {
      // Animación para contraer
      gsap.to(cardElement, {
        width: 'calc(50% - 16px)', // Ancho original
        duration: 0.5, // Duración de la animación (en segundos)
        ease: 'power2.out', // Efecto de easing (suave)
      });
    }
  }


  setExpandOn(){
    this.isArribosExpanded = !this.isArribosExpanded;
    this.animateCard();

    console.log(this.isArribosExpanded);
  }


  startEditing(row: any, column: string) {
    this.editingCell = { row, column };
  }



  stopEditing(event: any, row: any, column: string) {
    const newValue = parseFloat(event.target.value) || 0; // Convertir a número (o usar 0 si no es válido)
    row[column] = newValue; // Actualizar el valor en el dataSource
  
    // Si la columna editada es un mes, recalcular el total
    if (this.monthsColumns.includes(column)) {
      this.updateTotal(row);
    }
  
    this.editingCell = null; // Salir del modo de edición
  }


// Método para recalcular el total
updateTotal(row: any) {
  row['total'] = 0;
  let total = 0;
  this.monthsColumns.forEach(month => {
    const value = parseFloat(row[month]) || 0; // Convertir a número (o usar 0 si no es válido)
    total += value;
  });
  row['total'] = total; // Actualizar el total
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
