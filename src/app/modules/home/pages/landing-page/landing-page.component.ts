import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeService } from '../../services/home.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, NgxChartsModule, MatTableModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  protected kpi_proveedores: any[] = [];
  protected kpi_clientes: any[] = [];

  protected kp_util_list: any[] = [];

  protected dataSource = new MatTableDataSource<any>();
  protected dataSource2 = new MatTableDataSource<any>();
  protected dataSource3 = new MatTableDataSource<any>();
  protected dataSource4 = new MatTableDataSource<any>();

  protected displayedColumns: any[]= [];
  protected displayedColumnsCliente: any[]= [];


  
  margenGanancia = [
    { name: "Margen", value: 65 } // % de margen de ganancia
  ];


  constructor(private homeService: HomeService){
    this.kpi_proveedores = [ 
      {id:1, title:'Top proveedores público', data:[]},   {id:2, title:'Top proveedores privado', data:[]},

    ]

    this.kp_util_list = [ 
      {id:1, title: 'Top ganacia pública', data: [{name: 'Initial', value: 0}]},  
      {id:2, title:'Top ganancia privada', data: [{name: 'Initial', value: 0}]},
    ];

    this.kpi_clientes = [ 
      {id:1, title:'Top clientes público', data: [{name: 'Initial', value: 0}]},   
      {id:2, title:'Top clientes privado', data: [{name: 'Initial', value: 0}]},

    ]

    this.displayedColumns= ['PROVEEDORES', 'PIEZAS', 'MONTO'];
    this.displayedColumnsCliente= ['CLIENTES', 'PIEZAS', 'MONTO'];

    this.formatForGauge = this.formatForGauge.bind(this);


  }

  ngOnInit(): void {

    this.homeService.getTop3Providers('vw_topClientesPrivado').subscribe({
      next: (response) => {
        console.log("top-clientes-privado-data ", response);
        const top3 = response.result.slice(0, 3);
        this.dataSource4 = new MatTableDataSource(top3);

        const gaugeData = [{
          name: 'Piezas',
          value: response.result[0].PIEZAS
        }];
    
        console.log("Gauge data", gaugeData);
    
        this.kpi_clientes[1].data = gaugeData;
      }
    });


    this.homeService.getTop3Providers('vw_topClientesPublico').subscribe({
      next: (response) => {
        console.log("top-clientes-data ", response);
        const top3 = response.result.slice(0, 3);
        this.dataSource3 = new MatTableDataSource(top3);

        const gaugeData = [{
          name: 'Piezas',
          value: response.result[0].PIEZAS
        }];
    
        console.log("Gauge data", gaugeData);
    
        this.kpi_clientes[0].data = gaugeData;
      }
    });


    this.homeService.getTop3Providers('vw_topProveedoresPublico').subscribe({
      next: (response) => {
        console.log("topprov3-data ", response);
        const top3 = response.result.slice(0, 3);
        this.dataSource = new MatTableDataSource(top3);
    
        const gaugeData = [{
          name: 'Piezas',
          value: response.result[0].PIEZAS
        }];
    
        console.log("Gauge data", gaugeData);
    
        this.kp_util_list[0].data = gaugeData;
      }
    });




    this.homeService.getTop3Providers('vw_topProveedoresPrivado').subscribe({
      next: (response) => {
        console.log("topprov3-priv-data ", response);
        const top3 = response.result.slice(0, 3);
        this.dataSource2 = new MatTableDataSource(top3);

        const gaugeData = [{
          name: 'Piezas',
          value: response.result[0].PIEZAS
        }];
    
        console.log("Gauge data", gaugeData);
    
        this.kp_util_list[1].data = gaugeData;
      }
    })
  }


  calculateMax(value: number): number {
    if (!value) return 100;
    
    // Redondea al siguiente múltiplo de 100K, 1M, etc.
    if (value >= 1000000) {
      return Math.ceil(value / 1000000) * 1000000;
    } else {
      return Math.ceil(value / 100000) * 100000;
    }
  }

  formatTickValue = (value: number): string => {
    return this.formatNumber(value);
  }

  formatNumber(num: number, decimalPlaces: number = 1): string {
    if (num === 0) return '0';
    
    const isNegative = num < 0;
    const absoluteNum = Math.abs(num);
    const multiplier = Math.pow(10, decimalPlaces);
  
    if (absoluteNum >= 1000000) {
      const millions = absoluteNum / 1000000;
      return `${isNegative ? '-' : ''}${Math.round(millions * multiplier) / multiplier}M`;
    } else if (absoluteNum >= 1000) {
      const thousands = absoluteNum / 1000;
      return `${isNegative ? '-' : ''}${Math.round(thousands * multiplier) / multiplier}K`;
    } else {
      return `${isNegative ? '-' : ''}${Math.round(absoluteNum)}`;
    }
  }
// En tu componente
formatForGauge = (value: number): string => {
  return this.formatNumber(value);
}









  getDataSource(id: number): MatTableDataSource<any> {
    return id === 1 ? this.dataSource : this.dataSource2;
  }

  
  getDataSourceCliente(id: number): MatTableDataSource<any> {
    return id === 1 ? this.dataSource3 : this.dataSource4;
  }

}
