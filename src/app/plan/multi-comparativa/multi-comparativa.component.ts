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

    // Asumimos que ambos arrays tienen la misma estructura y length
    for (let i = 0; i < dataSource1.length; i++) {
        const med1 = dataSource1[i];
        const med2 = dataSource2[i];

        // Verificar que sean objetos válidos
        if (!med1 || typeof med1 !== 'object' || !med2 || typeof med2 !== 'object') {
            continue;
        }

        const differences: any = {};
        let hasDifferences = false;

        // Comparar todas las propiedades de los medicamentos
        const allKeys = new Set([...Object.keys(med1), ...Object.keys(med2)]);
        
        for (const key of allKeys) {
            const val1 = med1[key];
            const val2 = med2[key];

            // Si es un objeto (como los datos de inventario/meses)
            if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object') {
                const internalDifferences: any = {};
                
                // Comparar propiedades internas
                const internalKeys = new Set([...Object.keys(val1), ...Object.keys(val2)]);
                for (const internalKey of internalKeys) {
                    if (val1[internalKey] !== val2[internalKey]) {
                        internalDifferences[internalKey] = {
                            valor1: val1[internalKey],
                            valor2: val2[internalKey]
                        };
                        hasDifferences = true;
                    }
                }

                if (Object.keys(internalDifferences).length > 0) {
                    differences[key] = internalDifferences;
                }
            }
            // Para propiedades no-objeto
            else if (val1 !== val2) {
                differences[key] = {
                    valor1: val1,
                    valor2: val2
                };
                hasDifferences = true;
            }
        }

        if (hasDifferences) {
            results.push({
                nombre: med1.nombre || `Medicamento ${i}`,
                diferencias: differences
            });
        }
    }

    return results;
}














}