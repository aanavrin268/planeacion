import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageItemComponent } from '../image-item/image-item.component';
import { pt_one, pt_three, pt_two } from '../../utils/readables';

@Component({
  selector: 'app-image-modal',
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.scss'
})
export class ImageModalComponent implements OnInit {

  protected bundle: any;

  protected data_list: any[] = [];

  test_data: any[] = [];

  constructor(private modal: NgbModal){
    this.test_data = [
      {id: 1, path: 'images/cvv/mp.png', title:'Selección de planes', desc:'Etapa inicial, donde selecciona el plan comercial que se desea visualizar. Ya sea público o privado'},
            {id: 2, path: 'images/cvv/mp1.png', title:'Plan comercial público', desc:'Muestra toda la información correspondiente al plan comercial público más actúal.'}, 
           {id: 3, path: 'images/cvv/mp1.png', title:'Plan comercial privado', desc:'Muestra toda la información correspondiente al plan comercial privado más actual.'},


    ]

  }

  ngOnInit(): void {
    console.log("bundle received", this.bundle);

    if(this.bundle){
      //this.data_list = this.bundle.data;
      //this.data_list = this.test_data;

    }

    switch(this.bundle.id){
      case 1:
          this.data_list = pt_one;
          break;

          case 2:
            this.data_list = pt_two;
            break;
      case 3:
          this.data_list = pt_three;
          break;
    }

  }


  openImage(image:any){
    const dataBundle = {
      id: '',
      data: image
    }

    const modalRef = this.modal.open(ImageItemComponent, {
      centered:true,
      size:'xl',
      windowClass:'custom-modal-width-medium'
    })

    modalRef.componentInstance.bundle = dataBundle;

  }

}
