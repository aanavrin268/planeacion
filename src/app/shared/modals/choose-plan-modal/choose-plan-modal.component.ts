import { CommonModule } from '@angular/common';
import { Component, OnInit, signal} from '@angular/core';
import { ApiService } from '../../../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    {id: 1, title: 'Plan comercial público'},    {id: 2, title: 'Plan comercial privado'},

  ];


  constructor(private apiService: ApiService, private activeModal: NgbActiveModal){

  }
  ngOnInit(): void {
    

  }

  sendDataToParent() {
    this.activeModal.close(this.choosed_list());
  }

  getPublicRecords(){
    this.apiService.getAllPublicProviders().subscribe(
      {
        next:(data) => {
          console.log("pubñic data", data);
          this.choosed_list.set(data.result);

          this.sendDataToParent();
        }
      }
    )
  }



  selectPlan(plan:any){
    switch(plan.id){
      case 1:
        this.getPublicRecords();
        break;
    }
  }



}
