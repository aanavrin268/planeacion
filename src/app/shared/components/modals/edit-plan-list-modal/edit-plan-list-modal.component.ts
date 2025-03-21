import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../api.service';
import { BehaviorsService } from '../../../../core/services/behaviors.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-plan-list-modal',
  imports: [CommonModule],
  templateUrl: './edit-plan-list-modal.component.html',
  styleUrl: './edit-plan-list-modal.component.scss'
})
export class EditPlanListModalComponent implements OnInit {
  protected list: any[] = [];
  protected nList: any[] = [];
  protected id: any;

  constructor(private active: NgbActiveModal, private apiService: ApiService, private behaviorService: BehaviorsService){}

  ngOnInit(): void {
    this.getData();
  }

  deletePlan(plan:any){
    Swal.fire({
      title:'Eliminando...',
      text:'Por favor, espera un momento.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    this.apiService.deletePlanHistoricByName(plan.name).subscribe({
      next:(response) =>{
        console.log("el repsonse es:", response);

        Swal.close();
        this.getData();

        Swal.fire({title:'Exto!', text:'El plan se elimino correctamente',
          icon:'success'
        });

      },
      error:(error) => {
        Swal.close();
        Swal.fire({title:'Error', text:'No se pudo eliminar el plan.', icon:'error'})
      }
    });


  }

  getData(){
    if(this.id == 1){
      this.behaviorService.loadAllPlanhistoricUnion();
      this.behaviorService.planHistoric$.subscribe(
        (data) => {
          this.nList = data;
        }
      );
    }else if(this.id == 2){
      this.behaviorService.loadAllPlanPrivateUnion();
      this.behaviorService.planPrivateHistoric$.subscribe(
        (data) => {
          this.nList = data;
        }
      );
    }

  }

  closeModal(){
    this.active.close();
  }

}
