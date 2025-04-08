import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-column-selecter-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './column-selecter-modal.component.html',
  styleUrl: './column-selecter-modal.component.scss'
})
export class ColumnSelecterModalComponent implements OnInit {

  protected qs_list: any[] = [];
  protected selectedQs = {
    selectedQs: [] as string[]
  };
  protected qObject: any;

  protected currentMonth: any;

  constructor(private active: NgbActiveModal){
    this.qs_list = [
      {id: 1, title:'Q1- Enero, febrero, marzo'},
      {id: 2, title:'Q2- Abril, mayo, junio'},
      {id: 3, title:'Q3- Julio, agosto, septiembre'},
      {id: 4, title:'Q4- Octubre, noviembre, diciembre'},

    ]
  }


  ngOnInit(): void {
    this.currentMonth = this.qObject.currentMont;

    const qToCheck =
    this.currentMonth >= 1 && this.currentMonth <= 3 ? 1 :
    this.currentMonth >= 4 && this.currentMonth <= 6 ? 2 :
    this.currentMonth >= 7 && this.currentMonth <= 9 ? 3 :
    4;

    const quarter = this.qs_list.find(q => q.id === qToCheck);
    if(quarter) {
        quarter.checked = true;
    }

    this.updateSelectedQs();

  }


  saveList(){
    console.log(this.selectedQs);
    close();
  }

  close(){
    if(this.selectedQs.selectedQs.length === 0) return;
    else 
    this.active.close(this.selectedQs.selectedQs);
  }


  updateSelectedQs() {
    this.selectedQs.selectedQs = this.qs_list
      .filter(q => q.checked)
      .map(q => `Q${q.id}`);


      console.log("lista es:", this.selectedQs.selectedQs);  
      console.log("tamalo de selecteQs", this.selectedQs.selectedQs.length);
  }

}
