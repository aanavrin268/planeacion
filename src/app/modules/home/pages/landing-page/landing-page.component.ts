import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  protected kpi_proveedores: any[] = [];
  protected kp_util_list: any[] = [];

  
  margenGanancia = [
    { name: "Margen", value: 65 } // % de margen de ganancia
  ];


  constructor(){
    this.kpi_proveedores = [ 
      {id:1, title:'tabla1', data:[]},   {id:2, title:'tabla2', data:[]},

    ]

    this.kp_util_list = [ 
      {id:1, title: 'Margen ganancia', data: this.margenGanancia},  {id:2, title:'tabla2', data:[]},

    ]
  }

  ngOnInit(): void {
  }

}
