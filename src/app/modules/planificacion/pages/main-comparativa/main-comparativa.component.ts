import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanicasComponent } from '../../components/canicas/canicas.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

interface PLANFULL {
  nombre: string;
  tipo: string;
  data: PLAN[][]; // Ajustado para reflejar la estructura anidada
}

interface PLAN {
  id_ph: number;
  clave: string;
  proveedor: string;
  nombre: string;
  inventario: number;
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
  id_fecha: string;
  nombre_plan: string;
}

@Component({
  selector: 'app-main-comparativa',
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './main-comparativa.component.html',
  styleUrls: ['./main-comparativa.component.scss'],
})
export class MainComparativaComponent implements OnInit {
  planA: PLANFULL = { nombre: '', tipo: '1', data: [[]] };
  planB: PLANFULL = { nombre: '', tipo: '1', data: [[]] };
  planC: PLANFULL = { nombre: '', tipo: '1', data: [[]] };

  protected id_plan: any;

  plan_list: string[] = [];
  selectedPlanA: string = '';
  selectedPlanB: string = '';
  selectedPlanC: string = '';

  dataSource = new MatTableDataSource<PLAN>();
  dataSourceB = new MatTableDataSource<PLAN>();
  dataSourceC = new MatTableDataSource<PLAN>();
  dataSourceAvB = new MatTableDataSource<any>();
  dataSourceAvC = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'clave',
    'nombre',
    'proveedor',
    'inventario',
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
  ];

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute,
    private service: ApiService, private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      try {
        const data_list = JSON.parse(params['selected_data'] || '[]');
        console.log('params_data:', data_list);
        this.id_plan = params['id'] || null;

        console.log("el id es: ", this.id_plan);

        if (data_list.length >= 3) {
          this.planA.nombre = data_list[0].name || '';
          this.planB.nombre = data_list[1].name || '';
          this.planC.nombre = data_list[2].name || '';
          console.log('Nombres de planes asignados:', this.planA.nombre, this.planB.nombre, this.planC.nombre);
        } else {
          console.warn('No se proporcionaron suficientes planes en selected_data');
          this.errorMessage = 'No se proporcionaron suficientes planes para comparar.';
        }

        this.fetchAllDatas();
      } catch (error) {
        console.error('Error al parsear selected_data:', error);
        this.errorMessage = 'Error al procesar los datos de comparación.';
        this.isLoading = false;
      }
    });
  }

  goBack(){
    this.location.back();
  }

  async fetchAllDatas() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Datos de prueba basados en el JSON proporcionado

      /*
      this.planA.data = [[
        {
          id_ph: 81,
          clave: '010.000.6051.00',
          proveedor: 'RICHET',
          nombre: 'Alprostadil (500mcg/5amp/1ml)',
          inventario: 0,
          enero: 150,
          febrero: 150,
          marzo: 150,
          abril: 300,
          mayo: 300,
          junio: 300,
          julio: 0,
          agosto: 0,
          septiembre: 0,
          octubre: 0,
          noviembre: 0,
          diciembre: 0,
          id_fecha: '2025-04-14T00:00:00.000Z',
          nombre_plan: 'tres Ascending'
        },
        {
          id_ph: 84,
          clave: '010.000.3461.00',
          proveedor: 'GERMED',
          nombre: 'Azatioprina (50mg/50tabl)',
          inventario: 0,
          enero: 30000,
          febrero: 40000,
          marzo: 40000,
          abril: 8500,
          mayo: 8500,
          junio: 8500,
          julio: 0,
          agosto: 0,
          septiembre: 0,
          octubre: 0,
          noviembre: 0,
          diciembre: 0,
          id_fecha: '2025-04-14T00:00:00.000Z',
          nombre_plan: 'tres',
        },
      ]];

      this.planB.data = [[
        {
          id_ph: 81,
          clave: '010.000.6051.00',
          proveedor: 'RICHET',
          nombre: 'Alprostadil (500mcg/5amp/1ml)',
          inventario: 0,
          enero: 100, // Diferencia en enero
          febrero: 150,
          marzo: 150,
          abril: 200, // Diferencia en abril
          mayo: 300,
          junio: 300,
          julio: 0,
          agosto: 0,
          septiembre: 0,
          octubre: 0,
          noviembre: 0,
          diciembre: 0,
          id_fecha: '2025-04-14T00:00:00.000Z',
          nombre_plan: 'cuatro',
        },
        {
          id_ph: 84,
          clave: '010.000.3461.00',
          proveedor: 'GERMED',
          nombre: 'Azatioprina (50mg/50tabl)',
          inventario: 0,
          enero: 20000, // Diferencia en enero
          febrero: 40000,
          marzo: 40000,
          abril: 9000, // Diferencia en abril
          mayo: 8500,
          junio: 8500,
          julio: 0,
          agosto: 0,
          septiembre: 0,
          octubre: 0,
          noviembre: 0,
          diciembre: 0,
          id_fecha: '2025-04-14T00:00:00.000Z',
          nombre_plan: 'cuatro',
        },
      ]];

      this.planC.data = [[
        {
          id_ph: 81,
          clave: '010.000.6051.00',
          proveedor: 'RICHET',
          nombre: 'Alprostadil (500mcg/5amp/1ml)',
          inventario: 0,
          enero: 150,
          febrero: 100, // Diferencia en febrero
          marzo: 150,
          abril: 300,
          mayo: 200, // Diferencia en mayo
          junio: 300,
          julio: 0,
          agosto: 0,
          septiembre: 0,
          octubre: 0,
          noviembre: 0,
          diciembre: 0,
          id_fecha: '2025-04-14T00:00:00.000Z',
          nombre_plan: 'cinco',
        },
        {
          id_ph: 84,
          clave: '010.000.3461.00',
          proveedor: 'GERMED',
          nombre: 'Azatioprina (50mg/50tabl)',
          inventario: 0,
          enero: 30000,
          febrero: 30000, // Diferencia en febrero
          marzo: 40000,
          abril: 8500,
          mayo: 9000, // Diferencia en mayo
          junio: 8500,
          julio: 0,
          agosto: 0,
          septiembre: 0,
          octubre: 0,
          noviembre: 0,
          diciembre: 0,
          id_fecha: '2025-04-14T00:00:00.000Z',
          nombre_plan: 'cinco',
        },
      ]];

      */

      // Descomentar para usar datos reales del servicio

      if(this.id_plan === '1'){
        console.log("fetching public plan data....");
        await Promise.all([
          this.getPlanDataPromise(this.planA.nombre),
          this.getPlanDataPromise(this.planB.nombre),
          this.getPlanDataPromise(this.planC.nombre),
        ]);
      }else if (this.id_plan === '2'){
        console.log("fetching private plan data....");

        await Promise.all([
          this.getPlanPrivateDataPromise(this.planA.nombre),
          this.getPlanPrivateDataPromise(this.planB.nombre),
          this.getPlanPrivateDataPromise(this.planC.nombre),
        ]);
      }
      
    
      

      console.log(" plan a data sin [] es ", this.planA.data);

      // Usar el primer elemento del arreglo data
      const planAData = this.planA.data[0] || [];
      const planBData = this.planB.data[0] || [];
      const planCData = this.planC.data[0] || [];

      console.log('Datos cargados - planA:', planAData);
      console.log('Datos cargados - planB:', planBData);
      console.log('Datos cargados - planC:', planCData);

      // Inicializar dataSource
      this.dataSource = new MatTableDataSource(planAData);
      this.dataSourceB = new MatTableDataSource(planBData);
      this.dataSourceC = new MatTableDataSource(planCData);

      // Calcular diferencias
      const avB = this.getDifferences(planAData, planBData);
      const avC = this.getDifferences(planAData, planCData);

      console.log('Diferencias A vs B:', avB);
      console.log('Diferencias A vs C:', avC);

      this.dataSourceAvB = new MatTableDataSource(avB);
      this.dataSourceAvC = new MatTableDataSource(avC);

      // Inicializar lista de planes
      this.plan_list = [this.planA.nombre || 'Plan A', this.planB.nombre || 'Plan B', this.planC.nombre || 'Plan C'];
      this.selectedPlanA = this.plan_list[0];
      this.selectedPlanB = this.plan_list[1];
      this.selectedPlanC = this.plan_list[2];

      if (!planAData.length || !planBData.length || !planCData.length) {
        this.errorMessage = 'No se encontraron datos para uno o más planes.';
      }
    } catch (err) {
      console.error('Error al cargar los datos:', err);
      this.errorMessage = 'No se pudieron cargar los datos. Por favor, intenta de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }


  getPlanPrivateDataPromise(plan_name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!plan_name) {
        console.warn(`Nombre del plan vacío: ${plan_name}`);
        resolve(false);
        return;
      }

      this.service.getPlanSelectedPrivateByName(plan_name).subscribe({
        next: (response) => {
          console.log(`Datos del plan ${plan_name}:`, response);
          const data = response.result; // Asegurarse de que data sea un arreglo

          if (plan_name === this.planA.nombre) {
            this.planA.data = data;
            console.log("1 data", response);
            console.log("1 data again ", data);

          } else if (plan_name === this.planB.nombre) {
            this.planB.data = data;
          } else if (plan_name === this.planC.nombre) {
            this.planC.data = data;
          }

          resolve(true);
        },
        error: (err) => {
          console.error(`Error al cargar el plan ${plan_name}:`, err);
          reject(err);
        },
      });
      
    });
  }

  getPlanDataPromise(plan_name: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!plan_name) {
        console.warn(`Nombre del plan vacío: ${plan_name}`);
        resolve(false);
        return;
      }

      this.service.getPlanSelectedByName(plan_name).subscribe({
        next: (response) => {
          console.log(`Datos del plan ${plan_name}:`, response);
          const data = response.result; // Asegurarse de que data sea un arreglo

          if (plan_name === this.planA.nombre) {
            this.planA.data = data;
            console.log("1 data", response);
            console.log("1 data again ", data);

          } else if (plan_name === this.planB.nombre) {
            this.planB.data = data;
          } else if (plan_name === this.planC.nombre) {
            this.planC.data = data;
          }

          resolve(true);
        },
        error: (err) => {
          console.error(`Error al cargar el plan ${plan_name}:`, err);
          reject(err);
        },
      });

    });
  }

  openSummary() {
    const dataBundle = {
      plan: 1,
      plan_list: [this.planA, this.planB, this.planC]
    }

   const modalRef =  this.modal.open(CanicasComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'redondo',
    });

    modalRef.componentInstance.bundle = dataBundle;

  }


  getDifferences(dataSource1: PLAN[], dataSource2: PLAN[]): any[] {
    const differences: any[] = [];
    const planKeys: (keyof PLAN)[] = [
      'inventario',
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    // Crear un mapa de dataSource2 para buscar por clave
    const data2Map = new Map<string, PLAN>();
    dataSource2.forEach((item) => data2Map.set(item.clave, item));

    console.log('Mapa de dataSource2:', Array.from(data2Map.entries()));

    // Iterar sobre dataSource1 y buscar correspondencias por clave
    dataSource1.forEach((row1, index1) => {
      const row2 = data2Map.get(row1.clave);
      if (!row2) {
        console.warn(`No se encontró elemento con clave ${row1.clave} en dataSource2`);
        return;
      }

      const rowDifferences: any[] = [];

      planKeys.forEach((key) => {
        const value1 = row1[key];
        const value2 = row2[key];

        // Convertir a string para comparación consistente
        const strValue1 = String(value1);
        const strValue2 = String(value2);

        if (strValue1 !== strValue2) {
          rowDifferences.push({
            campo: key,
            valor1: value1,
            valor2: value2,
          });
        }
      });

      if (rowDifferences.length > 0) {
        differences.push({
          nombre: row1.nombre,
          clave: row1.clave,
          diferencias: rowDifferences,
          index1: index1,
          index2: dataSource2.findIndex((item) => item.clave === row1.clave),
        });
      }
    });

    console.log('Diferencias calculadas:', differences);
    return differences;
  }

  isDifferent(row1: PLAN, row2: PLAN, column: string): boolean {
    if (!row1 || !row2) return false;
    return String(row1[column as keyof PLAN]) !== String(row2[column as keyof PLAN]);
  }
}