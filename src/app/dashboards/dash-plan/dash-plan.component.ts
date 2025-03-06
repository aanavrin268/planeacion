import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddNewPlanComponent } from '../../shared/components/modals/modal-add-new-plan/modal-add-new-plan.component';
import { ModalPlanViewComponent } from '../../shared/components/modals/modal-plan-view/modal-plan-view.component';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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


  constructor(private modal: NgbModal, private apiService: ApiService, private router: Router){
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

  }


  openComparative(plan: any){
    console.log("es", plan);

    if(plan.id === 2){
      this.showAlert();
    }else {
      this.router.navigate(['/comparativa']);

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
  }

}
