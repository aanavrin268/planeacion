import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

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

      console.log('PLAN A DATA:', this.planA.data);
      console.log('PLAN B DATA:', this.planB.data);
      console.log('PLAN C DATA:', this.planC.data);

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
    const results: any[] = [];
    
    // Verifica que ambos arrays sean válidos
    if (!Array.isArray(dataSource1) || !Array.isArray(dataSource2)) {
      console.error('Las fuentes de datos deben ser arrays');
      return [];
    }
  
    // Para cada medicamento en el primer array
    for (let i = 0; i < dataSource1.length; i++) {
      const med1 = dataSource1[i];
      // Busca el medicamento correspondiente en el segundo array
      const med2 = dataSource2.find(m => m.clave === med1.clave);
      
      // Si no se encuentra el medicamento en el segundo array, continúa
      if (!med2) continue;
      
      const diferencias: any = {};
      let hasDifferences = false;
      
      // Compara todas las propiedades
      for (const key of Object.keys(med1)) {
        // Solo compara valores si la propiedad existe en ambos objetos
        if (key in med2 && med1[key] !== med2[key]) {
          diferencias[key] = {
            valor1: med1[key],
            valor2: med2[key]
          };
          hasDifferences = true;
        }
      }
      
      // Si hay diferencias, agrega este medicamento al resultado
      if (hasDifferences) {
        results.push({
          nombre: med1.nombre,
          diferencias: diferencias
        });
      }
    }
    
    return results;
  }













}