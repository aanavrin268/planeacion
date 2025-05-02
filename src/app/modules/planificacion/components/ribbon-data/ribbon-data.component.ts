import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewHistoricModalComponent } from '../new-historic-modal/new-historic-modal.component';
import { PlanState } from '../../store/plan.state';

@Component({
  selector: 'app-ribbon-data',
  imports: [],
  templateUrl: './ribbon-data.component.html',
  styleUrl: './ribbon-data.component.scss'
})
export class RibbonDataComponent implements OnInit {

  protected editSwitch: boolean;

  constructor(private modal: NgbModal, private state: PlanState){
    this.editSwitch = false;
  }


  ngOnInit(): void {


  }

  allowEdits(){
    this.editSwitch = !this.editSwitch;
    this.state.changeEditValue(this.editSwitch);
  }


  addNewHistoric(){
    const modalRef = this.modal.open(NewHistoricModalComponent, {
      centered:true,
      size:'md',
      windowClass: 'redondo'
    })
  }

}
