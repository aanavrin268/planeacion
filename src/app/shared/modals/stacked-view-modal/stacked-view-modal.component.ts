import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { pp_data_details } from '../../../core/helpers/readables';

@Component({
  selector: 'app-stacked-view-modal',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './stacked-view-modal.component.html',
  styleUrl: './stacked-view-modal.component.scss'
})
export class StackedViewModalComponent implements OnInit {

  
 protected dataSource = new MatTableDataSource<any>();
  protected dataSourcePlan = new MatTableDataSource<any>();
  protected dataSourcethird = new MatTableDataSource<any>();


  protected displayedColumns: string[] = [];
  protected monthsColumns: string[] = [];

  protected displayedColumnsPlan: string[] = [];
  protected monthsColumnsPlan: string[] = [];

  protected thirdJson: any[] = [];
  protected displayedColumnsThird: string[] = [];

  protected editingCell: { row: any, column: string } | null = null; 

  protected sendSource: any[] = [];
  protected sendSourcePlan: any[] = [];




  constructor(){

    this.displayedColumns = ['nombre', 'inventario'];
    this.displayedColumnsPlan = ['nombre', 'inventario']
    this.displayedColumnsThird= ['nombre', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  }



  ngOnInit(): void {


    this.thirdJson = this.generateNewJson(pp_data_details);

    console.log('terer', this.thirdJson);

    this.dataSourcethird = new MatTableDataSource(this.thirdJson);

  
    pp_data_details.forEach(item => {
      item.arribos[0].months.forEach(month => {
        const key = Object.keys(month)[0]; 
        if (!this.monthsColumns.includes(key)) {
          this.monthsColumns.push(key); 
        }
      });
    
      if (!this.monthsColumns.includes('total')) {
        this.monthsColumns.push('total');
      }
    });
    
    this.displayedColumns = [
      ...this.displayedColumns, 
      ...this.monthsColumns,   
    ];
    
    const processedData = pp_data_details.map(item => {
      const meses = item.arribos[0].months.reduce((acc: any, month: any) => {
        const key = Object.keys(month)[0]; 
        const value = parseInt(month[key], 10); 
        acc[key] = value; 
        return acc;
      }, {});
    
      const total = (Object.values(meses) as number[]).reduce((sum, value) => sum + value, 0);
    
      return {
        ...item,
        ...meses, 
        total: total,
      };
    });
    
    console.log('Columnas mostradas:', this.displayedColumns);
    console.log('Datos procesados:', processedData);










    pp_data_details.forEach(item => {
      item.plan[0].months.forEach(month => {
        const key = Object.keys(month)[0]; 
        if (!this.monthsColumnsPlan.includes(key)) {
          this.monthsColumnsPlan.push(key); 
        }
      });
    
      if (!this.monthsColumnsPlan.includes('total')) {
        this.monthsColumnsPlan.push('total');
      }
    });
    
    this.displayedColumnsPlan = [
      ...this.displayedColumnsPlan, 
      ...this.monthsColumnsPlan,    
    ];
    
    const processedDataPlan = pp_data_details.map(item => {
      const meses = item.plan[0].months.reduce((acc: any, month: any) => {
        const key = Object.keys(month)[0]; 
        const value = parseInt(month[key], 10); 
        acc[key] = value; 
        return acc;
      }, {});
    
      const total = (Object.values(meses) as number[]).reduce((sum, value) => sum + value, 0);
    
      return {
        ...item, 
        ...meses, 
        total: total, 
      };
    });
    
    console.log('Columnas mostradas:', this.displayedColumnsPlan);
    console.log('Datos procesados:', processedDataPlan);



    this.sendSource = processedData;
    this.sendSourcePlan = processedDataPlan;

 

    this.dataSourcePlan = new MatTableDataSource(processedDataPlan);
    this.dataSource = new MatTableDataSource(processedData);
  }



  
  
  
    startEditing(row: any, column: string) {
      this.editingCell = { row, column };
    }
  
    stopEditing(event: any, row: any, column: string) {
      const newValue = parseFloat(event.target.value) || 0; // Convertir a número (o usar 0 si no es válido)
    
      // Actualizar el valor en el JSON original (pp_data_details)
      const originalItem = pp_data_details.find(item => item.nombre === row.nombre);
      if (originalItem) {
        const monthIndex = originalItem.arribos[0].months.findIndex((m: any) => Object.keys(m)[0] === column);
        if (monthIndex !== -1) {
          // Hacer una doble conversión para evitar errores de tipo
          const monthObject = originalItem.arribos[0].months[monthIndex] as unknown as { [key: string]: string };
          monthObject[column] = newValue.toString(); // Actualizar el valor en el JSON original
        }
      }
    
      // Actualizar el valor en la fila de la tabla de arribos
      row[column] = newValue;
    
      // Si la columna editada es un mes, recalcular el total
      if (this.monthsColumns.includes(column)) {
        this.updateTotal(row);
      }
    
      // Recalcular thirdJson y actualizar la fuente de datos
      this.updateThirdJson();
    
      this.editingCell = null; // Salir del modo de edición
    }




updateTotal(row: any) {
  row['total'] = 0;
  let total = 0;
  this.monthsColumns.forEach(month => {
    const value = parseFloat(row[month]) || 0; // Convertir a número (o usar 0 si no es válido)
    total += value;
  });
  row['total'] = total; // Actualizar el total
}

// Método para recalcular thirdJson
updateThirdJson() {
  // Regenerar thirdJson basado en el JSON original actualizado (pp_data_details)
  this.thirdJson = this.generateNewJson(pp_data_details);

  // Actualizar la fuente de datos de la tabla de desplazamiento
  this.dataSourcethird.data = this.thirdJson;
}
  
  
  


  generateNewJson(data: any[]) {
    return data.map(item => {
      const nombre = item.nombre;
  
      const arribosMonths = item.arribos[0].months;
      const planMonths = item.plan[0].months;
  
      let valorNuevoJsonMesAnterior = 0; 
      const arribosJunio = this.getMonthValue(arribosMonths, 'junio');
  
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
  
      const meses = ['julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      meses.forEach((mes, index) => {
        const mesAnterior = index === 0 ? 'junio' : meses[index - 1]; // Mes anterior
        const arribosMesAnterior = this.getMonthValue(arribosMonths, mesAnterior);
        const planMesActual = this.getMonthValue(planMonths, mes);
  
        newItem[mes] = (valorNuevoJsonMesAnterior + arribosMesAnterior) - planMesActual;
  
        valorNuevoJsonMesAnterior = newItem[mes];
      });
  
      return newItem;
    });
  }


  getMonthValue(months: any[], month: string): number {
    const monthData = months.find((m: any) => Object.keys(m)[0] === month);
    return parseFloat(monthData?.[month] || 0);
  }
  

}
