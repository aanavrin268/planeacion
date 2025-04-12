import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-multi-comparativa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-comparativa.component.html',
  styleUrls: ['./multi-comparativa.component.scss']
})
export class MultiComparativaComponent implements OnInit {
  protected planA: any = {};
  protected planB: any = {};
  protected planC: any = {};

  protected data_list: any[] = [];
  protected comparisonAB: any[] = [];
  protected comparisonAC: any[] = [];
  protected statsAB: any = {};
  protected statsAC: any = {};

  constructor(private route: ActivatedRoute, private service: ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      try {
        this.data_list = JSON.parse(params['selected_data'] || '[]');
        this.planA = this.data_list[0] || {};
        this.planB = this.data_list[1] || {};
        this.planC = this.data_list[2] || {};
        console.log('data_list:', JSON.stringify(this.data_list, null, 2));
        this.fetchAllData();
      } catch (error) {
        console.error('Error al parsear selected_data:', error);
      }
    });
  }

  async fetchAllData() {
    try {
      await Promise.all([
        this.getHistoricData(1, this.planA.name),
        this.getHistoricData(1, this.planB.name),
        this.getHistoricData(1, this.planC.name)
      ]);

      // Validar que los datos sean arreglos
      this.planA.data = Array.isArray(this.planA.data)
        ? this.planA.data.filter((item: any) => item && typeof item === 'object')
        : [];
      this.planB.data = Array.isArray(this.planB.data)
        ? this.planB.data.filter((item: any) => item && typeof item === 'object')
        : [];
      this.planC.data = Array.isArray(this.planC.data)
        ? this.planC.data.filter((item: any) => item && typeof item === 'object')
        : [];

      console.log('PLAN A DATA:', JSON.stringify(this.planA.data, null, 2));
      console.log('PLAN B DATA:', JSON.stringify(this.planB.data, null, 2));
      console.log('PLAN C DATA:', JSON.stringify(this.planC.data, null, 2));

      if (this.planA.data.length === 0 || this.planB.data.length === 0) {
        console.warn('Uno o ambos conjuntos de datos están vacíos');
        return;
      }

      if (this.planA.data.length !== this.planB.data.length) {
        console.warn('Los conjuntos de datos tienen diferentes longitudes:', {
          planA: this.planA.data.length,
          planB: this.planB.data.length
        });
      }

      this.comparisonAB = this.getDifferences(this.planA.data, this.planB.data);
      console.log('Comparación A vs B:', this.comparisonAB);

    } catch (error) {
      console.error('Error al obtener datos históricos:', error);
    }
  }

  getHistoricData(id_plan: number, plan_name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!plan_name) {
        console.error(`Nombre del plan no definido: ${plan_name}`);
        reject(false);
        return;
      }
      this.service.getSpecificHistoricDataPlan(id_plan, plan_name).subscribe({
        next: (data) => {
          console.log(`Datos del plan ${plan_name}:`, JSON.stringify(data, null, 2));
          if (plan_name === this.planA.name) {
            this.planA.data = Array.isArray(data.result) ? data.result : [];
          }
          if (plan_name === this.planB.name) {
            this.planB.data = Array.isArray(data.result) ? data.result : [];
          }
          if (plan_name === this.planC.name) {
            this.planC.data = Array.isArray(data.result) ? data.result : [];
          }
          resolve(true);
        },
        error: (err) => {
          console.error(`Error al traer data de ${plan_name}:`, err);
          reject(false);
        }
      });
    });
  }

  getDifferences(dataSource1: any[], dataSource2: any[]): any[] {
    const differences: any[] = [];

    // Comparar objetos por índice
    const maxLength = Math.min(dataSource1.length, dataSource2.length);
    for (let i = 0; i < maxLength; i++) {
      const row1 = dataSource1[i];
      const row2 = dataSource2[i];

      // Validar que ambos elementos sean objetos
      if (!row1 || typeof row1 !== 'object') {
        console.warn(`Elemento inválido en dataSource1 en índice ${i}:`, row1);
        continue;
      }
      if (!row2 || typeof row2 !== 'object') {
        console.warn(`Elemento inválido en dataSource2 en índice ${i}:`, row2);
        continue;
      }

      const rowDifferences: any[] = [];

      // Obtener todas las propiedades únicas de ambos objetos
      const allKeys = new Set([...Object.keys(row1), ...Object.keys(row2)]);

      allKeys.forEach(key => {
        const value1 = row1[key];
        const value2 = row2[key];

        // Comparar valores, manejando null/undefined
        if (value1 !== value2 && !(value1 == null && value2 == null)) {
          rowDifferences.push({
            propiedad: key,
            valor1: value1,
            valor2: value2
          });
        }
      });

      if (rowDifferences.length > 0) {
        differences.push({
          indice: i,
          nombre: row1.nombre || 'Sin nombre', // Para referencia, opcional
          diferencias: rowDifferences
        });
      }
    }

    return differences;
  }
}