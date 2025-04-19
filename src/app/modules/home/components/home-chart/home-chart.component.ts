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
  protected title: string;
  data_list: any[] = [];

  topValue: any;
  otherValue: any;
  totalValue: any;

  porcentTop: any;
  

  constructor(){
    this.title = '';

  }

  ngOnInit(): void {
    this.id = this.bundle.id;
    this.data_list = this.bundle.data;
    this.title = this.bundle.title;
    
    console.log("bundle ", this.data_list);

    if(this.id === '1'){
      this.topValue = this.bundle.data[0].value;
      this.otherValue = this.bundle.data[1].value;
  
      this.totalValue = Number(this.topValue) + Number(this.otherValue);

    }else if(this.id === '2'){
      this.porcentTop = this.bundle.data[0].value;
      this.totalValue = this.bundle.some;
    }

    

   

  }

}
