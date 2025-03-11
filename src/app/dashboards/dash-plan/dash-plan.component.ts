import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddNewPlanComponent } from '../../shared/components/modals/modal-add-new-plan/modal-add-new-plan.component';
import { ModalPlanViewComponent } from '../../shared/components/modals/modal-plan-view/modal-plan-view.component';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject } from 'rxjs';
import { BehaviorsService } from '../../core/services/behaviors.service';


@Component({
  selector: 'app-dash-plan',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './dash-plan.component.html',
  styleUrl: './dash-plan.component.scss'
})
export class DashPlanComponent implements OnInit {

  protected plan_list:any[] = [];
  protected plan_version_list: any[] = [];

  protected keyPublicAmount: number;
  protected keyPublicText: string;

  valuees: any;



  constructor(private modal: NgbModal, private apiService: ApiService, private router: Router, private behaviors: BehaviorsService){
    this.plan_list = [
      {id:1, name: 'Plan público', filters:['Todos los Qs', 'Historico', 'Sector público'], time:'historico'},
      {id: 2, name: 'Plan privado', filters:['Todos los Qs', 'Productos', 'Sector privado'], time:'historico'}

    ];

    this.plan_version_list = [
      {id:1, name: 'Plan público', versions:''},
      {id:2, name: 'Plan privado', versions:''},

    ];

    this.keyPublicAmount = 0;
    this.keyPublicText = "";

  }

  ngOnInit(): void {


    /*
    this.plan_version_list[1].versions='Sin versiones';
    this.apiService.getPlanPublicoKeys().subscribe({
      next:(response:any) => {
        console.log("keys public", response);

        this.keyPublicAmount = response.result[0].total;
        console.log("key amlunt", this.keyPublicAmount);

        switch(this.keyPublicAmount){
            case 0:
              this.keyPublicText = 'Sin versiones';
              break;
            case 1:
              this.keyPublicText = '1 versión disponible';
              break;
            default:
              this.keyPublicText = this.keyPublicAmount + ' versiones disponibles';
              break;
        }

        this.plan_version_list[0].versions= this.keyPublicText;


      }
    });
    */
 
    this.loadListData();


  }

  loadListData(){
    this.behaviors.loadAllPlanhistoricUnion();
    this.behaviors.planHistoric$.subscribe(
      (data:any[]) => {
        if(data.length === 0) this.plan_version_list[0].versions = 'Sin versiones';
        else if(data.length === 1) this.plan_version_list[0].versions = '1 versión';
        else if(data.length > 0)  this.plan_version_list[0].versions = data.length +' versiones';
      }
    );

    this.behaviors.loadAllPlanPrivateUnion();
    this.behaviors.planPrivateHistoric$.subscribe(
      (data: any[]) => {
        if(data.length === 0) this.plan_version_list[1].versions = 'Sin versiones';
        else if(data.length === 1) this.plan_version_list[1].versions = '1 versión';
        else if(data.length > 0)  this.plan_version_list[1].versions = data.length +' versiones';
      }
    );



  }





  openComparative(plan: any){
    console.log("es", plan);
    const id = plan.id;

    if(plan.versions === 'Sin versiones')  this.showAlert();
    else{
      this.router.navigate(['/comparativa', id]);

    } 

  }

  showAlert(){
    Swal.fire('Sin versiones disponibles', 'Error, no hay ninguna versión disponible para este plan',
      'error'
    )
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

    console.log("el plan es", plan);

    const modalRef = this.modal.open(ModalPlanViewComponent, 
      { 
        size:'xl',
        centered:true,
        windowClass: 'redondo'
      }
    );


    //plan.nombre = ''

    modalRef.componentInstance.plan = plan;

    modalRef.result.then(
      (result) => {
        this.loadListData();
      },
      (reason) => {
        this.loadListData();

      }
    )
  }

}
