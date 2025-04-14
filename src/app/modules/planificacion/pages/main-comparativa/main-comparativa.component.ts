import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CanicasComponent } from '../../components/canicas/canicas.component';

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

  constructor(private modal: NgbModal){
    this.data1 = [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", facturacion_enero: "1000", febrero: "10", facturacion_febrero: "10000", marzo: "10", facturacion_marzo: "1000", abril: "10", mayo: "10", junio:"11"},
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "1", facturacion_enero: "100", febrero: "1", facturacion_febrero: "10000", marzo: "1", facturacion_marzo: "1200", abril: "1", mayo: "1", junio:"23"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", facturacion_enero: "100", febrero: "1", facturacion_febrero: "1000", marzo: "1", facturacion_marzo: "10000", abril: "10", mayo: "2", junio:"2"}
    ];

    this.data2 = [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "8", facturacion_enero: "123000", febrero: "8", facturacion_febrero: "123000", marzo: "8", facturacion_marzo: "123000", abril: "7", mayo: "1", junio:"9"},
      {clave: "100.00.12", nombre: "captodril", inventario: "1", enero: "11", facturacion_enero: "100234", febrero: "11", facturacion_febrero: "100234", marzo: "11", facturacion_marzo: "100234", abril: "12", mayo: "10", junio:"11"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "2", enero: "1", facturacion_enero: "200212", febrero: "1", facturacion_febrero: "200212", marzo: "1", facturacion_marzo: "200212", abril: "1", mayo: "11", junio:"11"}
    ];

    this.data3 = [
      {clave: "100.00.10", nombre: "propofol", inventario: "100", enero: "10", facturacion_enero: "100", febrero: "10", facturacion_febrero: "100", marzo: "10", facturacion_marzo: "100", abril: "10", mayo: "12", junio: "12"},
      {clave: "100.00.12", nombre: "captodril", inventario: "100", enero: "1", facturacion_enero: "200", febrero: "1", facturacion_febrero: "200", marzo: "1", facturacion_marzo: "200", abril: "1", mayo: "12", junio: "12"},
      {clave: "100.00.13", nombre: "busulfan", inventario: "100", enero: "1", facturacion_enero: "200", febrero: "1", facturacion_febrero: "200", marzo: "1", facturacion_marzo: "200", abril: "1", mayo: "12", junio: "12"}
    ];

    this.planA = { nombre: 'plan_conservador', tipo: "1", data: [] };
    this.planB = { nombre: 'plan_normal', tipo: "1", data: [] };
    this.planC = { nombre: 'plan_magico', tipo: "1", data: [] };


    this.displayedColumns = ['clave','nombre', 'inventario', 'enero', 'facturacion_enero',
      'febrero', 'facturacion_febrero', 'marzo', 'facturacion_marzo'
    ];

  }

  ngOnInit(): void {
    this.planA.data = this.data1;
    this.planB.data = this.data2;
    this.planC.data = this.data3;

    this.plan_list = [this.planA.nombre, this.planB.nombre, this.planC.nombre];
    this.selectedPlanA = this.plan_list[0];
    this.selectedPlanB = this.plan_list[1];
    this.selectedPlanC = this.plan_list[2];

    console.log("planes", this.selectedPlanA);

    this.dataSource = new MatTableDataSource(this.planA.data);
    this.dataSourceB = new MatTableDataSource(this.planB.data);
    this.dataSourceC = new MatTableDataSource(this.planC.data);

    const avB = this.getDifferences(this.planA.data, this.planB.data);
    const avC = this.getDifferences(this.planA.data, this.planC.data);


      console.log("diffavb", avB);

    this.dataSourceAvB = new MatTableDataSource(avB);
    this.dataSourceAvC = new MatTableDataSource(avC);

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
