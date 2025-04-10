import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-historics',
  imports: [CommonModule],
  templateUrl: './choose-historics.component.html',
  styleUrl: './choose-historics.component.scss'
})
export class ChooseHistoricsComponent implements OnInit {
  protected dataBundle: any;

  protected planId: number;

  protected listData: any[] = [];

  constructor(private service: ApiService){
      this.planId = 0;
  }


  ngOnInit(): void {
    console.log("bundle received", this.dataBundle);
    if(this.dataBundle){
      this.planId = this.dataBundle.idPlan;

      if(this.planId === 1){
        this.loadPublicList();
      }
    }

  }

  loadPublicList(){
    this.service.getAllPlanHistoricUnion().subscribe({
      next:(response) => {
          console.log("public response", response);
          this.listData = response.result;
      }
    });
  }

  onCancel(){

  }

  onSave(){

  }

}
