import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanicasComponent } from '../../components/canicas/canicas.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

interface PLANFULL {
  nombre: string;
  tipo: string;
  data: PLAN[];
}

interface PLAN {
  clave: string;
  nombre: string;
  inventario: string;
  enero: string;
  facturacion_enero: string;
  febrero: string;
  facturacion_febrero: string;
  marzo: string;
  facturacion_marzo: string;
  abril: string;
  mayo: string;
  junio: string;
}

@Component({
  selector: 'app-main-comparativa',
  imports: [CommonModule, FormsModule, MatExpansionModule, MatTableModule],
  templateUrl: './main-comparativa.component.html',
  styleUrl: './main-comparativa.component.scss'
})
export class MainComparativaComponent implements OnInit {
  planA: PLANFULL;
  planB: PLANFULL;
  planC: PLANFULL;

  data1: PLAN[] = [];
  data2: PLAN[] = [];
  data3: PLAN[] = [];

  plan_list: any[] = [];

  selectedPlanA: any;
  selectedPlanB: any;
  selectedPlanC: any;

  dataSource = new MatTableDataSource<any>();
  dataSourceB = new MatTableDataSource<any>();
  dataSourceC = new MatTableDataSource<any>();

  dataSourceAvB = new MatTableDataSource<any>();
  dataSourceAvC = new MatTableDataSource<any>();


  displayedColumns: any[] = [];

  protected data_list: any[] = [];

  constructor(private modal: NgbModal, private route: ActivatedRoute, private service: ApiService){
   
    this.planA = { nombre: '', tipo: "1", data: [] };
    this.planB = { nombre: '', tipo: "1", data: [] };
    this.planC = { nombre: '', tipo: "1", data: [] };


    this.displayedColumns = ['clave','nombre', 'inventario', 'enero', 'facturacion_enero',
      'febrero', 'facturacion_febrero', 'marzo', 'facturacion_marzo'
    ];

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      try {
        this.data_list = JSON.parse(params['selected_data'] || '[]');

        console.log("params_data", this.data_list);
        this.planA.nombre = this.data_list[0].name;
        this.planB.nombre = this.data_list[1].name;
        this.planC.nombre = this.data_list[2].name;

        //this.planA = this.data_list[0] || {};
        //this.planB = this.data_list[1] || {};
        //this.planC = this.data_list[2] || {};
      } catch (error) {
        console.error('Error al parsear selected_data:', error);
      }
    });

    this.fetchAllDatas();





    //this.planA.data = this.data1;
    //this.planB.data = this.data2;
    //this.planC.data = this.data3;

    this.plan_list = [this.planA.nombre, this.planB.nombre, this.planC.nombre];
    this.selectedPlanA = this.plan_list[0];
    this.selectedPlanB = this.plan_list[1];
    this.selectedPlanC = this.plan_list[2];

    console.log("planes", this.selectedPlanA);

    

   

  }

  async fetchAllDatas() {
    try {
      await Promise.all([
        this.getPlanDataPromise(this.planA.nombre),
        this.getPlanDataPromise(this.planB.nombre),
        this.getPlanDataPromise(this.planC.nombre),
      ]);

      this.dataSource = new MatTableDataSource(this.planA.data);
      this.dataSourceB = new MatTableDataSource(this.planB.data);
      this.dataSourceC = new MatTableDataSource(this.planC.data);

      const avB = this.getDifferences(this.planA.data, this.planB.data);
      const avC = this.getDifferences(this.planA.data, this.planC.data);

      console.log('diff avB', avB);
      console.log('diff avC', avC);

      this.dataSourceAvB = new MatTableDataSource(avB);
      this.dataSourceAvC = new MatTableDataSource(avC);

      // Inicializamos la lista de planes y las selecciones
      this.plan_list = [this.planA.nombre, this.planB.nombre, this.planC.nombre];
      this.selectedPlanA = this.plan_list[0];
      this.selectedPlanB = this.plan_list[1];
      this.selectedPlanC = this.plan_list[2];

      console.log('planes seleccionados', this.selectedPlanA, this.selectedPlanB, this.selectedPlanC);
    } catch (err) {
      console.error('Error al cargar los datos:', err);
    }
  }

  getPlanDataPromise(plan_name: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.service.getPlanSelectedByName(plan_name).subscribe({
        next:(response) => {
            console.log("data del plan: " + plan_name , response);

            if(plan_name === this.planA.nombre){
              this.planA.data = response.result;
              console.log("planA feteched", this.planA);


            }else if(plan_name === this.planB.nombre){
              this.planB.data = response.result;

              this.dataSourceB = new MatTableDataSource(this.planB.data);

            }else  if(plan_name === this.planC.nombre){
              this.planC.data = response.result;
              console.log("planC feteched", this.planC);


            }
            resolve(true);
        },
        error:(err) => {
          console.error("error es", err);
          reject(false);
        }
      })
    })
  }


  openSummary(){
    const modalRef = this.modal.open(CanicasComponent, {
      centered: true,
      size:'xl',
      windowClass:'redondo'
    });
  }


  getDifferences(dataSource1: PLAN[], dataSource2: PLAN[]): any[] {
    const differences: any[] = [];
  
    if (dataSource1.length !== dataSource2.length) {
      console.error('Los dataSource no tienen la misma longitud.');
      return differences;
    }
  
    // Lista explícita de propiedades de PLAN
    const planKeys: (keyof PLAN)[] = [
      'clave',
      'nombre',
      'inventario',
      'enero',
      'facturacion_enero',
      'febrero',
      'facturacion_febrero',
      'marzo',
      'facturacion_marzo',
      'abril',
      'mayo',
      'junio'
    ];
  
    dataSource1.forEach((row1, index) => {
      const row2 = dataSource2[index];
      const rowDifferences: any[] = [];
  
      // Iteramos sobre las propiedades conocidas
      planKeys.forEach(key => {
        const value1 = row1[key];
        const value2 = row2[key];
  
        if (value1 !== value2) {
          rowDifferences.push({
            campo: key,
            valor1: value1,
            valor2: value2
          });
        }
      });
  
      if (rowDifferences.length > 0) {
        differences.push({
          nombre: row1.nombre,
          diferencias: rowDifferences
        });
      }
    });
  
    return differences;
  }

  isDifferent(row1: PLAN, row2: PLAN, column: string): boolean {
    return row1[column as keyof PLAN] !== row2[column as keyof PLAN];
  }



}
