import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanAllDetails } from '../../models/plan.model';
import { PlanDataService } from '../../services/plan-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-historic-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-historic-modal.component.html',
  styleUrl: './new-historic-modal.component.scss'
})
export class NewHistoricModalComponent implements OnInit {

  protected currentData: PlanAllDetails;
  protected newHistoric: PlanAllDetails;
  
  protected nameInput: string;

  constructor(private active: NgbActiveModal, private planDataService: PlanDataService){

    this.currentData = {} as PlanAllDetails;
    this.newHistoric = {} as PlanAllDetails;

    this.nameInput = '';
  }


  ngOnInit(): void {
    this.planDataService.currentPlan$.subscribe(
      {
        next: (data) => {
          console.log("CURRENT DATA DESDE MODAL NEW HISTORIC", data);
          this.currentData = {...data};
        }
      }
    );

  }




  onCancel(){
    this.active.close();
  }

  saveHistoric(){
    //console.log("inputName", this.nameInput);

    

    this.newHistoric.nombre = this.nameInput;
    this.newHistoric.estado = 1;
    this.newHistoric.categoria = this.currentData.categoria;
    this.newHistoric.tipo = 2;
    this.newHistoric.updatedAt = new Date().toISOString();

    console.warn("DATA TO SAVE", this.newHistoric);

  }

}
