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

  protected valueText: any;

  formattedTopValue: string = '';
  formattedOtherValue: string = '';
  formattedTotalValue: string = '';

  constructor() {
    this.title = '';
  }

  ngOnInit(): void {
    console.log("bundle received" , this.bundle);
    this.id = this.bundle.id;
    this.data_list = this.bundle.data;
    this.title = this.bundle.title;
    
    console.log("data list ", this.data_list);

    //this.valueText = this.bundle.selectedId;
    if(this.bundle.selectedId === 1){
      this.valueText = 'unidades';
    }else if (this.bundle.selectedId === 2){
      this.valueText = 'montos';

    }

    if(this.id === '1') {
      this.topValue = this.bundle.data[0].value;
      this.otherValue = this.bundle.data[1].value;
      this.totalValue = Number(this.topValue) + Number(this.otherValue);

      this.formattedTopValue = this.formatNumber(this.topValue);
      this.formattedOtherValue = this.formatNumber(this.otherValue);
      this.formattedTotalValue = this.formatNumber(this.totalValue);

    } else if(this.id === '2') {
      this.porcentTop = this.bundle.data[0].value;
      this.totalValue = this.bundle.some;
      this.formattedTotalValue = this.formatNumber(this.totalValue);
    }
  }

  private formatNumber(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }


}