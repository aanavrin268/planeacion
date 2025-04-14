import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-home',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  protected kpi_list:any[] = [];

  ventasTotalesMes = [
    { "name": "Mes Anterior", "value": 450000 },  
    { "name": "Mes Actual", "value": 520000 }  
  ];
  
  inventario = [
    { "name": "Stock Disponible", "value": 70 },  
    { "name": "Faltante", "value": 30 }  
  ];

  pedidos = [
    { name: "Completados", value: 120 },
    { name: "Pendientes", value: 30 }
  ];

  margenGanancia = [
    { name: "Margen", value: 65 } // % de margen de ganancia
  ];


  tendenciaDatos = [
    {
      name: "Ventas",
      series: [
        { name: "Enero", value: 10000 },
        { name: "Febrero", value: 12000 },
        { name: "Marzo", value: 8000 },
        { name: "Abril", value: 15000 },
        { name: "Mayo", value: 11000 },
        { name: "Junio", value: 16000 }
      ]
    }
  ];



  protected tools_list:any[] = [
    {id: 1, title:'VAR', subtitle:'Calcula el valor en riesgo', icon:"bi bi-graph-up-arrow", color: 'linear-gradient(90deg, #d11566,#f55484)',
      btnColor: '#a31c1c'
    },
    {id: 2, title:'RC', subtitle:'Calcula el riesgo de caducidad', icon:"bi bi-ban", color: 'linear-gradient(90deg, #ffd505,#eff5a3)',
        btnColor: '#FFC107'},
    {id: 3, title:'RSS', subtitle:'Calcula el riesgo de sobrestock', icon:"bi bi-exclamation-diamond", color: 'linear-gradient(90deg, #0522ff,#7b89f4)',
          btnColor: 'rgb(21 36 151)'}
  ];
  
  

  constructor(){
    this.kpi_list = [
      {id:1, title: 'Ventas totales', data: this.ventasTotalesMes }, {id:2, title: 'Nivel de inventario', data: this.inventario},
      {id:3, title: 'Pedidos ', data: this.pedidos }, {id:4, title: 'Margen ganancia', data: this.margenGanancia},
    ]
  }

  ngOnInit(): void {


  }

}
