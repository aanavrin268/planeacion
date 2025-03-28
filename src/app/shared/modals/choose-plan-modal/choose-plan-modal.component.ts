import { CommonModule } from '@angular/common';
import { Component, OnInit, signal} from '@angular/core';
import { ApiService } from '../../../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { pp_data_details, public_providers_data } from '../../../core/helpers/readables';

@Component({
  selector: 'app-choose-plan-modal',
  imports: [CommonModule],
  templateUrl: './choose-plan-modal.component.html',
  styleUrl: './choose-plan-modal.component.scss'
})
export class ChoosePlanModalComponent implements OnInit{

  //protected choosed_list: any[] = [];

  choosed_list = signal<any[]>([]);

  protected plan_list:any[] = [
    {id: 1, title: 'Plan comercial público',  image_path:"images/card-public.jpg", text:'Principales proveedores:',
      options:['AqVida', 'Germed', 'Biocon'],
    },    
    {id: 2, title: 'Plan comercial privado', image_path: "images/card-private.jpg", text:'Productos con mas rotación:',
      options:['Busulfan', 'Tacrolimus', 'Alprostadil']
    },

  ];


  constructor(private apiService: ApiService, private activeModal: NgbActiveModal){

  }
  ngOnInit(): void {
    

  }

  getPrivateRecords(){
    this.apiService.getAllProvidersPrivatePlan().subscribe({
        next:(data) => {
          console.log("private providers ", data);
          data.tipo = 2;
          this.choosed_list.set(data);
         
          this.sendDataToParent();

        }
    }
  )

  //this.choosed_list.set(public_providers_data.result);
  }


  close(){
    this.activeModal.close();
  }

  sendDataToParent() {
    this.activeModal.close(this.choosed_list());
  }

  getPublicRecords(){

    
    this.apiService.getAllPublicProviders().subscribe(
      {
        next:(data) => {
          console.log("pubñic data", data);
          //this.choosed_list.set(data.result);
          data.tipo = 1;
          this.choosed_list.set(data);
         
          this.sendDataToParent();


        }
      }
    )

    

  //this.choosed_list.set(public_providers_data.result);
    //this.sendDataToParent();

  }



  selectPlan(plan:any){
    switch(plan.id){
      case 1:
        this.getPublicRecords();
        break;
      case 2:
        this.getPrivateRecords();
        break;
    }
  }



}
