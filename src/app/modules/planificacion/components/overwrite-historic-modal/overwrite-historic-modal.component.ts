import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanDataService } from '../../services/plan-data.service';
import { PlanAllDetails, PlanType } from '../../models/plan.model';
import { PlanService } from '../../services/plan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-overwrite-historic-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './overwrite-historic-modal.component.html',
  styleUrl: './overwrite-historic-modal.component.scss'
})
export class OverwriteHistoricModalComponent implements OnInit {

  protected plan: PlanAllDetails;
  protected list_plan: PlanType[] = [];

  constructor(private active: NgbActiveModal, private dataPlanService: PlanDataService, private mainPlanService: PlanService){
    this.plan = {} as PlanAllDetails;
  }

  ngOnInit(): void {
    this.dataPlanService.currentPlan$.subscribe(
      {
        next:(data) =>{
          this.plan = {...data};

          if(this.plan.categoria === 1){
            console.warn("SE TRATA DE PUBLICO");
          }else if(this.plan.categoria === 2){
            console.warn("SE TRATA DE PRIVADO");

          }else{
            console.error("TIPO DE PLAN DESCONOCIDO");

          }

          this.mainPlanService.getPlansByTypoGql(2).subscribe(
            {
              next: (response) => {
                console.log("Feteched planes ", response);
                this.list_plan = response;
              }
            }
          );

        }
      }
    );

  }

  onCancel(){
    this.active.close();
  }

  onSave(){

  }

}
