import { Component, OnInit } from '@angular/core';
import { PlanDataService } from '../../services/plan-data.service';
import { PlanJust } from '../../models/plan.model';

@Component({
  selector: 'app-ribbon-information',
  imports: [],
  templateUrl: './ribbon-information.component.html',
  styleUrl: './ribbon-information.component.scss'
})
export class RibbonInformationComponent implements OnInit {

  protected currentPlanData: PlanJust;
  protected formatedPlanData: PlanJust;


  constructor(private planDataService: PlanDataService){
    this.currentPlanData = {} as PlanJust;
    this.formatedPlanData = {} as PlanJust;

  }

  ngOnInit(): void {

    this.planDataService.currentPlan$.subscribe(
      {
        next: (data) => {
          this.currentPlanData = {...data};
          console.log("cp desde ribbon information", this.currentPlanData);


          this.currentPlanData = {
            ...this.currentPlanData,
            categoria: this.currentPlanData.categoria === 1 ? 'Público' : 'Privado',
            estado: this.currentPlanData.estado === 1 ? 'Activo' : 'Inactivo',
            tipo: this.currentPlanData.tipo === 1 ? 'Master' : 'Histórico',
            descripcion: ''
        };

        this.formatedPlanData = this.currentPlanData;

        
        }
      }
    );
    
  }



}
