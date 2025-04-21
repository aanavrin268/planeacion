import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-value-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './change-value-modal.component.html',
  styleUrl: './change-value-modal.component.scss'
})
export class ChangeValueModalComponent implements OnInit {

  protected bundle: any;
  protected id: any;
  protected types: any;
  protected unit_list: any[] = [];

  protected selectedValue: any;
  protected retriveId: any;


  constructor(private active: NgbActiveModal){
    this.unit_list = [
      {id:1, title:'Unidades'},  {id:2, title:'Montos'}

    ]
  }


  ngOnInit(): void {

    console.log("bundle received", this.bundle);

    if(this.bundle){
      this.id = this.bundle.item.id;
      this.types = this.bundle.item.type;


      if(this.id === 1 && this.types ==='publico-proveedores'){
        console.warn("se trata del r-1");
        this.retriveId = 1;
      }else if(this.id === 2 && this.types === 'privado-proveedores'){
        console.warn("se trata del r-2");
        this.retriveId = 2;

      }else if(this.id === 1 && this.types === 'publico-clientes'){
        console.warn("se trata del r-3");
        this.retriveId = 3;
      }else if(this.id === 2 && this.types === 'privado-clientes'){
        console.warn("se trata del r-4");
        this.retriveId = 4;

      }
    }





  }


  onChange(event: Event){
    let target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    console.log("el vlaor es", this.selectedValue);

  }

  onCancel(){
    this.active.dismiss('cancelado');
  }

  onAcept(){

    const retriveBundle = {
      value: this.selectedValue,
      retriveId :this.retriveId,
    }

    this.active.close(retriveBundle);
  }

}
