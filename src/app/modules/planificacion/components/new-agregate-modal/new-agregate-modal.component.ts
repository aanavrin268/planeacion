import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanDataService } from '../../services/plan-data.service';

@Component({
  selector: 'app-new-agregate-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-agregate-modal.component.html',
  styleUrl: './new-agregate-modal.component.scss'
})
export class NewAgregateModalComponent implements OnInit {

  protected list_functions: any[] = [];


  constructor(private active: NgbActiveModal, private dataPlanService: PlanDataService){
    this.list_functions = [
      {id: 1, title: 'Suma', icon: 'bi bi-plus'}, {id: 2, title: 'Promedio', icon: 'bi bi-percent'}
    ];
  }

  ngOnInit(): void {
    this.dataPlanService.currentColumns$.subscribe(
      {
        next:(data) => {
          console.log("current colums fesde new aggre: ", data);
        }
      }
    );
  }

  onSave(){

  }

  close(){
    this.active.close();
  }

}
