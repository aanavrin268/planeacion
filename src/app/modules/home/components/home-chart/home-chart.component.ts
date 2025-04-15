import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home-chart',
  imports: [NgxChartsModule, CommonModule],
  templateUrl: './home-chart.component.html',
  styleUrl: './home-chart.component.scss'
})
export class HomeChartComponent implements OnInit {

  id: any;
  bundle: any;
  data_list: any[] = [];

  constructor(){

  }

  ngOnInit(): void {
    this.id = this.bundle.id;
    this.data_list = this.bundle.data;
    
    console.log("bundle ", this.data_list);
  }

}
