import { Component, OnInit } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';  // Asegúrate de importar NgApexchartsModule
import { ProductService } from '../../core/services/product.service';


@Component({
  selector: 'app-ficha-tecnica',
  imports: [NgApexchartsModule],
  templateUrl: './ficha-tecnica.component.html',
  styleUrl: './ficha-tecnica.component.scss'
})
export class FichaTecnicaComponent implements OnInit {

  protected data: any;
  public chartOptions2: any;
  public chartOptions3: any;


  protected product: any;


  testData: any = {
    "clave": "010.000.5084.00",
    "proveedor": "BIOCON",
    "descripcion": "Tacro 1-50",
    "conjuntos": "IMPORTADO",
    "enero": 87000,
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
}


  

  constructor(private proService: ProductService){
    
  this.chartOptions2 = {
    series: [{
      name: "Ventas",
      data: [13000, 0, 0]
    }],
    chart: {
      type: "line",
      height: 350
    },
    title: {
      text: "Fincadas",
      align: "center"
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar"]
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  this.chartOptions3 = {
    series: [{
      name: "Ventas",
      data: [13000, 0, 0]
    }],
    chart: {
      type: "line",
      height: 350
    },
    title: {
      text: "Completas",
      align: "center"
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar"]
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  }

  public chartOptions: any;



  ngOnInit(): void {

    this.product = this.proService.getProduct();

    console.log('producto', this.product);

    this.chartOptions = {
      series: [{
        name: "Ventas",
        data: [87000, 135000, 135000]
      }],
      chart: {
        type: "line",
        height: 350
      },
      title: {
        text: "Plan",
        align: "center"
      },
      xaxis: {
        categories: ["Ene", "Feb", "Mar"]
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };


  }

}
