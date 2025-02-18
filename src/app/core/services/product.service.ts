import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  product: any;

  constructor() { }

 


  setProduct(product: any){
    this.product = product;
  }

  getProduct(){
    return this.product;
  }
}
