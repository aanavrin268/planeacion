import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDataGridModule, DxPivotGridModule, DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { LoadOptions } from 'devextreme/data';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-prueba-tabla',
  standalone: true,
  imports: [DxDataGridModule, DxPivotGridModule, DxCheckBoxModule, DxSelectBoxModule, CommonModule],
  templateUrl: './prueba-tabla.component.html',
  styleUrls: ['./prueba-tabla.component.scss']
})
export class PruebaTablaComponent {
  dataSource: any;
  pivotDataSource: any;
  
  // Configuración dinámica
  allowGrouping = true;
  allowPivoting = false;
  groupAutoExpandAll = true;
  
  // Opciones de agrupación disponibles
  groupingOptions = [
    { field: 'estado', caption: 'Por Estado' },
    { field: 'fecha', caption: 'Por Fecha' },
    { field: 'valor', caption: 'Por Rango de Valor', groupInterval: '1000' }
  ];
  selectedGrouping = this.groupingOptions[0];
  
  // Configuraciones del grid
  scrollingOptions = {
    mode: 'virtual',
    rowRenderingMode: 'virtual',
    useNative: true
  };
  
  pivotFields = [
    { dataField: 'valor', area: 'data' },
    { dataField: 'estado', area: 'row' },
    { dataField: 'fecha', area: 'column', groupInterval: 'month' }
  ];

  constructor() {
    this.initializeDataSources();
  }

  private initializeDataSources(): void {
    this.dataSource = new CustomStore({
      key: 'id',
      load: (options: LoadOptions) => this.loadData(options),
      totalCount: () => this.getTotalCount()
    });

    this.pivotDataSource = {
      store: this.dataSource,
      fields: this.pivotFields
    };
  }

  private loadData(options: LoadOptions): Promise<any[]> {
    // Simulación de datos - reemplazar con API real
    return new Promise(resolve => {
      const data = this.generateMockData(options.skip || 0, options.take || 100);
      resolve(data);
    });
  }

  private getTotalCount(): Promise<number> {
    return Promise.resolve(10000000);
  }

  private generateMockData(startIndex: number, count: number): any[] {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i + 1,
      nombre: `Registro ${startIndex + i + 1}`,
      fecha: new Date(2023, (startIndex + i) % 12, 1),
      valor: Math.floor(Math.random() * 10000),
      estado: (startIndex + i) % 4 === 0 ? 'Activo' : 
              (startIndex + i) % 3 === 0 ? 'Pendiente' : 'Inactivo',
      categoria: ['A', 'B', 'C', 'D'][(startIndex + i) % 4]
    }));
  }

  togglePivoting(): void {
    this.allowPivoting = !this.allowPivoting;
    if (this.allowPivoting) {
      this.allowGrouping = false;
    }
  }

  applyGrouping(): void {
    // La agrupación se aplica automáticamente mediante las propiedades del grid
  }
}