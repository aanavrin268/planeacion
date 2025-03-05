import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comparativa',
  imports: [CommonModule, MatTableModule],
  templateUrl: './comparativa.component.html',
  styleUrl: './comparativa.component.scss'
})
export class ComparativaComponent implements OnInit {

  protected isPlanSelected: boolean;
  protected showSettingsMenu: boolean;
  protected showLoading: boolean;

  protected plan_list: any[] = [
    {id:1, name:'público version 1', date:'03/03/2025', icon: 'history'},
    {id:2, name:'público version 2', date:'04/03/2025', icon: 'history'}
  ];

  dataSource = [
    {
        clave: '010.000.4229.00',
        proveedor: 'JS jorinis',
        descripcion: 'L-Asparaginasa',
        conjuntos: 'IMPORTADO',
        enero: 7500,
        febrero: 7500,
        marzo: 7500,
        totalTrimestre: 22500,
        eneroM: 15667500,
        febreroM: 15667500,
        marzoM: 15667500,
        totalMontoVentaTrimestre: 47002500,
        piezasDisponibles: '3030',
    },
    
    {
      "clave": "010.000.5084.00",
      "proveedor": "BIOCON",
      "descripcion": "Tacro 1-50",
      "conjuntos": "IMPORTADO",
      "enero": 135000,
      "febrero": 135000,
      "marzo": 135000,
      "abril": 0,
      "mayo": 0,
      "junio": 0,
      "julio": 0,
      "agosto": 0,
      "septiembre": 0,
      "octubre": 0,
      "noviembre": 0,
      "diciembre": 0,
      "totalTrimestre": 357000,
      "eneroM": 14703000,
      "febreroM": 22815000,
      "marzoM": 22815000,
      "totalMontoVentaTrimestre": 60333000,
      "piezasDisponibles": "15212"
  },
  {
      "clave": "010.000.3461.00",
      "proveedor": "Germed",
      "descripcion": "Azatioprina",
      "conjuntos": "IMPORTADO",
      "enero": 30000,
      "febrero": 40000,
      "marzo": 40000,
      "abril": 0,
      "mayo": 0,
      "junio": 0,
      "julio": 0,
      "agosto": 0,
      "septiembre": 0,
      "octubre": 0,
      "noviembre": 0,
      "diciembre": 0,
      "totalTrimestre": 110000,
      "eneroM": 5070000,
      "febreroM": 6760000,
      "marzoM": 6760000,
      "totalMontoVentaTrimestre": 18590000,
      "piezasDisponibles": "30945"
  },
  {
      "clave": "010.000.1774.00",
      "proveedor": "AQVida",
      "descripcion": "Epirubicina 1-50mg",
      "conjuntos": "IMPORTADO",
      "enero": 0,
      "febrero": 25000,
      "marzo": 25000,
      "abril": null,
      "mayo": null,
      "junio": null,
      "julio": null,
      "agosto": null,
      "septiembre": null,
      "octubre": null,
      "noviembre": null,
      "diciembre": null,
      "totalTrimestre": 50000,
      "eneroM": 0,
      "febreroM": 11000000,
      "marzoM": 11000000,
      "totalMontoVentaTrimestre": 22000000,
      "piezasDisponibles": "27544"
  },
];


dataSource2 = [
  {
      clave: '010.000.4229.00',
      proveedor: 'JS jorinis',
      descripcion: 'L-Asparaginasa',
      conjuntos: 'IMPORTADO',
      enero: 500,
      febrero: 7500,
      marzo: 500,
      totalTrimestre: 22500,
      eneroM: 15667500,
      febreroM: 15667500,
      marzoM: 15667500,
      totalMontoVentaTrimestre: 47002500,
      piezasDisponibles: '3030',
  },
  
  {
    "clave": "010.000.5084.00",
    "proveedor": "BIOCON",
    "descripcion": "Tacro 1-50",
    "conjuntos": "IMPORTADO",
    "enero": 13000,
    "febrero": 1000,
    "marzo": 135000,
    "abril": 0,
    "mayo": 0,
    "junio": 0,
    "julio": 0,
    "agosto": 0,
    "septiembre": 0,
    "octubre": 0,
    "noviembre": 0,
    "diciembre": 0,
    "totalTrimestre": 357000,
    "eneroM": 14703000,
    "febreroM": 22815000,
    "marzoM": 22815000,
    "totalMontoVentaTrimestre": 60333000,
    "piezasDisponibles": "15212"
},
{
    "clave": "010.000.3461.00",
    "proveedor": "Germed",
    "descripcion": "Azatioprina",
    "conjuntos": "IMPORTADO",
    "enero": 30000,
    "febrero": 40000,
    "marzo": 40000,
    "abril": 0,
    "mayo": 0,
    "junio": 0,
    "julio": 0,
    "agosto": 0,
    "septiembre": 0,
    "octubre": 0,
    "noviembre": 0,
    "diciembre": 0,
    "totalTrimestre": 110000,
    "eneroM": 5070000,
    "febreroM": 6760000,
    "marzoM": 6760000,
    "totalMontoVentaTrimestre": 18590000,
    "piezasDisponibles": "30945"
},
{
    "clave": "010.000.1774.00",
    "proveedor": "AQVida",
    "descripcion": "Epirubicina 1-50mg",
    "conjuntos": "IMPORTADO",
    "enero": 0,
    "febrero": 25000,
    "marzo": 25000,
    "abril": null,
    "mayo": null,
    "junio": null,
    "julio": null,
    "agosto": null,
    "septiembre": null,
    "octubre": null,
    "noviembre": null,
    "diciembre": null,
    "totalTrimestre": 50000,
    "eneroM": 0,
    "febreroM": 11000000,
    "marzoM": 11000000,
    "totalMontoVentaTrimestre": 22000000,
    "piezasDisponibles": "27544"
},
];

displayedColumns: string[] = [];


  constructor(){

    this.showLoading = false;
    this.isPlanSelected = false;
    this.showSettingsMenu = false;
  }

  ngOnInit(): void {
   
    this.displayedColumns = ['clave', 'proveedor', 'descripcion', 'conjuntos', 'enero', 'febrero', 'marzo'];
  
  }

  openSettingsMenu(){
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  closeSelected(){
    Swal.fire({
      title:'Atención!',
      text:'¿Cerrar la comparación actual?',
      icon:'question',
      showCancelButton: true,
      confirmButtonText:'Si, cerrar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      focusCancel: true,
      
    }).then((result) => {
      if(result.isConfirmed){
        this.isPlanSelected = false;
      }else if(result.isDismissed){

      }
    })
  }

  isDifferent(row1: any, row2: any, column: string): boolean {
    return row1[column] !== row2[column];
}

selectPlan(plan: any) {
  this.showLoading = true;

  Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espera un momento.',
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading(); 
      }
  });

  setTimeout(() => {
      Swal.close();

      this.isPlanSelected = true;

      this.showLoading = false;
  }, 1000); 
}

}
