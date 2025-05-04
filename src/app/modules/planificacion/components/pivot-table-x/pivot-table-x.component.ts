import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PivotData {
  nombre: string;
  inventario: number;
  disponibles: number;
  clave?: string;
  [key: string]: any; 
}

interface PivotConfig {
  rows: string[];
  columns: string[];
  values: string[];
  filters?: { [key: string]: any };
}

@Component({
  selector: 'app-pivot-table-x',
  imports: [CommonModule, FormsModule],
  templateUrl: './pivot-table-x.component.html',
  styleUrls: ['./pivot-table-x.component.scss']
})
export class PivotTableXComponent implements OnInit {
  @Input() data: PivotData[] = [];
  @Input() config: PivotConfig = {
    rows: ['nombre'],
    columns: [],
    values: ['inventario']
  };

  pivotData: any[] = [];
  columnHeaders: string[] = [];
  rowHeaders: string[] = [];
  valueMatrix: any[][] = [];

  ngOnInit() {
    if (this.data && this.data.length > 0) {
      this.generatePivotTable();
    }
  }

  generatePivotTable() {
    // Extract unique row headers based on config
    this.rowHeaders = Array.from(new Set(
      this.data.map(item => 
        this.config.rows.map(row => item[row]).join('|')
      )
    ));

    // Extract unique column headers based on config
    this.columnHeaders = Array.from(new Set(
      this.data.flatMap(item => 
        this.config.columns.map(col => item[col])
      ).filter(Boolean)
    ));

    // If no columns are specified, just show values
    if (this.config.columns.length === 0) {
      this.columnHeaders = ['Values'];
    }

    // Initialize value matrix
    this.valueMatrix = this.rowHeaders.map(row => 
      this.columnHeaders.map(col => null)
    );

    // Aggregate values
    this.data.forEach(item => {
      const rowKey = this.config.rows.map(r => item[r]).join('|');
      const rowIndex = this.rowHeaders.indexOf(rowKey);

      if (this.config.columns.length > 0) {
        this.config.columns.forEach(col => {
          const colValue = item[col];
          const colIndex = this.columnHeaders.indexOf(colValue);
          
          this.config.values.forEach(val => {
            const currentValue = this.valueMatrix[rowIndex][colIndex] || 0;
            this.valueMatrix[rowIndex][colIndex] = currentValue + (item[val] || 0);
          });
        });
      } else {
        this.config.values.forEach((val, i) => {
          this.valueMatrix[rowIndex][i] = (this.valueMatrix[rowIndex][i] || 0) + (item[val] || 0);
        });
      }
    });
  }

  updateConfig(newConfig: PivotConfig) {
    this.config = newConfig;
    this.generatePivotTable();
  }

  // Helper to get month values
  getMonthValues(monthPrefix: string): {month: string, value: any, fac: any}[] {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    return months.map(month => ({
      month,
      value: this.data[0][month],
      fac: this.data[0][`fac_${month}`]
    })).filter(item => item.value !== undefined && item.value !== '');
  }
}