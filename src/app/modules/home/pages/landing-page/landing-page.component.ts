import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeTableComponent } from '../../components/home-table/home-table.component';
import { HomeChartComponent } from '../../components/home-chart/home-chart.component';

/*
  plan_austero
  plan_ideal
  plan_riesgo
*/


@Component({
  selector: 'app-landing-page',
  imports: [FormsModule, MatTableModule, NgxChartsModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  protected kpi_proveedores: any[] = [];
  protected kpi_clientes: any[] = [];

  protected kp_util_list: any[] = [];
  protected utils_kp_util_list: any[] = [];


  protected dataSource = new MatTableDataSource<any>();
  protected dataSource2 = new MatTableDataSource<any>();
  protected dataSource3 = new MatTableDataSource<any>();
  protected dataSource4 = new MatTableDataSource<any>();
  protected dataSource5 = new MatTableDataSource<any>();
  protected dataSource6 = new MatTableDataSource<any>();


  protected displayedColumns: any[]= [];
  protected displayedColumnsCliente: any[]= [];

  protected displayedColumnsPrincipal: any[]= [];


  protected showTopMenu: boolean = false;
  protected showTopMenuR: boolean = false;

  protected showDownMenu: boolean = false;
  protected showDownMenuR: boolean = false;


  protected menu_list: any[] = [
    {id: 1, title:'Ver más'},    {id: 2, title:'Cancelar'},

  ];

  selectedTopOption: any;
  selectedTopUtil: any;

  
  selectedDownOption: any;
  selectedDownUtil: any;




  data1: any[] = [];
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];

  gaugeData1: any[] = [];
  gaugeData2: any[] = [];
  gaugeData3: any[] = [];
  gaugeData4: any[] = [];

  
  margenGanancia = [
    { name: "Margen", value: 65 } // % de margen de ganancia
  ];

  sendTotalGeneral: any;


  constructor(private homeService: HomeService, private modal: NgbModal){
    this.kpi_proveedores = [ 
      {id:1, title:'Top proveedores público', type:'publico-proveedores', data:[]},   
      {id:2, title:'Top proveedores privado', type:'privado-proveedores', data:[]},

    ]

    this.kp_util_list = [ 
      {id:1, title: 'Top unidades pública', type:'publico-proveedores', 
         data: [{name: 'Initial', value: 0}]},  
      {id:2, title:'Top unidades privada', type:'privado-proveedores',
         data: [{name: 'Initial', value: 0}]},
    ];

    this.kpi_clientes = [ 
      {id:1, title:'Top clientes público', type:'publico-clientes',
           data: [{name: 'Initial', value: 0}]},   
      {id:2, title:'Top clientes privado', type:'privado-clientes',
          data: [{name: 'Initial', value: 0}]},

    ]

    this.utils_kp_util_list = [ 
      {id:1, title:'Top clientes público', type:'publico-clientes',
           data: [{name: 'Initial', value: 0}]},   
      {id:2, title:'Top clientes privado', type:'privado-clientes',
          data: [{name: 'Initial', value: 0}]},

    ]



    this.displayedColumns= ['PROVEEDORES', 'PIEZAS', 'MONTO'];
    this.displayedColumnsCliente= ['CLIENTES', 'PIEZAS', 'MONTO'];
    this.displayedColumnsPrincipal=['ID_SIST_CL_INST', 'SKU', 'PRINCIPAL_CLIENTE', 'PRINCIPAL_PROVEEDOR',  'PIEZAS_VENDIDAS',
        'MONTO_VENDIDO', 'PIEZAS_FACTURADAS', 'MONTO_FACTURADO'
    ]

    this.formatForGauge = this.formatForGauge.bind(this);


  }

  ngOnInit(): void {

    this.homeService.getPrincipalPrivate().subscribe({
      next:(reponse) => {
        console.log("principal data privada es ", reponse);

        this.dataSource6 = new MatTableDataSource(reponse.result);
      }
    })

    this.homeService.getPrincipalPublic().subscribe({
      next:(reponse) => {
        console.log("principal data es ", reponse);

        this.dataSource5 = new MatTableDataSource(reponse.result);
      }
    })

    this.homeService.getTop3Providers('vw_topClientesPrivado').subscribe({
      next: (response) => {

        const formattedData = response.result.map((item: { PIEZAS: number; MONTO: number; }) => ({
          ...item,
          PIEZAS: this.formatNumberMain(item?.PIEZAS),
          MONTO: this.formatNumberMain(item?.MONTO)
        }));

        this.data4  = formattedData;


        const formattedTop3 = formattedData.slice(0,3);


        
        const datos = response.result.map((item: any) => ({
          ...item,
          PIEZAS: Number(item.PIEZAS)
        }));
            
        const totalGeneral = datos.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);

        console.log('TOTAL DOWN R', totalGeneral);
    
        const top3 = datos.slice(0, 3);
    
        const sumaTop3 = top3.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);

        console.log('SUMA TOP 3 DOWN R', sumaTop3);

    
        const porcentajeTop3 = (sumaTop3 / totalGeneral) * 100;

        console.log('PORCENTAJE DOWN  DOWN R', porcentajeTop3);

        //this.dataSource2 = new MatTableDataSource(formattedTop3);
    
        
        const gaugeData =  this.utils_kp_util_list[1].data = [{
          name: 'Top 3',
          value: parseFloat(porcentajeTop3.toFixed(2)) 
        }];

 

        this.gaugeData4 = gaugeData;



        console.log("top-clientes-privado-data ", response);
        //const top3 = response.result.slice(0, 3);
        this.dataSource4 = new MatTableDataSource(formattedTop3);

        /*
        const gaugeData = [{
          name: 'Piezas',
          value: response.result[0].PIEZAS
        }];

        */
    
        console.log("Gauge data", gaugeData);
    
        //this.kpi_clientes[1].data = gaugeData;
      }
    });


    this.homeService.getTop3Providers('vw_topClientesPublico').subscribe({
      next: (response) => {
        const formattedData = response.result.map((item: { PIEZAS: number; MONTO: number; }) => ({
          ...item,
          PIEZAS: this.formatNumberMain(item?.PIEZAS),
          MONTO: this.formatNumberMain(item?.MONTO)
        }));

        this.data3  = formattedData;


        const formattedTop3 = formattedData.slice(0,3);

        console.log("top-clientes-data ", response);
        const top3 = response.result.slice(0, 3);
        this.dataSource3 = new MatTableDataSource(formattedTop3);


        const topAllBut3 = response.result.slice(3, response.result.length);


        const datosConvertidos = top3.map((item: { PIEZAS: string; }) => ({
          ...item,
          PIEZAS: parseInt(item.PIEZAS, 10) // o también puedes usar: +item.PIEZAS
      }));

      const datosConvertidosAfter = topAllBut3.map((item: { PIEZAS: string; }) => ({
        ...item,
        PIEZAS: parseInt(item.PIEZAS, 10) // o también puedes usar: +item.PIEZAS
    }));


        console.log("primero-DOWN-3", datosConvertidos);
        console.log("primero-DOWN-despeus de 3", datosConvertidosAfter);

        const totalPiezasAll = response.result.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);

        const totalPiezasTop3 = datosConvertidos.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);
        const totalPiezasTopAllBut3 = datosConvertidosAfter.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);


        console.log("suma total DE DOWN", totalPiezasAll);


        console.log("suma top 3 DOWN", totalPiezasTop3);
        console.log("suma top despues de 3 DOWN ", totalPiezasTopAllBut3);


        const gaugeData = [
          {name: "Top 3", value: totalPiezasTop3},
          {name: "El resto", value: totalPiezasTopAllBut3},


        ]

        this.utils_kp_util_list[0].data = gaugeData;


        this.gaugeData3 = gaugeData;


       
      }
    });


    this.homeService.getTop3Providers('vw_topProveedoresPublico').subscribe({
      next: (response) => {
        const formattedData = response.result.map((item: { PIEZAS: number; MONTO: number; }) => ({
          ...item,
          PIEZAS: this.formatNumberMain(item?.PIEZAS),
          MONTO: this.formatNumberMain(item?.MONTO)
        }));
    
        console.log("Datos formateados:", formattedData);
        this.data1  = formattedData;

        const formattedTop3 = formattedData.slice(0,3);

        console.log("topprov3-data-public ", response);


        const top3 = response.result.slice(0, 3);
        const topAllBut3 = response.result.slice(3, response.result.length);

     



        //console.log("primero-top3", datosConvertidos);
        console.log("primero-top-despeus de 3", topAllBut3);

        const totalPiezasAll = response.result.reduce((sum: any, item: { PIEZAS: any; }) => sum + Number(item.PIEZAS), 0);

        const totalPiezasTop3 = top3.reduce((sum: any, item: { PIEZAS: any; }) => sum + Number(item.PIEZAS), 0);
        const totalPiezasTopAllBut3 = topAllBut3.reduce((sum: any, item: { PIEZAS: any; }) => sum + Number(item.PIEZAS), 0);


        console.log("suma total", totalPiezasAll);


        console.log("suma top 3", totalPiezasTop3);
        console.log("suma top despues de 3 ", totalPiezasTopAllBut3);


        this.dataSource = new MatTableDataSource(formattedTop3);

        const gaugeData = [
          {name: "Top 3", value: totalPiezasTop3},
          {name: "El resto", value: totalPiezasTopAllBut3},



        ]

        this.gaugeData1 = gaugeData;
          
        
    
        /*
           const gaugeData = response.result.map((item: { PROVEEDORES: any; PIEZAS: any; }) => ({
          name: item.PROVEEDORES, 
          value: item.PIEZAS      
        }));
        
        */


       
       
        console.log("Gauge data", gaugeData);
    
        this.kp_util_list[0].data = gaugeData;
      }
    });




    this.homeService.getTop3Providers('vw_topProveedoresPrivado').subscribe({
      next: (response) => {

        const formattedData = response.result.map((item: { PIEZAS: number; MONTO: number; }) => ({
          ...item,
          PIEZAS: this.formatNumberMain(item?.PIEZAS),
          MONTO: this.formatNumberMain(item?.MONTO)
        }));

        this.data2  = formattedData;


        const formattedTop3 = formattedData.slice(0,3);


        const datos = response.result.map((item: any) => ({
          ...item,
          PIEZAS: Number(item.PIEZAS)
        }));
            
        const totalGeneral = datos.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);

        this.sendTotalGeneral = totalGeneral;

        console.log('tpta_privado', totalGeneral);
    
        const top3 = datos.slice(0, 3);
    
        const sumaTop3 = top3.reduce((sum: any, item: { PIEZAS: any; }) => sum + item.PIEZAS, 0);

        console.log('tpta_tp333', sumaTop3);

    
        const porcentajeTop3 = (sumaTop3 / totalGeneral) * 100;
    
        this.dataSource2 = new MatTableDataSource(formattedTop3);
    
        this.kp_util_list[1].data = [{
          name: 'Top 3',
          value: parseFloat(porcentajeTop3.toFixed(2)) 
        }];

        const gaugeData =  this.kp_util_list[1].data = [{
          name: 'Top 3',
          value: parseFloat(porcentajeTop3.toFixed(2)) 
        }];

 

        this.gaugeData2 = gaugeData;

    
        console.log("Porcentaje acumulado del top 3:", porcentajeTop3 + '%');
      }
    });






  }

  openChartDown(item:any){
    this.showDownMenuR = !this.showDownMenuR;

    console.log("el attempt data es", item);


    let bundleData: { id: any, data: any[], some: any } = {
      id: '',
      data: [],
      some: ''
    }

    if(item.type === 'publico-clientes'){
      bundleData.id = '1';
      bundleData.data = this.gaugeData3;
    }else if(item.type === 'privado-clientes'){
      bundleData.id = '2';
      bundleData.data = this.gaugeData4;
      bundleData.some = this.sendTotalGeneral;

    }

    const modalRef = this.modal.open(HomeChartComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'redondo'
    })


    modalRef.componentInstance.bundle = bundleData;

  }

  openChart(item:any){
    this.showTopMenuR = !this.showTopMenuR;


    let bundleData: { id: any, data: any[], some: any } = {
      id: '',
      data: [],
      some: ''
    }

    if(item.type === 'publico-proveedores'){
      bundleData.id = '1';
      bundleData.data = this.gaugeData1;
    }else if(item.type === 'privado-proveedores'){
      bundleData.id = '2';
      bundleData.data = this.gaugeData2;
      bundleData.some = this.sendTotalGeneral;

    }

    const modalRef = this.modal.open(HomeChartComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'redondo'
    })


    modalRef.componentInstance.bundle = bundleData;

  }

  openTable(item: any){
    this.showTopMenu = !this.showTopMenu;


    let bundleData: { data: any[] } = {
      data: []
    }

    if(item.type === 'publico-proveedores'){
      bundleData.data = this.data1;
    }else if(item.type === 'privado-proveedores'){
      bundleData.data = this.data2;

    }

    const modalRef = this.modal.open(HomeTableComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'redondo'
    })


    modalRef.componentInstance.bundle = bundleData;

  }

  openDownMenuR(option:any){
    this.showDownMenuR = !this.showDownMenuR;
    this.selectedDownOption = option.id;
    this.selectedDownUtil = option.id;

    console.log("item es", option);
  }

  openTopMenuR(option:any){
    this.showTopMenuR = !this.showTopMenuR;
    this.selectedTopOption = option.id;
    this.selectedTopUtil = option.id;

    console.log("item es", option);
  }


  openTableDown(item: any){
    this.showDownMenu = !this.showDownMenu;


    let bundleData: { types: any, data: any[] } = {
      types: 'down',
      data: []
    }

    if(item.type === 'publico-clientes'){
      bundleData.data = this.data3;
    }else if(item.type === 'privado-clientes'){
      bundleData.data = this.data4;

    }

    const modalRef = this.modal.open(HomeTableComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'redondo'
    })


    modalRef.componentInstance.bundle = bundleData;

  }

  openDownMenu(option:any){
    this.showDownMenu = !this.showDownMenu;
    this.selectedDownOption = option.id;
    this.selectedDownUtil = option.id;

    console.log("item es", option);

  }


  openTopMenu(option:any){
    this.showTopMenu = !this.showTopMenu;
    this.selectedTopOption = option.id;
    this.selectedTopUtil = option.id;

    console.log("item es", option);
  }

  onMenuSelectedDown(option:any, item:any){
    console.log("option es", option);
    console.log("item es", item);


  if(option.id === 2){
    this.showDownMenu = !this.showDownMenu;

  } else if (option.id === 1){
    this.openTableDown(item);
  }

  }


  onMenuSelectedR(option:any, item: any){
    console.log("option es", option);
    console.log("item es", item);


  if(option.id === 2){
    this.showTopMenuR = !this.showTopMenuR;

  } else if (option.id === 1){
    this.openChart(item);
  }

}


onMenuSelectedDownR(option:any, item: any){
  console.log("option es", option);
  console.log("item es", item);


if(option.id === 2){
  this.showDownMenuR = !this.showDownMenuR;

} else if (option.id === 1){
  console.log("down r attempt");
  this.openChartDown(item);
}

}


  onMenuSelected(option:any, item: any){
      console.log("option es", option);
      console.log("item es", item);


    if(option.id === 2){
      this.showTopMenu = !this.showTopMenu;

    } else if (option.id === 1){
      this.openTable(item);
    }

  }


  // En tu componente o servicio
  formatNumberMain(value: any): string {
    // Convertir a número primero por si viene como string
    const num = Number(value);
    
    // Verificar si es un número válido
    if (isNaN(num)) {
      console.warn('Valor no numérico recibido:', value);
      return '0';
    }
    
    // Redondear y formatear
    return Math.round(num).toLocaleString('en-US');
  }


formatValue = (v: number): string => {
  return `${v}%`;
};


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
