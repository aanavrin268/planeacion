import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableOneComponent } from '../../modals/table-one/table-one.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventario',
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent implements OnInit {

  @Input() product: any;

  @Output() closeEE: EventEmitter<void> = new EventEmitter<void>();




  protected inventary_options:any[] = [
    {id: 1, title:'Historico'},
    {id: 2, title:'Por periodo'},
    {id: 3, title:'Al día de hoy'}


  ];

  constructor(private modal: NgbModal, private active: NgbActiveModal){

  }


  ngOnInit(): void {
  }


  selectOption(option: any){
    console.log("option", option);

    if(option.id == 1){
      console.log("Historico");

        const modalRef = this.modal.open(TableOneComponent, {
              centered: true,
              size: 'lg'
            });
        
            modalRef.componentInstance.product = this.product;

  }

}

close(){
  this.closeEE.emit();
}
}