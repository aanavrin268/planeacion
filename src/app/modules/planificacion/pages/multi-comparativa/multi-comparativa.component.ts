import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multi-comparativa',
  imports: [CommonModule],
  templateUrl: './multi-comparativa.component.html',
  styleUrl: './multi-comparativa.component.scss'
})
export class MultiComparativaComponent implements OnInit {

  protected planA: any;
  protected planB: any;
  protected planC: any;


  protected data_list: any[] = [];

  constructor(private route: ActivatedRoute){}



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.data_list = JSON.parse(params['selected_data'] || '[]');
    });
    console.log("received", this.data_list);


    this.planA = this.data_list[0];
    this.planB = this.data_list[1];
    this.planC = this.data_list[2];

    console.log("planA", this.planA);
    console.log("planB", this.planB);
    console.log("planC", this.planC);

    this.fetchAllData();


  }

  fetchAllData(){


  }

}
