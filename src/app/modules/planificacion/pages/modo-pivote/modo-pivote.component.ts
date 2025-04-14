import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

interface SalesData {
  region: string;
  product: string;
  year: number;
  quarter: string;
  sales: number;
}

@Component({
  selector: 'app-modo-pivote',
  imports: [CommonModule, FormsModule],
  templateUrl: './modo-pivote.component.html',
  styleUrl: './modo-pivote.component.scss'
})
export class ModoPivoteComponent {

originalData: SalesData[] = [
  { region: 'Norte', product: 'Laptop', year: 2023, quarter: 'Q1', sales: 250 },
  { region: 'Norte', product: 'Laptop', year: 2023, quarter: 'Q2', sales: 280 },
  { region: 'Norte', product: 'Tablet', year: 2023, quarter: 'Q1', sales: 120 },
  { region: 'Norte', product: 'Tablet', year: 2023, quarter: 'Q2', sales: 150 },
  { region: 'Sur', product: 'Laptop', year: 2023, quarter: 'Q1', sales: 180 },
  { region: 'Sur', product: 'Laptop', year: 2023, quarter: 'Q2', sales: 210 },
  { region: 'Sur', product: 'Tablet', year: 2023, quarter: 'Q1', sales: 90 },
  { region: 'Sur', product: 'Tablet', year: 2023, quarter: 'Q2', sales: 110 },
];

// Datos procesados para la tabla pivotante
pivotData: any[] = [];

// Campos disponibles para pivote
availableFields: string[] = ['region', 'product', 'year', 'quarter'];

// Configuración actual de pivote
rowField: string = 'region';
columnField: string = 'product';
valueField: string = 'sales';

// Arrays para datos procesados
uniqueRowValues: string[] = [];
uniqueColumnValues: string[] = [];

// Para edición en tiempo real
editingCell: any = null;
editingValue: number | null = null;

constructor() { }

ngOnInit(): void {
  this.updatePivotTable();
}

// Método para actualizar la configuración del pivote
updatePivotConfig(rowField: string, columnField: string, valueField: string): void {
  this.rowField = rowField;
  this.columnField = columnField;
  this.valueField = valueField;
  this.updatePivotTable();
}

// Método para generar la tabla pivotante
updatePivotTable(): void {
  // Obtener valores únicos para filas y columnas
  this.uniqueRowValues = [...new Set(this.originalData.map(item => String(item[this.rowField as keyof SalesData])))];
  this.uniqueColumnValues = [...new Set(this.originalData.map(item => String(item[this.columnField as keyof SalesData])))];
  
  // Generar datos pivotantes
  this.pivotData = this.uniqueRowValues.map(rowValue => {
    const rowData: any = { [this.rowField]: rowValue };
    
    // Calcular los valores para cada columna
    this.uniqueColumnValues.forEach(colValue => {
      const filteredData = this.originalData.filter(item => 
        String(item[this.rowField as keyof SalesData]) === rowValue && 
        String(item[this.columnField as keyof SalesData]) === colValue
      );
      
      // Sumar los valores
      const sum = filteredData.reduce((acc, item) => acc + Number(item[this.valueField as keyof SalesData]), 0);
      rowData[colValue] = sum;
    });
    
    // Añadir total de fila
    rowData['Total'] = this.uniqueColumnValues.reduce((acc, colValue) => acc + (rowData[colValue] || 0), 0);
    
    return rowData;
  });
  
  // Calcular totales de columna
  const columnTotals: any = { [this.rowField]: 'Total' };
  this.uniqueColumnValues.forEach(colValue => {
    columnTotals[colValue] = this.pivotData.reduce((acc, row) => acc + (row[colValue] || 0), 0);
  });
  columnTotals['Total'] = this.uniqueColumnValues.reduce((acc, colValue) => acc + (columnTotals[colValue] || 0), 0);
  
  this.pivotData.push(columnTotals);
}

// Intercambiar filas y columnas
swapRowsAndColumns(): void {
  const temp = this.rowField;
  this.rowField = this.columnField;
  this.columnField = temp;
  this.updatePivotTable();
}

// Métodos para la edición en tiempo real
startEditing(rowIndex: number, columnName: string, value: number): void {
  // No permitir edición en la fila de totales
  if (rowIndex === this.pivotData.length - 1) {
    return;
  }

  // No permitir edición en la columna de totales
  if (columnName === 'Total') {
    return;
  }

  this.editingCell = { rowIndex, columnName };
  this.editingValue = value;
}

finishEditing(): void {
  if (this.editingCell && this.editingValue !== null) {
    const { rowIndex, columnName } = this.editingCell;
    const rowValue = this.pivotData[rowIndex][this.rowField];

    // Calcular la diferencia entre el valor actual y el nuevo valor
    const currentValue = this.pivotData[rowIndex][columnName];
    const difference = this.editingValue - currentValue;

    // Actualizar los datos originales
    const itemsToUpdate = this.originalData.filter(item => 
      String(item[this.rowField as keyof SalesData]) === rowValue && 
      String(item[this.columnField as keyof SalesData]) === columnName
    );

    if (itemsToUpdate.length > 0) {
      // Si hay datos que coinciden, distribuir la diferencia proporcionalmente
      const totalOriginal = itemsToUpdate.reduce((sum, item) => sum + item.sales, 0);
      
      itemsToUpdate.forEach(item => {
        const proportion = item.sales / totalOriginal;
        item.sales += difference * proportion;
      });
    } else {
      // Si no hay coincidencias, crear un nuevo registro
      // Usar valores predeterminados para otros campos necesarios
      const newItem: SalesData = {
        [this.rowField as keyof SalesData]: rowValue,
        [this.columnField as keyof SalesData]: columnName,
        year: 2023,
        quarter: 'Q1',
        sales: this.editingValue
      } as unknown as SalesData;
      
      this.originalData.push(newItem as SalesData);
    }

    // Actualizar la tabla pivotante
    this.updatePivotTable();
    this.editingCell = null;
    this.editingValue = null;
  }
}

cancelEditing(): void {
  this.editingCell = null;
  this.editingValue = null;
}

handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault();
    this.finishEditing();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    this.cancelEditing();
  }
}

isEditing(rowIndex: number, columnName: string): boolean {
  return this.editingCell && 
         this.editingCell.rowIndex === rowIndex && 
         this.editingCell.columnName === columnName;
}

}
