import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewViewModalComponent } from '../new-view-modal/new-view-modal.component';

@Component({
  selector: 'app-ribbon-columns',
  imports: [],
  templateUrl: './ribbon-columns.component.html',
  styleUrl: './ribbon-columns.component.scss'
})
export class RibbonColumnsComponent implements OnInit {


  constructor(private modal: NgbModal){

  }


  ngOnInit(): void {

  }


  addView(){
    const modalRef = this.modal.open(NewViewModalComponent, {
      centered: true,
      size: 'md',
      windowClass: 'redondo'
    });
  }

}
