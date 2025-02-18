import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  imports: [],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {


  constructor(private router: Router){}

  ngOnInit(): void {


  }

  goToList(){
    this.router.navigate(['/product'])
  }

  goReportes(value: number){


    switch(value){
      case 1:
        this.router.navigate(['/quatri']);
        break;
      case 2:
        this.router.navigate(['/repFincadas']);
        break;
    }


  }




}
