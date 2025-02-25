import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-plan',
  imports: [CommonModule],
  templateUrl: './dash-plan.component.html',
  styleUrl: './dash-plan.component.scss'
})
export class DashPlanComponent implements OnInit {

  protected plan_list:any[] = [];


  constructor(){
    this.plan_list = [
      {name: 'Plan público', filters:['Todos los Qs', 'Historico', 'Sector público'], time:'historico'},
      {name: 'Plan privado', filters:['Todos los Qs', 'Productos', 'Sector privado'], time:'historico'}

    ];
  }

  ngOnInit(): void {


  }

}
