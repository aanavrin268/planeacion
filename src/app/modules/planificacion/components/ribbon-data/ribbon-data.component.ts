import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewHistoricModalComponent } from '../new-historic-modal/new-historic-modal.component';

@Component({
  selector: 'app-ribbon-data',
  imports: [],
  templateUrl: './ribbon-data.component.html',
  styleUrl: './ribbon-data.component.scss'
})
export class RibbonDataComponent implements OnInit {

  constructor(private modal: NgbModal){}


  ngOnInit(): void {


  }


  addNewHistoric(){
    const modalRef = this.modal.open(NewHistoricModalComponent, {
      centered:true,
      size:'md',
      windowClass: 'redondo'
    })
  }

}
