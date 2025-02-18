import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from '../details/details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, MatListModule, MatExpansionModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

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
constructor(private service: ApiService, private modalService: NgbModal) {

}

  ngOnInit(): void {
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
