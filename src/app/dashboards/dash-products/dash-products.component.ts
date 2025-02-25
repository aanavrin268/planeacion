import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from '../../producto/details/details.component';
import { tests } from '../../core/helpers/readables';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-dash-products',
  imports: [CommonModule, MatListModule, MatExpansionModule, FormsModule, ReactiveFormsModule,
    NgxChartsModule
  ],
  templateUrl: './dash-products.component.html',
  animations: [
    trigger('menuAnim', [
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)'  // El menú aparece desde arriba
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateY(-100%)'  // El menú desaparece hacia arriba
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  styleUrl: './dash-products.component.scss'
})
export class DashProductsComponent implements OnInit {

  protected menuToggle: boolean = false;

  data = [
    { name: 'Busulfan', value: 150 },
    { name: 'Alproztadil', value: 200 },
    { name: 'Misoprostol', value: 100 },
  ];

  colorScheme = 'vivid'; // Puedes usar 'vivid', 'cool', 'natural', etc.

  dataCad = [
    { name: 'Tacrolimus', value: 345 },
    { name: 'Amolodipino', value: 88},
    { name: 'Fulvenstrant', value: 12 },
    { name: 'Losrtan', value: 5 },
  ];

  colorScheme1 = 'cool'; // Puedes probar 'vivid', 'natural', 'flame'

  public chartOptions: any;

  filters = [
    {
      name: 'Marca genérica',
      options: [] as string[],
      selectedOptions: [] as string[]
    },
    {
      name: 'Presentación',
      options: [],
      selectedOptions: []
    },
    {
      name: 'Marca comercial',
      options: [],
      selectedOptions: []
    },
    {
      name: 'Venta',
      options:[],
      selectedOptions: []
    }
  ];

  filteredProducts: any[] = []; 


  protected products: any[] = [];
  protected fMenuOptions: any[] = [];


constructor(private service: ApiService, private modalService: NgbModal) {
  this.chartOptions = {
    series: [{
      name: "Ventas",
      data: [87000, 135000, 135000]
    }],
    chart: {
      type: "bar",
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

  this.fMenuOptions = [
    {id:1, title: 'Cambiar parametro'}, {id:2, title: 'Cambiar diseño'},
    {id:3, title: 'Cerrar'}

  ]

}

  ngOnInit(): void {

    this.products = tests;
    this.filteredProducts = [...this.products];

    this.populateFilters();

    /*
    this.service.getAllProducts().subscribe(
      {
        next:(data) => {
          console.log(data);
          this.products = data;
          this.filteredProducts = [...this.products];

          this.populateFilters();
      
        },
        error:(error)=> {
          console.error('Error al traer todos los productos');
        }
      }
    )

    */


  }


  onfMenuClick(item:any){
    //console.log(item);


    switch(item.id){
      case 3:
        this.menuToggle = !this.menuToggle;
        break;
    }


  }

  openMenu(){
    this.menuToggle = !this.menuToggle;

  }


  populateFilters(){
    let brands = [...new Set(this.products.map((product) =>
      product.NOMBRE_GENERICO))];

    let presentation = [...new Set(this.products.map((product) => 
      product.PRESENTACION))];

    let comercial = [...new Set(this.products.map((product) =>
      product.MARCA_COMERCIAL))];

    let venta = [...new Set(this.products.map((product) => 
      product.TIPO_VENTA))];

      //console.log("brand", brands);
    this.filters[0].options = brands;
    this.filters[1].options = presentation;
    this.filters[2].options = comercial;
    this.filters[3].options = venta;

  }


  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.filters[0].selectedOptions.length === 0 || this.filters[0].selectedOptions.includes(product.NOMBRE_GENERICO)) &&
        (this.filters[1].selectedOptions.length === 0 || this.filters[1].selectedOptions.includes(product.PRESENTACION)) &&
        (this.filters[2].selectedOptions.length === 0 || this.filters[2].selectedOptions.includes(product.MARCA_COMERCIAL)) &&
        (this.filters[3].selectedOptions.length === 0 || this.filters[3].selectedOptions.includes(product.TIPO_VENTA))
      );
    });
  }



    openProduct(product:any){
      const modalRef = this.modalService.open(DetailsComponent, {
        size: 'lg',
        centered:true,
      windowClass:'redondo'
      });
  
  
      modalRef.componentInstance.product = product;
    }


}
