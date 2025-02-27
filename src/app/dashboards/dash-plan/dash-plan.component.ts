import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddNewPlanComponent } from '../../shared/components/modals/modal-add-new-plan/modal-add-new-plan.component';
import { ModalPlanViewComponent } from '../../shared/components/modals/modal-plan-view/modal-plan-view.component';

@Component({
  selector: 'app-dash-plan',
  imports: [CommonModule],
  templateUrl: './dash-plan.component.html',
  styleUrl: './dash-plan.component.scss'
})
export class DashPlanComponent implements OnInit {

  protected plan_list:any[] = [];


  constructor(private modal: NgbModal){
    this.plan_list = [
      {name: 'Plan público', filters:['Todos los Qs', 'Historico', 'Sector público'], time:'historico'},
      {name: 'Plan privado', filters:['Todos los Qs', 'Productos', 'Sector privado'], time:'historico'}

    ];
  }

  ngOnInit(): void {


  }

  addNewPlan(){
    const modalRef = this.modal.open(ModalAddNewPlanComponent, 
      {
        size:'lg',
        centered:true,
        windowClass:'redondo'
      });
  }

  openPlan(plan:any){
    console.log(plan)
    const modalRef = this.modal.open(ModalPlanViewComponent, 
      { 
        size:'xl',
        centered:true
      }
    );
  }

}
